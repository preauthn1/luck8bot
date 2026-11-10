import type { LotteryRecord, ApiResponse, GetHistoryParams } from '@/types/lottery'


// API 基础 URL (根据实际后台地址修改)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Home Data 接口返回的游戏数据
 */
export interface HomeGameData {
  code: string
  number: string
  lottery_number?: string
  lottery_results: string
  lottery_data: string
  forecast1_result: string
  forecast2_result: string
  forecast3_result: string
  lottery_time: number
  lottery_cycle: number
  created_at?: string
  updated_at?: string
  is_hot: number
  forecast1_num_result?: string
  forecast2_num_result?: string
  forecast3_num_result?: string  
  max_num: number
}

/**
 * Home Data 接口返回数据结构
 */
export interface HomeDataResponse {
  code: number
  msg: string
  data: {
    taixiu: HomeGameData[]
    mb: HomeGameData[]
    mn: HomeGameData[]
    keno: HomeGameData[]
    sicbo: HomeGameData[]
  }
  timestamp: number
}

/**
 * Header 类型定义
 */
export interface MenuData {
  taixiu: HomeGameData[]
  mb: HomeGameData[]
  mn: HomeGameData[]
  keno: HomeGameData[]
  sicbo: HomeGameData[]
}
/**
 * Update Data 接口返回的单个游戏数据
 */
export interface UpdateDataResponse {
  code: number
  msg: string
  data: HomeGameData
  timestamp: number
}

/**
 * Lottery List 接口返回的单条历史记录
 */
export interface LotteryHistoryItem {
  id: number
  code: string
  number: string
  lottery_number?: string
  lottery_results: string
  forecast1_result: string
  forecast2_result: string
  forecast3_result: string
  lottery_data: string
  lottery_time: number
  lottery_cycle: number
  created_at: string
  updated_at: string
  number_count: number
}

/**
 * Lottery List 接口返回数据结构
 */
export interface LotteryListResponse {
  code: number
  msg: string
  data: LotteryHistoryItem[]
  timestamp: number
}

/**
 * 获取首页所有游戏数据（home_data 接口）
 */
export async function getHomeData(): Promise<HomeDataResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/home_data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: HomeDataResponse = await response.json()

    if (result.code !== 0) {
      throw new Error(result.msg || 'API 返回错误')
    }

    return result
  } catch (error) {
    console.error('获取首页数据失败:', error)
    // 返回模拟数据用于开发
    return getMockHomeData()
  }
}

/**
 * 获取模拟首页数据
 */
function getMockHomeData(): HomeDataResponse {
  return {
    "code": 0,
    "msg": "Operation successful",
    "data": {
        "taixiu": [
            {
                "code": "taixiu",
                "number": "2601120883",
                "lottery_number": "0883",
                "lottery_results": "3,6,5",
                "lottery_data": "3,6,5",
                "forecast1_result": "双",
                "forecast2_result": "小",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203770,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:57",
                "updated_at": "2026-01-12 14:42:50"
            },
            {
                "code": "taixiu60g",
                "number": "2601120883",
                "lottery_number": "0883",
                "lottery_results": "3,3,6",
                "lottery_data": "3,3,6",
                "forecast1_result": "单",
                "forecast2_result": "单",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203770,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:43:01",
                "updated_at": "2026-01-12 14:42:50"
            },
            {
                "code": "taixiu45g1",
                "number": "2601121177",
                "lottery_number": "1177",
                "lottery_results": "5,5,3",
                "lottery_data": "5,5,3",
                "forecast1_result": "双",
                "forecast2_result": "大",
                "forecast3_result": "大",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203755,
                "lottery_cycle": 45,
                "max_num": 1920,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:43",
                "updated_at": "2026-01-12 14:42:35"
            },
            {
                "code": "taixiu45g2",
                "number": "2601121177",
                "lottery_number": "1177",
                "lottery_results": "2,3,5",
                "lottery_data": "2,3,5",
                "forecast1_result": "小",
                "forecast2_result": "小",
                "forecast3_result": "小",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203755,
                "lottery_cycle": 45,
                "max_num": 1920,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:43",
                "updated_at": "2026-01-12 14:42:35"
            },
            {
                "code": "taixiu30g1",
                "number": "2601121766",
                "lottery_number": "1766",
                "lottery_results": "6,6,6",
                "lottery_data": "6,6,6",
                "forecast1_result": "双",
                "forecast2_result": "双",
                "forecast3_result": "大",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203770,
                "lottery_cycle": 30,
                "max_num": 2880,
                "is_hot": 1,
                "created_at": "2026-01-12 14:43:01",
                "updated_at": "2026-01-12 14:42:50"
            },
            {
                "code": "taixiu30g2",
                "number": "2601121766",
                "lottery_number": "1766",
                "lottery_results": "4,5,5",
                "lottery_data": "4,5,5",
                "forecast1_result": "小",
                "forecast2_result": "小",
                "forecast3_result": "小",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203770,
                "lottery_cycle": 30,
                "max_num": 2880,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:57",
                "updated_at": "2026-01-12 14:42:50"
            },
            {
                "code": "taixiu3m",
                "number": "260112294",
                "lottery_number": "294",
                "lottery_results": "5,3,6",
                "lottery_data": "5,3,6",
                "forecast1_result": "大",
                "forecast2_result": "双",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203710,
                "lottery_cycle": 180,
                "max_num": 480,
                "is_hot": 1,
                "created_at": "2026-01-12 14:41:57",
                "updated_at": "2026-01-12 14:41:50"
            },
            {
                "code": "taixiu5m",
                "number": "2601120882",
                "lottery_number": "0882",
                "lottery_results": "5,1,4",
                "lottery_data": "{\"Ciphertext\":\"1d85d63cb942289d25c810a7e40f2e25\",\"Original\":\"#2601120882_2SUPvH57H5OVHiN8Mh8Pp{5-1-4}ELFiS\",\"openNum\":\"5,1,4\"}",
                "forecast1_result": "大",
                "forecast2_result": "小",
                "forecast3_result": "小",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203660,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:07",
                "updated_at": "2026-01-12 14:41:00"
            },
            {
                "code": "taixiu5m60g",
                "number": "2601120882",
                "lottery_number": "0882",
                "lottery_results": "6,3,2",
                "lottery_data": "{\"Ciphertext\":\"0e0568cdcc780f4abb20d88163a22973\",\"Original\":\"#2601120882_JcDoFAhaXY7Z{6-3-2}xBGemnH1IhcW2f\",\"openNum\":\"6,3,2\"}",
                "forecast1_result": "大",
                "forecast2_result": "大",
                "forecast3_result": "小",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203660,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:07",
                "updated_at": "2026-01-12 14:41:00"
            },
            {
                "code": "taixiu5m60g1",
                "number": "2601120882",
                "lottery_number": "0882",
                "lottery_results": "6,6,6",
                "lottery_data": "{\"Ciphertext\":\"08f79503e12de8e9d2ce4a241cc5e2f3\",\"Original\":\"#2601120882_f9TOiyGJ79qw6yvUOAy4iRWa8{6-6-6}A\",\"openNum\":\"6,6,6\"}",
                "forecast1_result": "单",
                "forecast2_result": "单",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203660,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:08",
                "updated_at": "2026-01-12 14:41:00"
            },
            {
                "code": "taixiu5m60g2",
                "number": "2601120882",
                "lottery_number": "0882",
                "lottery_results": "2,1,2",
                "lottery_data": "{\"Ciphertext\":\"54edf8eb46590048a46a3cf12fd72206\",\"Original\":\"#2601120882_9aRl{2-1-2}nGv7nHjk4qrzMNZkTqK1GV\",\"openNum\":\"2,1,2\"}",
                "forecast1_result": "小",
                "forecast2_result": "小",
                "forecast3_result": "小",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203660,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:08",
                "updated_at": "2026-01-12 14:41:00"
            },
            {
                "code": "taixiu5m60g3",
                "number": "2601120882",
                "lottery_number": "0882",
                "lottery_results": "2,6,5",
                "lottery_data": "{\"Ciphertext\":\"a108e27a4d43ef2e4daa27259d6fb0d2\",\"Original\":\"#2601120882_LORBbcPmT62ymixsZpsRiRo{2-6-5}kjj\",\"openNum\":\"2,6,5\"}",
                "forecast1_result": "双",
                "forecast2_result": "大",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203660,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:08",
                "updated_at": "2026-01-12 14:41:00"
            },
            {
                "code": "taixiu5m60g4",
                "number": "2601120882",
                "lottery_number": "0882",
                "lottery_results": "4,2,3",
                "lottery_data": "{\"Ciphertext\":\"57d1897733156fa8a232eb1fd3c9898c\",\"Original\":\"#2601120882_7V2bqHLEFASZKQHnPi9rQt{4-2-3}Z7hy\",\"openNum\":\"4,2,3\"}",
                "forecast1_result": "大",
                "forecast2_result": "小",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_time": 1768203660,
                "lottery_cycle": 60,
                "max_num": 1440,
                "is_hot": 1,
                "created_at": "2026-01-12 14:42:08",
                "updated_at": "2026-01-12 14:41:00"
            }
        ],
        "mb": [
            {
                "code": "pmb5p",
                "number": "202601128092",
                "lottery_number": "092",
                "lottery_results": "8,6,8,3,8",
                "forecast1_result": "小",
                "forecast2_result": "双",
                "forecast3_result": "大",
                "forecast1_num_result": "59,80,75,00,23,73,24,68",
                "forecast2_num_result": "43,80,52,46,13,34,84,18",
                "forecast3_num_result": "66,57,92,23,39,32,84,09",
                "lottery_data": "86838|70391|38521,77707|53679,90754,98345,91382,93654,86855|4557,3752,3091,1508|0781,2761,9770,4922,0389,8211|205,304,754|05,43,81,88",
                "max_num": 288,
                "is_hot": 0,
                "lottery_time": 1768203600,
                "lottery_cycle": 300,
                "created_at": "2026-01-12 14:40:07",
                "updated_at": "2026-01-12 14:40:00"
            },
            {
                "code": "pmb3p",
                "number": "202601128154",
                "lottery_number": "154",
                "lottery_results": "6,8,7,5,9",
                "forecast1_result": "小",
                "forecast2_result": "大",
                "forecast3_result": "双",
                "forecast1_num_result": "31,48,87,68,66,86,44,47",
                "forecast2_num_result": "09,81,74,26,64,44,29,78",
                "forecast3_num_result": "97,86,93,20,54,42,04,31",
                "lottery_data": "68759|28914|37937,20909|07839,47336,56061,47245,46797,55135|8703,0955,0823,6874|9764,1226,5313,7256,3285,7642|919,718,489|97,82,98,17",
                "max_num": 480,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 180,
                "created_at": "2026-01-12 14:42:07",
                "updated_at": "2026-01-12 14:42:00"
            },
            {
                "code": "mien-bac",
                "number": "20260111",
                "lottery_number": "0111",
                "lottery_results": "8,2,4,3,8",
                "forecast1_result": "大",
                "forecast2_result": "双",
                "forecast3_result": "单",
                "lottery_data": "82438|32172|39869,21073|48067,07113,74630,05458,91202,00608|1508,4847,5535,3417|1130,7400,4663,1636,7725,6936|768,195,519|70,95,10,43",
                "lottery_time": 1768134037,
                "max_num": 0,
                "is_hot": 0,
                "lottery_cycle": 86400,
                "updated_at": "2026-01-11 19:20:37"
            },
            {
                "code": "mb45g",
                "number": "202601120617",
                "lottery_number": "0617",
                "lottery_results": "9,4,0,9,5",
                "forecast1_result": "大",
                "forecast2_result": "双",
                "forecast3_result": "双",
                "forecast1_num_result": "72,92,06,26,63,01,02,32",
                "forecast2_num_result": "91,46,12,76,23,60,39,42",
                "forecast3_num_result": "17,66,64,39,56,44,85,00",
                "lottery_data": "94095|48656|54370,32315|59147,69271,44195,63039,19699,95881|0077,6347,3248,4802|6827,6334,1476,2979,8120,0100|958,400,071|45,57,86,03",
                "max_num": 1920,
                "is_hot": 1,
                "lottery_time": 1768203765,
                "lottery_cycle": 45,
                "created_at": "2026-01-12 14:42:53",
                "updated_at": "2026-01-12 14:42:45"
            },
            {
                "code": "mb75g",
                "number": "202601120370",
                "lottery_number": "0370",
                "lottery_results": "1,3,3,7,2",
                "forecast1_result": "单",
                "forecast2_result": "大",
                "forecast3_result": "小",
                "forecast1_num_result": "40,49,12,56,37,77,99,02",
                "forecast2_num_result": "83,92,85,71,66,58,23,02",
                "forecast3_num_result": "73,42,50,92,89,53,31,34",
                "lottery_data": "13372|57890|14006,55038|53170,76902,43225,14655,26740,30054|1245,2835,5994,7381|6329,5026,5769,4223,5564,3027|977,323,347|53,71,48,94",
                "max_num": 1152,
                "is_hot": 1,
                "lottery_time": 1768203750,
                "lottery_cycle": 75,
                "created_at": "2026-01-12 14:42:37",
                "updated_at": "2026-01-12 14:42:30"
            },
            {
                "code": "mb2p",
                "number": "202601120231",
                "lottery_number": "0231",
                "lottery_results": "7,5,4,2,2",
                "forecast1_result": "小",
                "forecast2_result": "大",
                "forecast3_result": "小",
                "forecast1_num_result": "41,13,76,36,35,66,40,54",
                "forecast2_num_result": "28,08,61,32,82,95,84,50",
                "forecast3_num_result": "09,85,04,88,84,98,03,19",
                "lottery_data": "75422|11070|33049,58686|77270,69778,52721,62797,72851,68418|0259,8618,2041,5285|5567,9902,9745,4797,5955,5087|350,216,856|51,46,40,45",
                "max_num": 720,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 120,
                "created_at": "2026-01-12 14:42:10",
                "updated_at": "2026-01-12 14:42:00"
            }
        ],
        "mn": [
            {
                "code": "mn45g",
                "number": "202601120617",
                "lottery_number": "0617",
                "lottery_results": "6,6,7,1,5,4",
                "forecast1_result": "大",
                "forecast2_result": "双",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "667154|40051|26633|59579,48438|37299,01193,78618,11553,61555,75336,06410|3521|8471,3906,9090|047|82",
                "max_num": 1920,
                "is_hot": 0,
                "lottery_time": 1768203765,
                "lottery_cycle": 45,
                "created_at": "2026-01-12 14:42:51",
                "updated_at": "2026-01-12 14:42:45"
            },
            {
                "code": "mn90g",
                "number": "202601120308",
                "lottery_number": "0308",
                "lottery_results": "1,7,3,4,6,6",
                "forecast1_result": "双",
                "forecast2_result": "大",
                "forecast3_result": "大",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "173466|38997|48368|07888,60343|84073,96527,92896,99413,71474,72078,22996|3951|4838,9388,0391|305|31",
                "max_num": 960,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 90,
                "created_at": "2026-01-12 14:42:08",
                "updated_at": "2026-01-12 14:42:00"
            },
            {
                "code": "mn1p",
                "number": "202601120462",
                "lottery_number": "0462",
                "lottery_results": "9,9,7,1,5,7",
                "forecast1_result": "双",
                "forecast2_result": "单",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "997157|40594|68273|39782,15831|43247,86135,39592,63992,05887,37518,77037|5761|8055,5421,3000|613|17",
                "max_num": 1440,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 60,
                "created_at": "2026-01-12 14:42:09",
                "updated_at": "2026-01-12 14:42:00"
            },
            {
                "code": "mn2p",
                "number": "202601120231",
                "lottery_number": "0231",
                "lottery_results": "6,2,0,4,3,5",
                "forecast1_result": "小",
                "forecast2_result": "小",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "620435|32426|89386|74724,04434|60416,34643,19784,63927,13423,20891,13039|0674|3819,9987,9201|351|55",
                "max_num": 720,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 120,
                "created_at": "2026-01-12 14:42:09",
                "updated_at": "2026-01-12 14:42:00"
            },
            {
                "code": "mn5p",
                "number": "202601120092",
                "lottery_number": "0092",
                "lottery_results": "1,8,6,1,8,3",
                "forecast1_result": "单",
                "forecast2_result": "大",
                "forecast3_result": "大",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "186183|54101|08914|48829,58604|27836,58010,18389,86115,70660,71080,47413|2399|6991,3866,4611|715|95",
                "max_num": 288,
                "is_hot": 0,
                "lottery_time": 1768203600,
                "lottery_cycle": 300,
                "created_at": "2026-01-12 14:40:09",
                "updated_at": "2026-01-12 14:40:00"
            }
        ],
        "keno": [
            {
                "code": "keno20g",
                "number": "202601122649",
                "lottery_number": "2649",
                "lottery_results": "01,04,07,14,18,21,24,27,28,29,36,37,46,49,58,59,69,70,73,79",
                "forecast1_result": "小",
                "forecast2_result": "小",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "01,04,07,14,18,21,24,27,28,29,36,37,46,49,58,59,69,70,73,79",
                "max_num": 4320,
                "is_hot": 0,
                "lottery_time": 1768203780,
                "lottery_cycle": 20,
                "created_at": "2026-01-12 14:43:05",
                "updated_at": "2026-01-12 14:43:00"
            },
            {
                "code": "keno30g",
                "number": "202601121765",
                "lottery_number": "1765",
                "lottery_results": "02,03,04,07,09,15,16,21,28,33,36,48,51,55,60,61,68,73,75,76",
                "forecast1_result": "小",
                "forecast2_result": "单",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "02,03,04,07,09,15,16,21,28,33,36,48,51,55,60,61,68,73,75,76",
                "max_num": 2880,
                "is_hot": 0,
                "lottery_time": 1768203750,
                "lottery_cycle": 30,
                "created_at": "2026-01-12 14:42:36",
                "updated_at": "2026-01-12 14:42:30"
            },
            {
                "code": "keno40g",
                "number": "202601121324",
                "lottery_number": "1324",
                "lottery_results": "05,06,07,18,22,23,24,29,30,32,35,41,42,44,45,63,66,72,78,79",
                "forecast1_result": "小",
                "forecast2_result": "小",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "05,06,07,18,22,23,24,29,30,32,35,41,42,44,45,63,66,72,78,79",
                "max_num": 2160,
                "is_hot": 0,
                "lottery_time": 1768203760,
                "lottery_cycle": 40,
                "created_at": "2026-01-12 14:42:47",
                "updated_at": "2026-01-12 14:42:40"
            },
            {
                "code": "keno50g",
                "number": "202601121059",
                "lottery_number": "1059",
                "lottery_results": "08,12,16,19,20,23,26,27,31,41,49,50,55,56,57,59,72,74,79,80",
                "forecast1_result": "双",
                "forecast2_result": "小",
                "forecast3_result": "小",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "08,12,16,19,20,23,26,27,31,41,49,50,55,56,57,59,72,74,79,80",
                "max_num": 1728,
                "is_hot": 0,
                "lottery_time": 1768203750,
                "lottery_cycle": 50,
                "created_at": "2026-01-12 14:42:38",
                "updated_at": "2026-01-12 14:42:30"
            },
            {
                "code": "keno1p",
                "number": "202601120882",
                "lottery_number": "0882",
                "lottery_results": "04,07,12,14,18,21,26,27,30,31,33,41,44,50,51,60,64,69,70,77",
                "forecast1_result": "单",
                "forecast2_result": "单",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "04,07,12,14,18,21,26,27,30,31,33,41,44,50,51,60,64,69,70,77",
                "max_num": 1440,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 60,
                "created_at": "2026-01-12 14:42:10",
                "updated_at": "2026-01-12 14:42:00"
            },
            {
                "code": "keno5p",
                "number": "202601120080",
                "lottery_number": "0080",
                "lottery_results": "02,03,07,13,17,22,30,33,35,43,47,54,57,60,66,68,72,73,75,78",
                "forecast1_result": "单",
                "forecast2_result": "小",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "02,03,07,13,17,22,30,33,35,43,47,54,57,60,66,68,72,73,75,78",
                "max_num": 192,
                "is_hot": 0,
                "lottery_time": 1768203600,
                "lottery_cycle": 300,
                "created_at": "2026-01-12 14:40:12",
                "updated_at": "2026-01-12 14:40:00"
            }
        ],
        "sicbo": [
            {
                "code": "sicbo20g",
                "number": "202601122648",
                "lottery_number": "2648",
                "lottery_results": "2,5,6",
                "forecast1_result": "单",
                "forecast2_result": "双",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "2,5,6",
                "max_num": 4320,
                "is_hot": 0,
                "lottery_time": 1768203760,
                "lottery_cycle": 20,
                "created_at": "2026-01-12 14:42:47",
                "updated_at": "2026-01-12 14:42:40"
            },
            {
                "code": "sicbo30g",
                "number": "202601121765",
                "lottery_number": "1765",
                "lottery_results": "6,6,3",
                "forecast1_result": "单",
                "forecast2_result": "双",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "6,6,3",
                "max_num": 2880,
                "is_hot": 0,
                "lottery_time": 1768203750,
                "lottery_cycle": 30,
                "created_at": "2026-01-12 14:42:37",
                "updated_at": "2026-01-12 14:42:30"
            },
            {
                "code": "sicbo40g",
                "number": "202601121324",
                "lottery_number": "1324",
                "lottery_results": "2,4,4",
                "forecast1_result": "单",
                "forecast2_result": "大",
                "forecast3_result": "大",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "2,4,4",
                "max_num": 2160,
                "is_hot": 0,
                "lottery_time": 1768203760,
                "lottery_cycle": 40,
                "created_at": "2026-01-12 14:42:48",
                "updated_at": "2026-01-12 14:42:40"
            },
            {
                "code": "sicbo50g",
                "number": "202601121059",
                "lottery_number": "1059",
                "lottery_results": "3,6,6",
                "forecast1_result": "双",
                "forecast2_result": "大",
                "forecast3_result": "单",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "3,6,6",
                "max_num": 1728,
                "is_hot": 0,
                "lottery_time": 1768203750,
                "lottery_cycle": 50,
                "created_at": "2026-01-12 14:42:38",
                "updated_at": "2026-01-12 14:42:30"
            },
            {
                "code": "sicbo1p",
                "number": "202601120882",
                "lottery_number": "0882",
                "lottery_results": "5,5,4",
                "forecast1_result": "小",
                "forecast2_result": "小",
                "forecast3_result": "大",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "5,5,4",
                "max_num": 1440,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 60,
                "created_at": "2026-01-12 14:42:09",
                "updated_at": "2026-01-12 14:42:00"
            },
            {
                "code": "sicbo90g",
                "number": "202601120588",
                "lottery_number": "0588",
                "lottery_results": "1,5,1",
                "forecast1_result": "小",
                "forecast2_result": "大",
                "forecast3_result": "双",
                "forecast1_num_result": "",
                "forecast2_num_result": "",
                "forecast3_num_result": "",
                "lottery_data": "1,5,1",
                "max_num": 960,
                "is_hot": 0,
                "lottery_time": 1768203720,
                "lottery_cycle": 90,
                "created_at": "2026-01-12 14:42:10",
                "updated_at": "2026-01-12 14:42:00"
            }
        ]
    },
    "timestamp": 1768203780
}
}

/**
 * 获取历史彩票数据
 * @param params 查询参数
 * @returns Promise<LotteryRecord[]>
 */
export async function getHistoryLottery(params: GetHistoryParams): Promise<LotteryRecord[]> {
  const { area, id, limit = 100 } = params

  try {
    const url = id
      ? `${API_BASE_URL}/GetHistoryLottery/${area}`
      : `${API_BASE_URL}/GetHistoryLottery/${area}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, limit }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<LotteryRecord[]> = await response.json()

    if (result.state !== 1) {
      throw new Error(result.message || 'API 返回错误')
    }

    return result.data || []
  } catch (error) {
    console.error('获取历史彩票数据失败:', error)
    // 返回模拟数据用于开发
    return getMockLotteryData(area)
  }
}

/**
 * 获取模拟数据 (开发环境使用)
 */
function getMockLotteryData(area: string): LotteryRecord[] {
  // Taixiu/Sicbo 模拟数据
  if (area === 'Taixiu' || area === 'Sicbo') {
    return [
      { ID: 1129929, Expect: '2512301117', OpenTime: '2025-12-30 18:36:54', OpenCode: '5,3,3' },
      { ID: 1129928, Expect: '2512301116', OpenTime: '2025-12-30 18:35:53', OpenCode: '6,4,1' },
      { ID: 1129927, Expect: '2512301115', OpenTime: '2025-12-30 18:34:51', OpenCode: '2,6,2' },
      { ID: 1129926, Expect: '2512301114', OpenTime: '2025-12-30 18:33:53', OpenCode: '3,3,3' },
      { ID: 1129925, Expect: '2512301113', OpenTime: '2025-12-30 18:32:53', OpenCode: '1,3,6' },
      { ID: 1129924, Expect: '2512301112', OpenTime: '2025-12-30 18:31:51', OpenCode: '2,5,4' },
      { ID: 1129923, Expect: '2512301111', OpenTime: '2025-12-30 18:30:51', OpenCode: '5,6,6' },
      { ID: 1129922, Expect: '2512301110', OpenTime: '2025-12-30 18:29:51', OpenCode: '5,2,1' },
      { ID: 1129921, Expect: '2512301109', OpenTime: '2025-12-30 18:28:52', OpenCode: '4,1,3' },
      { ID: 1129920, Expect: '2512301108', OpenTime: '2025-12-30 18:27:51', OpenCode: '2,5,2' },
    ]
  }

  // MienBac 模拟数据
  if (area === 'MienBac') {
    return [
      { ID: 202512298139, Expect: '202512298139', OpenTime: '2025-12-29 18:35:07', OpenCode: '53207*24606*89322,87784*70725' },
      { ID: 202512298138, Expect: '202512298138', OpenTime: '2025-12-29 18:30:04', OpenCode: '51636*16633*51082,41240*37039' },
      { ID: 202512298137, Expect: '202512298137', OpenTime: '2025-12-29 18:25:07', OpenCode: '72028*58746*55216,85173*72188' },
      { ID: 202512298136, Expect: '202512298136', OpenTime: '2025-12-29 18:20:13', OpenCode: '28575*36834*98886,46509*13854' },
      { ID: 202512298135, Expect: '202512298135', OpenTime: '2025-12-29 18:15:06', OpenCode: '95463*61495*11089,75920*13862' },
    ]
  }

  // MienNam 模拟数据
  if (area === 'MienNam') {
    return [
      { ID: 202512298139, Expect: '202512298139', OpenTime: '2025-12-29 18:35:07', OpenCode: '53207*24606*89322,87784*70725' },
      { ID: 202512298138, Expect: '202512298138', OpenTime: '2025-12-29 18:30:04', OpenCode: '51636*16633*51082,41240*37039' },
    ]
  }

  // Keno 模拟数据
  if (area === 'Keno') {
    return [
      { ID: 2512301117, Expect: '2512301117', OpenTime: '2025-12-30 18:36:54', OpenCode: '1,5,7,12,15,18,23,27,32,35,38,41,45,49,52,58,63,67,72,78' },
      { ID: 2512301116, Expect: '2512301116', OpenTime: '2025-12-30 18:35:53', OpenCode: '3,8,11,16,19,24,28,31,36,40,44,47,51,55,60,64,69,73,76,80' },
    ]
  }

  return []
}

/**
 * 计算和值 (适用于 Taixiu/Sicbo)
 */
export function calculateSum(openCode: string): number {
  const numbers = openCode.split(',').map(Number)
  return numbers.reduce((sum, num) => sum + num, 0)
}

/**
 * 判断大小 (和值 >= 11 为大)
 */
export function isBig(sum: number): boolean {
  return sum >= 11
}

/**
 * 判断单双 (和值为奇数为单)
 */
export function isOdd(sum: number): boolean {
  return sum % 2 === 1
}
