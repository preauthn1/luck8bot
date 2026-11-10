<?php

namespace app\common\model;


use app\common\DbTool;
use support\Db;
use support\Model;

class Base extends Model
{
    /**
     * @var string
     */
    protected $connection = 'mysql';

    /**
     * 是否自动维护时间戳
     */
    public $timestamps = true;

    /**
     * 自定义时间戳字段名
     */
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    /**
     * 时间格式
     */
    protected $dateFormat = 'Y-m-d H:i:s';

    /**
     * 获取字段
     * @return array
     */
    public function get_field_arr()
    {
        return static::$field_arr;
    }

    // 表名称
    protected static $table_name = '';
    // 表注释
    protected static $table_comment = '';
    // 表字段
    protected static $field_arr = [];
    // 表索引
    protected static $index_arr = [];
    // 分区
    protected static $partition = false;

    // 初始数据
    public function getInitData()
    {
        return $this->init_data;
    }

    // 初始数据
    protected $init_data = [];

    /**
     * 创建表
     * @param string $path
     * @param string $name
     */
    public static function createTable(string $path, string $name)
    {
        $db_tool = new DbTool();
        $obj_file = $path . $name;
        $config = \support\Db::connection()->getConfig();

        echo $obj_file::$table_name . '开始创建表' . PHP_EOL;
        // 判断表是否存在
        $table_exists = self::tableExists($obj_file::$table_name);
        if ($table_exists) {
            echo $obj_file::$table_name . '表已存在' . PHP_EOL;
            return;
        }

        $sql_str = $db_tool->createTable(
            $obj_file::$table_name,
            $obj_file::$field_arr,
            $obj_file::$index_arr,
            $config['driver'],
            $obj_file::$table_comment,
            $obj_file::$partition
        );

        echo $sql_str . PHP_EOL;

        $sql_arr = array_filter(
            array_map('trim', explode(';', $sql_str)),
            function ($sql) {
                return !empty($sql);
            }
        );

        foreach ($sql_arr as $sql) {
            if (!empty($sql)) {
                Db::statement($sql);
            }
        }
    }

    /**
     * 检查表是否存在
     * @param string $tableName
     * @return bool
     */
    public static function tableExists(string $tableName): bool
    {
        $tableName = preg_replace('/[^a-zA-Z0-9_]/', '', $tableName);
        // 使用原始查询
        $sql = "SHOW TABLES LIKE '{$tableName}'";
        $result = Db::select($sql);
        if (count($result) === 0) {
            return false;
        } else {
            return true;
        }
    }
}
