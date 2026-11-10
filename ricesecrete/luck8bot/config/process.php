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

use app\process\Http;
use support\Log;
use support\Request;

global $argv;

return [
    'webman' => [
        // http 监听
        'enable' => env('SERVER_MODEL', 'API') == 'API',
        'handler' => Http::class,
        'listen' => 'http://0.0.0.0:' . env('HTTP_PORT', 8787),
        'count' => cpu_count() * 4,
        'member' => '',
        'group' => '',
        'reusePort' => false,
        'context' => [],
        'constructor' => [
            'requestClass' => Request::class,
            'logger' => Log::channel('default'),
            'appPath' => app_path(),
            'publicPath' => public_path()
        ]
    ],
    // File update detection and automatic reload
    'monitor' => [
        'enable' => env('SERVER_MODEL', 'API') == 'API',
        'handler' => app\process\Monitor::class,
        'reloadable' => false,
        'constructor' => [
            // Monitor these directories
            'monitorDir' => array_merge([
                app_path(),
                config_path(),
                base_path() . '/process',
                base_path() . '/support',
                base_path() . '/resource',
                base_path() . '/.env',
            ], glob(base_path() . '/plugin/*/app'), glob(base_path() . '/plugin/*/config'), glob(base_path() . '/plugin/*/api')),
            // Files with these suffixes will be monitored
            'monitorExtensions' => [
                'php', 'html', 'htm', 'env'
            ],
            'options' => [
                'enable_file_monitor' => !in_array('-d', $argv) && DIRECTORY_SEPARATOR === '/',
                'enable_memory_monitor' => DIRECTORY_SEPARATOR === '/',
            ]
        ]
    ],
    //分钟定时任务
    'minute_tasks' => [
        'enable' => env('SERVER_MODEL', 'API') == 'API',
        'handler' => app\process\MinuteTasks::class,
    ],
    //秒定时任务
    'second_tasks' => [
        'enable' => true,
        'handler' => app\process\SecondTasks::class,
    ],
    //luck 拉取任务
    'luck_tasks' => [
        'enable' => env('SERVER_MODEL', 'API') == 'DATA',
        'handler' => app\process\LuckTasks::class,
    ],
    //北区任务
    'pmb_tasks' => [
        'enable' => env('SERVER_MODEL', 'API') == 'DATA',
        'handler' => app\process\PmbTasks::class,
    ],
    //南区任务
    'mn_tasks' => [
        'enable' => env('SERVER_MODEL', 'API') == 'DATA',
        'handler' => app\process\MnTasks::class,
    ],
    //keno任务
    'keno_tasks' => [
        'enable' => env('SERVER_MODEL', 'API') == 'DATA',
        'handler' => app\process\KenoTasks::class,
    ],
    //sicbo 任务
    'sicbo_tasks' => [
        'enable' => env('SERVER_MODEL', 'API') == 'DATA',
        'handler' => app\process\SicboTasks::class,
    ],
];
