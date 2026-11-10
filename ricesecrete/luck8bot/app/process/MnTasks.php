<?php


namespace app\process;

use app\common\game\GovietApi;
use app\services\LotteryServices;
use Workerman\Crontab\Crontab;

/**
 * MnTasks 南区接口数据拉取
 * Class PledgeCurrent
 * @package app\process
 */
class MnTasks
{
    public function onWorkerStart()
    {
        //执行逻辑会阻塞线程
        new Crontab('*/2 * * * * *', function () {
            //每秒执行一次
            $codes = [
                'mn45g', 'mn90g', 'mn1p', 'mn2p', 'mn5p'
            ];
            $data = LotteryServices::getLotteryCode($codes);
            foreach ($data as $value) {
                GovietApi::getlotteryLastResult($value['code'], $value['cycle'], $value['max_num'],$value['is_hot']);
            }
        });
    }
}