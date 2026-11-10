<?php
/**
 * This file is part of webman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link      http://www.workerman.net/
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */

return [
    'event_loop' => \Workerman\Events\Swoole::class,
    // Swoole 相关配置
    'swoole' => [
        'worker_num' => swoole_cpu_num(),
        'enable_coroutine' => true, // 启用协程
        'max_coroutine' => 300000,
        'hook_flags' => SWOOLE_HOOK_ALL, // 钩住所有阻塞函数
        'task_enable_coroutine' => true,
        'reload_async' => true,
    ],
    'stop_timeout' => 2,
    'pid_file' => runtime_path() . '/webman.pid',
    'status_file' => runtime_path() . '/webman.status',
    'stdout_file' => runtime_path() . '/logs/stdout.log',
    'log_file' => runtime_path() . '/logs/workerman.log',
    'max_package_size' => 30 * 1024 * 1024,
    'enable_coroutine' => true,  // 开启协程
    'hook_flags' => SWOOLE_HOOK_ALL,  // 协程 HOOK 所有支持的类型
];
