<template>
  <div id="TrendTabLuckywin" class="tab-pane fade" role="tabpanel">
    <div class="table-wrapper">
      <table id="tableTrendLuckywin" class="table-weizhi" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td valign="top" style="width:33.33%;">
            <div style="position:relative;">
              <div id="divHeZhiLuckywin1" style="width:100%;overflow-x:hidden;overflow-y:visible;position:relative;z-index:1;">
                <table id="tableHeZhiLuckywinTitle1" class="table-weizhi" style="width:100%;height:66px;" border="0" cellpadding="0" cellspacing="0">
                  <thead id="theadHeZhiLuckywinTitle1"></thead>
                </table>
                <table id="tableHeZhiLuckywin1" class="table-weizhi-child" style="width:auto;position:relative;z-index:1;left:0px;" border="0" cellpadding="0" cellspacing="0">
                  <tbody id="tbodyHeZhiLuckywin1" style="color:#999999;"></tbody>
                </table>
                <div style="height:30px;position:relative;z-index:1;"></div>
              </div>
            </div>
          </td>
          <td valign="top" style="width:33.33%;">
            <div style="position:relative;">
              <div id="divHeZhiLuckywin2" style="width:100%;overflow-x:hidden;overflow-y:visible;position:relative;z-index:1;">
                <table id="tableHeZhiLuckywinTitle2" class="table-weizhi" style="width:100%;height:66px;" border="0" cellpadding="0" cellspacing="0">
                  <thead id="theadHeZhiLuckywinTitle2"></thead>
                </table>
                <table id="tableHeZhiLuckywin2" class="table-weizhi-child" style="width:auto;position:relative;z-index:1;left:0px;" border="0" cellpadding="0" cellspacing="0">
                  <tbody id="tbodyHeZhiLuckywin2" style="color:#999999;"></tbody>
                </table>
                <div style="height:30px;position:relative;z-index:1;"></div>
              </div>
            </div>
          </td>
          <td valign="top" style="width:33.33%;">
            <div style="position:relative;">
              <div id="divHeZhiLuckywin3" style="width:100%;overflow-x:hidden;overflow-y:visible;position:relative;z-index:1;">
                <table id="tableHeZhiLuckywinTitle3" class="table-weizhi" style="width:100%;height:66px;" border="0" cellpadding="0" cellspacing="0">
                  <thead id="theadHeZhiLuckywinTitle3"></thead>
                </table>
                <table id="tableHeZhiLuckywin3" class="table-weizhi-child" style="width:auto;position:relative;z-index:1;left:0px;" border="0" cellpadding="0" cellspacing="0">
                  <tbody id="tbodyHeZhiLuckywin3" style="color:#999999;"></tbody>
                </table>
                <div style="height:30px;position:relative;z-index:1;"></div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding:10px 22px;">
            <table style="width:auto;margin:0;" border="0" cellpadding="0" cellspacing="0">
              <tbody><tr>
                <td class="border-0" style="padding:8px 5px 5px 5px;"><span style="background: #D81E06;" name="hzspan" class="zoushiqiu"></span></td>
                <td id="tdMinCount" class="border-0" style="padding:5px;"></td>
                <td class="border-0" style="width:10px;"></td>
                <td class="border-0" style="padding:8px 5px 5px 5px;"><span style="background: #28210A;" name="hzspan" class="zoushiqiu"></span></td>
                <td id="tdMaxCount" class="border-0" style="padding:5px;"></td>
                <td name="tdBZ" class="border-0" style="width:10px;display:none;"></td>
                <td name="tdBZ" class="border-0" style="padding: 8px 5px 5px 5px; display: none;"><span style="background: rgb(31, 166, 232);" name="hzspan" class="zoushiqiu"></span></td>
                <td id="tdBzCount" name="tdBZ" class="border-0" style="padding:5px;display:none;"></td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, computed, watch, ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { LotteryHistoryItem } from '@/services/lotteryService'

// ==================== Props ====================
interface Props {
  gameType: 'luckywin' | 'sicbo' | 'mienbac' | 'miennam' | 'keno'
  count: number
  gameCode?: string
}

const props = defineProps<Props>()

// ==================== Inject Shared Data ====================
// 从父组件获取共享的历史数据
const sharedHistoryData = inject<{
  data: Ref<LotteryHistoryItem[]>
  isLoading: Ref<boolean>
  refresh: (gameCode?: string, forceRefresh?: boolean) => Promise<void>
}>('sharedHistoryData')

// 如果没有共享数据，使用本地数据（兼容独立使用场景）
const lotteryHistory = sharedHistoryData?.data || ref<LotteryHistoryItem[]>([])

// ==================== API Data Loading ====================
// 清空表格内容
const clearTables = () => {
  // 清空三个列的tbody
  for (let i = 1; i <= 3; i++) {
    const tbody = document.getElementById(`tbodyHeZhiLuckywin${i}`)
    if (tbody) tbody.innerHTML = ''

    const thead = document.getElementById(`theadHeZhiLuckywinTitle${i}`)
    if (thead) thead.innerHTML = ''

    const div = document.getElementById(`divHeZhiLuckywin${i}`)
    if (div) {
      // 移除canvas和绝对定位的cloned spans
      div.querySelectorAll('canvas').forEach(c => c.remove())
      div.querySelectorAll('span[name="hzspan"]').forEach(s => {
        const span = s as HTMLElement
        if (span.style.position === 'absolute') {
          span.remove()
        }
      })
    }
  }

  // 清空统计数据
  const tdMinCount = document.getElementById('tdMinCount')
  const tdMaxCount = document.getElementById('tdMaxCount')
  const tdBzCount = document.getElementById('tdBzCount')
  if (tdMinCount) tdMinCount.innerHTML = '0.00%'
  if (tdMaxCount) tdMaxCount.innerHTML = '0.00%'
  if (tdBzCount) tdBzCount.innerHTML = '0.00%'
}

// 加载历史数据
const loadHistoryData = async () => {
  if (!props.gameCode) {
    console.warn('⚠️ No gameCode provided for TrendTabLuckywin, using mock data')
    return
  }

  // 如果有共享数据源，使用共享的 refresh 方法
  if (sharedHistoryData?.refresh) {
    await sharedHistoryData.refresh(props.gameCode)
  } else {
    console.warn('⚠️ TrendTabLuckywin: 未找到共享数据源')
  }
}

// ==================== Computed Properties ====================
// 判断是否显示豹子
const showBaoZi = computed(() => {
  return props.gameType === 'sicbo'
})

// 历史数据（优先使用API数据，否则使用模拟数据）
const historyData = computed(() => {
  // 如果有API数据，使用API数据
  if (lotteryHistory.value && lotteryHistory.value.length > 0) {
    // 验证数据是否匹配当前 gameCode
    if (props.gameCode) {
      const firstItem = lotteryHistory.value[0]
      if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
        console.warn('⚠️ TrendTabLuckywin 数据不匹配！当前 gameCode:', props.gameCode, '数据 code:', firstItem.code, '- 等待正确数据')
        // 返回空数组，等待正确数据
        return []
      }
    }

    // 根据 props.count 截取数据
    const limitedData = lotteryHistory.value.slice(0, props.count)
    const result = limitedData.map(item => ({
      expect: item.number || '',
      openCode: item.lottery_results || ''
    }))
    return result
  }

  // 如果没有数据，返回空数组
  return []
})

// ==================== Trend Drawing Functions ====================
// 渲染走势图的主函数
const renderTrend = () => {
  if (!lotteryHistory.value || lotteryHistory.value.length === 0) {
    console.warn('⚠️ No lottery data available for TrendTabLuckywin')
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

  // 执行原版的 loadTrendLuckywin 逻辑
  loadTrendLuckywin()
}

// 完全复制原始HTML的 loadTrendLuckywin 函数
const loadTrendLuckywin = () => {
  const data = historyData.value
  if (data.length === 0) {
    console.warn('⚠️ TrendTabLuckywin: 没有数据可显示')
    return
  }
  // 三种列布局类型
  const showHeZhiLuckywinType = (type: string, idIndex: number) => {
    const ltArray = type.split(',').map(Number)
    const tableTrendLuckywin = document.getElementById('tableTrendLuckywin')
    if (!tableTrendLuckywin) return

    const cellWidth = tableTrendLuckywin.offsetWidth / 3 / ltArray.length

    const divHeZhiLuckywin = document.getElementById(`divHeZhiLuckywin${idIndex}`)
    const tbody = document.getElementById(`tbodyHeZhiLuckywin${idIndex}`)
    const tableTitle = document.getElementById(`tableHeZhiLuckywinTitle${idIndex}`)
    const table = document.getElementById(`tableHeZhiLuckywin${idIndex}`)

    if (!divHeZhiLuckywin || !tbody || !tableTitle || !table) return

    // 设置table的left位置 - 完全复制原始HTML第1123行
    ;(table as HTMLElement).style.left = `${cellWidth / 2}px`

    // 清空之前的内容
    tbody.innerHTML = ''

    // 移除旧的canvas和span
    divHeZhiLuckywin.querySelectorAll('[name="hzspan"], canvas').forEach(el => el.remove())

    // 生成表头 - 完全复制原始HTML第1128-1136行
    const titleHtml: string[] = []
    titleHtml.push('<tr class="firthtd">')

    for (let i = 0; i < ltArray.length; i++) {
      titleHtml.push(`<th style="width:${cellWidth}px;" class="border-0">${ltArray[i]}</th>`)
    }

    titleHtml.push('</tr>')
    tableTitle.querySelector('thead')!.innerHTML = titleHtml.join('')

    // 生成走势图背景行和数字球（使用绝对定位显示在网格交叉点）
    // 完全复制原始HTML第1140-1196行的逻辑
    const zstHTML: string[] = []
    const hezhispanHTML: string[] = []
    let minCount = 0, maxCount = 0, bzCount = 0

    // 原版HTML使用的背景行模板（只有竖线边框，最后一列没有边框）
    const rowCells: string[] = ['<tr>']
    for (let col = 0; col < ltArray.length; col++) {
      if (col !== ltArray.length - 1) {
        // 其他列显示空白，带右边框（原版HTML第1131行）
        rowCells.push(`<td style="width:${cellWidth}px;" class="border">&nbsp;</td>`)
      }
    }
    rowCells.push('</tr>')
    const tr = rowCells.join('')

    // 原版HTML逻辑：从最旧到最新倒序遍历（第1144行：for i = count-1 down to 0）
    // lotteryList[0] 是最新数据，lotteryList[count-1] 是最旧数据
    // 循环：i 从 count-1（最旧）到 0（最新）
    // 第1145行：var lottery = lotteryList[i] - 直接使用 lotteryList[i]
    // 这意味着：
    //   i = count-1 时，使用 lotteryList[count-1]（最旧），Y坐标 = (count-1) * 33（底部）
    //   i = 0 时，使用 lotteryList[0]（最新），Y坐标 = 0 * 33（顶部）
    const trendCount = data.length
    for (let i = trendCount - 1; i >= 0; i--) {
      const record = data[i] // 完全复制原版HTML第1145行：直接使用 data[i]
      const nums = record.openCode.split(',').map(Number)
      const hz = nums.reduce((a, b) => a + b, 0)

      // 判断是否为豹子（三同）
      const bz = nums[0] === nums[1] && nums[1] === nums[2]

      // 添加背景行（原版HTML第1160行：只有 i > 0 时才添加）
      // 这意味着最新数据（i=0）上面没有背景行，符合原版UI
      if (i > 0) {
        zstHTML.push(tr)
      }

      // 统计数据
      if (bz && showBaoZi.value) {
        bzCount++
      } else if (hz <= 10) {
        minCount++
      } else {
        maxCount++
      }

      // 确定颜色（原版HTML第1180-1190行）
      let color = ''
      if (bz && showBaoZi.value) {
        color = 'rgb(31, 166, 232)'
      } else if (hz <= 10) {
        color = '#D81E06'
      } else {
        color = '#28210A'
      }

      // 计算球的X坐标（原版HTML第1162-1178行）
      let spanLeft = cellWidth / 2

      for (let m = 0; m < ltArray.length; m++) {
        const cur = ltArray[m]
        if (hz === cur) {
          spanLeft += m * cellWidth
          break
        }
        if (hz > cur) {
          if (m < ltArray.length - 1) {
            const next = ltArray[m + 1]
            if (hz < next) {
              spanLeft += m * cellWidth + (cellWidth / 2)
              break
            }
          }
        }
      }

      // 创建绝对定位的球（原版HTML第1192行）
      // 完全复制原版公式：i * 33 + tableTitle.height() - 12
      // 这使得球心对齐在：top + 12 = i * 33 + tableTitle.height()
      // 即球心对齐在每行的顶部边界线上
      const topPos = i * 33 + tableTitle.offsetHeight - 12
      const displayText = bz && showBaoZi.value ? 'X' : hz
      hezhispanHTML.push(
        `<span style="background: ${color}; position: absolute; left: ${spanLeft - 12}px; top: ${topPos}px; z-index: 100;" name="hzspan" class="zoushiqiu">${displayText}</span>`
      )
    }

    // 填充tbody背景（原版HTML第1194行）
    tbody.innerHTML = zstHTML.join('')

    // 插入绝对定位的球（原版HTML第1196行 - 注意这里有reverse()）
    divHeZhiLuckywin.insertAdjacentHTML('beforeend', hezhispanHTML.reverse().join(''))

    // 更新统计数据（只在第一次调用时更新） - 完全复制原始HTML第1197-1199行
    if (idIndex === 1) {
      const total = maxCount + minCount + bzCount
      const tdMinCount = document.getElementById('tdMinCount')
      const tdMaxCount = document.getElementById('tdMaxCount')
      const tdBzCount = document.getElementById('tdBzCount')

      if (tdMaxCount) {
        // 原始代码第1197行 - 注意：原代码用maxCount检查两者
        const maxPercent = maxCount > 0 ? ((maxCount / total) * 100).toFixed(2) : '0'
        tdMaxCount.innerHTML = `${maxPercent}%`
      }

      if (tdMinCount) {
        // 原始代码第1198行 - 注意：原代码也用maxCount检查（可能是bug，但保持一致）
        const minPercent = maxCount > 0 ? ((minCount / total) * 100).toFixed(2) : '0'
        tdMinCount.innerHTML = `${minPercent}%`
      }

      if (tdBzCount && showBaoZi.value) {
        const bzPercent = bzCount > 0 ? ((bzCount / total) * 100).toFixed(2) : '0'
        tdBzCount.innerHTML = `${bzPercent}%`
        // 显示豹子统计
        const bzTds = document.querySelectorAll('[name="tdBZ"]')
        bzTds.forEach(td => {
          (td as HTMLElement).style.display = ''
        })
      }
    }

    // 绘制连接线 - 完全复制原始HTML第1202-1238行
    const drawLine = () => {
      const hzspans = divHeZhiLuckywin.querySelectorAll('[name="hzspan"]')
      if (hzspans.length > 1) {
        // 检查是否可见
        const firstSpan = hzspans[0] as HTMLElement
        if (firstSpan.offsetWidth === 0) {
          setTimeout(drawLine, 10)
          return
        }

        const cvs = document.createElement('canvas')
        cvs.style.position = 'absolute'
        cvs.style.zIndex = '10'
        cvs.style.left = '0'
        cvs.style.top = '0'
        cvs.width = divHeZhiLuckywin.offsetWidth
        cvs.height = divHeZhiLuckywin.offsetHeight

        const ctx = cvs.getContext('2d')
        if (ctx) {
          ctx.strokeStyle = '#1fa6e8'
          ctx.lineWidth = 1
          ctx.beginPath()

          const divRect = divHeZhiLuckywin.getBoundingClientRect()

          for (let i = 0; i < hzspans.length - 1; i++) {
            const current = hzspans[i] as HTMLElement
            const next = hzspans[i + 1] as HTMLElement

            const coff = current.getBoundingClientRect()
            const noff = next.getBoundingClientRect()

            const cx = coff.left - divRect.left + (current.offsetWidth / 2)
            const cy = coff.top - divRect.top + (current.offsetHeight / 2)
            const nx = noff.left - divRect.left + (next.offsetWidth / 2)
            const ny = noff.top - divRect.top + (next.offsetHeight / 2)

            ctx.moveTo(cx, cy)
            ctx.lineTo(nx, ny)
          }

          ctx.closePath()
          ctx.stroke()
        }

        divHeZhiLuckywin.appendChild(cvs)
      }
    }

    // 使用setTimeout延迟绘制 - 完全复制原始HTML第1238行
    setTimeout(drawLine, 10)
  }

  // 检查表格是否可见并执行
  const showHeZhiLuckywin = () => {
    const tableTrendLuckywin = document.getElementById('tableTrendLuckywin')
    if (tableTrendLuckywin && tableTrendLuckywin.offsetWidth > 0) {
      // 填充三种不同的列布局
      showHeZhiLuckywinType('3,6,9,12,15,18', 1)
      showHeZhiLuckywinType('3,7,10,11,14,18', 2)
      showHeZhiLuckywinType('3,8,10,11,13,18', 3)
      return
    }
    setTimeout(showHeZhiLuckywin, 10)
  }

  setTimeout(showHeZhiLuckywin, 10)
}

// ==================== Lifecycle Hooks ====================
onMounted(async () => {
  await loadHistoryData()
  nextTick(() => {
    renderTrend()
  })
})

// ==================== Watchers ====================
// 监听count变化，重新加载
watch(() => props.count, () => {
  nextTick(() => {
    renderTrend()
  })
})

// 监听gameCode变化，重新加载
watch(() => props.gameCode, async () => {
  // 立即清空旧数据，避免显示混乱
  clearTables()
  await loadHistoryData()
  nextTick(() => {
    renderTrend()
  })
})

// 监听数据变化，重新渲染
watch(() => lotteryHistory.value, (newVal, oldVal) => {
  // 如果数据被清空，跳过渲染（已经在 clearTables 中处理）
  if (!newVal || newVal.length === 0) {
    return
  }

  // 验证数据是否匹配当前 gameCode，避免使用错误的数据
  if (props.gameCode && newVal.length > 0) {
    const firstItem = newVal[0]
    if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
      console.warn('⚠️ TrendTabLuckywin watcher: 数据不匹配，跳过渲染')
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

<style scoped>
/* 基础表格样式 - 完全还原原始HTML的样式 */
.tab-pane {
  width: 100%;
  opacity: 1 !important;
  display: block !important;
  overflow: hidden !important;  /* 完全隐藏溢出内容 */
}

/* 整个表格的滚动容器 - 完全隐藏滚动条 */
.table-wrapper {
  width: 100%;
  overflow-x: auto !important;  /* 改为 hidden，完全禁止横向滚动 */
  overflow-y: visible !important;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* 隐藏整个表格容器的滚动条（WebKit 浏览器） */
.table-wrapper::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/* 隐藏所有可能的滚动条 */
#TrendTabLuckywin ::-webkit-scrollbar,
#tableTrendLuckywin ::-webkit-scrollbar,
.table-weizhi ::-webkit-scrollbar,
.table-weizhi-child ::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

#TrendTabLuckywin,
#tableTrendLuckywin,
.table-weizhi,
.table-weizhi-child {
  -ms-overflow-style: none !important;  /* IE and Edge */
  scrollbar-width: none !important;  /* Firefox */
}

.table-weizhi {
  border-collapse: collapse;
  border-spacing: 0;
  color: #555;
  width: 100%;
  margin: 0;
  padding: 0;
}

.table-weizhi :deep(tr td),
.table-weizhi :deep(tr th) {
  height: 33px;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  margin: 0;
  padding: 0;
}

.table-weizhi :deep(tr td:first-child),
.table-weizhi :deep(tr.firthtd th:first-child) {
  border-left: 0;
}

.table-weizhi :deep(tr:last-child td) {
  border-bottom: 0;
}

.table-weizhi-child {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
  border: 1px solid #e1e1e1; /* 添加外边框 */
}

.table-weizhi-child :deep(thead tr.firthtd th) {
  background-color: transparent; /* 标题不需要背景色 */
  border: 0; /* 标题不需要边框 */
  padding: 8px 5px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  height: 33px;
}

.table-weizhi :deep(thead tr.firthtd th) {
  background-color: transparent; /* 标题不需要背景色 */
  border: 0; /* 标题不需要边框 */
  padding: 8px 5px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.table-weizhi-child :deep(tbody td) {
  border-bottom: 1px solid #e1e1e1;
  padding: 8px 5px;
  text-align: center;
  font-size: 13px;
  color: #999999;
}

.table-weizhi-child :deep(tr:last-child td) {
  border-bottom: 0;
}

.border-0 {
  border: 0 !important;
}

.border {
  border-left: 1px solid #e1e1e1 !important; /* 左边竖线 */
  border-right: 1px solid #e1e1e1 !important; /* 右边竖线 */
  border-top: 0 !important;
  border-bottom: 0 !important;
}

.zoushiqiu {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  color: #fff;
  font-size: 12px;
}

.table-weizhi :deep(tr td .zoushiqiu) {
  border-radius: 50%;
  line-height: 24px;
  width: 24px;
  height: 24px;
  color: #FFFFFF;
}
</style>
