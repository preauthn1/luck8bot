

// 游戏类型
// export type GameType = 'luckywin' | 'mienbac' | 'miennam' | 'keno' | 'sicbo'

// 游戏状态
export type GameStatus = 'waiting' | 'playing' | 'ended'

// 游戏信息
export interface GameInfo {
  type?: string // 游戏类型（可选）
  code: string // 游戏代码
  name?: string // 游戏名称（可选）
  icon?: string // 游戏图标（可选）
  description?: string // 游戏描述（可选）
  period?: string | number // 期号/期次（可选）
  status?: string // 状态（可选）
  countdown?: number // 倒计时（可选）
  hot?: boolean // 是否热门（可选）
  resultNumbers?: number[] // 结果数字（可选）
  created_at?: string // 创建时间（可选）
  forecast1_result?: string // 预测结果1（可选）
  forecast2_result?: string // 预测结果2（可选）
  forecast3_result?: string // 预测结果3（可选）
  lottery_cycle?: number // 开奖周期 秒（可选）
  lottery_data?: string // 开奖数据（可选）
  lottery_results?: string // 开奖结果（可选）
  lottery_time?: number // 开奖时间 秒（可选）
  lottery_number?: string // 开奖号码（可选）
  number?: string // 期号（可选）
  updated_at?: string // 更新时间（可选）
  number_count?: number // 期号数量上限（可选）
  max_num?: number // 最大号码（可选）
  current_num?: number // 当前已开奖期数（可选）
  sub?: number // 剩余期数（可选）
}

// 彩票数据
export interface game {
  code: string
  number: string
  lottery_number: string
  lottery_results: string
  forecast1_result: string
  forecast2_result: string
  forecast3_result: string
  lottery_data: string
  lottery_time: number
  lottery_cycle: number
  created_at: string
  updated_at: string
}



// 历史记录
export interface HistoryRecord {
  period: string
  date: string
  time: string
  numbers: number[]
}

// 统计数据
export interface StatisticsData {
  number: number
  count: number
  lastAppear: number
  isHot: boolean
  isCold: boolean
}
