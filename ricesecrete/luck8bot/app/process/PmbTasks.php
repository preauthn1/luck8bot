<?php


namespace app\process;

use app\common\game\GovietApi;
use app\services\LotteryServices;
use Workerman\Crontab\Crontab;

/**
 * PmbTasks 北区接口数据拉取
 * Class PledgeCurrent
 * @package app\process
 */
class PmbTasks
{
    public function onWorkerStart()
    {
        //执行逻辑会阻塞线程
        new Crontab('*/2 * * * * *', function () {
            //每秒执行一次
            $codes = [
                'pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p'
            ];
            $data = LotteryServices::getLotteryCode($codes);
            foreach ($data as $value) {
                GovietApi::getlotteryLastResult($value['code'], $value['cycle'], $value['max_num'],$value['is_hot']);
                usleep(200000);
            }
        });
    }
}