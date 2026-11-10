<?php


namespace app\process;

use app\common\game\GovietApi;
use app\common\game\LuckyWinApi;
use app\services\LotteryServices;
use Workerman\Crontab\Crontab;

/**
 * Luck8 接口数据拉取
 * Class PledgeCurrent
 * @package app\process
 */
class LuckTasks
{
    public function onWorkerStart()
    {
        //执行逻辑会阻塞线程
        new Crontab('*/2 * * * * *', function () {
            //每秒执行一次
            $codes = ['taixiu', 'taixiu60g', 'taixiu45g1', 'taixiu45g2', 'taixiu30g1', 'taixiu30g2',
                'taixiu3m',
                'taixiu5m', 'taixiu5m60g', 'taixiu5m60g1', 'taixiu5m60g2', 'taixiu5m60g3', 'taixiu5m60g4'];
            $data = LotteryServices::getLotteryCode($codes);
            foreach ($data as $value) {
                LuckyWinApi::getlotteryLastResult($value['code'], $value['cycle'], $value['max_num'], $value['is_hot']);
            }
        });
    }
}