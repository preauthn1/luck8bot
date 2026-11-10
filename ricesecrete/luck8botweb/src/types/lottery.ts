// 彩票历史记录接口
export interface LotteryRecord {
  ID: number
  Expect: string // 期号
  OpenTime: string // 开奖时间
  OpenCode: string // 开奖号码 (逗号分隔)
}

// 和值统计数据
export interface HeZhiStats {
  value: number // 和值
  count: number // 出现次数
  maxMiss: number // 最大遗漏
  avgMiss: number // 平均遗漏
  lastMiss: number // 当前遗漏
}

// 大小单双统计
export interface DxdsStats {
  tai: number // 大
  xiu: number // 小
  le: number // 单
  chan: number // 双
}

// API 响应接口
export interface ApiResponse<T> {
  state: number // 1 表示成功
  message?: string
  data: T
}

// 获取历史彩票数据的参数
export interface GetHistoryParams {
  area: string // 游戏区域: Taixiu, Sicbo, MienBac, MienNam, Keno
  id?: number // 起始ID (可选,用于增量获取)
  limit?: number // 获取数量 (默认100)
}
