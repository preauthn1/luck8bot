<template>
  <div id="TrendIndexTab" class="tab-pane fade" role="tabpanel">
    <div class="table-wrapper">
      <table id="tableTrendIndex" class="table-weizhi" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td valign="top">
              <table class="table-weizhi-child" style="width:248px;" border="0" cellpadding="0" cellspacing="0">
                <thead>
                  <tr class="firthtd">
                    <th rowspan="2" style="height:66px;">Kỳ mở thưởng</th>
                    <th rowspan="2">Số trúng thưởng</th>
                  </tr>
                  <tr class="firthtd"></tr>
                </thead>
                <tbody id="tbodyTTIndexOpenCode" style="color:#999999;"></tbody>
              </table>
            </td>
            <td id="tdTTIndexScroll" valign="top">
              <div style="position:relative;">
                <span id="spanTTIndexScrollLeft" class="click-scroll scroll-left"></span>
                <span id="spanTTIndexScrollRight" class="click-scroll scroll-right"></span>
                <div id="divTTIndex" style="width:709px;overflow-x:hidden;position:relative;z-index:1;">
                  <table id="tableTTIndex" class="table-weizhi" style="width:auto;position:relative;z-index:1;" border="0" cellpadding="0" cellspacing="0"></table>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <table class="table-weizhi-child" style="width:248px;" border="0" cellpadding="0" cellspacing="0">
                <thead>
                  <tr class="firthtd"><th style="height:66px;background-color:#f5f5f5;">Số liệu thống kê</th></tr>
                </thead>
                <tbody>
                  <tr><td colspan="2">Số lần xuất hiện</td></tr>
                  <tr><td colspan="2">Số chuỗi liên kéo dài nhất</td></tr>
                  <tr><td colspan="2">Vẫn chưa xuất hiện</td></tr>
                  <tr><td colspan="2">Chuỗi số chưa xuất hiện nhiều nhất</td></tr>
                  <tr><td colspan="2">Bình quân số chưa xuất hiện</td></tr>
                </tbody>
              </table>
            </td>
            <td valign="top">
              <div style="position:relative;">
                <span id="spanTTIndexTJScrollLeft" class="click-scroll scroll-left"></span>
                <span id="spanTTIndexTJScrollRight" class="click-scroll scroll-right"></span>
                <div id="divTTIndexTJ" style="width:709px;overflow-x:hidden;position:relative;z-index:1;">
                  <table id="tableTTIndexTJ" class="table-weizhi" style="width:auto;position:relative;z-index:1;" border="0" cellpadding="0" cellspacing="0"></table>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  nextTick, watch, ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { LotteryHistoryItem } from '@/services/lotteryService'

interface Props {
  gameType?: 'mienbac' | 'luckywin' | 'keno'
  count?: number
  gameCode?: string
}

const props = withDefaults(defineProps<Props>(), {
  count: 30
})

// ==================== Inject Shared Data ====================
const sharedHistoryData = inject<{
  data: Ref<LotteryHistoryItem[]>
  isLoading: Ref<boolean>
  refresh: (gameCode?: string, forceRefresh?: boolean) => Promise<void>
}>('sharedHistoryData')

const lotteryHistory = sharedHistoryData?.data || ref<LotteryHistoryItem[]>([])

// ==================== 清空表格内容 ====================
const clearTables = () => {
  const tbodyTTIndexOpenCode = document.getElementById('tbodyTTIndexOpenCode')
  if (tbodyTTIndexOpenCode) tbodyTTIndexOpenCode.innerHTML = ''

  const tableTTIndex = document.getElementById('tableTTIndex')
  if (tableTTIndex) tableTTIndex.innerHTML = ''

  const tableTTIndexTJ = document.getElementById('tableTTIndexTJ')
  if (tableTTIndexTJ) tableTTIndexTJ.innerHTML = ''

  // 清空canvas和绝对定位的cloned spans
  const divTTIndex = document.getElementById('divTTIndex')
  if (divTTIndex) {
    divTTIndex.scrollLeft = 0
    // 移除canvas元素
    divTTIndex.querySelectorAll('canvas').forEach(c => c.remove())
    // 移除绝对定位的cloned spans（这些是drawLines创建的）
    divTTIndex.querySelectorAll('span[name="hzspan"]').forEach(s => {
      const span = s as HTMLElement
      if (span.style.position === 'absolute') {
        span.remove()
      }
    })
  }
}

// ==================== Trend Rendering ====================
const renderTrend = () => {
  if (!lotteryHistory.value || lotteryHistory.value.length === 0) {

    clearTables()
    return
  }

  // 验证数据是否匹配当前 gameCode（仅在有 gameCode 时验证）
  if (props.gameCode) {
    const firstItem = lotteryHistory.value[0]
    if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {

      clearTables()
      return
    }
  }

  // 执行原版的 loadTrendIndex 逻辑
  loadTrendIndex()
}

// ==================== Load Trend Index (原版逻辑) ====================
const loadTrendIndex = () => {
  const openCodeHTML: string[] = []
  const tableTTIndexHTML: string[][] = []
  const ylCounts: number[][] = []
  const indexYLTJ: any[] = [] // 每个位置遗漏统计，次数，连出
  const tableTTIndexTJHTML: string[] = []

  let trendLotteryIndexCount = props.count || lotteryHistory.value.length
  if (!trendLotteryIndexCount) trendLotteryIndexCount = lotteryHistory.value.length

  for (let i = trendLotteryIndexCount - 1; i >= 0; i--) {
    const lottery = lotteryHistory.value[i]

    // 开奖HTML
    const openCodeChilHTML: string[] = []
    openCodeChilHTML.push('<tr>')
    openCodeChilHTML.push('<td>' + lottery.number + '</td>')
    openCodeChilHTML.push('<td>')

    let codes = lottery.lottery_results ? lottery.lottery_results.split(',') : []
    // 处理 * 分隔符（某些彩种使用）
    if (codes.length > 0 && codes[0].indexOf('*') > -1) {
      codes = Array.from(codes[0].split('*')[0])
    }

    const codeHtml: string[] = []
    for (let k = 0; k < codes.length; k++) {
      const code = codes[k]
      const val = parseInt(code)

      codeHtml.push(code)

      if (tableTTIndexHTML.length <= k) {
        tableTTIndexHTML.push([])
        ylCounts.push([])
      }

      if (indexYLTJ.length <= k) {
        const yltj: any = {}
        for (let c = 0; c < 10; c++) {
          yltj[c] = { YiLou: { Max: 0, Cur: 0 }, CiShu: 0, LianChu: { Max: 0, Cur: 0 } }
        }
        indexYLTJ.push(yltj)

        tableTTIndexTJHTML.push(['<td valign="top">',
          '<table class="table-weizhi-child" style="width:350px;" border="0" cellpadding="0" cellspacing="0">',
          '<thead>',
          '<tr class="firthtd"><th colspan="10" style="height:33px !important;">Số thứ ' + (k + 1) + '</th></tr>',
          '<tr class="firthtd"><th width="34" style="height:33px !important;">0</th><th width="34" style="height:33px !important;">1</th><th width="34" style="height:33px !important;">2</th><th width="34" style="height:33px !important;">3</th><th width="34" style="height:33px !important;">4</th><th width="34" style="height:33px !important;">5</th><th width="34" style="height:33px !important;">6</th><th width="34" style="height:33px !important;">7</th><th width="34" style="height:33px !important;">8</th><th width="34" style="height:33px !important;">9</th></tr>',
          '</thead>',
          '<tbody name="tbodyTTIndexTJCount" style="color:#999999;">',
          '</tbody>',
          '</table>',
          '</td>'].join(''))
      }

      for (let c = 0; c < 10; c++) {
        const tjobj = indexYLTJ[k][c]
        if (c == val) {
          tjobj.YiLou.Cur = 0
          tjobj.CiShu += 1
          tjobj.LianChu.Cur += 1
          if (tjobj.LianChu.Max < tjobj.LianChu.Cur) tjobj.LianChu.Max = tjobj.LianChu.Cur
        } else {
          tjobj.YiLou.Cur += 1
          if (tjobj.YiLou.Max < tjobj.YiLou.Cur) tjobj.YiLou.Max = tjobj.YiLou.Cur
          tjobj.LianChu.Cur = 0
        }
      }

      const tr: string[] = []
      tr.push('<tr>')
      for (let p = 0; p < 10; p++) {
        if (ylCounts[k].length <= p) ylCounts[k].push(0)
        if (val == p) ylCounts[k][p] = 0
        else ylCounts[k][p] += 1
        tr.push('<td style="background-color:#fcf9f2">' + (val == p ? '<span style="background: rgb(31, 166, 232);" name="hzspan" class="zoushiqiu">' + code + '</span>' : ylCounts[k][p]) + '</td>')
      }
      tr.push('</tr>')
      tableTTIndexHTML[k].push(tr.join(''))

      if (k != codes.length - 1) codeHtml.push('&nbsp;')
    }

    if (codes.length <= 6) openCodeChilHTML.push(codeHtml.join(''))
    else openCodeChilHTML.push('<span title="' + codeHtml.join('') + '">' + codes[0] + '&nbsp;' + codes[1] + '&nbsp;' + codes[2] + '&nbsp;' + codes[3] + '&nbsp;' + '<span style="color:blue;">...</span></span>')

    openCodeChilHTML.push('</td>')
    openCodeChilHTML.push('</tr>')
    openCodeHTML.push(openCodeChilHTML.join(''))

    if (i <= 0) {
      for (let l = 0; l < tableTTIndexHTML.length; l++) {
        const bodyContent = tableTTIndexHTML[l].reverse().join('')
        tableTTIndexHTML[l] = [
          '<td name="zs" valign="top">',
          '<table class="table-weizhi-child" style="width:350px;" border="0" cellpadding="0" cellspacing="0">',
          '<thead>',
          '<tr class="firthtd"><th colspan="10" style="height:33px !important;">Số thứ ' + (l + 1) + '</th></tr>',
          '<tr class="firthtd"><th width="34" style="height:33px !important;">0</th><th width="34" style="height:33px !important;">1</th><th width="34" style="height:33px !important;">2</th><th width="34" style="height:33px !important;">3</th><th width="34" style="height:33px !important;">4</th><th width="34" style="height:33px !important;">5</th><th width="34" style="height:33px !important;">6</th><th width="34" style="height:33px !important;">7</th><th width="34" style="height:33px !important;">8</th><th width="34" style="height:33px !important;">9</th></tr>',
          '</thead>',
          '<tbody id="tbodyTTIndex' + l + '" style="color:#999999;">',
          bodyContent,
          '</tbody>',
          '</table>',
          '</td>'
        ]
      }
    }
  }

  const tbodyTTIndexOpenCode = document.getElementById('tbodyTTIndexOpenCode')
  if (tbodyTTIndexOpenCode) {
    tbodyTTIndexOpenCode.innerHTML = openCodeHTML.reverse().join('')
  }

  const tableTTIndex = document.getElementById('tableTTIndex')
  if (tableTTIndex) {
    tableTTIndex.innerHTML = '<tr>' + tableTTIndexHTML.map(arr => arr.join('')).join('<td rowspan="' + (trendLotteryIndexCount + 2) + '"><div style="width:7px;"></div></td>') + '</tr>'
  }

  const tableTTIndexTJ = document.getElementById('tableTTIndexTJ')
  if (tableTTIndexTJ) {
    tableTTIndexTJ.innerHTML = '<tr>' + tableTTIndexTJHTML.join('<td><div style="width:7px;"></div></td>') + '</tr>'
  }

  // 更新统计数据
  const getTongJiShuJuHtml = function(xttj: any) {
    const xtHTML: any = {}
    for (let l = 0; l < 5; l++) {
      xtHTML[l] = []
      xtHTML[l].push('<tr>')
    }

    // 数据统计 - 只遍历 0-9 的数字键
    for (let xt = 0; xt < 10; xt++) {
      if (!xttj.hasOwnProperty(xt)) continue

      let l = 0

      // 出现次数
      xtHTML[l++].push('<td>' + xttj[xt].CiShu + '</td>')

      // 最大连出
      xtHTML[l++].push('<td>' + xttj[xt].LianChu.Max + '</td>')

      // 当前遗漏
      xtHTML[l++].push('<td>' + xttj[xt].YiLou.Cur + '</td>')

      // 最大遗漏
      xtHTML[l++].push('<td>' + xttj[xt].YiLou.Max + '</td>')

      // 平均遗漏
      const pj = parseInt(String(xttj[xt].CiShu == 0 ? trendLotteryIndexCount : ((trendLotteryIndexCount - xttj[xt].CiShu) / xttj[xt].CiShu)))
      xtHTML[l++].push('<td>' + pj + '</td>')
    }

    const xtHTMLAll: string[] = []
    for (let l = 0; l < 5; l++) {
      xtHTML[l].push('</tr>')
      xtHTMLAll.push(xtHTML[l].join(''))
    }
    return xtHTMLAll.join('')
  }

  nextTick(() => {
    const tjTables = document.querySelectorAll('#tableTTIndexTJ tbody[name="tbodyTTIndexTJCount"]')
    for (let i = 0; i < indexYLTJ.length; i++) {
      if (tjTables[i]) {
        (tjTables[i] as HTMLElement).innerHTML = getTongJiShuJuHtml(indexYLTJ[i])
      }
    }

    // 重置滚动位置，移除之前的划线
    const divTTIndex = document.getElementById('divTTIndex')
    if (divTTIndex) {
      divTTIndex.scrollLeft = 0
      // 移除之前的canvas元素（保留table）
      const canvases = divTTIndex.querySelectorAll('canvas')
      canvases.forEach(canvas => canvas.remove())
    }

    // 设置滚动按钮并绘制连接线
    setTimeout(() => {
      setupScrollButtons()
      drawLines()
    }, 100)
  })
}

// ==================== 绘制连接线 (原版HTML 924-975行) ====================
const drawLines = () => {
  const tds = document.querySelectorAll('#tableTTIndex tr:first-child td[name="zs"]')
  if (tds.length === 0) return

  // 检查是否可见
  const firstTd = tds[0] as HTMLElement
  if (firstTd.offsetWidth === 0) {
    setTimeout(drawLines, 10)
    return
  }

  const divTTIndex = document.getElementById('divTTIndex')
  if (!divTTIndex) return

  const divRect = divTTIndex.getBoundingClientRect()

  // 为每个位置列（Số thứ 1, Số thứ 2, ...）绘制独立的canvas
  for (let z = 0; z < tds.length; z++) {
    const td = tds[z] as HTMLElement
    const tdRect = td.getBoundingClientRect()
    const hzspans = td.querySelectorAll('[name="hzspan"]')

    if (hzspans.length < 2) continue // 至少需要2个点才能画线

    // 创建canvas
    const cvs = document.createElement('canvas')
    cvs.style.position = 'absolute'
    cvs.style.zIndex = '10'
    cvs.style.left = (tdRect.left - divRect.left) + 'px'
    cvs.style.top = '0'
    cvs.width = td.offsetWidth
    cvs.height = td.offsetHeight

    const ctx = cvs.getContext('2d')
    if (!ctx) continue

    ctx.strokeStyle = '#1fa6e8'
    ctx.lineWidth = 1
    ctx.beginPath()

    // 连接所有的hzspan点
    for (let i = 0; i < hzspans.length - 1; i++) {
      const current = hzspans[i] as HTMLElement
      const next = hzspans[i + 1] as HTMLElement

      const coff = current.getBoundingClientRect()
      const noff = next.getBoundingClientRect()

      // 计算相对于td的中心点坐标
      const cx = coff.left - tdRect.left + (current.offsetWidth / 2)
      const cy = coff.top - tdRect.top + (current.offsetHeight / 2)
      const nx = noff.left - tdRect.left + (next.offsetWidth / 2)
      const ny = noff.top - tdRect.top + (next.offsetHeight / 2)

      ctx.moveTo(cx, cy)
      ctx.lineTo(nx, ny)

      // 将span提升到绝对定位，使其显示在canvas之上
      current.remove()
      const currentClone = current.cloneNode(true) as HTMLElement
      currentClone.style.position = 'absolute'
      currentClone.style.left = (coff.left - divRect.left) + 'px'
      currentClone.style.top = (coff.top - divRect.top) + 'px'
      currentClone.style.zIndex = '100'
      divTTIndex.appendChild(currentClone)

      // 处理最后一个点
      if (i === hzspans.length - 2) {
        next.remove()
        const nextClone = next.cloneNode(true) as HTMLElement
        nextClone.style.position = 'absolute'
        nextClone.style.left = (noff.left - divRect.left) + 'px'
        nextClone.style.top = (noff.top - divRect.top) + 'px'
        nextClone.style.zIndex = '100'
        divTTIndex.appendChild(nextClone)
      }
    }

    ctx.closePath()
    ctx.stroke()
    divTTIndex.appendChild(cvs)
  }
}

// ==================== 滚动按钮功能 ====================
// 存储事件监听器引用，避免重复绑定
let scrollButtonsInitialized = false

const setupScrollButtons = () => {
  // 如果已经初始化过，跳过（避免重复绑定）
  if (scrollButtonsInitialized) return
  scrollButtonsInitialized = true

  const mouseScrollEvent = (containerId: string, leftBtnId: string, rightBtnId: string, linkedContainerId?: string) => {
    const leftBtn = document.getElementById(leftBtnId) as HTMLElement | null
    const rightBtn = document.getElementById(rightBtnId) as HTMLElement | null
    const container = document.getElementById(containerId) as HTMLElement | null
    const linkedContainer = linkedContainerId ? document.getElementById(linkedContainerId) as HTMLElement | null : null
    const table = container?.querySelector('table') as HTMLElement | null

    if (!leftBtn || !rightBtn || !container || !table) return

    const scrollWidth = 350

    const mousefunc = (e: MouseEvent) => {
      const tableWidth = table.offsetWidth
      if (tableWidth > container.clientWidth) {
        const rect = container.getBoundingClientRect()
        const btnHeight = Math.min(container.clientHeight, 66)
        const scroll50Height = btnHeight / 2
        const containerOffsetTop = rect.top + window.scrollY
        let top = e.pageY - containerOffsetTop

        if (top < scroll50Height) {
          top = 0
        } else if (top + scroll50Height > container.clientHeight) {
          top = container.clientHeight - btnHeight
        } else {
          top -= scroll50Height
        }

        leftBtn.style.top = top + 'px'
        rightBtn.style.top = top + 'px'

        const scrollLeft = container.scrollLeft
        if (scrollLeft > 0) {
          leftBtn.style.display = 'block'
          if ((container.scrollWidth - scrollLeft) <= container.clientWidth) {
            rightBtn.style.display = 'none'
          } else {
            rightBtn.style.display = 'block'
          }
        } else {
          rightBtn.style.display = 'block'
          leftBtn.style.display = 'none'
        }
      }
    }

    leftBtn.addEventListener('mousemove', mousefunc)
    leftBtn.addEventListener('click', (e) => {
      const left = container.scrollLeft - scrollWidth - 1
      container.scrollLeft = left
      if (linkedContainer) linkedContainer.scrollLeft = left
      mousefunc(e)
    })

    rightBtn.addEventListener('mousemove', mousefunc)
    rightBtn.addEventListener('click', (e) => {
      const left = container.scrollLeft + scrollWidth + 1
      container.scrollLeft = left
      if (linkedContainer) linkedContainer.scrollLeft = left
      mousefunc(e)
    })

    container.addEventListener('mousemove', mousefunc)
    container.addEventListener('mouseout', () => {
      leftBtn.style.display = 'none'
      rightBtn.style.display = 'none'
    })
  }

  mouseScrollEvent('divTTIndex', 'spanTTIndexScrollLeft', 'spanTTIndexScrollRight', 'divTTIndexTJ')
  mouseScrollEvent('divTTIndexTJ', 'spanTTIndexTJScrollLeft', 'spanTTIndexTJScrollRight', 'divTTIndex')
}


// ==================== Watchers ====================
// 监听 count 变化
watch(() => props.count, () => {
  nextTick(() => {
    renderTrend()
  })
})

// 监听 gameCode 变化
watch(() => props.gameCode, async () => {
  // 立即清空旧数据，避免显示混乱
  clearTables()
  
  nextTick(() => {
    renderTrend()
  })
})

// 监听数据变化
watch(() => lotteryHistory.value, (newVal, oldVal) => {
  // 如果数据被清空，跳过渲染（已经在 clearTables 中处理）
  if (!newVal || newVal.length === 0) {
    return
  }

  // 验证数据是否匹配当前 gameCode，避免使用错误的数据
  if (props.gameCode && newVal.length > 0) {
    const firstItem = newVal[0]
    if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
      console.warn('⚠️ TrendIndexTab watcher: 数据不匹配，跳过渲染')
      return
    }
  }

  // 🔥 检查是否是开奖更新（期号变化）
  const isPeriodChanged = oldVal && oldVal.length > 0 && newVal.length > 0 &&
    oldVal[0]?.number !== newVal[0]?.number

  if (isPeriodChanged) {
    // 🔥 立即清空旧数据，避免新旧数据重叠
    clearTables()
  }

  // 如果是开奖更新，需要延迟渲染确保 DOM 完全更新
  if (isPeriodChanged) {
    nextTick(() => {
      setTimeout(() => {
        renderTrend()
      }, 300)
      // 再次延迟渲染，确保稳定
      setTimeout(() => {
        renderTrend()
      }, 600)
    })
  } else {
    // 普通数据变化，正常渲染
    nextTick(() => {
      renderTrend()
    })
  }
}, { deep: true })
</script>

<!-- 全局样式 - 用于动态插入的HTML -->
<style>
/* 动态插入的表格单元格样式 - TrendIndex 专用 */
#tbodyTTIndexOpenCode tr td,
#tbodyTTIndex0 tr td,
#tbodyTTIndex1 tr td,
#tbodyTTIndex2 tr td,
#tbodyTTIndex3 tr td,
#tbodyTTIndex4 tr td,
#tbodyTTIndex5 tr td,
#tbodyTTIndex6 tr td,
#tbodyTTIndex7 tr td,
#tbodyTTIndex8 tr td,
#tbodyTTIndex9 tr td,
tbody[name="tbodyTTIndexTJCount"] tr td {
  height: 33px !important;
  min-height: 33px !important;
  max-height: 33px !important;
  line-height: 31px !important;
  text-align: center;
  align-content: center;
  border: 1px solid #e1e1e1;
  font-size: 13px;
  box-sizing: border-box !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
}

.zoushiqiu {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: #fff;
}
</style>

<style scoped>
/* 基础表格样式 - 完全还原原始HTML的样式 */
.tab-pane {
  width: 100%;
  opacity: 1 !important;
  display: block !important;
}

/* 整个表格的滚动容器 - 手机端可以滚动整个表格 */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
}

/* 隐藏整个表格容器的滚动条 */
.table-wrapper::-webkit-scrollbar {
  display: none;
}

.table-wrapper {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* PC端：隐藏内部容器的滚动条（由按钮控制滚动） */
#divTTIndex::-webkit-scrollbar,
#divTTIndexTJ::-webkit-scrollbar {
  display: none;
}

#divTTIndex,
#divTTIndexTJ {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.table-weizhi {
  border-collapse: collapse;
  border-spacing: 0;
  color: #555;
  width: auto;
  min-width: 100%;
  margin: 0;
  padding: 0;
}

.table-weizhi tr td,
.table-weizhi tr th {
  height: 33px;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  margin: 0;
  padding: 0;
}

.table-weizhi tr td:first-child,
.table-weizhi tr.firthtd th:first-child {
  border-left: 0;
}

.table-weizhi tr:last-child td {
  border-bottom: 0;
}

.table-weizhi-child {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.table-weizhi-child tbody tr td {
  border-bottom: 1px solid #e1e1e1;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 33px !important;
  min-height: 33px !important;
  line-height: 33px;
  box-sizing: border-box;
}

.table-weizhi-child tr:last-child td {
  border-bottom: 0;
}

.table-weizhi-child thead tr.firthtd th {
  background-color: #f5f5f5;
  border: 1px solid #e1e1e1;
  padding: 0;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  height: 33px;
  width: 34px;
  min-width: 34px;
  margin: 0;
}

/* 只针对 Số thứ 1-6 的标题和序号行固定 33px */
#tableTTIndex .table-weizhi-child thead tr.firthtd th,
#tableTTIndexTJ .table-weizhi-child thead tr.firthtd th {
  height: 33px !important;
  min-height: 33px !important;
  max-height: 33px !important;
  line-height: 33px !important;
  box-sizing: border-box !important;
}

/* 左侧标题栏：Kỳ mở thưởng 高度66px，Số trúng thưởng 自动高度 */
#tbodyTTIndexOpenCode {
  vertical-align: top;
}

/* 确保左侧开奖记录的每一行和右侧趋势图对齐 */
#tbodyTTIndexOpenCode tr td {
  height: 33px !important;
  min-height: 33px !important;
  line-height: 33px !important;
  vertical-align: middle !important;
}

/* 左侧第一列的标题不限制宽度，允许自动填充 */
.table-weizhi-child thead tr.firthtd th:only-child {
  width: auto;
  min-width: auto;
  max-width: none;
}

.table-weizhi-child tbody td {
  border: 1px solid #e1e1e1;
  padding: 0;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  font-size: 13px;
  color: #999999;
  width: 34px;
  min-width: 34px;
  max-width: 34px;
  height: 33px;
  margin: 0;
}

/* 滚动按钮样式 */
.click-scroll {
  display: none;
  z-index: 1000;
  position: absolute;
  top: 0;
  height: 100%;
  max-height: 66px;
  width: 33px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-color: rgb(8, 191, 2);
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.3s;
}

.click-scroll:hover {
  opacity: 0.8;
}

.scroll-left {
  left: 0;
}

.scroll-right {
  right: 0;
}

.scroll-left::after,
.scroll-right::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-style: solid;
}

.scroll-left::after {
  border-width: 8px 12px 8px 0;
  border-color: transparent #fff transparent transparent;
  margin-left: -3px;
}

.scroll-right::after {
  border-width: 8px 0 8px 12px;
  border-color: transparent transparent transparent #fff;
  margin-left: 3px;
}

/* 移动端适配 - 修复嵌套滚动冲突 */
@media (max-width: 768px) {
  /* 移动端禁用内层容器的滚动，只保留外层滚动 */
  #divTTIndex,
  #divTTIndexTJ {
    width: auto !important;
    overflow-x: visible !important;
    overflow-y: visible !important;
  }

  /* 移动端隐藏滚动按钮（PC端控制功能） */
  .click-scroll {
    display: none !important;
  }

  /* 确保表格在移动端可以完整显示，由外层容器滚动 */
  #tableTTIndex,
  #tableTTIndexTJ {
    width: auto !important;
  }

  /* 移动端表格最小宽度确保所有列都可见 */
  .table-weizhi {
    min-width: 1500px; /* 248px(左列) + 多个位置列 = 确保所有列可见 */
  }
}
</style>
