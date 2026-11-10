<?php

namespace app\common;

class Util
{
    /**
     * 获取秒数
     * @param $cycle
     * @return float|int
     */
    public static function getCycleTime($cycle)
    {
        $unit = strtolower(substr($cycle, -1)); // 获取最后一个字符（单位）
        $value = (int)substr($cycle, 0, -1);    // 获取数值部分
        switch ($unit) {
            case 's': // 秒
                return $value;
            case 'm': // 分钟
                return $value * 60;
            case 'h': // 小时
                return $value * 60 * 60;
            default:
                // 如果没有单位，假设是秒
                return (int)$cycle;
        }
    }

    /**
     * 获取编号
     * @param $number
     * @param string $code
     * @return false|string
     */
    public static function getLotteryNumber($number, $code = 'taixiu3m')
    {
        $number = $number . "";
        if (in_array($code, ['taixiu3m', 'pmb5p', 'pmb3p'])) {
            $len = 3;
        } else {
            $len = 4;
        }
        return substr($number, $len * -1);
    }

    /**
     * 获取预测结果
     * @param $code
     * @return string
     */
    public static function getForecastResult($code)
    {
        $arr = ['大', '小', '单', '双'];
        return $arr[rand(0, 3)];
    }

    /**
     * 获取预测结果
     * @param $code
     * @param int $num
     * @return string
     */
    public static function getForecastNumResult($code, $num = 8)
    {
        //获取 8未开奖号码  号码是0-99
        $arr = [];
        $temp_arr = [];
        for ($i = 0; $i < 100; $i++) {
            $temp_arr[] = str_pad($i, 2, '0', STR_PAD_LEFT);
        }
        //随机取8个
        shuffle($temp_arr);
        for ($i = 0; $i < $num; $i++) {
            //变成字符串  并且填充两位 号码不重复
            $arr[] = $temp_arr[$i];
        }
//        变成字符串
        return implode(',', $arr);
    }
}
