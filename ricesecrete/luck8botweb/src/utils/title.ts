import { ref } from 'vue';
import type { MenuData } from '@/services/lotteryService'
export const all_data = ref<MenuData>()

export const get_title = (code: string) => {
    const title_list: Record<string, string> = {
        'taixiu': 'TÀI XỈU STARCREAM',
        'taixiu60g': 'TÀI XỈU BUMBLEBEE',
        'taixiu45g1': 'TÀI XỈU GALVATRON',
        'taixiu45g2': 'TÀI XỈU THUNDERCRACKER',
        'taixiu30g1': 'TÀI XỈU OPTIMU PRIME',
        'taixiu30g2': 'TÀI XỈU RODIMUS PRIME',
        'taixiu3m': 'TÀI XỈU 3 PHÚT',
        'taixiu5m': 'TÀI XỈU MD5 Thần tài',
        'taixiu5m60g': 'TÀI XỈU MD5 Chu tước',
        'taixiu5m60g1': 'TÀI XỈU MD5 Thanh long',
        'taixiu5m60g2': 'TÀI XỈU MD5 Huyền vũ',
        'taixiu5m60g3': 'TÀI XỈU MD5 Kỳ lân',
        'taixiu5m60g4': 'TÀI XỈU MD5 Bạch hổ',
        'pmb5p': 'Miền Bắc 5 phút mới',
        'pmb3p': 'Miền Bắc 3 phút mới',
        'mien-bac': 'Miền Bắc',
        'mb45g': 'Miền Bắc VIP 45 giây',
        'mb75g': 'Miền Bắc VIP 75 giây',
        'mb2p': 'Miền Bắc VIP 2 phút',
        'mn45g': 'Miền Nam VIP 45 giây',
        'mn90g': 'Miền Nam VIP 90 giây',
        'mn1p': 'Miền Nam VIP 1 phút',
        'mn2p': 'Miền Nam VIP 2 phút',
        'mn5p': 'Miền Nam VIP 5 phút',
        'keno20g': 'Keno VIP 20 giây',
        'keno30g': 'Keno VIP 30 giây',
        'keno40g': 'Keno VIP 40 giây',
        'keno50g': 'Keno VIP 50 giây',
        'keno1p': 'Keno VIP 1 phút',
        'keno5p': 'Keno VIP 5 phút',
        'sicbo20g': 'Sicbo 20 giây',
        'sicbo30g': 'Sicbo 30 giây',
        'sicbo40g': 'Sicbo 40 giây',
        'sicbo50g': 'Sicbo 50 giây',
        'sicbo1p': 'Sicbo 1 phút',
        'sicbo90g': 'Sicbo 1.5 phút',
    }
    return title_list[code] || code
}

//获取路由参数

//对应的图片
export const get_icon = (code: string) => {
    const icon_list: Record<string, string> = {
      'taixiu': '/images/Taixiu.png',
      'taixiu60g': '/images/Taixiu.png',
      'taixiu45g1': '/images/Taixiu.png',
      'taixiu45g2': '/images/Taixiu.png',
      'taixiu30g1': '/images/Taixiu.png',
      'taixiu30g2': '/images/Taixiu.png',
      'taixiu3m': '/images/TaixiuMD3.png',
      'taixiu5m': '/images/TaixiuMD5.png',
      'taixiu5m60g': '/images/TaixiuMD5.png',
      'taixiu5m60g1': '/images/TaixiuMD5.png',
      'taixiu5m60g2': '/images/TaixiuMD5.png',
      'taixiu5m60g3': '/images/TaixiuMD5.png',
      'taixiu5m60g4': '/images/TaixiuMD5.png',
      'pmb5p': '/images/MienBacMoi5m.png',
      'pmb3p': '/images/MienBacMoi3m.png',
      'mien-bac': '/images/MienBac.png',
      'mb45g': '/images/MienBacVIP45.png',
      'mb75g': '/images/MienBacVIP75.png',
      'mb2p': '/images/MienBacVIP2m.png',
      'mn45g': '/images/MienNamVIP45.png',
      'mn90g': '/images/MienNamVIP90.png',
      'mn1p': '/images/MienNamVIP1m.png',
      'mn2p': '/images/MienNamVIP2m.png',
      'mn5p': '/images/MienNamVIP5m.png',
      'keno20g': '/images/KenoVIP20.png',
      'keno30g': '/images/KenoVIP30.png',
      'keno40g': '/images/KenoVIP40.png',
      'keno50g': '/images/KenoVIP50.png',
      'keno1p': '/images/KenoVIP1m.png',
      'keno5p': '/images/KenoVIP5m.png',
      'sicbo20g': '/images/Sicbo20.png',
      'sicbo30g': '/images/Sicbo30.png',
      'sicbo40g': '/images/Sicbo40.png',
      'sicbo50g': '/images/Sicbo50.png',
      'sicbo1p': '/images/Sicbo1m.png',
      'sicbo90g': '/images/Sicbo1_5m.png',
    }
    return icon_list[code] || ''
  }