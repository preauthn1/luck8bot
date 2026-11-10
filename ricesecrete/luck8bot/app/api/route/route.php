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

use Webman\Route;

Route::group('/lottery/v1', function () {
    //获取全部开奖记录
    Route::any('/lottery_results_all', [app\api\controller\v1\IndexController::class, 'lottery_results_all']);
    //获取开奖记录
    Route::any('/lottery_results', [app\api\controller\v1\IndexController::class, 'lottery_results']);
    //获取开奖记录
    Route::any('/lottery_list', [app\api\controller\v1\IndexController::class, 'lottery_list']);
    //统计数据
    Route::any('/lottery_statistics', [app\api\controller\v1\IndexController::class, 'lottery_statistics']);
    //统计分析
    Route::any('/lottery_analyze', [app\api\controller\v1\IndexController::class, 'lottery_analyze']);
});
