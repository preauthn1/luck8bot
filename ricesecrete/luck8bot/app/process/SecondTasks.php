<?php


namespace app\process;

use Workerman\Crontab\Crontab;

/**
 * 秒钟任务
 * Class PledgeCurrent
 * @package app\process
 */
class SecondTasks
{
    public function onWorkerStart()
    {
//         执行逻辑会阻塞线程
        // 每5秒执行一次
        new Crontab('*/2 * * * * *', function () {
//            var_dump('每1秒执行一次');
            //刷新下一秒开奖的代码
//            LotteryServices::lotteryNextCode();
            //检测服务活跃
//            GovietApi::rotationTrainingTime(1);
        });
    }
}