/**
 * 走势图加载器 - 从原始HTML提取的loadTrend逻辑
 * 支持 Taixiu/Sicbo (和值走势)、Miền Bắc/Miền Nam (形态走势)、Keno (特殊形态)
 */

interface LotteryRecord {
  Expect: string
  OpenCode: string
}

interface TrendLoaderOptions {
  gameType: 'luckywin' | 'sicbo' | 'mienbac' | 'miennam' | 'keno'
  lotteryList: LotteryRecord[]
  count?: number
}

export function loadTrend(options: TrendLoaderOptions) {
  const { gameType, lotteryList, count } = options

  let area = ''
  if (gameType === 'sicbo') area = 'Sicbo'
  else if (gameType === 'luckywin') area = 'Taixiu'
  else if (gameType === 'mienbac') area = 'MienBac'
  else if (gameType === 'miennam') area = 'MienNam'
  else if (gameType === 'keno') area = 'Keno'

  const trendLotteryCount = Math.min(count || lotteryList.length, lotteryList.length)
  let hzMin = -1, hzMax = -1, hzMiddle = -1
  let isBZTS = false // 豹子通杀
  let isShowHZZS = false // 是否显示和值走势
  let isShowQTDXDSXT = false // 是否显示其他大小单双形态
  let isShowKENOXT = false // 是否显示KENO形态

  // 根据游戏类型设置参数
  if (area.indexOf('Sicbo') > -1) {
    hzMin = 3
    hzMax = 18
    hzMiddle = 10
    isBZTS = true // 豹子通杀

    const tdNBB = document.getElementById('tdNBBHeZhiXingTai')
    const tdKENO = document.getElementById('tdKENOHeZhiXingTai')
    const tdHZ = document.getElementById('tdHeZhi')
    const tdHZXT = document.getElementById('tdHeZhiXingTai')

    if (tdNBB) tdNBB.style.display = 'none'
    if (tdKENO) tdKENO.style.display = 'none'
    if (tdHZ) tdHZ.style.display = ''
    if (tdHZXT) tdHZXT.style.display = ''

    isShowHZZS = true
  } else if (area.indexOf('Taixiu') > -1) {
    hzMin = 3
    hzMax = 18
    hzMiddle = 10

    const tdNBB = document.getElementById('tdNBBHeZhiXingTai')
    const tdKENO = document.getElementById('tdKENOHeZhiXingTai')
    const tdHZ = document.getElementById('tdHeZhi')
    const tdHZXT = document.getElementById('tdHeZhiXingTai')

    if (tdNBB) tdNBB.style.display = 'none'
    if (tdKENO) tdKENO.style.display = 'none'
    if (tdHZ) tdHZ.style.display = ''
    if (tdHZXT) tdHZXT.style.display = ''

    isShowHZZS = true
  } else if (area.indexOf('MienBac') > -1) {
    hzMin = 0
    hzMax = 45
    hzMiddle = 22

    const tdHZ = document.getElementById('tdHeZhi')
    const tdHZXT = document.getElementById('tdHeZhiXingTai')
    const tdKENO = document.getElementById('tdKENOHeZhiXingTai')
    const tdNBB = document.getElementById('tdNBBHeZhiXingTai')
    const tdNBB6W = document.getElementById('tdNBB_6WXingTai')
    const tdNBB6WCount = document.getElementById('tdNBB_6WCountXingTai')

    if (tdHZ) tdHZ.style.display = 'none'
    if (tdHZXT) tdHZXT.style.display = 'none'
    if (tdKENO) tdKENO.style.display = 'none'
    if (tdNBB) tdNBB.style.display = ''
    if (tdNBB6W) tdNBB6W.style.display = 'none'
    if (tdNBB6WCount) tdNBB6WCount.style.display = 'none'

    isShowQTDXDSXT = true
  } else if (area.indexOf('MienNam') > -1) {
    hzMin = 0
    hzMax = 54
    hzMiddle = 27

    const tdHZ = document.getElementById('tdHeZhi')
    const tdHZXT = document.getElementById('tdHeZhiXingTai')
    const tdKENO = document.getElementById('tdKENOHeZhiXingTai')
    const tdNBB = document.getElementById('tdNBBHeZhiXingTai')
    const tdNBB6W = document.getElementById('tdNBB_6WXingTai')
    const tdNBB6WCount = document.getElementById('tdNBB_6WCountXingTai')
    if (tdHZ) tdHZ.style.display = 'none'
    if (tdHZXT) tdHZXT.style.display = 'none'
    if (tdKENO) tdKENO.style.display = 'none'
    if (tdNBB) {
      tdNBB.style.display = ''
    }
    if (tdNBB6W) {
      tdNBB6W.style.display = ''
    }
    if (tdNBB6WCount) {
      tdNBB6WCount.style.display = ''
    }

    isShowQTDXDSXT = true
  } else if (area.indexOf('Keno') > -1) {
    hzMin = 210
    hzMax = 1410
    hzMiddle = 810

    const tdHZ = document.getElementById('tdHeZhi')
    const tdHZXT = document.getElementById('tdHeZhiXingTai')
    const tdNBB = document.getElementById('tdNBBHeZhiXingTai')
    const tdKENO = document.getElementById('tdKENOHeZhiXingTai')

    if (tdHZ) tdHZ.style.display = 'none'
    if (tdHZXT) tdHZXT.style.display = 'none'
    if (tdNBB) tdNBB.style.display = 'none'
    if (tdKENO) tdKENO.style.display = ''

    isShowKENOXT = true
  }

  // 初始化和值遗漏统计
  let hzyl: Record<number, { YiLou: { Max: number, Cur: number }, CiShu: number, LianChu: { Max: number, Cur: number } }> | null = null

  if (isShowHZZS) {
    hzyl = {}
    const hzHeaderHTML: string[] = []
    hzHeaderHTML.push('<tr class="firthtd">')
    hzHeaderHTML.push('<th><div style="width:33px;color:#dc3545;font-size:12px;">Tổng</div></th>')

    for (let i = hzMin; i <= hzMax; i++) {
      hzHeaderHTML.push(`<th><div style="width:33px;">${i}</div></th>`)
      hzyl[i] = { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } }
    }
    hzHeaderHTML.push('</tr>')

    // 渲染和值走势表头
    const theadHeZhiHear = document.getElementById('theadHeZhiHear')
    if (theadHeZhiHear) {
      theadHeZhiHear.innerHTML = hzHeaderHTML.join('')
    }

    // 渲染和值统计表头（复用相同的表头HTML）
    const theadHeZhiCountHear = document.getElementById('theadHeZhiCountHear')
    if (theadHeZhiCountHear) {
      theadHeZhiCountHear.innerHTML = hzHeaderHTML.join('')
    }
  }

  const hzHTML: string[] = []
  const openCodeHTML: string[] = []
  const hzxtHTML: string[] = [] // 和值形态

  const hzxt = {
    'Tài': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Xỉu': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Lẻ': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Chẵn': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } }
  }

  const hzxtH2ZHHTML: string[] | null = isShowQTDXDSXT ? [] : null // 后二组合形态
  const hzxtH2ZH = isShowQTDXDSXT ? {
    'Tài': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Xỉu': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Lẻ': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Chẵn': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } }
  } : null

  let hzxtWeiZhi: Record<string, { HTML: string[], HZXT: any }> | null = null

  // KENO 数据变量
  const kenoHZHTML: string[] | null = isShowKENOXT ? [] : null
  const kenoSZXHTML: string[] | null = isShowKENOXT ? [] : null
  const kenoSZXXT = isShowKENOXT ? {
    'Trên': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Hòa': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Dưới': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } }
  } : null

  const kenoJMSHTHTML: string[] | null = isShowKENOXT ? [] : null
  const kenoJMSHTXT = isShowKENOXT ? {
    'Kim': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Mộc': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Thủy': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Hỏa': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
    'Thổ': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } }
  } : null

  // 大小单双形态HTML生成函数
  const getDXDSXTHtml = (
    hzxtYL: any,
    hzValue: number,
    hzMiddleValue: number,
    isHZTd: boolean,
    isBZBTS?: boolean
  ): string => {
    const daHZXT = hzxtYL['Tài']
    const xiaoHZXT = hzxtYL['Xỉu']
    const danHZXT = hzxtYL['Lẻ']
    const shuangHZXT = hzxtYL['Chẵn']
    const dxdsHTML: string[] = []

    dxdsHTML.push('<tr>')
    if (isHZTd) dxdsHTML.push(`<td style="color:#dc3545;">${hzValue}</td>`)

    if (isBZBTS) {
      for (const xt in hzxtYL) {
        hzxtYL[xt].YiLou.Cur += 1
        if (hzxtYL[xt].YiLou.Max < hzxtYL[xt].YiLou.Cur) {
          hzxtYL[xt].YiLou.Max = hzxtYL[xt].YiLou.Cur
        }
      }
      dxdsHTML.push(`<td>${daHZXT.YiLou.Cur}</td>`)
      dxdsHTML.push(`<td>${xiaoHZXT.YiLou.Cur}</td>`)
      dxdsHTML.push(`<td>${danHZXT.YiLou.Cur}</td>`)
      dxdsHTML.push(`<td>${shuangHZXT.YiLou.Cur}</td>`)
    } else {
      if (hzValue > hzMiddleValue) {
        daHZXT.YiLou.Cur = 0
        daHZXT.CiShu += 1
        daHZXT.LianChu.Cur += 1
        if (daHZXT.LianChu.Max < daHZXT.LianChu.Cur) daHZXT.LianChu.Max = daHZXT.LianChu.Cur

        xiaoHZXT.YiLou.Cur += 1
        if (xiaoHZXT.YiLou.Max < xiaoHZXT.YiLou.Cur) xiaoHZXT.YiLou.Max = xiaoHZXT.YiLou.Cur
        xiaoHZXT.LianChu.Cur = 0

        dxdsHTML.push('<td style="background: rgb(60, 176, 236);"><span class="zoushiqiuf">Tài</span></td>')
        dxdsHTML.push(`<td>${xiaoHZXT.YiLou.Cur}</td>`)
      } else {
        xiaoHZXT.YiLou.Cur = 0
        xiaoHZXT.CiShu += 1
        xiaoHZXT.LianChu.Cur += 1
        if (xiaoHZXT.LianChu.Max < xiaoHZXT.LianChu.Cur) xiaoHZXT.LianChu.Max = xiaoHZXT.LianChu.Cur

        daHZXT.YiLou.Cur += 1
        if (daHZXT.YiLou.Max < daHZXT.YiLou.Cur) daHZXT.YiLou.Max = daHZXT.YiLou.Cur
        daHZXT.LianChu.Cur = 0

        dxdsHTML.push(`<td>${daHZXT.YiLou.Cur}</td>`)
        dxdsHTML.push('<td style="background: rgb(250, 153, 50);"><span class="zoushiqiuf">Xỉu</span></td>')
      }

      if (hzValue % 2 !== 0) {
        danHZXT.YiLou.Cur = 0
        danHZXT.CiShu += 1
        danHZXT.LianChu.Cur += 1

        shuangHZXT.YiLou.Cur += 1
        if (shuangHZXT.YiLou.Max < shuangHZXT.YiLou.Cur) shuangHZXT.YiLou.Max = shuangHZXT.YiLou.Cur
        shuangHZXT.LianChu.Cur = 0

        if (danHZXT.LianChu.Max < danHZXT.LianChu.Cur) danHZXT.LianChu.Max = danHZXT.LianChu.Cur
        dxdsHTML.push('<td style="background: rgb(60, 176, 236);"><span class="zoushiqiuf">Lẻ</span></td>')
        dxdsHTML.push(`<td>${shuangHZXT.YiLou.Cur}</td>`)
      } else {
        shuangHZXT.YiLou.Cur = 0
        shuangHZXT.CiShu += 1
        shuangHZXT.LianChu.Cur += 1

        danHZXT.YiLou.Cur += 1
        if (danHZXT.YiLou.Max < danHZXT.YiLou.Cur) danHZXT.YiLou.Max = danHZXT.YiLou.Cur
        danHZXT.LianChu.Cur = 0

        if (shuangHZXT.LianChu.Max < shuangHZXT.LianChu.Cur) shuangHZXT.LianChu.Max = shuangHZXT.LianChu.Cur
        dxdsHTML.push(`<td>${danHZXT.YiLou.Cur}</td>`)
        dxdsHTML.push('<td style="background: rgb(250, 153, 50);"><span class="zoushiqiuf">Chẵn</span></td>')
      }
    }

    dxdsHTML.push('</tr>')
    return dxdsHTML.join('')
  }

  // 遍历历史数据生成走势（从旧到新遍历，计算遗漏值；最后反转HTML让最新的在上面）
  for (let i = trendLotteryCount - 1; i >= 0; i--) {
    const lottery = lotteryList[i]

    // 数据安全检查
    if (!lottery || !lottery.OpenCode) {
      console.warn(`⚠️ 数据索引 ${i} 无效，跳过`, lottery)
      continue
    }

    // 开奖号码HTML
    const openCodeChilHTML: string[] = []
    openCodeChilHTML.push('<tr>')
    openCodeChilHTML.push(`<td style="height:33px;line-height:33px;">${lottery.Expect}</td>`)
    openCodeChilHTML.push('<td style="height:33px;line-height:33px;">')

    let hz = 0
    let codes = lottery.OpenCode.split(',')
    if (codes[0].indexOf('*') > -1) {
      codes = Array.from(codes[0].split('*')[0])
    }

    const codeHtml: string[] = []
    let keno1TO40 = 0

    for (let k = 0; k < codes.length; k++) {
      const code = codes[k]
      const val = parseInt(code)
      if (isShowKENOXT) {
        if (val >= 1 && val <= 40) keno1TO40++
      }
      hz += val
      codeHtml.push(code)
      if (k !== codes.length - 1) codeHtml.push('&nbsp;')
    }

    if (codes.length <= 6) {
      openCodeChilHTML.push(codeHtml.join(''))
    } else {
      openCodeChilHTML.push(`<span title="${codeHtml.join('')}">${codes[0]}&nbsp;${codes[1]}&nbsp;${codes[2]}&nbsp;${codes[3]}&nbsp;<span style="color:blue;">...</span></span>`)
    }

    openCodeChilHTML.push('</td>')
    openCodeChilHTML.push('</tr>')
    openCodeHTML.push(openCodeChilHTML.join(''))

    // 和值走势HTML (Taixiu/Sicbo)
    if (isShowHZZS && hzyl) {
      const hzChildHTML: string[] = []
      hzChildHTML.push('<tr>')
      hzChildHTML.push(`<td style="color:#dc3545;height:33px;line-height:33px;">${hz}</td>`)

      for (const yl in hzyl) {
        if (parseInt(yl) === hz) {
          hzyl[yl].YiLou.Cur = 0
          hzyl[yl].CiShu += 1
          hzyl[yl].LianChu.Cur += 1
          if (hzyl[yl].LianChu.Max < hzyl[yl].LianChu.Cur) {
            hzyl[yl].LianChu.Max = hzyl[yl].LianChu.Cur
          }
          hzChildHTML.push(`<td><span style="background:#1fa6e8;color:#fff" name="hzspan" class="zoushiqiu">${hz}</span></td>`)
          continue
        }
        hzyl[yl].YiLou.Cur += 1
        if (hzyl[yl].YiLou.Max < hzyl[yl].YiLou.Cur) {
          hzyl[yl].YiLou.Max = hzyl[yl].YiLou.Cur
        }
        hzyl[yl].LianChu.Cur = 0
        hzChildHTML.push(`<td>${hzyl[yl].YiLou.Cur}</td>`)
      }

      hzChildHTML.push('</tr>')
      hzHTML.push(hzChildHTML.join(''))
    }

    // 和值大小单双形态
    const isLeopard = new Set(codes).size === 1 // 是否豹子
    hzxtHTML.push(getDXDSXTHtml(hzxt, hz, hzMiddle, isShowQTDXDSXT, isBZTS && isLeopard))

    // KENO 特殊形态处理
    if (isShowKENOXT && kenoHZHTML && kenoSZXHTML && kenoSZXXT && kenoJMSHTHTML && kenoJMSHTXT) {
      // 添加和值HTML
      kenoHZHTML.push(`<tr><td style="color:#dc3545;height:33px;line-height:33px;">${hz}</td></tr>`)

      // 上中下形态
      const shangXT = kenoSZXXT['Trên']
      const zhongXT = kenoSZXXT['Hòa']
      const xiaXT = kenoSZXXT['Dưới']
      const szxHTML: string[] = []
      szxHTML.push('<tr>')

      if (keno1TO40 > 12) {
        // 上
        shangXT.YiLou.Cur = 0
        shangXT.CiShu += 1
        shangXT.LianChu.Cur += 1
        if (shangXT.LianChu.Max < shangXT.LianChu.Cur) shangXT.LianChu.Max = shangXT.LianChu.Cur

        zhongXT.YiLou.Cur += 1
        if (zhongXT.YiLou.Max < zhongXT.YiLou.Cur) zhongXT.YiLou.Max = zhongXT.YiLou.Cur
        zhongXT.LianChu.Cur = 0

        xiaXT.YiLou.Cur += 1
        if (xiaXT.YiLou.Max < xiaXT.YiLou.Cur) xiaXT.YiLou.Max = xiaXT.YiLou.Cur
        xiaXT.LianChu.Cur = 0

        szxHTML.push('<td style="background: rgb(249, 65, 104);"><span class="zoushiqiuf">Trên</span></td>')
        szxHTML.push(`<td>${zhongXT.YiLou.Cur}</td>`)
        szxHTML.push(`<td>${xiaXT.YiLou.Cur}</td>`)
      } else if (keno1TO40 === 12) {
        // 平
        zhongXT.YiLou.Cur = 0
        zhongXT.CiShu += 1
        zhongXT.LianChu.Cur += 1
        if (zhongXT.LianChu.Max < zhongXT.LianChu.Cur) zhongXT.LianChu.Max = zhongXT.LianChu.Cur

        shangXT.YiLou.Cur += 1
        if (shangXT.YiLou.Max < shangXT.YiLou.Cur) shangXT.YiLou.Max = shangXT.YiLou.Cur
        shangXT.LianChu.Cur = 0

        xiaXT.YiLou.Cur += 1
        if (xiaXT.YiLou.Max < xiaXT.YiLou.Cur) xiaXT.YiLou.Max = xiaXT.YiLou.Cur
        xiaXT.LianChu.Cur = 0

        szxHTML.push(`<td>${shangXT.YiLou.Cur}</td>`)
        szxHTML.push('<td style="background: rgb(192, 196, 204);"><span class="zoushiqiuf">Hòa</span></td>')
        szxHTML.push(`<td>${xiaXT.YiLou.Cur}</td>`)
      } else {
        // 下
        xiaXT.YiLou.Cur = 0
        xiaXT.CiShu += 1
        xiaXT.LianChu.Cur += 1
        if (xiaXT.LianChu.Max < xiaXT.LianChu.Cur) xiaXT.LianChu.Max = xiaXT.LianChu.Cur

        shangXT.YiLou.Cur += 1
        if (shangXT.YiLou.Max < shangXT.YiLou.Cur) shangXT.YiLou.Max = shangXT.YiLou.Cur
        shangXT.LianChu.Cur = 0

        zhongXT.YiLou.Cur += 1
        if (zhongXT.YiLou.Max < zhongXT.YiLou.Cur) zhongXT.YiLou.Max = zhongXT.YiLou.Cur
        zhongXT.LianChu.Cur = 0

        szxHTML.push(`<td>${shangXT.YiLou.Cur}</td>`)
        szxHTML.push(`<td>${zhongXT.YiLou.Cur}</td>`)
        szxHTML.push('<td style="background: rgb(60, 176, 236);"><span class="zoushiqiuf">Dưới</span></td>')
      }
      szxHTML.push('</tr>')
      kenoSZXHTML.push(szxHTML.join(''))

      // 金木水火土形态
      const jinXT = kenoJMSHTXT['Kim']
      const muXT = kenoJMSHTXT['Mộc']
      const shuiXT = kenoJMSHTXT['Thủy']
      const huoXT = kenoJMSHTXT['Hỏa']
      const tuXT = kenoJMSHTXT['Thổ']
      const jmshtHTML: string[] = []
      jmshtHTML.push('<tr>')

      if (hz >= 210 && hz <= 695) {
        // 金
        jinXT.YiLou.Cur = 0
        jinXT.CiShu += 1
        jinXT.LianChu.Cur += 1
        if (jinXT.LianChu.Max < jinXT.LianChu.Cur) jinXT.LianChu.Max = jinXT.LianChu.Cur

        for (const dxt of [muXT, shuiXT, huoXT, tuXT]) {
          dxt.YiLou.Cur += 1
          if (dxt.YiLou.Max < dxt.YiLou.Cur) dxt.YiLou.Max = dxt.YiLou.Cur
          dxt.LianChu.Cur = 0
        }

        jmshtHTML.push('<td style="background: rgb(250, 153, 50);"><span class="zoushiqiuf">Kim</span></td>')
        jmshtHTML.push(`<td>${muXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${shuiXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${huoXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${tuXT.YiLou.Cur}</td>`)
      } else if (hz >= 696 && hz <= 763) {
        // 木
        muXT.YiLou.Cur = 0
        muXT.CiShu += 1
        muXT.LianChu.Cur += 1
        if (muXT.LianChu.Max < muXT.LianChu.Cur) muXT.LianChu.Max = muXT.LianChu.Cur

        for (const dxt of [jinXT, shuiXT, huoXT, tuXT]) {
          dxt.YiLou.Cur += 1
          if (dxt.YiLou.Max < dxt.YiLou.Cur) dxt.YiLou.Max = dxt.YiLou.Cur
          dxt.LianChu.Cur = 0
        }

        jmshtHTML.push(`<td>${jinXT.YiLou.Cur}</td>`)
        jmshtHTML.push('<td style="background: rgb(109, 212, 0);"><span class="zoushiqiuf">Mộc</span></td>')
        jmshtHTML.push(`<td>${shuiXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${huoXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${tuXT.YiLou.Cur}</td>`)
      } else if (hz >= 764 && hz <= 855) {
        // 水
        shuiXT.YiLou.Cur = 0
        shuiXT.CiShu += 1
        shuiXT.LianChu.Cur += 1
        if (shuiXT.LianChu.Max < shuiXT.LianChu.Cur) shuiXT.LianChu.Max = shuiXT.LianChu.Cur

        for (const dxt of [jinXT, muXT, huoXT, tuXT]) {
          dxt.YiLou.Cur += 1
          if (dxt.YiLou.Max < dxt.YiLou.Cur) dxt.YiLou.Max = dxt.YiLou.Cur
          dxt.LianChu.Cur = 0
        }

        jmshtHTML.push(`<td>${jinXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${muXT.YiLou.Cur}</td>`)
        jmshtHTML.push('<td style="background: rgb(60, 176, 236);"><span class="zoushiqiuf">Thủy</span></td>')
        jmshtHTML.push(`<td>${huoXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${tuXT.YiLou.Cur}</td>`)
      } else if (hz >= 856 && hz <= 923) {
        // 火
        huoXT.YiLou.Cur = 0
        huoXT.CiShu += 1
        huoXT.LianChu.Cur += 1
        if (huoXT.LianChu.Max < huoXT.LianChu.Cur) huoXT.LianChu.Max = huoXT.LianChu.Cur

        for (const dxt of [jinXT, muXT, shuiXT, tuXT]) {
          dxt.YiLou.Cur += 1
          if (dxt.YiLou.Max < dxt.YiLou.Cur) dxt.YiLou.Max = dxt.YiLou.Cur
          dxt.LianChu.Cur = 0
        }

        jmshtHTML.push(`<td>${jinXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${muXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${shuiXT.YiLou.Cur}</td>`)
        jmshtHTML.push('<td style="background: rgb(249, 65, 104);"><span class="zoushiqiuf">Hỏa</span></td>')
        jmshtHTML.push(`<td>${tuXT.YiLou.Cur}</td>`)
      } else {
        // 土 (924-1410)
        tuXT.YiLou.Cur = 0
        tuXT.CiShu += 1
        tuXT.LianChu.Cur += 1
        if (tuXT.LianChu.Max < tuXT.LianChu.Cur) tuXT.LianChu.Max = tuXT.LianChu.Cur

        for (const dxt of [jinXT, muXT, shuiXT, huoXT]) {
          dxt.YiLou.Cur += 1
          if (dxt.YiLou.Max < dxt.YiLou.Cur) dxt.YiLou.Max = dxt.YiLou.Cur
          dxt.LianChu.Cur = 0
        }

        jmshtHTML.push(`<td>${jinXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${muXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${shuiXT.YiLou.Cur}</td>`)
        jmshtHTML.push(`<td>${huoXT.YiLou.Cur}</td>`)
        jmshtHTML.push('<td style="background: rgb(202, 140, 16);"><span class="zoushiqiuf">Thổ</span></td>')
      }
      jmshtHTML.push('</tr>')
      kenoJMSHTHTML.push(jmshtHTML.join(''))
    }

    // 其他形态 (Miền Bắc/Miền Nam)
    if (isShowQTDXDSXT && hzxtH2ZHHTML && hzxtH2ZH) {
      const h2zhValue = parseInt(codes[codes.length - 2] + codes[codes.length - 1])
      hzxtH2ZHHTML.push(getDXDSXTHtml(hzxtH2ZH, h2zhValue, 49, true))

      if (hzxtWeiZhi === null) {
        hzxtWeiZhi = {}
        for (let j = 1; j <= codes.length; j++) {
          hzxtWeiZhi[`WZ${j}`] = {
            HTML: [],
            HZXT: {
              'Tài': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
              'Xỉu': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
              'Lẻ': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } },
              'Chẵn': { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } }
            }
          }
        }
      }

      for (let k = 1; k <= codes.length; k++) {
        const weizhiValue = parseInt(codes[k - 1])
        hzxtWeiZhi[`WZ${k}`].HTML.push(getDXDSXTHtml(hzxtWeiZhi[`WZ${k}`].HZXT, weizhiValue, 4, true))
      }
    }
  }

  // ==================== 统计数据HTML生成函数 ====================
  type StatsData = Record<number | string, { YiLou: { Max: number, Cur: number }, CiShu: number, LianChu: { Max: number, Cur: number } }>

  const getTongJiShuJuHtml = (statsData: StatsData, hasFirstColumn: boolean): string => {
    const xtHTML: Record<number, string[]> = {}
    for (let l = 0; l < 5; l++) {
      xtHTML[l] = []
      xtHTML[l].push('<tr>')
      if (hasFirstColumn) xtHTML[l].push('<td></td>')
    }

    // 数据统计
    for (const key in statsData) {
      let l = 0
      const data = statsData[key]

      // 出现次数
      xtHTML[l++].push(`<td>${data.CiShu}</td>`)

      // 最大连出
      xtHTML[l++].push(`<td>${data.LianChu.Max}</td>`)

      // 当前遗漏
      xtHTML[l++].push(`<td>${data.YiLou.Cur}</td>`)

      // 最大遗漏
      xtHTML[l++].push(`<td>${data.YiLou.Max}</td>`)

      // 平均遗漏
      const pj = Math.floor(data.CiShu === 0 ? trendLotteryCount : (trendLotteryCount - data.CiShu) / data.CiShu)
      xtHTML[l++].push(`<td>${pj}</td>`)
    }

    const xtHTMLAll: string[] = []
    for (let l = 0; l < 5; l++) {
      xtHTML[l].push('</tr>')
      xtHTMLAll.push(xtHTML[l].join(''))
    }
    return xtHTMLAll.join('')
  }

  // ==================== 渲染到DOM ====================
  // 反转HTML数组，让最新的数据显示在上面（但遗漏值从下往上递增）
  openCodeHTML.reverse()
  hzHTML.reverse()
  hzxtHTML.reverse()
  if (hzxtH2ZHHTML) hzxtH2ZHHTML.reverse()
  if (hzxtWeiZhi) {
    for (const wz in hzxtWeiZhi) {
      hzxtWeiZhi[wz].HTML.reverse()
    }
  }

  const tbodyOpenCode = document.getElementById('tbodyOpenCode')
  if (tbodyOpenCode) {
    tbodyOpenCode.innerHTML = openCodeHTML.join('')
  }

  if (isShowHZZS) {
    const tbodyHeZhi = document.getElementById('tbodyHeZhi')
    if (tbodyHeZhi) {
      tbodyHeZhi.innerHTML = hzHTML.join('')
    }

    const tbodyHeZhiXingTai = document.getElementById('tbodyHeZhiXingTai')
    if (tbodyHeZhiXingTai) {
      tbodyHeZhiXingTai.innerHTML = hzxtHTML.join('')
    }

    // 渲染统计表
    if (hzyl) {
      const tbodyHeZhiCount = document.getElementById('tbodyHeZhiCount')
      if (tbodyHeZhiCount) {
        tbodyHeZhiCount.innerHTML = getTongJiShuJuHtml(hzyl, true)
      }
    }

    const tbodyHeZhiCountXingTai = document.getElementById('tbodyHeZhiCountXingTai')
    if (tbodyHeZhiCountXingTai) {
      tbodyHeZhiCountXingTai.innerHTML = getTongJiShuJuHtml(hzxt as any, false)
    }
  }

  if (isShowQTDXDSXT && hzxtH2ZHHTML && hzxtWeiZhi) {
    const tbodyH2ZH = document.getElementById('tbodyNBB_HE_ZuHeXingTai')
    if (tbodyH2ZH) {
      tbodyH2ZH.innerHTML = hzxtH2ZHHTML.join('')
    } else {
      console.warn('  ⚠️ tbodyNBB_HE_ZuHeXingTai 未找到')
    }

    const tbodyNBBHeZhi = document.getElementById('tbodyNBBHeZhiXingTai')
    if (tbodyNBBHeZhi) {
      tbodyNBBHeZhi.innerHTML = hzxtHTML.join('')
    } else {
      console.warn('  ⚠️ tbodyNBBHeZhiXingTai 未找到')
    }

    for (let j = 1; j <= 6; j++) {
      const tbody = document.getElementById(`tbodyNBB_${j}WXingTai`)
      if (tbody && hzxtWeiZhi[`WZ${j}`]) {
        tbody.innerHTML = hzxtWeiZhi[`WZ${j}`].HTML.join('')
      }
    }

    // 渲染统计表
    // 显示统计表的容器
    const tdNBBHeZhiCountXingTai = document.getElementById('tdNBBHeZhiCountXingTai')
    const tdHeZhiCount = document.getElementById('tdHeZhiCount')
    const tdHeZhiCountXingTai = document.getElementById('tdHeZhiCountXingTai')
    // 隐藏和值统计，显示NBB统计
    if (tdHeZhiCount) tdHeZhiCount.style.display = 'none'
    if (tdHeZhiCountXingTai) tdHeZhiCountXingTai.style.display = 'none'
    if (tdNBBHeZhiCountXingTai) {
      tdNBBHeZhiCountXingTai.style.display = ''
    }

    const tbodyNBBHeZhiCountXingTai = document.getElementById('tbodyNBBHeZhiCountXingTai')
    if (tbodyNBBHeZhiCountXingTai) {
      tbodyNBBHeZhiCountXingTai.innerHTML = getTongJiShuJuHtml(hzxt as any, true)
    } else {
      console.warn('  ⚠️ tbodyNBBHeZhiCountXingTai 未找到')
    }

    if (hzxtH2ZH) {
      const tbodyNBB_HE_ZuHeCountXingTai = document.getElementById('tbodyNBB_HE_ZuHeCountXingTai')
      if (tbodyNBB_HE_ZuHeCountXingTai) {
        tbodyNBB_HE_ZuHeCountXingTai.innerHTML = getTongJiShuJuHtml(hzxtH2ZH as any, true)
      } else {
        console.warn('  ⚠️ tbodyNBB_HE_ZuHeCountXingTai 未找到')
      }
    }

    if (hzxtWeiZhi) {
      for (const wz in hzxtWeiZhi) {
        const tbody = document.getElementById(`tbodyNBB_${wz.substring(2)}WCountXingTai`)
        if (tbody) {
          tbody.innerHTML = getTongJiShuJuHtml(hzxtWeiZhi[wz].HZXT, true)
        }
      }
    }
  }

  // ==================== 渲染 KENO 数据 ====================
  if (isShowKENOXT && kenoHZHTML && kenoSZXHTML && kenoSZXXT && kenoJMSHTHTML && kenoJMSHTXT) {
    // 渲染和值
    const tbodyKENOHZ = document.getElementById('tbodyKENOHZ')
    if (tbodyKENOHZ) {
      tbodyKENOHZ.innerHTML = kenoHZHTML.reverse().join('')
    } else {
      console.warn('  ⚠️ tbodyKENOHZ 未找到')
    }

    // 渲染大小单双形态
    const tbodyKENOHeZhiXingTai = document.getElementById('tbodyKENOHeZhiXingTai')
    if (tbodyKENOHeZhiXingTai) {
      tbodyKENOHeZhiXingTai.innerHTML = hzxtHTML.join('')
    } else {
      console.warn('  ⚠️ tbodyKENOHeZhiXingTai 未找到')
    }

    // 渲染上中下形态
    const tbodyKENOSZXZhiXingTai = document.getElementById('tbodyKENOSZXZhiXingTai')
    if (tbodyKENOSZXZhiXingTai) {
      tbodyKENOSZXZhiXingTai.innerHTML = kenoSZXHTML.reverse().join('')
    } else {
      console.warn('  ⚠️ tbodyKENOSZXZhiXingTai 未找到')
    }

    // 渲染金木水火土形态
    const tbodyKENOJMSHTZhiXingTai = document.getElementById('tbodyKENOJMSHTZhiXingTai')
    if (tbodyKENOJMSHTZhiXingTai) {
      tbodyKENOJMSHTZhiXingTai.innerHTML = kenoJMSHTHTML.reverse().join('')
    } else {
      console.warn('  ⚠️ tbodyKENOJMSHTZhiXingTai 未找到')
    }

    // 渲染统计表
    // 和值统计（空）
    const tbodyKENOHZCount = document.getElementById('tbodyKENOHZCount')
    if (tbodyKENOHZCount) {
      tbodyKENOHZCount.innerHTML = '<tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>'
    }

    // 大小单双统计
    const tbodyKENOHeZhiCountXingTai = document.getElementById('tbodyKENOHeZhiCountXingTai')
    if (tbodyKENOHeZhiCountXingTai) {
      tbodyKENOHeZhiCountXingTai.innerHTML = getTongJiShuJuHtml(hzxt as any, false)
    } else {
      console.warn('  ⚠️ tbodyKENOHeZhiCountXingTai 未找到')
    }

    // 上中下统计
    const tbodyKENOSZXZhiCountXingTai = document.getElementById('tbodyKENOSZXZhiCountXingTai')
    if (tbodyKENOSZXZhiCountXingTai) {
      tbodyKENOSZXZhiCountXingTai.innerHTML = getTongJiShuJuHtml(kenoSZXXT as any, false)
    } else {
      console.warn('  ⚠️ tbodyKENOSZXZhiCountXingTai 未找到')
    }

    // 金木水火土统计
    const tbodyKENOJMSHTZhiCountXingTai = document.getElementById('tbodyKENOJMSHTZhiCountXingTai')
    if (tbodyKENOJMSHTZhiCountXingTai) {
      tbodyKENOJMSHTZhiCountXingTai.innerHTML = getTongJiShuJuHtml(kenoJMSHTXT as any, false)
    } else {
      console.warn('  ⚠️ tbodyKENOJMSHTZhiCountXingTai 未找到')
    }
  }
}
