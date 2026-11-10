<?php


namespace app\process;


use app\services\LotteryServices;
use Workerman\Crontab\Crontab;

/**
 * 删除无用数据
 * Class PledgeCurrent
 * @package app\process
 */
class MinuteTasks
{
    public function onWorkerStart()
    {
//        执行逻辑会阻塞进程
        // 每60分钟执行一次
        new Crontab('60 * * * * *', function () {
            LotteryServices::clearData(2000);
        });
//        new Crontab('5 * * * * *', function () {
//            LotteryServices::numberCount(0);
//        });
    }
}