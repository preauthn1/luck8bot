<?php

namespace app\common;


class ExceptionCode
{
    //成功
    const SUCCESS = 0;
    //错误
    const ERROR = 1;
    //系统错误
    const SYS_ERROR = 500;

    //用户参数有误
    const USER_PARAM_ERROR = 1000;
    //用户不存在
    const USER_NOT_EXIST = 1001;
    //无权操作
    const USER_NO_PERMISSION = 1002;
    //两次密码不一致
    const USER_PASSWORD_ERROR = 1003;
    //用户验证码错误
    const USER_VERIFY_CODE_ERROR = 1004;
    //密码格式错误
    const USER_PASSWORD_FORMAT_ERROR = 1005;
    //支付密码格式错误
    const USER_PAY_PASSWORD_FORMAT_ERROR = 1006;
    //参数有误
    const USER_PARAM_ERROR_FORMAT = 1007;

    //文件错误
    const S3_FILE_ERROR = 3001;

    //token错误
    const TOKEN_ERROR = 4001;

    static public $code = [
        self::SUCCESS => 'Operation successful',
        self::ERROR => 'Operation failed',
        self::SYS_ERROR => 'System error',
        self::USER_PARAM_ERROR => 'User parameter error',
        self::USER_NOT_EXIST => 'User does not exist',
        self::USER_NO_PERMISSION => 'No permission',
        self::USER_PASSWORD_ERROR => 'Two passwords are inconsistent',
        self::USER_VERIFY_CODE_ERROR => 'Verification code error',
        self::S3_FILE_ERROR => 'File upload failed',
        self::TOKEN_ERROR => 'Token error',
        self::USER_PASSWORD_FORMAT_ERROR => 'Password format error',
        self::USER_PAY_PASSWORD_FORMAT_ERROR => 'Pay password format error',
        self::USER_PARAM_ERROR_FORMAT => 'Parameter error',
    ];
}