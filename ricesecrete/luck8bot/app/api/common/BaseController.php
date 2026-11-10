<?php


namespace app\api\common;


use app\common\ExceptionCode;

class BaseController
{
    /**
     * 返回格式化数据
     * @param string $code
     * @param array $data
     * @param string $msg
     */
    public static function returnMsg($code = 0, $data = [], $msg = '')
    {
        if (is_array($code)) {
            $obj = $code;
            $code = isset($obj['code']) ? $obj['code'] : 500;
            $data = isset($obj['data']) ? $obj['data'] : [];
            $msg = isset($obj['msg']) ? $obj['msg'] : '';
        }
        $return_data = [
            'code' => '500',
            'msg' => 'undefined message',
            'data' => $code == 0 ? $data : [],
            'timestamp' => time() - 6
        ];

        if (isset($code)) {
            $return_data['code'] = $code;
            if (!empty($msg)) {
                $return_data['msg'] = $msg;
            } else if (isset(ExceptionCode::$code[$code])) {
                $return_data['msg'] = ExceptionCode::$code[$code];
            }
            if (empty($data)) {
                unset($return_data['data']);
            }
        }
        return json($return_data);
    }
}