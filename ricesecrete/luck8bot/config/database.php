<?php
return [
    'default' => env('DEFAULT_DB', 'pgsql'),
    'connections' => [
        'mysql' => [
            'driver' => env('MYSQL_TYPE', 'mysql'),
            'host' => env('MYSQL_HOST', '127.0.0.1'),
            'port' => env('MYSQL_PORT', '3306'),
            'database' => env('MYSQL_DATABASE', 'webman'),
            'username' => env('MYSQL_USERNAME', 'root'),
            'password' => env('MYSQL_PASSWORD', '123456'),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('MYSQL_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'strict' => true,
            'engine' => null,
            'options' => [
                PDO::ATTR_EMULATE_PREPARES => false, // Must be false for Swoole and Swow drivers.
            ],
            'pool' => [
                'max_connections' => 100, // 最大连接数
                'min_connections' => 10, // 最小连接数
                'wait_timeout' => 3,    // 从连接池获取连接等待超时时间
                'idle_timeout' => 60,   // 连接最大空闲时间，超过该时间会被回收
                'heartbeat_interval' => 50, // 心跳检测间隔，需要小于60秒
            ],
            // 添加从库配置
            'read' => [
                'host' => [
                    env('MYSQL_SLAVE1_HOST', '127.0.0.1') // 从库1地址
                ],
                'port' => env('MYSQL_SLAVE1_PORT', '3306'),
                'database' => env('MYSQL_SLAVE1_DATABASE', 'webman'),
                'username' => env('MYSQL_SLAVE1_USERNAME', 'root'),
                'password' => env('MYSQL_SLAVE1_PASSWORD', '123456'),
            ],
            // 主库配置
            'write' => [
                'host' => [
                    env('MYSQL_HOST', '127.0.0.1') // 主库地址
                ],
                'port' => env('MYSQL_PORT', '3306'),
                'database' => env('MYSQL_DATABASE', 'webman'),
                'username' => env('MYSQL_USERNAME', 'root'),
                'password' => env('MYSQL_PASSWORD', '123456'),
            ],
        ],
        // 新增 PostgreSQL 数据库配置
        'pgsql' => [
            'driver' => env('PGSQL_TYPE', 'pgsql'),
            'host' => env('PGSQL_HOST', '127.0.0.1'),
            'port' => env('PGSQL_PORT', '5432'),
            'database' => env('PGSQL_DATABASE', 'webman'),
            'username' => env('PGSQL_USERNAME', 'postgres'),
            'password' => env('PGSQL_PASSWORD', ''),
            'charset' => env('PGSQL_CHARSET', 'utf8'),
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
            'options' => [
                PDO::ATTR_EMULATE_PREPARES => false, // Must be false for Swoole and Swow drivers.
            ],
            'pool' => [
                'max_connections' => 100, // 最大连接数
                'min_connections' => 10, // 最小连接数
                'wait_timeout' => 3,    // 从连接池获取连接等待超时时间
                'idle_timeout' => 60,   // 连接最大空闲时间，超过该时间会被回收
                'heartbeat_interval' => 50, // 心跳检测间隔，需要小于60秒
            ],
            // PostgreSQL 从库配置
            'read' => [
                'host' => [
                    env('PGSQL_SLAVE1_HOST', '127.0.0.1') // PostgreSQL 从库1地址
                ],
                'port' => env('PGSQL_SLAVE1_PORT', '5432'),
                'database' => env('PGSQL_SLAVE1_DATABASE', 'webman'),
                'username' => env('PGSQL_SLAVE1_USERNAME', 'postgres'),
                'password' => env('PGSQL_SLAVE1_PASSWORD', ''),
            ],
            // PostgreSQL 主库配置
            'write' => [
                'host' => [
                    env('PGSQL_HOST', '127.0.0.1') // PostgreSQL 主库地址
                ],
                'port' => env('PGSQL_PORT', '5432'),
                'database' => env('PGSQL_DATABASE', 'webman'),
                'username' => env('PGSQL_USERNAME', 'postgres'),
                'password' => env('PGSQL_PASSWORD', ''),
            ],
        ],
    ],
];
