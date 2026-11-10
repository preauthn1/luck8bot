<?php


namespace app\common\model;


/**
 * 彩票编码
 * Class LotteryCode
 * @package plugin\manage\app\model
 */
class LotteryCodeModel extends Base
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ma_lottery_code';

    /**
     * 表名
     * @var string
     */
    public static $table_name = 'ma_lottery_code';
    /**
     * 表注释
     * @var string
     */
    public static $table_comment = '彩票编码表';

    /**
     * 主键
     */
    protected $primaryKey = 'id';

    /**
     * 字段属性
     * @var array[]
     */
    public static $field_arr = [
        'id' => [
            'type' => 'int',
            'null' => false,
            'comment' => '主键',
            'auto_inc' => true,
        ],
        'code' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '彩票代码',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 30,
            'default' => '',
        ],
        'last_time' => [
            'type' => 'bigint',
            'null' => true,
            'comment' => '最后开奖时间戳',
            'default' => 0,
        ],
        'cycle' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '开奖周期 20s 40s 50s 1m 2m 1h 2h',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 30,
            'default' => '',
        ],
        'number' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '最后一次开奖编号',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 30,
            'default' => '',
        ],
        'lottery_number' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '最后一次开奖编号编号',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 30,
            'default' => '',
        ],
        'last_results' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '最后一次开奖结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 255,
            'default' => '',
        ],
        'max_num' => [
            'type' => 'int',
            'null' => true,
            'comment' => '最大期数',
            'default' => 0,
        ],
        'forecast1_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '预测1结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 50,
            'default' => '',
        ],
        'forecast2_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '预测2结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 50,
            'default' => '',
        ],
        'forecast3_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '预测3结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 50,
            'default' => '',
        ],
        'forecast1_num_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '预测1结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 255,
            'default' => '',
        ],
        'forecast2_num_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '预测2结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 255,
            'default' => '',
        ],
        'forecast3_num_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '预测3结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 255,
            'default' => '',
        ],
        'created_at' => [
            'type' => 'timestamp',
            'null' => true,
            'comment' => '创建时间',
            'default' => null,
        ],
        'updated_at' => [
            'type' => 'timestamp',
            'null' => true,
            'comment' => '更新时间',
            'default' => null,
        ],
    ];

    /**
     * 索引
     * @var array[]
     */
    public static $index_arr = [
        'idx_number_code' => [
            'columns' => ['number', 'code'],
            'unique' => true
        ]
    ];
}