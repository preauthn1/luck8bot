<?php


namespace app\common\model;


/**
 * 彩票编码
 * Class LotteryCode
 * @package plugin\manage\app\model
 */
class LotteryAnalyzeModel extends Base
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ma_lottery_analyze';

    /**
     * 表名
     * @var string
     */
    public static $table_name = 'ma_lottery_analyze';
    /**
     * 表注释
     * @var string
     */
    public static $table_comment = '彩票统计分析表';

    /**
     * 主键
     */
    protected $primaryKey = 'id';

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
            'comment' => '开奖号码',
            'character' => 'utf8mb4',
            'collate' => 'utf8mb4_unicode_ci',
            'length' => 20,
            'default' => '',
        ],
        'type' => [
            'type' => 'varchar',
            'null' => true,
            'comment' => '统计类型 max10,min10,maxyl10,sh10,wh10',
            'length' => 20,
            'default' => '',
        ],
        'num' => [
            'type' => 'int',
            'null' => true,
            'comment' => '数量限制 30 40 50 70 100',
            'default' => 0,
        ],
        'number_count' => [
            'type' => 'int',
            'null' => true,
            'comment' => '统计次数',
            'default' => 0,
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
        'idx_code_number' => [
            'columns' => ['code', 'number', 'type', 'num'],
            'unique' => true
        ]
    ];
}