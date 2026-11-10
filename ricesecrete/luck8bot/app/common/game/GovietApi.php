<?php


namespace app\common\game;


use app\common\model\LotteryRecordsModel;
use app\common\SwooleRequest;
use app\common\Util;
use app\services\LotteryServices;
use support\Cache;
use Swoole\Exception;

class GovietApi
{

    /**
     * 最后一次
     */
    const LOTTERY_LAST_NUMBER = "lottery_last_number";
    /**
     * 重试状态
     */
    const LOTTERY_NEXT_RETRY = "lottery_next_retry";
    /**
     * 采集失败次数
     */
    const LOTTERY_ERROR_NUM = "lottery_error_num";


    public static $url = "https://luck8.govietapi.com/LotteryInfo/lotteryResult?lottery_code=";


    /**
     * 获取彩票结果
     * @param $code
     * @param $cycle
     * @param $max_num
     * @param $is_hot
     * @return bool
     * @throws \Exception
     */
    public static function getLotteryResult($code, $cycle, $max_num, $is_hot = false)
    {
//        print_r($code . "\n");
//        print_r($cycle . "\n");
        $code_key = str_replace('-', '_', $code);
        $last_key = self::LOTTERY_LAST_NUMBER . $code_key;
        $last_number = Cache::get($last_key, '');
        /**
         * 时间周期
         */
        $cycle_second = Util::getCycleTime($cycle);
        $cycle_second_rem = $cycle_second;
        // 发起HTTP请求
        $http = new SwooleRequest();
        try {
            $data_json = $http->httpGet(self::$url . $code);
        } catch (\Swoole\Exception $e) {
            return false;
        }
        if (empty($data_json)) {
            // 请求失败，设置重试时间
            return false;
        }
        $data = json_decode($data_json, true);
        if (!isset($data['code']) || $data['code'] != 1 || !isset($data['data']['list'])) {
            return false;
        }
        $list = $data['data']['list'];
        $last = array_last($list);
        $first = array_first($list);
        $forecast1_result = '';
        $forecast2_result = '';
        $forecast3_result = '';
        $forecast1_num_result = '';
        $forecast2_num_result = '';
        $forecast3_num_result = '';
        // 处理时间
        $last_official_time = isset($last['official_time']) ? $last['official_time'] : '';
        if (empty($last_official_time)) {
            $first_time = $data['time'] - ($data['time'] % $cycle_second_rem);
        } else {
            $first_time = strtotime($last_official_time) + ((count($list) - 1) * $cycle_second);
            $first_time = $first_time - ($first_time % $cycle_second);
        }
        if ($first['issue'] == $last_number) {
            $temp_num = Cache::get(self::LOTTERY_ERROR_NUM, 0);
            Cache::set(self::LOTTERY_ERROR_NUM, $temp_num + 1);
            //如果数据没有更新 设置重试状态 3秒之后
            Cache::set(self::LOTTERY_NEXT_RETRY . $code_key, time() + 2, $cycle_second - 1);
            return false;
        } else {
            $number = $first['issue'];
            $open_numbers = $first['open_numbers'];
            $official_time = isset($first['official_time']) ? $first['official_time'] : '';
            if (empty($number) || empty($open_numbers)) {
                return false;
            }
            if (empty($official_time)) {
                $lottery_time = $first_time;
            } else {
                $lottery_time = strtotime($official_time);
                if ($lottery_time < time() - 3600) {
                    //开奖时间异常 使用采集时间
                    $lottery_time = $first_time;
                }
            }
            // 处理结果格式
            $lottery_results = '';
            if (str_starts_with($code, 'keno') || str_starts_with($code, 'sicbo')) {
                $lottery_results = $open_numbers;
            } else {
                $temp_lottery_results = explode('|', $open_numbers);
                if (isset($temp_lottery_results[0])) {
                    $temp_results = $temp_lottery_results[0];
                    $digits = str_split((string)$temp_results);
                    $lottery_results = implode(',', $digits);
                }
            }
            if ($code == 'mien-bac') {
                $lottery_time = time();
                $first_time = $lottery_time;
            }
            $forecast1_result = Util::getForecastResult($code);
            $forecast2_result = Util::getForecastResult($code);
            $forecast3_result = Util::getForecastResult($code);
            //北区
            $b_code = ['pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p'];
            if (in_array($code, $b_code)) {
                $forecast1_num_result = Util::getForecastNumResult($code);
                $forecast2_num_result = Util::getForecastNumResult($code);
                $forecast3_num_result = Util::getForecastNumResult($code);
            }
            $out_data = [
                'code' => $code,
                'number' => $first['issue'],
                'lottery_number' => Util::getLotteryNumber($first['issue'], $code),
                'lottery_results' => $lottery_results,
                'forecast1_result' => $forecast1_result,
                'forecast2_result' => $forecast2_result,
                'forecast3_result' => $forecast3_result,
                'forecast1_num_result' => $forecast1_num_result,
                'forecast2_num_result' => $forecast2_num_result,
                'forecast3_num_result' => $forecast3_num_result,
                'lottery_data' => $open_numbers,
                'max_num' => $max_num,
                'is_hot' => $is_hot,
                'lottery_time' => intval($lottery_time),
                'lottery_cycle' => intval($cycle_second),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s", intval($lottery_time))
            ];
            // 更新缓存
            LotteryServices::setLastCacheData($out_data);
        }

        foreach ($list as $key => $value) {
            $number = $value['issue'];
            $open_numbers = $value['open_numbers'];
            $official_time = isset($value['official_time']) ? $value['official_time'] : '';
            if (empty($number) || empty($open_numbers)) {
                continue;
            }
            if (empty($official_time)) {
                $lottery_time = ($first_time) - ($key * $cycle_second);
            } else {
                $lottery_time = strtotime($official_time);
            }
            // 处理结果格式
            $lottery_results = '';
            if (str_starts_with($code, 'keno') || str_starts_with($code, 'sicbo')) {
                $lottery_results = $open_numbers;
            } else {
                $temp_lottery_results = explode('|', $open_numbers);
                if (isset($temp_lottery_results[0])) {
                    $temp_results = $temp_lottery_results[0];
                    $digits = str_split((string)$temp_results);
                    $lottery_results = implode(',', $digits);
                }
            }
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
                'forecast1_num_result' => $forecast1_num_result,
                'forecast2_num_result' => $forecast2_num_result,
                'forecast3_num_result' => $forecast3_num_result,
                'lottery_data' => $open_numbers,
                'lottery_time' => intval($lottery_time),
                'lottery_cycle' => intval($cycle_second),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s", intval($lottery_time))
            ];
            self::inRecords($out_data);
        }
//        if ($is_first_in) {
//            self::getLotteryResult($code, $cycle, false);
//        }
        return true;
    }

    /**
     * 获取彩票结果
     * @param $code
     * @param $cycle
     * @param $max_num
     * @param $is_hot
     * @return array|bool
     */
    public static function getlotteryLastResult($code, $cycle, $max_num,$is_hot)
    {
        try {
            return self::getLotteryResult($code, $cycle, $max_num,$is_hot);
        } catch (Exception $exception) {
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
        $b_code = ['pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p'];
        if (in_array($data['code'], $b_code)) {
            if (empty($data['forecast1_num_result'])) {
                $data['forecast1_num_result'] = Util::getForecastNumResult($data['code']);
            }
            if (empty($data['forecast2_num_result'])) {
                $data['forecast2_num_result'] = Util::getForecastNumResult($data['code']);
            }
            if (empty($data['forecast3_num_result'])) {
                $data['forecast3_num_result'] = Util::getForecastNumResult($data['code']);
            }
        }
        LotteryRecordsModel::insert($data);
        $codes = ['pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p',
            'mn45g', 'mn90g', 'mn1p', 'mn2p', 'mn5p'];
        if (in_array($data['code'], $codes)) {
            LotteryServices::upNumberCount($data['code'], str_replace(',', '', $data['lottery_results']));
        }
        Cache::set($key, 1, 3600);
        return true;
    }

}