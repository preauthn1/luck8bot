import type { HomeDataResponse, UpdateDataResponse, LotteryListResponse } from '@/services/lotteryService'

/**
 * 首页数据接口
 */
export function home_data(params?: any): Promise<HomeDataResponse>

/**
 * 更新首页单个数据
 */
export function update_data(params: { code: string }): Promise<UpdateDataResponse>

/**
 * 获取彩票列表
 */
export function lottery_list(params: { code: string; limit?: number; type?:number;ladder?:number }): Promise<LotteryListResponse>

/**
 * 获取游戏开奖历史（与 lottery_list 返回相同数据结构）
 */
export function lottery_history(params: { code: string; limit?: number ;type?:number;ladder?:number }): Promise<LotteryListResponse>
