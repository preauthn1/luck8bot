<?php


namespace app\process;

use app\common\game\GovietApi;
use app\services\LotteryServices;
use Workerman\Crontab\Crontab;

/**
 * KenoTasks Keno接口数据拉取
 * Class PledgeCurrent
 * @package app\process
 */
class KenoTasks
{
    public function onWorkerStart()
    {
        //执行逻辑会阻塞线程
        new Crontab('*/1 * * * * *', function () {
            //每秒执行一次
            $codes = [
                'keno20g', 'keno30g', 'keno40g', 'keno50g', 'keno1p', 'keno5p'
            ];
            $data = LotteryServices::getLotteryCode($codes);
            foreach ($data as $value) {
                GovietApi::getlotteryLastResult($value['code'], $value['cycle'], $value['max_num'], $value['is_hot']);
                usleep(300000);
            }
        });
    }
}