<?php


namespace app\common;


class DbTool
{
    /**
     * 根据字段定义数组生成建表语句
     * @param string $tableName 表名
     * @param array $fields 字段定义数组
     * @param string $dbType 数据库类型：mysql 或 pgsql
     * @param string $comment 表注释
     * @param string $partition 分表
     * @return string
     */
    public function generateCreateTableSql($tableName, $fields, $dbType = 'mysql', $comment = '', $partition = false)
    {
        if (!in_array($dbType, ['mysql', 'pgsql'])) {
            return "";
        }
        $fieldDefinitions = [];
        $partition_sql = "";
        $primaryKey = [];

        foreach ($fields as $fieldName => $fieldConfig) {
            $fieldDef = $this->generateFieldDefinition($fieldName, $fieldConfig, $dbType);
            $fieldDefinitions[] = $fieldDef;

            // 识别主键
            if ($fieldName === 'id' && ($fieldConfig['auto_inc'] ?? false)) {
                $primaryKey[] = $fieldName;
            }
            //识别其他字段主键
            if (isset($fieldConfig['primary_key']) && $fieldConfig['primary_key']) {
                $primaryKey[] = $fieldName;
            }
        }

        // 添加主键约束
        if (!empty($primaryKey)) {
            if ($dbType === 'mysql') {
                $primaryKey_temp = [];
                foreach ($primaryKey as $item) {
                    $primaryKey_temp[] = "`{$item}`";
                }
                $primaryKey_str = implode(',', $primaryKey_temp);
                $fieldDefinitions[] = "PRIMARY KEY ($primaryKey_str)";
            } else {
                $primaryKey_str = implode(',', $primaryKey);
                $fieldDefinitions[] = "CONSTRAINT \"{$tableName}_pkey\" PRIMARY KEY ({$primaryKey_str})";
            }
            foreach ($primaryKey as $item) {
                if ($item != 'id') {
                    if ($partition) {
                        $partition_sql = "PARTITION BY RANGE ({$item})";
                        break;
                    }
                }
            }
        }

        // 构建完整SQL
        if ($dbType === 'mysql') {
            return $this->generateMySQLSql($tableName, $fieldDefinitions, $comment);
        } else {
            return $this->generatePostgreSQLSql($tableName, $fields, $fieldDefinitions, $comment, $partition_sql);
        }
    }

    /**
     * 生成单个字段定义
     * @param string $fieldName 字段名
     * @param array $config 字段配置
     * @param string $dbType 数据库类型
     * @return string
     */
    public function generateFieldDefinition($fieldName, $config, $dbType)
    {
        $typeMapping = [
            'mysql' => [
                'bigint' => 'bigint',
                'int' => 'int',
                'smallint' => 'smallint',
                'varchar' => 'varchar',
                'text' => 'text',
                'timestamp' => 'timestamp',
                'datetime' => 'datetime'
            ],
            'pgsql' => [
                'bigint' => 'int8',
                'int' => 'int4',
                'smallint' => 'int2',
                'decimal' => 'numeric',
                'varchar' => 'varchar',
                'text' => 'text',
                'timestamp' => 'timestamp'
            ]
        ];
        $type = $typeMapping[$dbType][$config['type']] ?? $config['type'];
        if ($config['type'] == 'timestamp') {
            if ($dbType === 'pgsql') {
                $config['length'] = 6;
            }
        }
        $length = isset($config['length']) ? "({$config['length']})" : '';
        // 类型定义
        $definition = "`{$fieldName}` {$type}{$length}";
        // 自增
        if (($config['auto_inc'] ?? false) && $fieldName === 'id') {
            if ($dbType === 'mysql') {
                $definition .= " AUTO_INCREMENT";
            } // PostgreSQL 的 AUTO_INCREMENT 创建表字后设置
            else {
                $definition = "`{$fieldName}`";
                // PostgreSQL 的 AUTO_INCREMENT 使用 SERIAL
                if ($config['type'] === 'bigint') {
                    $definition .= " BIGSERIAL";
                } else {
                    if ($config['type'] === 'int') {
                        $definition .= " SERIAL";
                    }
                }
            }
        }
        // 字符集和排序规则 (仅MySQL)
        if ($dbType === 'mysql') {
            if (isset($config['character']) && isset($config['collate'])) {
                $definition .= " CHARACTER SET {$config['character']} COLLATE {$config['collate']}";
            }
        } else {
            // PostgreSQL 的 COLLATE
            if (isset($config['collate'])) {
                $definition .= " COLLATE \"pg_catalog\".\"default\"";
            }
        }
        // NULL/NOT NULL
        if ($dbType == 'pgsql') {
            $nullClause = ($config['null'] ?? false) ? '' : 'NOT NULL';
            if ($nullClause) {
                $definition .= " {$nullClause}";
            }
        }
        // 默认值
        if (array_key_exists('default', $config)) {
            $defaultValue = $config['default'];
            if (is_string($defaultValue)) {
                if ($dbType === 'mysql') {
                    $definition .= " DEFAULT '{$defaultValue}'";
                } else {
                    if ($config['type'] === 'text') {
                        $definition .= " DEFAULT ''::text";
                    } else if ($config['type'] == 'decimal') {
                        $defaultValue = floatval($defaultValue);
                        $definition .= " DEFAULT {$defaultValue}";
                    } else {
                        $definition .= " DEFAULT '{$defaultValue}'::character varying";
                    }
                }
            } elseif (is_numeric($defaultValue)) {
                $definition .= " DEFAULT {$defaultValue}";
            } elseif ($defaultValue === null) {
                if ($dbType === 'mysql') {
                    $definition .= " DEFAULT NULL";
                } else {
                    if ($config['type'] === 'text') {
                        $definition .= " DEFAULT ''::text";
                    }
                    if ($config['type'] === 'decimal') {
                        $definition .= " DEFAULT NULL::numeric";
                    }
                    if ($config['type'] === 'timestamp') {
                        $definition .= " DEFAULT NULL::timestamp without time zone";
                    }
                    if ($config['type'] === 'date') {
                        $definition .= " DEFAULT CURRENT_DATE";
                    }
                }
            }
        }

        // NULL/NOT NULL
        if ($dbType == 'mysql') {
            $nullClause = ($config['null'] ?? false) ? '' : 'NOT NULL';
            if ($nullClause) {
                $definition .= " {$nullClause}";
            }
        }

        // 注释
        if (isset($config['comment'])) {
            if ($dbType === 'mysql') {
                $definition .= " COMMENT '{$config['comment']}'";
            }
            // PostgreSQL 注释在单独的语句中添加
        }
        return $definition;
    }

    /**
     * 生成MySQL建表语句
     */
    public function generateMySQLSql($tableName, $fieldDefinitions, $comment)
    {
        $sql = "CREATE TABLE `{$tableName}` (\n";
        $sql .= "  " . implode(",\n  ", $fieldDefinitions);
        $sql .= "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        if ($comment) {
            $sql .= " COMMENT='{$comment}'";
        }

        return $sql . ";\n";
    }

    /**
     * 生成PostgreSQL建表语句
     * @param $tableName
     * @param $fields
     * @param $fieldDefinitions
     * @param $comment
     * @param $partition_sql //分表
     * @return string
     */
    public function generatePostgreSQLSql($tableName, $fields, $fieldDefinitions, $comment, $partition_sql = '')
    {
        $sql = "CREATE TABLE \"public\".\"{$tableName}\" (\n";
        $sql .= "  " . implode(",\n  ", $fieldDefinitions);
        if (!empty($partition_sql)) {
            $sql = $sql . "\n) " . $partition_sql . ";\n\n";
        } else {
            $sql .= "\n);\n\n";
        }
        $sql = str_replace("`", '"', $sql);

        // 添加注释
        if ($comment) {
            $sql .= "COMMENT ON TABLE \"public\".\"{$tableName}\" IS '{$comment}';\n";
        }
        // 为每个字段添加注释
        if (isset($fields)) {
            foreach ($fields as $fieldName => $fieldComment) {
                $sql .= "COMMENT ON COLUMN \"public\".\"{$tableName}\".\"{$fieldName}\" IS '{$fieldComment['comment']}';\n";
            }
        }
//        if (!empty($partition_sql)) {
//            $sql .= $this->generatePostgreSQLPartitionDefault($tableName);
//        }
        return $sql;
    }

    /**
     * 创建默认分表
     * @param $tableName
     * @return string
     */
    public function generatePostgreSQLPartitionDefault($tableName)
    {
        $default = $tableName . '_default';
        $sql = " CREATE TABLE {$default} PARTITION OF {$tableName} DEFAULT;";
        return $sql;
    }

    /**
     * 生成PostgreSQL序列
     * @param $tableName
     * @return string
     */
    public function generatePostgreSQLSequence($tableName)
    {
        return "
            CREATE SEQUENCE {$tableName}_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
            ALTER TABLE {$tableName} ALTER COLUMN id SET DEFAULT nextval('{$tableName}_id_seq'::regclass);
            ";
    }

    /**
     * 扩展功能：生成索引语句
     */
    public function generateIndexes($tableName, $indexes, $dbType = 'mysql')
    {
        $sql = '';
        foreach ($indexes as $indexName => $indexConfig) {
            $columns = is_array($indexConfig['columns']) ?
                implode(', ', $indexConfig['columns']) : $indexConfig['columns'];

            if ($dbType === 'mysql') {
                $unique = $indexConfig['unique'] ?? false ? 'UNIQUE ' : '';
                $sql .= "CREATE {$unique}INDEX `{$indexName}` ON `{$tableName}` ({$columns});\n";
            } else {
                $unique = $indexConfig['unique'] ?? false ? 'UNIQUE ' : '';
                $sql .= "CREATE {$unique}INDEX \"{$indexName}_{$tableName}\" ON \"public\".\"{$tableName}\" ({$columns});\n";
            }
        }
        return $sql;
    }

    /**
     * 生成建表语句
     * @param $tableName
     * @param $fields
     * @param $indexes
     * @param string $dbType
     * @param string $comment
     * @param string $partition
     * @return string
     */
    public function createTable($tableName, $fields, $indexes, $dbType = 'mysql', $comment = '', $partition = false)
    {
        $sql = '';
        if ($dbType == 'mysql') {
            $create_sql = $this->generateCreateTableSql($tableName, $fields, 'mysql', $comment, false);
            $indexes_sql = $this->generateIndexes($tableName, $indexes, 'mysql');
            $sql = $create_sql . $indexes_sql;
        }
        if ($dbType == 'pgsql') {
            $create_sql = $this->generateCreateTableSql($tableName, $fields, 'pgsql', $comment, $partition);
//            $sequence_sql = $this->generatePostgreSQLSequence($tableName);
            $indexes_sql = $this->generateIndexes($tableName, $indexes, 'pgsql');
            $sql = $create_sql . $indexes_sql;
        }
        return $sql;
    }
}