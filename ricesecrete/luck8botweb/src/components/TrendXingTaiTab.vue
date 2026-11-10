<template>
  <div id="TrendTabXingTai" class="tab-pane fade" role="tabpanel">
    <div class="table-wrapper">
      <table id="tableTrendTabXingTai" class="table-weizhi" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <!-- 后2位形态 - 40% 宽度 -->
            <td valign="top" style="width:40%;">
              <div style="position:relative;">
                <div id="divHou2XingTai" style="width:100%;overflow-x:hidden;position:relative;z-index:1;">
                  <table class="table-weizhi-child" style="width:100%;" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr class="firthtd"><th colspan="4">Đề Đặc Biệt  CMYK</th></tr>
                      <tr class="firthtd">
                        <th width="25%">Xỉu Lẻ</th>
                        <th width="25%">Xỉu chẵn</th>
                        <th width="25%">Tài Lẻ</th>
                        <th width="25%">Tài chẵn</th>
                      </tr>
                    </thead>
                    <tbody id="tbodyHou2XingTai" style="color:#999999;"></tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4" class="border-top" style="padding:0px 10px;">
                          <table style="width:auto;margin:0;" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: rgb(60, 176, 236);" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdHou2XingTaiXDCount" class="border-0" style="padding:5px;"></td>
                                <td class="border-0" style="width:10px;"></td>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: #D81E06;" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdHou2XingTaiXSCount" class="border-0" style="padding:5px;"></td>
                                <td class="border-0" style="width:10px;"></td>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: rgb(250, 153, 50);" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdHou2XingTaiDDCount" class="border-0" style="padding:5px;"></td>
                                <td class="border-0" style="width:10px;"></td>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: #28210A;" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdHou2XingTaiDSCount" class="border-0" style="padding:5px;"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </td>

            <!-- 第4位形态 - 30% 宽度 -->
            <td valign="top" style="width:30%;">
              <div style="position:relative;">
                <div id="divIndex4bs" style="width:100%;overflow-x:hidden;position:relative;z-index:1;">
                  <table class="table-weizhi-child" style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr class="firthtd"><th colspan="3">Số thứ 4</th></tr>
                      <tr class="firthtd">
                        <th width="45%">Xỉu</th>
                        <th width="10%">&nbsp;</th>
                        <th width="45%">Tài</th>
                      </tr>
                    </thead>
                    <tbody id="tbodyIndex4bs" style="color:#999999;"></tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="border-top" style="padding:0px 10px;">
                          <table style="width:auto;margin:0;" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: #D81E06;" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdIndex4bsMinCount" class="border-0" style="padding:5px;"></td>
                                <td class="border-0" style="width:10px;"></td>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: #28210A;" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdIndex4bsMaxCount" class="border-0" style="padding:5px;"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </td>

            <!-- 第5位形态 - 30% 宽度 -->
            <td valign="top" style="width:30%;">
              <div style="position:relative;">
                <div id="divIndex5sd" style="width:100%;overflow-x:hidden;position:relative;z-index:1;">
                  <table class="table-weizhi-child" style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr class="firthtd"><th colspan="3">Số thứ 5</th></tr>
                      <tr class="firthtd">
                        <th width="45%">Lẻ</th>
                        <th width="10%">&nbsp;</th>
                        <th width="45%">Chẵn</th>
                      </tr>
                    </thead>
                    <tbody id="tbodyIndex5sd" style="color:#999999;"></tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="border-top" style="padding:0px 10px;">
                          <table style="width:auto;margin:0;" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: #D81E06;" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdIndex5sdDCount" class="border-0" style="padding:5px;"></td>
                                <td class="border-0" style="width:10px;"></td>
                                <td class="border-0" style="padding:10px 5px 3px 5px;">
                                  <span style="background: #28210A;" name="hzspan" class="zoushiqiu"></span>
                                </td>
                                <td id="tdIndex5sdSCount" class="border-0" style="padding:5px;"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
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
import { onMounted, nextTick, watch, ref, inject } from 'vue'
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

// ==================== Data Loading ====================
const loadHistoryData = async () => {
  if (!props.gameCode) {
    console.warn('⚠️ No gameCode provided for TrendXingTaiTab')
    return
  }

  if (sharedHistoryData?.refresh) {
    await sharedHistoryData.refresh(props.gameCode)
  } else {
    console.warn('⚠️ TrendXingTaiTab: 未找到共享数据源')
  }
}

// ==================== 清空表格内容 ====================
const clearTables = () => {
  const tbodyHou2XingTai = document.getElementById('tbodyHou2XingTai')
  if (tbodyHou2XingTai) tbodyHou2XingTai.innerHTML = ''

  const tbodyIndex4bs = document.getElementById('tbodyIndex4bs')
  if (tbodyIndex4bs) tbodyIndex4bs.innerHTML = ''

  const tbodyIndex5sd = document.getElementById('tbodyIndex5sd')
  if (tbodyIndex5sd) tbodyIndex5sd.innerHTML = ''

  // 清空统计数据
  const statIds = [
    'tdHou2XingTaiXDCount', 'tdHou2XingTaiXSCount', 'tdHou2XingTaiDDCount', 'tdHou2XingTaiDSCount',
    'tdIndex4bsMinCount', 'tdIndex4bsMaxCount', 'tdIndex5sdDCount', 'tdIndex5sdSCount'
  ]
  statIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.innerHTML = '0.00%'
  })

  // 清空canvas和绝对定位的cloned spans
  const divHou2XingTai = document.getElementById('divHou2XingTai')
  const divIndex4bs = document.getElementById('divIndex4bs')
  const divIndex5sd = document.getElementById('divIndex5sd')

  // 移除canvas和绝对定位的cloned spans（这些是drawLines创建的）
  const clearDiv = (div: HTMLElement | null) => {
    if (!div) return
    div.querySelectorAll('canvas').forEach(c => c.remove())
    div.querySelectorAll('span[name="hzspan"]').forEach(s => {
      const span = s as HTMLElement
      if (span.style.position === 'absolute') {
        span.remove()
      }
    })
  }

  clearDiv(divHou2XingTai)
  clearDiv(divIndex4bs)
  clearDiv(divIndex5sd)
}

// ==================== Trend Rendering ====================
const renderTrend = () => {
  if (!lotteryHistory.value || lotteryHistory.value.length === 0) {
    console.warn('⚠️ No lottery data available for TrendXingTaiTab')
    clearTables()
    return
  }

  // 验证数据是否匹配当前 gameCode（仅在有 gameCode 时验证）
  if (props.gameCode) {
    const firstItem = lotteryHistory.value[0]
    if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
      console.warn('⚠️ 数据不匹配！当前 gameCode:', props.gameCode, '数据 code:', firstItem.code, '- 等待正确数据')
      clearTables()
      return
    }
  }

  // 执行原版的 loadTrendXingTai 逻辑
  loadTrendXingTai()
}

// ==================== Load Trend XingTai (原版逻辑 978-1107行) ====================
const loadTrendXingTai = () => {
  const h2XTHtml: string[] = []
  const index4DXHtml: string[] = []
  const index5DSHtml: string[] = []
  const tjCount = [0, 0, 0, 0, 0, 0, 0, 0]

  let trendLotteryXingTaiCount = props.count || lotteryHistory.value.length
  if (!trendLotteryXingTaiCount) trendLotteryXingTaiCount = lotteryHistory.value.length

  for (let i = trendLotteryXingTaiCount - 1; i >= 0; i--) {
    const lottery = lotteryHistory.value[i]

    let codes = lottery.lottery_results ? lottery.lottery_results.split(',') : []
    // 处理 * 分隔符（某些彩种使用）
    if (codes.length > 0 && codes[0].indexOf('*') > -1) {
      codes = Array.from(codes[0].split('*')[0])
    }

    // 后2位形态分析
    const houer = codes[codes.length - 2] + codes[codes.length - 1]
    const houerCode = parseInt(houer)
    if (houerCode <= 49) { // 小
      if (houerCode % 2 === 1) { // 单
        tjCount[0]++
        h2XTHtml.push('<tr><td><span style="background: rgb(60, 176, 236);" name="hzspan" class="zoushiqiu">' + houer + '</span></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>')
      } else { // 双
        tjCount[1]++
        h2XTHtml.push('<tr><td>&nbsp;</td><td><span style="background: #D81E06;" name="hzspan" class="zoushiqiu">' + houer + '</span></td><td>&nbsp;</td><td>&nbsp;</td></tr>')
      }
    } else { // 大
      if (houerCode % 2 === 1) { // 单
        tjCount[2]++
        h2XTHtml.push('<tr><td>&nbsp;</td><td>&nbsp;</td><td><span style="background: rgb(250, 153, 50);" name="hzspan" class="zoushiqiu">' + houer + '</span></td><td>&nbsp;</td></tr>')
      } else { // 双
        tjCount[3]++
        h2XTHtml.push('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td><span style="background: #28210A;" name="hzspan" class="zoushiqiu">' + houer + '</span></td></tr>')
      }
    }

    // 第4位形态分析
    const index4Code = parseInt(codes[3])
    if (index4Code <= 4) { // 小
      tjCount[4]++
      index4DXHtml.push('<tr><td><span style="background: #D81E06;" name="hzspan" class="zoushiqiu">' + index4Code + '</span></td><td>&nbsp;</td><td>&nbsp;</td></tr>')
    } else { // 大
      tjCount[5]++
      index4DXHtml.push('<tr><td>&nbsp;</td><td>&nbsp;</td><td><span style="background: #28210A;" name="hzspan" class="zoushiqiu">' + index4Code + '</span></td></tr>')
    }

    // 第5位形态分析
    const index5Code = parseInt(codes[4])
    if (index5Code % 2 === 1) { // 单
      tjCount[6]++
      index5DSHtml.push('<tr><td><span style="background: #D81E06;" name="hzspan" class="zoushiqiu">' + index5Code + '</span></td><td>&nbsp;</td><td>&nbsp;</td></tr>')
    } else { // 双
      tjCount[7]++
      index5DSHtml.push('<tr><td>&nbsp;</td><td>&nbsp;</td><td><span style="background: #28210A;" name="hzspan" class="zoushiqiu">' + index5Code + '</span></td></tr>')
    }
  }

  // 更新表格HTML
  const tbodyHou2XingTai = document.getElementById('tbodyHou2XingTai')
  if (tbodyHou2XingTai) {
    tbodyHou2XingTai.innerHTML = h2XTHtml.reverse().join('')
  }

  const tbodyIndex4bs = document.getElementById('tbodyIndex4bs')
  if (tbodyIndex4bs) {
    tbodyIndex4bs.innerHTML = index4DXHtml.reverse().join('')
  }

  const tbodyIndex5sd = document.getElementById('tbodyIndex5sd')
  if (tbodyIndex5sd) {
    tbodyIndex5sd.innerHTML = index5DSHtml.reverse().join('')
  }

  // 更新统计百分比
  const tdHou2XingTaiXDCount = document.getElementById('tdHou2XingTaiXDCount')
  if (tdHou2XingTaiXDCount) {
    tdHou2XingTaiXDCount.innerHTML = ((tjCount[0] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  const tdHou2XingTaiXSCount = document.getElementById('tdHou2XingTaiXSCount')
  if (tdHou2XingTaiXSCount) {
    tdHou2XingTaiXSCount.innerHTML = ((tjCount[1] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  const tdHou2XingTaiDDCount = document.getElementById('tdHou2XingTaiDDCount')
  if (tdHou2XingTaiDDCount) {
    tdHou2XingTaiDDCount.innerHTML = ((tjCount[2] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  const tdHou2XingTaiDSCount = document.getElementById('tdHou2XingTaiDSCount')
  if (tdHou2XingTaiDSCount) {
    tdHou2XingTaiDSCount.innerHTML = ((tjCount[3] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  const tdIndex4bsMinCount = document.getElementById('tdIndex4bsMinCount')
  if (tdIndex4bsMinCount) {
    tdIndex4bsMinCount.innerHTML = ((tjCount[4] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  const tdIndex4bsMaxCount = document.getElementById('tdIndex4bsMaxCount')
  if (tdIndex4bsMaxCount) {
    tdIndex4bsMaxCount.innerHTML = ((tjCount[5] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  const tdIndex5sdDCount = document.getElementById('tdIndex5sdDCount')
  if (tdIndex5sdDCount) {
    tdIndex5sdDCount.innerHTML = ((tjCount[6] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  const tdIndex5sdSCount = document.getElementById('tdIndex5sdSCount')
  if (tdIndex5sdSCount) {
    tdIndex5sdSCount.innerHTML = ((tjCount[7] / trendLotteryXingTaiCount) * 100).toFixed(2) + '%'
  }

  // 重置滚动位置，移除之前的划线
  nextTick(() => {
    const divHou2XingTai = document.getElementById('divHou2XingTai')
    const divIndex4bs = document.getElementById('divIndex4bs')
    const divIndex5sd = document.getElementById('divIndex5sd')

    if (divHou2XingTai) {
      divHou2XingTai.scrollLeft = 0
      divHou2XingTai.querySelectorAll('canvas').forEach(canvas => canvas.remove())
    }
    if (divIndex4bs) {
      divIndex4bs.scrollLeft = 0
      divIndex4bs.querySelectorAll('canvas').forEach(canvas => canvas.remove())
    }
    if (divIndex5sd) {
      divIndex5sd.scrollLeft = 0
      divIndex5sd.querySelectorAll('canvas').forEach(canvas => canvas.remove())
    }

    // 绘制连接线
    setTimeout(() => {
      drawLines()
    }, 100)
  })
}

// ==================== 绘制连接线 (原版HTML 1056-1107行) ====================
const drawLines = () => {
  const hzspans = document.querySelectorAll('#tableTrendTabXingTai span[name="hzspan"]')
  if (hzspans.length === 0) return

  // 检查是否可见
  const firstSpan = hzspans[0] as HTMLElement
  if (firstSpan.offsetWidth === 0) {
    setTimeout(drawLines, 10)
    return
  }

  const tbodys = document.querySelectorAll('#tbodyHou2XingTai, #tbodyIndex4bs, #tbodyIndex5sd')
  for (let z = 0; z < tbodys.length; z++) {
    const tbody = tbodys[z] as HTMLElement
    const tbodyRect = tbody.getBoundingClientRect()
    const div = tbody.parentElement?.parentElement
    if (!div) continue

    const divRect = div.getBoundingClientRect()
    const bodyHzspans = tbody.querySelectorAll('[name="hzspan"]')

    if (bodyHzspans.length < 2) continue // 至少需要2个点才能画线

    // 创建canvas
    const cvs = document.createElement('canvas')
    cvs.style.position = 'absolute'
    cvs.style.zIndex = '10'
    cvs.style.left = (tbodyRect.left - divRect.left) + 'px'
    cvs.style.top = (tbodyRect.top - divRect.top) + 'px'
    cvs.width = tbody.offsetWidth
    cvs.height = tbody.offsetHeight

    const ctx = cvs.getContext('2d')
    if (!ctx) continue

    ctx.strokeStyle = '#1fa6e8'
    ctx.lineWidth = 1
    ctx.beginPath()

    // 连接所有的hzspan点
    for (let i = 0; i < bodyHzspans.length - 1; i++) {
      const current = bodyHzspans[i] as HTMLElement
      const next = bodyHzspans[i + 1] as HTMLElement

      const coff = current.getBoundingClientRect()
      const noff = next.getBoundingClientRect()

      // 计算相对于tbody的中心点坐标
      const cx = coff.left - tbodyRect.left + (current.offsetWidth / 2)
      const cy = coff.top - tbodyRect.top + (current.offsetHeight / 2)
      const nx = noff.left - tbodyRect.left + (next.offsetWidth / 2)
      const ny = noff.top - tbodyRect.top + (next.offsetHeight / 2)

      ctx.moveTo(cx, cy)
      ctx.lineTo(nx, ny)

      // 将span提升到绝对定位，使其显示在canvas之上
      current.remove()
      const currentClone = current.cloneNode(true) as HTMLElement
      currentClone.style.position = 'absolute'
      currentClone.style.left = (coff.left - divRect.left) + 'px'
      currentClone.style.top = (coff.top - divRect.top) + 'px'
      currentClone.style.zIndex = '100'
      div.appendChild(currentClone)

      // 处理最后一个点
      if (i === bodyHzspans.length - 2) {
        next.remove()
        const nextClone = next.cloneNode(true) as HTMLElement
        nextClone.style.position = 'absolute'
        nextClone.style.left = (noff.left - divRect.left) + 'px'
        nextClone.style.top = (noff.top - divRect.top) + 'px'
        nextClone.style.zIndex = '100'
        div.appendChild(nextClone)
      }
    }

    ctx.closePath()
    ctx.stroke()
    div.appendChild(cvs)
  }
}

// ==================== Lifecycle ====================
onMounted(async () => {
  await loadHistoryData()
  nextTick(() => {
    renderTrend()
  })
})

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
  await loadHistoryData()
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
      console.warn('⚠️ TrendXingTaiTab watcher: 数据不匹配，跳过渲染')
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
/* 动态插入的表格单元格样式 - XingTai 专用 */
#tbodyHou2XingTai tr td,
#tbodyIndex4bs tr td,
#tbodyIndex5sd tr td {
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

.table-weizhi {
  border-collapse: collapse;
  border-spacing: 0;
  color: #555;
  width: 100%;
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
  margin: 0;
}

.table-weizhi-child tfoot td {
  border: 1px solid #e1e1e1;
  padding: 0;
  text-align: center;
  align-content: center;
  font-size: 13px;
  color: #999999;
  height: auto;
  margin: 0;
}

.border-0 {
  border: 0 !important;
}

.border-top {
  border-top: 1px solid #e1e1e1 !important;
}
</style>
