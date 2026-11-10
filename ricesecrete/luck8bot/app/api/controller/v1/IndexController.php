<?php

namespace app\api\controller\v1;

use app\api\common\BaseController;
use app\services\LotteryServices;
use support\Request;

class IndexController extends BaseController
{
    /**
     * 获取全部最后开奖结果
     * @param Request $request
     * @return \support\Response
     */
    public function lottery_results_all(Request $request)
    {
        $codes = [
            'taixiu' => [
                'taixiu', 'taixiu60g', 'taixiu45g1', 'taixiu45g2', 'taixiu30g1', 'taixiu30g2',
                'taixiu3m',
                'taixiu5m', 'taixiu5m60g', 'taixiu5m60g1', 'taixiu5m60g2', 'taixiu5m60g3', 'taixiu5m60g4'
            ],
            'mb' => [
                'pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p'
            ],
            'mn' => [
                'mn45g', 'mn90g', 'mn1p', 'mn2p', 'mn5p'
            ],
            'keno' => [
                'keno20g', 'keno30g', 'keno40g', 'keno50g', 'keno1p', 'keno5p'
            ],
            'sicbo' => [
                'sicbo20g', 'sicbo30g', 'sicbo40g', 'sicbo50g', 'sicbo1p', 'sicbo90g'
            ]
        ];
        $data = [];
        foreach ($codes as $key => $code_data) {
            $data[$key] = [];
            foreach ($code_data as $code) {
                $data[$key][] = LotteryServices::getLastCacheData($code);
            }
        }
        $out_data = [
            'code' => 0,
            'data' => $data
        ];
        return self::returnMsg($out_data);
    }

    /**
     * 获取最后开奖结果
     * @param Request $request
     * @return \support\Response
     */
    public function lottery_results(Request $request)
    {
        $code = $request->input('code', '');
        if (empty($code)) {
            $out_data = [
                'code' => 1,
                'msg' => 'code empty',
            ];
            return self::returnMsg($out_data);
        }
        $data = LotteryServices::getLastCacheData($code);
        $out_data = [
            'code' => 0,
            'data' => $data
        ];
        return self::returnMsg($out_data);
    }

    /**
     * 获取列表
     * @param Request $request
     * @return \support\Response
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public function lottery_list(Request $request)
    {
        $code = $request->input('code', '');
        $limit = $request->input('limit', 30);
        $out_data = LotteryServices::getLotteryList($code, $limit);
        return self::returnMsg($out_data);
    }

    /**
     * 获取统计结果
     * @param Request $request
     * @return \support\Response
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public function lottery_statistics(Request $request)
    {
        $code = $request->input('code', '');//mb2p
        $type = $request->input('type', '');// 5 6
        $ladder = $request->input('ladder', '');//1 2 3 4 5 6
        $limit = $request->input('limit', 100);//15 30 50 100
        $out_data = LotteryServices::getLotteryStatistics($code, $type, $ladder, $limit);
        return self::returnMsg($out_data);
    }

    /**
     * 获取分析结果
     * @param Request $request
     * @return \support\Response
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public function lottery_analyze(Request $request)
    {
        $code = $request->input('code', '');//mb2p
        $limit = $request->input('limit', 100);//15 30 50 100
        $out_data = LotteryServices::getLotteryAnalyze($code, $limit);
        return self::returnMsg($out_data);
    }
}
