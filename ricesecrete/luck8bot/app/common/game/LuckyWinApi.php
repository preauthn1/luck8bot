<?php


namespace app\common\game;


use app\common\model\LotteryRecordsModel;
use app\common\SwooleRequest;
use app\common\Util;
use app\services\LotteryServices;
use support\Cache;

class LuckyWinApi
{

    public static $url = "https://vn-admin-web.luckywin18.com/api/openPrize";

    public static function getLotteryResult($code, $cycle, $max_num, $startTime, $endTime, $current = 1, $size = 20, $is_hot = false)
    {
        $http = new SwooleRequest();
        $tableId = "1";
        switch ($code) {
            case 'taixiu':
                $temp_url = "/TaixiuOpenPrizeRecord";
                $tableId = "1";
                break;
            case 'taixiu60g':
                $temp_url = "/TaixiuOpenPrizeRecord";
                $tableId = "2";
                break;
            case 'taixiu45g1':
                $temp_url = "/TaixiuOpenPrizeRecord";
                $tableId = "3";
                break;
            case 'taixiu45g2':
                $temp_url = "/TaixiuOpenPrizeRecord";
                $tableId = "4";
                break;
            case 'taixiu30g1':
                $temp_url = "/TaixiuOpenPrizeRecord";
                $tableId = "5";
                break;
            case 'taixiu30g2':
                $temp_url = "/TaixiuOpenPrizeRecord";
                $tableId = "6";
                break;
            case 'taixiu5m':
                $temp_url = "/TaixiuMDOpenPrizeRecord";
                $tableId = "1";
                break;
            case 'taixiu5m60g':
                $temp_url = "/TaixiuMDOpenPrizeRecord";
                $tableId = "2";
                break;
            case 'taixiu5m60g1':
                $temp_url = "/TaixiuMDOpenPrizeRecord";
                $tableId = "3";
                break;
            case 'taixiu5m60g2':
                $temp_url = "/TaixiuMDOpenPrizeRecord";
                $tableId = "4";
                break;
            case 'taixiu5m60g3':
                $temp_url = "/TaixiuMDOpenPrizeRecord";
                $tableId = "5";
                break;
            case 'taixiu5m60g4':
                $temp_url = "/TaixiuMDOpenPrizeRecord";
                $tableId = "6";
                break;
            case 'taixiu3m':
                $temp_url = "/Taixiu3MinOpenPrizeRecord";
                $tableId = "LUCK8";
                break;
            default:
                return false;
        }
        $params = [
            'tableId' => $tableId,
            'current' => $current,
            'size' => $size,
            'startTime' => $startTime,
            'endTime' => $endTime
        ];
//        print_r($code . "\n");
//        print_r($cycle . "\n");
        $code_key = str_replace('-', '_', $code);
        $last_key = GovietApi::LOTTERY_LAST_NUMBER . $code_key;
        $last_number = Cache::get($last_key, '');
        $forecast1_result = '';
        $forecast2_result = '';
        $forecast3_result = '';
        /**
         * 时间周期
         */
        $cycle_second = Util::getCycleTime($cycle);
        $data_json = $http->httpGet(self::$url . $temp_url, $params);
        $data = json_decode($data_json, true);
        if (!isset($data['code'])) {
            return false;
        }
        if ($data['code'] == 200) {
            $data_list = $data['data']['records'];
            // {
            //                "id": "6953cc4edfcabe7eb480ab59",
            //                "gameType": "dx",
            //                "tableId": "1",
            //                "issue": "2512301198",
            //                "openNum": "3,2,4",
            //                "createAt": "2025-12-30 19:57:50"
            //            },
            $list = $data['data']['records'];
            $last = array_last($list);
            $first = array_first($list);
            $time = time();
            // 处理时间
            $last_official_time = isset($last['createAt']) ? $last['createAt'] : '';
            if (empty($last_official_time)) {
                $first_time = $time;
            } else {
                $first_time = strtotime($last_official_time) + ((count($list) - 1) * $cycle_second);
            }
            if ($first['issue'] == $last_number) {
                $temp_num = Cache::get(GovietApi::LOTTERY_ERROR_NUM, 0);
                Cache::set(GovietApi::LOTTERY_ERROR_NUM, $temp_num + 1);
                //如果数据没有更新 设置重试状态 3秒之后
                Cache::set(GovietApi::LOTTERY_NEXT_RETRY . $code_key, time() + 2, $cycle_second - 1);
                return false;
            } else {
                $number = $first['issue'];
                if (str_starts_with($code, 'taixiu5m')) {
                    $temp_open = json_decode($first['openNum'], true);
                    $open_numbers = $first['openNum'];
                    $lottery_results = $temp_open['openNum'];
                } else {
                    $open_numbers = $first['openNum'];
                    $lottery_results = $first['openNum'];
                }
                $official_time = isset($first['createAt']) ? $first['createAt'] : '';

                if (empty($number) || empty($open_numbers)) {
                    return false;
                }
                if (empty($official_time)) {
                    $lottery_time = $first_time;
                } else {
                    $lottery_time = strtotime($official_time);
                }
                $forecast1_result = Util::getForecastResult($code);
                $forecast2_result = Util::getForecastResult($code);
                $forecast3_result = Util::getForecastResult($code);
                $out_data = [
                    'code' => $code,
                    'number' => $first['issue'],
                    'lottery_number' => Util::getLotteryNumber($first['issue'], $code),
                    'lottery_results' => $lottery_results,
                    'lottery_data' => $open_numbers,
                    'forecast1_result' => $forecast1_result,
                    'forecast2_result' => $forecast2_result,
                    'forecast3_result' => $forecast3_result,
                    'forecast1_num_result' => '',
                    'forecast2_num_result' => '',
                    'forecast3_num_result' => '',
                    'lottery_time' => intval($lottery_time),
                    'lottery_cycle' => intval($cycle_second),
                    'max_num' => $max_num,
                    'is_hot' => $is_hot,
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s", intval($lottery_time))
                ];
                // 更新缓存
                LotteryServices::setLastCacheData($out_data);
            }
            foreach ($data_list as $key => $item) {
                $number = $item['issue'];
                if (str_starts_with($code, 'taixiu5m')) {
                    $temp_open = json_decode($item['openNum'], true);
                    $open_numbers = $item['openNum'];
                    $lottery_results = $temp_open['openNum'];
                } else {
                    $open_numbers = $item['openNum'];
                    $lottery_results = $item['openNum'];
                }
                // 处理结果格式
                $lottery_time = strtotime($item['createAt']);
                if ($key != 0) {
                    $forecast1_result = '';
                    $forecast2_result = '';
                    $forecast3_result = '';
                }
                $out_data = [
                    'code' => $code,
                    'number' => $number,
                    'lottery_number' => Util::getLotteryNumber($number, $code),
                    'lottery_results' => $lottery_results,
                    'forecast1_result' => $forecast1_result,
                    'forecast2_result' => $forecast2_result,
                    'forecast3_result' => $forecast3_result,
                    'forecast1_num_result' => '',
                    'forecast2_num_result' => '',
                    'forecast3_num_result' => '',
                    'lottery_data' => $open_numbers,
                    'lottery_time' => intval($lottery_time),
                    'lottery_cycle' => intval($cycle_second),
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s", intval($lottery_time))
                ];
                self::inRecords($out_data);
            }
            return true;
        }
        return false;
    }


    public static function getlotteryLastResult($code, $cycle, $max_num, $is_hot = false)
    {
        try {
            $cycle_second = Util::getCycleTime($cycle);
            $startTime = date("Y-m-d H:i:s", time() - ($cycle_second * 25));
            $endTime = date("Y-m-d H:i:s", time() + 3);
            return self::getLotteryResult($code, $cycle, $max_num, $startTime, $endTime, 1, 20, $is_hot);
        } catch (\Exception $e) {
            return [];
        }
    }


    /**
     * 插入记录
     * @param $data
     * @return bool
     */
    public static function inRecords($data)
    {
        $key = 'number_has_' . $data['code'] . $data['number'];
        $temp = Cache::get($key);
        if ($temp) {
            return false;
        }
        $map = [
            'code' => $data['code'],
            'number' => $data['number']
        ];
        $temp_id = LotteryRecordsModel::where($map)->value('id');
        if (!empty($temp_id)) {
            return false;
        }
        if (empty($data['forecast1_result'])) {
            $data['forecast1_result'] = Util::getForecastResult($data['code']);
        }
        if (empty($data['forecast2_result'])) {
            $data['forecast2_result'] = Util::getForecastResult($data['code']);
        }
        if (empty($data['forecast3_result'])) {
            $data['forecast3_result'] = Util::getForecastResult($data['code']);
        }
        LotteryRecordsModel::insert($data);
        Cache::set($key, 1, 3600);
        return true;
    }

}