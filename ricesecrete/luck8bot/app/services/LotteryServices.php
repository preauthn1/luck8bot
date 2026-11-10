<?php


namespace app\services;


use app\common\game\GovietApi;
use app\common\model\LotteryAnalyzeModel;
use app\common\model\LotteryCodeModel;
use app\common\model\LotteryCountModel;
use app\common\model\LotteryRecordsModel;
use app\common\Util;
use support\Cache;

class LotteryServices
{
    //彩票代码缓存
    const LOTTERY_CODE_LIST_KEY = 'lottery_code_list_key';

    //最后数据
    const LOTTERY_LAST_KEY = 'lottery_last_key';

    /**
     * 获取全部彩票数据
     * @param bool $is_cache
     * @return array
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public static function lotteryAllCode($is_cache = true)
    {
        $key = self::LOTTERY_CODE_LIST_KEY;
        $lottery_list = [];
        $cache = Cache::store('redis');
        $codes = [
            'taixiu', 'taixiu3m', 'taixiu5m',
            'pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p',
            'mn45g', 'mn90g', 'mn1p', 'mn2p', 'mn5p',
            'keno20g', 'keno30g', 'keno40g', 'keno50g', 'keno1p', 'keno5p',
            'sicbo20g', 'sicbo30g', 'sicbo40g', 'sicbo50g', 'sicbo1p', 'sicbo90g'
        ];
        if ($is_cache == false) {
            $lottery_list_temp = LotteryCodeModel::orderBy('id', 'asc')->get()->toArray();
            foreach ($lottery_list_temp as $value) {
                $code_key = str_replace('-', '_', $value['code']);
                $cache->set($key . $code_key, json_encode($value), 3600);
            }
            return $lottery_list_temp;
        }
        foreach ($codes as $code) {
            $code_key = str_replace('-', '_', $code);
            $temp = $cache->get($key . $code_key);
            if ($temp) {
                $lottery_list[] = json_decode($temp, true);
            } else {
                $temp = LotteryCodeModel::where('code', $code)->first();
                if (!empty($temp)) {
                    $temp = $temp->toArray();
                    $lottery_list[] = $temp;
                    $cache->set($key . $code, json_encode($temp), 3600);
                }
            }
        }
        return $lottery_list;
    }

    /**
     * 获取代码
     * @param $codes
     * @param bool $is_cache
     * @return array
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public static function getLotteryCode($codes, $is_cache = false)
    {
//        $key = self::LOTTERY_CODE_LIST_KEY;
        $lottery_list = [];
        $cache = Cache::store('redis');
        if ($is_cache == false) {
            $lottery_list_temp = LotteryCodeModel::whereIn('code', $codes)->orderBy('id', 'asc')->get()->toArray();
            $lottery_list = [];
            foreach ($lottery_list_temp as $value) {
//                $temp_key = $key . str_replace('-', '_', $value['code']);
                $cycle_second = Util::getCycleTime($value['cycle']);
                $sub_time = ((time() - 2) - $value['last_time']);
//                $code_key = str_replace('-', '_', $value['code']);
//                $time = time();
//                $retry_time = Cache::get(GovietApi::LOTTERY_NEXT_RETRY . $code_key, $time + 1);
                if (str_starts_with($value['code'], 'taixiu5m')) {
                    if (($sub_time - 60) > $cycle_second + 2) {
                        $lottery_list[] = $value;
                    }
                } else {
                    if ($sub_time > $cycle_second + 2) {
                        $lottery_list[] = $value;
//                    print_r(time() . "\n");
//                    print_r($value['last_time'] . "\n");
//                    print_r($cycle_second . "\n");
//                    print_r($value['code'] . "\n");
                    }
                }
//                $cache->set($temp_key, json_encode($value), 3600);
            }
            return $lottery_list;
        }
//        foreach ($codes as $code) {
//            $temp_key = $key . str_replace('-', '_', $code);
//            $temp = $cache->get($temp_key);
//            if ($temp) {
//                $temp_data = json_decode($temp, true);
//                $cycle_second = Util::getCycleTime($temp_data['cycle']);
//                $sub_time = (time() - $temp_data['last_time']);
//                $code_key = str_replace('-', '_', $temp_data['code']);
//                $time = time();
//                $retry_time = Cache::get(GovietApi::LOTTERY_NEXT_RETRY . $code_key, $time + 1);
//                if ($temp_data['code'] == 'taixiu5m') {
//                    if (($sub_time - 60) > ($cycle_second + 1) && $time < $retry_time) {
//                        $lottery_list[] = $temp_data;
//                    }
//                } else {
//                    if ($sub_time > ($cycle_second + 1) && $time < $retry_time) {
//                        $lottery_list[] = $temp_data;
////                    print_r(time() . "\n");
////                    print_r($value['last_time'] . "\n");
////                    print_r($cycle_second . "\n");
////                    print_r($value['code'] . "\n");
//                    }
//                }
//            } else {
//                $temp = LotteryCodeModel::where('code', $code)->first();
//                if (!empty($temp)) {
//                    $temp = $temp->toArray();
//                    $cycle_second = Util::getCycleTime($temp['cycle']);
//                    $sub_time = (time() - $temp['last_time']);
//                    $code_key = str_replace('-', '_', $temp['code']);
//                    $time = time();
//                    $retry_time = Cache::get(GovietApi::LOTTERY_NEXT_RETRY . $code_key, $time + 1);
//                    if ($temp['code'] == 'taixiu5m') {
//                        if (($sub_time - 60) > ($cycle_second + 1) && $time < $retry_time) {
//                            $lottery_list[] = $temp;
//                        }
//                    } else {
//                        if ($sub_time > ($cycle_second + 1) && $time < $retry_time) {
//                            $lottery_list[] = $temp;
////                    print_r(time() . "\n");
////                    print_r($value['last_time'] . "\n");
////                    print_r($cycle_second . "\n");
////                    print_r($value['code'] . "\n");
//                        }
//                    }
//                    $cache->set($temp_key, json_encode($temp), 3600);
//                }
//            }
//        }
        return $lottery_list;
    }

    /**
     * 设置最后记录缓存数据
     * @param $data
     * @param $is_update
     */
    public static function setLastCacheData($data, $is_update = true)
    {
        if (isset($data['code'])) {
            $code_key = str_replace('-', '_', $data['code']);
            $last_key = self::LOTTERY_LAST_KEY . $code_key;
            Cache::get("is_update_time_key" . $code_key, time());
            Cache::set($last_key, json_encode($data));
            if ($is_update) {
                $up_data = [
                    'code' => $data['code'],
                    'number' => $data['number'],
                    'lottery_number' => $data['lottery_number'],
                    'last_results' => $data['lottery_results'],
                    'last_data' => $data['lottery_data'],
                    'forecast1_result' => $data['forecast1_result'],
                    'forecast2_result' => $data['forecast2_result'],
                    'forecast3_result' => $data['forecast3_result'],
                    'forecast1_num_result' => $data['forecast1_num_result'],
                    'forecast2_num_result' => $data['forecast2_num_result'],
                    'forecast3_num_result' => $data['forecast3_num_result'],
                    'last_time' => intval($data['lottery_time']),
                    'updated_at' => date("Y-m-d H:i:s", intval($data['lottery_time']))
                ];
//                print_r($up_data);
                $num_last_key = GovietApi::LOTTERY_LAST_NUMBER . $code_key;
                Cache::set($num_last_key, $data['number'], 3600);
                LotteryCodeModel::where('code', $data['code'])->update($up_data);
            }
        }
    }

    /**
     * 获取最后更新的数据
     * @param $code
     * @return array|mixed
     */
    public static function getLastCacheData($code)
    {
        $code_key = str_replace('-', '_', $code);
        $last_key = self::LOTTERY_LAST_KEY . $code_key;
        $temp = Cache::get($last_key, '');
        $out_data = [];
        if (empty($temp)) {
            $last_temp = LotteryCodeModel::where('code', $code)->first();
            if (!empty($last_temp)) {
                $last_temp = $last_temp->toArray();
                $cycle_second = Util::getCycleTime($last_temp['cycle']);
                $out_data = [
                    'code' => $code,
                    'number' => $last_temp['number'],
                    'lottery_number' => $last_temp['lottery_number'],
                    'lottery_results' => $last_temp['last_results'],
                    'forecast1_result' => $last_temp['forecast1_result'],
                    'forecast2_result' => $last_temp['forecast2_result'],
                    'forecast3_result' => $last_temp['forecast3_result'],
                    'lottery_data' => $last_temp['last_data'],
                    'lottery_time' => $last_temp['last_time'],
                    'max_num' => $last_temp['max_num'],
                    'is_hot' => $last_temp['is_hot'],
                    'lottery_cycle' => intval($cycle_second),
                    'updated_at' => date("Y-m-d H:i:s", $last_temp['last_time'])
                ];
                self::setLastCacheData($out_data, false);
                Cache::store('file')->delete("get_list_cache_key" . $code_key);
            }
        } else {
            $out_data = json_decode($temp, true);
        }
        return $out_data;
    }

    /**
     * 获取列表数据
     * @param $code
     * @param $limit
     * @return array
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public static function getLotteryList($code, $limit = 30)
    {
        if (empty($code)) {
            return [
                'code' => 0,
                'data' => []
            ];
        }
        $code_key = str_replace('-', '_', $code);
        $time = time();
        $temp_time = Cache::get("is_update_time_key" . $code_key, $time);
        if ($time > $temp_time) {
            $temp = Cache::store('file')->get("get_list_cache_key" . $code_key . $limit);
            if (!empty($temp)) {
                $data = json_decode($temp, true);
                if (empty($data)) {
                    $data = [];
                }
                return [
                    'code' => 0,
                    'data' => $data
                ];
            }
        }
        $list = LotteryRecordsModel::where('code', $code)->orderBy('number', 'desc')->limit($limit)->get()->toArray();
        Cache::store('file')->set("get_list_cache_key" . $code_key . $limit, json_encode($list), 300);
        return [
            'code' => 0,
            'data' => $list
        ];
    }

    /**
     * 获取统计数据
     * @param $code
     * @param $type
     * @param $ladder
     * @param int $limit
     * @return array
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public static function getLotteryStatistics($code, $type, $ladder, $limit = 100)
    {
        if (empty($code)) {
            return [
                'code' => 0,
                'data' => []
            ];
        }
        $code_key = str_replace('-', '_', $code);
        $temp = Cache::store('file')->get("get_list_statistics_key" . $code_key . $type . $ladder . $limit);
        if (!empty($temp)) {
            $data = json_decode($temp, true);
            if (empty($data)) {
                $data = [];
            }
            return [
                'code' => 0,
                'data' => $data
            ];
        }
        $map = [
            'code' => $code,
            'type' => $type,
            'ladder' => $ladder,
            'num' => $limit
        ];
        $list = LotteryCountModel::where($map)->where('number_count', '<=', $limit)->orderBy('number_count', 'desc')->limit(100)->get()->toArray();
        Cache::store('file')->set("get_list_statistics_key" . $code_key . $type . $ladder . $limit, json_encode($list), 300);
        return [
            'code' => 0,
            'data' => $list
        ];
    }

    /**
     * 获取分析数据
     * @param $code
     * @param int $limit
     * @return array
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \RedisException
     * @throws \Symfony\Component\Cache\Exception\CacheException
     * @throws \Throwable
     */
    public static function getLotteryAnalyze($code, $limit = 100)
    {
        if (empty($code)) {
            return [
                'code' => 0,
                'data' => []
            ];
        }
        $code_key = str_replace('-', '_', $code);
        $temp = Cache::store('file')->get("get_list_analyze_key" . $code_key . $limit);
        if (!empty($temp)) {
            $data = json_decode($temp, true);
            if (empty($data)) {
                $data = [];
            }
            return [
                'code' => 0,
                'data' => $data
            ];
        }
        $map = [
            'code' => $code,
            'num' => $limit
        ];
        $list = LotteryAnalyzeModel::where($map)->where('number_count', '<=', $limit)->orderBy('number_count', 'desc')->limit(100)->get()->toArray();

        $list_temp = [];
        foreach ($list as $item) {
            if (isset($list_temp[$item['type']])) {
                $list_temp[$item['type']][] = $item;
            } else {
                $list_temp[$item['type']] = [$item];
            }
        }
        Cache::store('file')->set("get_list_statistics_key" . $code_key . $limit, json_encode($list_temp), 300);
        return [
            'code' => 0,
            'data' => $list_temp
        ];
    }


    /**
     * 清除数据 每种数据只保留3000条
     * @param int $number
     */
    public static function clearData($number = 3000)
    {
        //每个开奖结果最多保留2000条有效数据
        $codes = [
            'taixiu', 'taixiu60g', 'taixiu45g1', 'taixiu45g2', 'taixiu30g1', 'taixiu30g2',
            'taixiu3m',
            'taixiu5m', 'taixiu5m60g', 'taixiu5m60g1', 'taixiu5m60g2', 'taixiu5m60g3', 'taixiu5m60g4',
            'pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p',
            'mn45g', 'mn90g', 'mn1p', 'mn2p', 'mn5p',
            'keno20g', 'keno30g', 'keno40g', 'keno50g', 'keno1p', 'keno5p',
            'sicbo20g', 'sicbo30g', 'sicbo40g', 'sicbo50g', 'sicbo1p', 'sicbo90g'
        ];
        foreach ($codes as $code) {
            $id = LotteryRecordsModel::where('code', $code)->orderBy('id', 'DESC')
                ->offset($number)  // 注意：offset是从0开始计数的，所以第2000条是offset(1999)
                ->limit(1)
                ->value('id');
            if (!empty($id)) {
                LotteryRecordsModel::where('code', $code)->where('id', '<', $id)->delete();
            }
            self::calibrationTime($code);
        }
    }

    /**
     * 校准开奖时间
     * @param $code
     */
    public static function calibrationTime($code)
    {
        $key = 'calibration_time_key' . $code;
        $code_data = LotteryServices::getLastCacheData($code);
        $last_id = Cache::get($key, 0);
        $list = LotteryRecordsModel::where('code', $code)->where('id', '>', $last_id)->orderBy('id', 'ASC')->limit(500)->get()->toArray();
        $cycle_second = $code_data['lottery_cycle'];
        $last_time = 0;
        $last_id = 0;
        foreach ($list as $value) {
            if (!empty($last_time)) {
                if (strtotime($value['updated_at']) - $last_time != $cycle_second) {
                    $last_4_date = LotteryRecordsModel::where('code', $code)->where('number', '<', $value['number'])->orderBy('number', 'DESC')->offset(3)->limit(1)->value('updated_at');
                    if (empty($last_4_date)) {
                        continue;
                    }
                    $last_4_time = strtotime($last_4_date);
                    if (($last_4_time + (3 * $cycle_second)) != $last_time) {
                        //表示上一次时间不对
                        LotteryRecordsModel::where('id', $last_id)->update([
                            'updated_at' => date("Y-m-d H:i:s", ($last_4_time + (3 * $cycle_second)))
                        ]);
                    }
                    if (($last_4_time + (4 * $cycle_second)) != strtotime($value['updated_at'])) {
                        //本次时间不对
                        LotteryRecordsModel::where('id', $last_id)->update([
                            'updated_at' => date("Y-m-d H:i:s", ($last_4_time + (4 * $cycle_second)))
                        ]);
                    }
                }
            }
            $last_time = strtotime($value['updated_at']);
            $last_id = $value['id'];
        }
        Cache::set($key, $last_id - 10);
    }

    /**
     * 更新统计
     * @param string $path
     */
    public static function numberCount($path = 'json/')
    {
        $paths = scandir($path);
        foreach ($paths as $file) {
            if ($file == '.' || $file == '..') {
                continue;
            }
            $temp_arr = explode('_', $file);
            if (isset($temp_arr[0])) {
                $code = $temp_arr[0];
                $ladder = $temp_arr[1];
                $type = $temp_arr[2];
                $num = str_replace('.txt', '', $temp_arr[3]);
                $file_str = file_get_contents($path . "/" . $file);
                $file_str = str_replace('lần ', 'lần', $file_str);
                $file_str = str_replace('lần', '|', $file_str);
                $file_str = str_replace(' |', '|', $file_str);
                $file_str = str_replace("\t", '', $file_str);
                $file_str = str_replace("\r", '', $file_str);
                $file_str = str_replace("\n", '', $file_str);
                $file_arr = explode('|', $file_str);
                foreach ($file_arr as $value) {
                    $num_arr = explode(' ', $value);
                    if (isset($num_arr[1]) && (!empty($num_arr[0]))) {
                        $number = $num_arr[0];
                        $count = $num_arr[1];
                        self::setNumberCount($code, $type, $number, $ladder, $num, $count);
                        print_r($code . "_" . $type . "_" . $ladder . "_" . $number . "_" . $num . "_" . $count . "\n");
                    }
                }
            }
        }
    }

    /**
     * 更新统计分析
     * @param string $path
     */
    public static function numberAnalyze($path = 'json1/')
    {
        $paths = scandir($path);
        foreach ($paths as $file) {
            if ($file == '.' || $file == '..') {
                continue;
            }
            $temp_arr = explode('_', $file);
            if (isset($temp_arr[0])) {
                $code = $temp_arr[0];
                $num = $temp_arr[1];
                $type = str_replace('.txt', '', $temp_arr[2]);
                $file_str = file_get_contents($path . "/" . $file);
                $file_str = str_replace('lần ', 'lần', $file_str);
                $file_str = str_replace('lần', '|', $file_str);
                $file_str = str_replace(' |', '|', $file_str);
                $file_str = str_replace("\t", '', $file_str);
                $file_str = str_replace("\r", '', $file_str);
                $file_str = str_replace("\n", '', $file_str);
                print_r($file_str);
                $file_arr = explode('|', $file_str);
                foreach ($file_arr as $value) {
                    $num_arr = explode(' ', $value);
                    if (isset($num_arr[1]) && (!empty($num_arr[0]))) {
                        $number = $num_arr[0];
                        $count = $num_arr[1];
                        self::setNumberAnalyze($code, $type, $number, $num, $count);
                        print_r($code . "_" . $type . "_" . $number . "_" . $num . "_" . $count . "\n");
                    }
                }
            }
        }
    }

    /**
     * 更新统计数据
     * @param $code
     * @param $type
     * @param $number
     * @param $ladder
     * @param $num
     * @param $count
     * @return bool
     */
    public static function setNumberCount($code, $type, $number, $ladder, $num, $count = 0)
    {
        if (empty($number) || empty($code) || empty($type) || empty($ladder) || empty($num)) {
            return true;
        }
        $map = [
            'code' => $code,
            'type' => $type,
            'number' => $number,
            'ladder' => $ladder,
            'num' => $num
        ];
        $id = LotteryCountModel::where($map)->value('id');
        if (empty($id)) {
            $in_data = [
                'code' => $code,
                'type' => $type,
                'number' => $number,
                'ladder' => $ladder,
                'num' => $num,
                'number_count' => $count,
                'updated_at' => date("Y-m-d H:i:s")
            ];
            LotteryCountModel::insert($in_data);
        }
        return true;
    }

    public static function setNumberAnalyze($code, $type, $number, $num, $count = 0)
    {
        if (empty($number) || empty($code) || empty($type) || empty($num)) {
            return true;
        }
        $map = [
            'code' => $code,
            'type' => $type,
            'number' => $number,
            'num' => $num
        ];
        $id = LotteryAnalyzeModel::where($map)->value('id');
        if (empty($id)) {
            $in_data = [
                'code' => $code,
                'type' => $type,
                'number' => $number,
                'num' => $num,
                'number_count' => $count,
                'updated_at' => date("Y-m-d H:i:s")
            ];
            LotteryAnalyzeModel::insert($in_data);
        }
        return true;
    }

    /**
     * 更新统计
     * @param $code
     * @param $number
     */
    public static function upNumberCount($code, $number)
    {
//        if (strlen($number . "") > 5) {
//            $number
//        } else {
//            $temp_num1 = substr($number, 0, 4);
//            $temp_num2 = substr($number, 1, 4);
//        }
        $map = [
            'code' => $code
        ];
        $ids1 = LotteryCountModel::where($map)->where('number', 'like', $number)->pluck('id');
        if (!empty($ids1)) {
            LotteryCountModel::whereIn('id', $ids1)->increment('number_count');
        }
        $temp_num = intval(substr($number, 0, 2));
        $ids2 = LotteryAnalyzeModel::where($map)->where('number', 'like', "%" . $temp_num)->pluck('id');
        if (!empty($ids2)) {
            LotteryAnalyzeModel::whereIn('id', $ids2)->increment('number_count');
        }
    }
}