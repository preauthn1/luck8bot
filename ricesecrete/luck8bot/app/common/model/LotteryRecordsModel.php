<?php


namespace app\common\model;


/**
 * 开奖记录
 * Class LotteryRecords
 * @package plugin\manage\app\model
 */
class LotteryRecordsModel extends Base
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ma_lottery_records';

    /**
     * 表名
     * @var string
     */
    public static $table_name = 'ma_lottery_records';
    /**
     * 表注释
     * @var string
     */
    public static $table_comment = '开奖记录表';

    /**
     * 主键
     */
    protected $primaryKey = 'id';

    // 创建时间访问器
    public function getCreatedAtAttribute($value)
    {
        return $value ? date('Y-m-d H:i:s', strtotime($value)) : null;
    }

    // 更新时间访问器
    public function getUpdatedAtAttribute($value)
    {
        return $value ? date('Y-m-d H:i:s', strtotime($value)) : null;
    }

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
        'number' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '开奖编号',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 30,
            'default' => '',
        ],
        'lottery_number' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '编号',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 30,
            'default' => '',
        ],
        'lottery_results' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '开奖结果',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 255,
            'default' => '',
        ],
        'forecast1_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '第一种下一期预测结果 大 小 单 双',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 50,
            'default' => '',
        ],
        'forecast2_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '第二种下一期预测结果 大 小 单 双',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 50,
            'default' => '',
        ],
        'forecast3_result' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '第三种下一期预测结果 大 小 单 双',
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
        'lottery_data' => [
            'type' => 'text',
            'null' => true,
            'comment' => '接口原始数据',
            'default' => null,
        ],
        'lottery_time' => [
            'type' => 'bigint',
            'null' => true,
            'comment' => '开奖时间戳',
            'default' => 0,
        ],
        'lottery_cycle' => [
            'type' => 'int',
            'null' => true,
            'comment' => '彩票周期秒',
            'default' => 0,
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