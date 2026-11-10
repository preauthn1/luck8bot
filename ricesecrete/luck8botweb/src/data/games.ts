import type { GameInfo } from '@/types/game'

// Luckywin 游戏数据
export const luckywinGames: GameInfo[] = [
  {
    type: 'luckywin',
    code: 'taixiu',
    name: 'TÀI XỈU',
    icon: '/images/Taixiu.png',
    description: 'Kỳ vé số hiện tại',
    period: '20221201',
    status: '02:08:29',
    countdown: 7709,
    hot: true,
    resultNumbers: [5, 3, 3],
    created_at: '',
    forecast1_result: '',
    forecast2_result: '',
    forecast3_result: '',
    lottery_cycle: 60,
    lottery_data: '',
    lottery_results: '',
    lottery_time: 0,
    number: '',
    updated_at: ''
  },
  {
    type: 'luckywin',
    code: 'taixiu3m',
    name: 'TÀI XỈU 3 PHÚT',
    icon: '/images/TaixiuMD3.png',
    description: 'Kỳ vé số hiện tại',
    period: '13 kỳ',
    status: '00:01:33',
    countdown: 93,
    hot: true,
    resultNumbers: [6, 4, 1],
    created_at: '',
    forecast1_result: '',
    forecast2_result: '',
    forecast3_result: '',
    lottery_cycle: 180,
    lottery_data: '',
    lottery_results: '',
    lottery_time: 0,
    number: '',
    updated_at: ''
  },
  {
    type: 'luckywin',
    code: 'taixiu5m',
    name: 'TÀI XỈU MD5',
    icon: '/images/TaixiuMD5.png',
    description: 'Kỳ vé số hiện tại',
    period: '18 kỳ',
    status: '02:06:23',
    countdown: 7583,
    hot: true,
    resultNumbers: [2, 6, 4],
    created_at: '',
    forecast1_result: '',
    forecast2_result: '',
    forecast3_result: '',
    lottery_cycle: 300,
    lottery_data: '',
    lottery_results: '',
    lottery_time: 0,
    number: '',
    updated_at: ''
  }
]

// Miền Bắc 游戏数据
export const mienBacGames: GameInfo[] = [
  {
    type: 'mienbac',
    code: 'pmb5p',
    name: 'Miền Bắc 5 phút mới',
    icon: '/images/MienBacMoi5m.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [5, 3, 2, 0, 7]
  },
  {
    type: 'mienbac',
    code: 'pmb3p',
    name: 'Miền Bắc 3 phút mới',
    icon: '/images/MienBacMoi3m.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [8, 2, 9, 7, 4]
  },
  {
    type: 'mienbac',
    code: 'mien-bac',
    name: 'Miền Bắc',
    icon: '/images/MienBac.png',
    description: 'Liên kết mở thưởng',
    period: '13 kỳ',
    status: '02:08:44',
    countdown: 7724,
    resultNumbers: [7, 2, 0, 2, 8]
  },
  {
    type: 'mienbac',
    code: 'mb45g',
    name: 'Miền Bắc VIP 45 giây',
    icon: '/images/MienBacVIP45.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:06:29',
    countdown: 7589,
    hot: true,
    resultNumbers: [2, 8, 5, 7, 5]
  },
  {
    type: 'mienbac',
    code: 'mb75g',
    name: 'Miền Bắc VIP 75 giây',
    icon: '/images/MienBacVIP75.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:07:34',
    countdown: 7654,
    hot: true,
    resultNumbers: [9, 5, 4, 6, 3]
  },
  {
    type: 'mienbac',
    code: 'mb2p',
    name: 'Miền Bắc VIP 2 phút',
    icon: '/images/MienBacVIP2m.png',
    description: 'Liên kết mở thưởng',
    period: '1600 kỳ',
    status: '02:07:07',
    countdown: 7627,
    resultNumbers: [7, 7, 2, 9, 5]
  }
]

// Miền Nam 游戏数据
export const mienNamGames: GameInfo[] = [
  {
    type: 'miennam',
    code: 'mn45g',
    name: 'Miền Nam VIP 45 giây',
    icon: '/images/MienNamVIP45.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [4, 5, 1, 3, 1, 3]
  },
  {
    type: 'miennam',
    code: 'mn90g',
    name: 'Miền Nam VIP 90 giây',
    icon: '/images/MienNamVIP90.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [7, 2, 8, 4, 5, 6]
  },
  {
    type: 'miennam',
    code: 'mn1p',
    name: 'Miền Nam VIP 1 phút',
    icon: '/images/MienNamVIP1m.png',
    description: 'Liên kết mở thưởng',
    period: '13 kỳ',
    status: '02:08:44',
    countdown: 7724,
    resultNumbers: [3, 9, 5, 8, 2, 1]
  },
  {
    type: 'miennam',
    code: 'mn2p',
    name: 'Miền Nam VIP 2 phút',
    icon: '/images/MienNamVIP2m.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:06:29',
    countdown: 7589,
    resultNumbers: [6, 1, 4, 7, 9, 2]
  },
  {
    type: 'miennam',
    code: 'mn5p',
    name: 'Miền Nam VIP 5 phút',
    icon: '/images/MienNamVIP5m.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:07:34',
    countdown: 7654,
    resultNumbers: [5, 0, 3, 4, 8, 7]
  }
]

// Keno 游戏数据
export const kenoGames: GameInfo[] = [
  {
    type: 'keno',
    code: 'keno20g',
    name: 'Keno VIP 20 giây',
    icon: '/images/KenoVIP20.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [1, 5, 7, 12, 15, 18, 23, 27, 32, 35, 38, 41, 45, 49, 52, 58, 63, 67, 72, 78]
  },
  {
    type: 'keno',
    code: 'keno30g',
    name: 'Keno VIP 30 giây',
    icon: '/images/KenoVIP30.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [3, 8, 11, 16, 19, 24, 28, 31, 36, 40, 44, 47, 51, 55, 60, 64, 69, 73, 76, 80]
  },
  {
    type: 'keno',
    code: 'keno40g',
    name: 'Keno VIP 40 giây',
    icon: '/images/KenoVIP40.png',
    description: 'Liên kết mở thưởng',
    period: '13 kỳ',
    status: '02:08:44',
    countdown: 7724,
    resultNumbers: [2, 6, 9, 14, 17, 22, 26, 30, 34, 39, 42, 46, 50, 54, 59, 62, 66, 71, 75, 79]
  },
  {
    type: 'keno',
    code: 'keno50g',
    name: 'Keno VIP 50 giây',
    icon: '/images/KenoVIP50.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:06:29',
    countdown: 7589,
    resultNumbers: [4, 10, 13, 18, 21, 25, 29, 33, 37, 43, 48, 52, 56, 61, 65, 68, 70, 74, 77, 80]
  },
  {
    type: 'keno',
    code: 'keno1p',
    name: 'Keno VIP 1 phút',
    icon: '/images/KenoVIP1m.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:07:34',
    countdown: 7654,
    resultNumbers: [1, 7, 12, 16, 20, 24, 28, 32, 36, 41, 45, 49, 53, 57, 63, 67, 72, 76, 78, 79]
  },
  {
    type: 'keno',
    code: 'keno5p',
    name: 'Keno VIP 5 phút',
    icon: '/images/KenoVIP5m.png',
    description: 'Liên kết mở thưởng',
    period: '1600 kỳ',
    status: '02:07:07',
    countdown: 7627,
    resultNumbers: [5, 9, 14, 19, 23, 27, 31, 35, 39, 44, 47, 51, 55, 60, 64, 69, 73, 75, 77, 80]
  }
]

// Sicbo 游戏数据
export const sicboGames: GameInfo[] = [
  {
    type: 'sicbo',
    code: 'sicbo20g',
    name: 'Sicbo 20 giây',
    icon: '/images/Sicbo20.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [4, 2, 5]
  },
  {
    type: 'sicbo',
    code: 'sicbo30g',
    name: 'Sicbo 30 giây',
    icon: '/images/Sicbo30.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:08:29',
    countdown: 7709,
    resultNumbers: [1, 6, 3]
  },
  {
    type: 'sicbo',
    code: 'sicbo40g',
    name: 'Sicbo 40 giây',
    icon: '/images/Sicbo40.png',
    description: 'Liên kết mở thưởng',
    period: '13 kỳ',
    status: '02:08:44',
    countdown: 7724,
    resultNumbers: [6, 6, 2]
  },
  {
    type: 'sicbo',
    code: 'sicbo50g',
    name: 'Sicbo 50 giây',
    icon: '/images/Sicbo50.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:06:29',
    countdown: 7589,
    resultNumbers: [3, 4, 4]
  },
  {
    type: 'sicbo',
    code: 'sicbo1p',
    name: 'Sicbo 1 phút',
    icon: '/images/Sicbo1m.png',
    description: 'Liên kết mở thưởng',
    period: '18 kỳ',
    status: '02:07:34',
    countdown: 7654,
    resultNumbers: [5, 2, 1]
  },
  {
    type: 'sicbo',
    code: 'sicbo90g',
    name: 'Sicbo 1.5 phút',
    icon: '/images/Sicbo1_5m.png',
    description: 'Liên kết mở thưởng',
    period: '1600 kỳ',
    status: '02:07:07',
    countdown: 7627,
    resultNumbers: [6, 3, 5]
  }
]

// 获取所有游戏
export const getAllGames = (): GameInfo[] => {
  return [
    ...luckywinGames,
    ...mienBacGames,
    ...mienNamGames,
    ...kenoGames,
    ...sicboGames
  ]
}

// 根据类型获取游戏
export const getGamesByType = (type: string): GameInfo[] => {
  switch (type) {
    case 'luckywin':
      return luckywinGames
    case 'mienbac':
      return mienBacGames
    case 'miennam':
      return mienNamGames
    case 'keno':
      return kenoGames
    case 'sicbo':
      return sicboGames
    default:
      return []
  }
}