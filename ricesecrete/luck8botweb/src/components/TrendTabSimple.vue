<template>
  <div class="trend-simple">
    <table class="trend-table">
      <tbody>
        <!-- 第一行：数据走势 -->
        <tr>
          <!-- 左列：开奖记录 -->
          <td class="col-opencode">
            <table class="inner-table">
              <thead>
                <tr class="header-row">
                  <th style="height:66px;">Kỳ mở thưởng</th>
                  <th>Số trúng thưởng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, idx) in displayRecords" :key="idx">
                  <td>{{ record.expect }}</td>
                  <td>
                    <span v-for="(num, i) in record.numbers" :key="i">
                      {{ num }}<template v-if="i < record.numbers.length - 1">&nbsp;</template>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <!-- 中列：和值走势 (3-18) -->
          <td class="col-trend">
            <table class="inner-table header-table">
              <thead>
                <tr class="header-row"><th>Tổng hợp những số hay xổ</th></tr>
              </thead>
            </table>
            <div class="scroll-container" ref="trendContainer" style="position: relative;">
              <canvas ref="trendCanvas" style="position: absolute; left: 0; top: 0; z-index: 2; pointer-events: none;"></canvas>
              <table class="inner-table trend-table-inner" ref="trendTable">
                <thead>
                  <tr class="header-row">
                    <th class="col-sum" style="color:#dc3545;font-size:12px;">Tổng</th>
                    <th v-for="i in 16" :key="i" class="col-num">{{ i + 2 }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, idx) in displayRecords" :key="idx">
                    <td class="col-sum sum-value">{{ record.sum }}</td>
                    <td v-for="i in 16" :key="i" class="col-num">
                      <span v-if="record.sum === i + 2" class="ball" :data-sum="record.sum" :data-idx="idx">{{ record.sum }}</span>
                      <span v-else class="miss-value">{{ getMissValue(idx, i + 2) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>

          <!-- 右列：形态表 (Tài/Xỉu/Lẻ/Chẵn) -->
          <td class="col-pattern">
            <table class="inner-table">
              <thead>
                <tr class="header-row"><th colspan="4">Kèo tổng</th></tr>
                <tr class="header-row">
                  <th>Tài</th>
                  <th>Xỉu</th>
                  <th>Lẻ</th>
                  <th>Chẵn</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, idx) in displayRecords" :key="idx">
                  <td v-if="record.tai" class="pattern-hit pattern-tai"><span class="pattern-ball">Tài</span></td>
                  <td v-else>{{ getPatternMiss(idx, 'tai') }}</td>

                  <td v-if="record.xiu" class="pattern-hit pattern-xiu"><span class="pattern-ball">Xỉu</span></td>
                  <td v-else>{{ getPatternMiss(idx, 'xiu') }}</td>

                  <td v-if="record.le" class="pattern-hit pattern-le"><span class="pattern-ball">Lẻ</span></td>
                  <td v-else>{{ getPatternMiss(idx, 'le') }}</td>

                  <td v-if="record.chan" class="pattern-hit pattern-chan"><span class="pattern-ball">Chẵn</span></td>
                  <td v-else>{{ getPatternMiss(idx, 'chan') }}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <!-- 第二行：统计数据 -->
        <tr>
          <!-- 左列：统计标题 -->
          <td class="col-opencode">
            <table class="inner-table">
              <thead>
                <tr class="header-row stats-header"><th style="height:66px;">Số liệu thống kê</th></tr>
              </thead>
              <tbody class="stats-body">
                <tr><td colspan="2">Số lần xuất hiện</td></tr>
                <tr><td colspan="2">Số chuỗi liên kéo dài nhất</td></tr>
                <tr><td colspan="2">Vẫn chưa xuất hiện</td></tr>
                <tr><td colspan="2">Chuỗi số chưa xuất hiện nhiều nhất</td></tr>
                <tr><td colspan="2">Bình quân số chưa xuất hiện</td></tr>
              </tbody>
            </table>
          </td>

          <!-- 中列：和值统计 -->
          <td class="col-trend">
            <table class="inner-table header-table">
              <thead>
                <tr class="header-row stats-header"><th>Tổng hợp những số hay xổ</th></tr>
              </thead>
            </table>
            <div class="scroll-container">
              <table class="inner-table trend-table-inner">
                <thead>
                  <tr class="header-row stats-header">
                    <th class="col-sum" style="color:#dc3545;font-size:12px;">Tổng</th>
                    <th v-for="i in 16" :key="i" class="col-num">{{ i + 2 }}</th>
                  </tr>
                </thead>
                <tbody class="stats-body">
                  <!-- 出现次数 -->
                  <tr>
                    <td class="col-sum sum-value"></td>
                    <td v-for="i in 16" :key="i" class="col-num">{{ statistics.appearCount[i + 2] }}</td>
                  </tr>
                  <!-- 最大连出 -->
                  <tr>
                    <td class="col-sum sum-value"></td>
                    <td v-for="i in 16" :key="i" class="col-num">{{ statistics.maxConsecutive[i + 2] }}</td>
                  </tr>
                  <!-- 当前遗漏 -->
                  <tr>
                    <td class="col-sum sum-value"></td>
                    <td v-for="i in 16" :key="i" class="col-num">{{ statistics.currentMiss[i + 2] }}</td>
                  </tr>
                  <!-- 最大遗漏 -->
                  <tr>
                    <td class="col-sum sum-value"></td>
                    <td v-for="i in 16" :key="i" class="col-num">{{ statistics.maxMiss[i + 2] }}</td>
                  </tr>
                  <!-- 平均遗漏 -->
                  <tr>
                    <td class="col-sum sum-value"></td>
                    <td v-for="i in 16" :key="i" class="col-num">{{ statistics.avgMiss[i + 2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>

          <!-- 右列：形态统计 -->
          <td class="col-pattern">
            <table class="inner-table">
              <thead>
                <tr class="header-row stats-header"><th colspan="4">Kèo tổng</th></tr>
                <tr class="header-row stats-header">
                  <th>Tài</th>
                  <th>Xỉu</th>
                  <th>Lẻ</th>
                  <th>Chẵn</th>
                </tr>
              </thead>
              <tbody class="stats-body">
                <!-- 出现次数 -->
                <tr>
                  <td>{{ patternStats.tai.appearCount }}</td>
                  <td>{{ patternStats.xiu.appearCount }}</td>
                  <td>{{ patternStats.le.appearCount }}</td>
                  <td>{{ patternStats.chan.appearCount }}</td>
                </tr>
                <!-- 最大连出 -->
                <tr>
                  <td>{{ patternStats.tai.maxConsecutive }}</td>
                  <td>{{ patternStats.xiu.maxConsecutive }}</td>
                  <td>{{ patternStats.le.maxConsecutive }}</td>
                  <td>{{ patternStats.chan.maxConsecutive }}</td>
                </tr>
                <!-- 当前遗漏 -->
                <tr>
                  <td>{{ patternStats.tai.currentMiss }}</td>
                  <td>{{ patternStats.xiu.currentMiss }}</td>
                  <td>{{ patternStats.le.currentMiss }}</td>
                  <td>{{ patternStats.chan.currentMiss }}</td>
                </tr>
                <!-- 最大遗漏 -->
                <tr>
                  <td>{{ patternStats.tai.maxMiss }}</td>
                  <td>{{ patternStats.xiu.maxMiss }}</td>
                  <td>{{ patternStats.le.maxMiss }}</td>
                  <td>{{ patternStats.chan.maxMiss }}</td>
                </tr>
                <!-- 平均遗漏 -->
                <tr>
                  <td>{{ patternStats.tai.avgMiss }}</td>
                  <td>{{ patternStats.xiu.avgMiss }}</td>
                  <td>{{ patternStats.le.avgMiss }}</td>
                  <td>{{ patternStats.chan.avgMiss }}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onActivated, onUnmounted, nextTick, inject } from 'vue'
import type { Ref } from 'vue'
import type { LotteryHistoryItem } from '@/services/lotteryService'

// ==================== Props ====================
interface Props {
  count: number
  gameType: 'luckywin' | 'sicbo'
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

// ==================== Refs ====================
// Refs for canvas drawing
const trendCanvas = ref<HTMLCanvasElement | null>(null)
const trendTable = ref<HTMLTableElement | null>(null)
const trendContainer = ref<HTMLDivElement | null>(null)

// 可见性追踪
const isVisible = ref(false)
const visibilityObserver = ref<IntersectionObserver | null>(null)

// ==================== API Data Loading ====================
// 加载历史数据 - 使用共享数据
const loadHistoryData = async () => {
  if (!props.gameCode) {
    console.warn('⚠️ No gameCode provided for TrendTabSimple')
    return
  }

  // 如果有共享数据源，使用共享的 refresh 方法
  if (sharedHistoryData?.refresh) {
    await sharedHistoryData.refresh(props.gameCode)
  } else {
    console.warn('⚠️ TrendTabSimple: 未找到共享数据源')
  }
}

// ==================== Data Processing ====================

// 将API数据转换为显示格式
const processedData = computed(() => {
  if (lotteryHistory.value && lotteryHistory.value.length > 0) {
    // 验证数据是否匹配当前 gameCode
    if (props.gameCode) {
      const firstItem = lotteryHistory.value[0]
      if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
        console.warn('⚠️ TrendTabSimple 数据不匹配！当前 gameCode:', props.gameCode, '数据 code:', firstItem.code, '- 等待正确数据')
        // 返回空数组，等待正确数据
        return []
      }
    }

    return lotteryHistory.value.map(item => {
      const numbers = item.lottery_results ? item.lottery_results.split(',').map(Number) : []
      const sum = numbers.reduce((a, b) => a + b, 0)

      return {
        expect: item.number || '',
        numbers,
        sum,
        tai: sum >= 11,
        xiu: sum < 11,
        le: sum % 2 === 1,
        chan: sum % 2 === 0
      }
    })
  }

  // 如果没有数据，返回空数组
  return []
})

const displayRecords = computed(() => {
  // 根据 props.count 限制显示数量
  const allData = processedData.value
  const limitedData = allData.slice(0, props.count)
  return limitedData
})

// ==================== Miss Value Calculations ====================
// 计算遗漏值 (从1开始计数，从下往上)
const getMissValue = (currentIdx: number, sumValue: number) => {
  let missCount = 1
  // 从当前行往后遍历（往下）
  for (let i = currentIdx + 1; i < displayRecords.value.length; i++) {
    if (displayRecords.value[i].sum === sumValue) {
      break
    }
    missCount++
  }
  return missCount
}

// 计算形态遗漏值 (从1开始计数，从下往上)
const getPatternMiss = (currentIdx: number, pattern: 'tai' | 'xiu' | 'le' | 'chan') => {
  let missCount = 1
  // 从当前行往后遍历（往下）
  for (let i = currentIdx + 1; i < displayRecords.value.length; i++) {
    if (displayRecords.value[i][pattern]) {
      break
    }
    missCount++
  }
  return missCount
}

// ==================== Statistics Calculations ====================
// 计算和值统计数据 (3-18)
const statistics = computed(() => {
  const records = displayRecords.value
  const stats = {
    appearCount: {} as Record<number, number>,      // 出现次数
    maxConsecutive: {} as Record<number, number>,   // 最大连出
    currentMiss: {} as Record<number, number>,      // 当前遗漏
    maxMiss: {} as Record<number, number>,          // 最大遗漏
    avgMiss: {} as Record<number, number>           // 平均遗漏
  }

  // 初始化统计数据 (3-18)
  for (let sum = 3; sum <= 18; sum++) {
    stats.appearCount[sum] = 0
    stats.maxConsecutive[sum] = 0
    stats.currentMiss[sum] = 0
    stats.maxMiss[sum] = 0
    stats.avgMiss[sum] = 0
  }

  if (records.length === 0) return stats

  // 计算统计数据
  for (let sum = 3; sum <= 18; sum++) {
    let consecutiveCount = 0
    let maxConsecutive = 0
    let currentMiss = 0
    let missCount = 0
    let totalMiss = 0
    let appearCount = 0

    // 从最旧到最新遍历
    for (let i = records.length - 1; i >= 0; i--) {
      if (records[i].sum === sum) {
        // 出现了
        appearCount++
        consecutiveCount++
        maxConsecutive = Math.max(maxConsecutive, consecutiveCount)

        // 记录遗漏
        if (missCount > 0) {
          totalMiss += missCount
          stats.maxMiss[sum] = Math.max(stats.maxMiss[sum], missCount)
        }
        missCount = 0
      } else {
        // 未出现
        consecutiveCount = 0
        missCount++
        if (i === 0) {
          // 最新一期还未出现，记录当前遗漏
          currentMiss = missCount
        }
      }
    }

    // 保存统计结果
    stats.appearCount[sum] = appearCount
    stats.maxConsecutive[sum] = maxConsecutive
    stats.currentMiss[sum] = currentMiss
    stats.avgMiss[sum] = appearCount > 0 ? Math.round(totalMiss / appearCount) : 0
  }

  return stats
})

// 计算形态统计数据
const patternStats = computed(() => {
  const records = displayRecords.value
  const patterns = ['tai', 'xiu', 'le', 'chan'] as const
  const stats: Record<typeof patterns[number], {
    appearCount: number
    maxConsecutive: number
    currentMiss: number
    maxMiss: number
    avgMiss: number
  }> = {
    tai: { appearCount: 0, maxConsecutive: 0, currentMiss: 0, maxMiss: 0, avgMiss: 0 },
    xiu: { appearCount: 0, maxConsecutive: 0, currentMiss: 0, maxMiss: 0, avgMiss: 0 },
    le: { appearCount: 0, maxConsecutive: 0, currentMiss: 0, maxMiss: 0, avgMiss: 0 },
    chan: { appearCount: 0, maxConsecutive: 0, currentMiss: 0, maxMiss: 0, avgMiss: 0 }
  }

  if (records.length === 0) return stats

  // 计算每个形态的统计数据
  for (const pattern of patterns) {
    let consecutiveCount = 0
    let maxConsecutive = 0
    let currentMiss = 0
    let missCount = 0
    let totalMiss = 0
    let appearCount = 0

    // 从最旧到最新遍历
    for (let i = records.length - 1; i >= 0; i--) {
      if (records[i][pattern]) {
        // 出现了
        appearCount++
        consecutiveCount++
        maxConsecutive = Math.max(maxConsecutive, consecutiveCount)

        // 记录遗漏
        if (missCount > 0) {
          totalMiss += missCount
          stats[pattern].maxMiss = Math.max(stats[pattern].maxMiss, missCount)
        }
        missCount = 0
      } else {
        // 未出现
        consecutiveCount = 0
        missCount++
        if (i === 0) {
          // 最新一期还未出现，记录当前遗漏
          currentMiss = missCount
        }
      }
    }

    // 保存统计结果
    stats[pattern].appearCount = appearCount
    stats[pattern].maxConsecutive = maxConsecutive
    stats[pattern].currentMiss = currentMiss
    stats[pattern].avgMiss = appearCount > 0 ? Math.round(totalMiss / appearCount) : 0
  }

  return stats
})

// ==================== Canvas Line Drawing ====================
// 绘制连线
const drawLines = () => {
  nextTick(() => {
    // 使用 requestAnimationFrame 确保DOM渲染完成后再绘制
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (!trendCanvas.value || !trendTable.value || !trendContainer.value) {
          return
        }

        const balls = trendTable.value.querySelectorAll('.ball[data-sum]')
        if (balls.length < 2) {
          return
        }

        const canvas = trendCanvas.value
        const table = trendTable.value

        // 设置canvas尺寸为table的实际尺寸
        canvas.width = table.offsetWidth
        canvas.height = table.offsetHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 设置线条样式
        ctx.strokeStyle = '#1fa6e8'
        ctx.lineWidth = 1
        ctx.beginPath()

        // 使用table作为参照，因为canvas和table都在同一个container中
        const tableRect = table.getBoundingClientRect()

        let pointsDrawn = 0
        // 连接所有球
        balls.forEach((ball, index) => {
          const ballRect = ball.getBoundingClientRect()
          // 计算相对于table左上角的坐标
          const x = ballRect.left - tableRect.left + ballRect.width / 2
          const y = ballRect.top - tableRect.top + ballRect.height / 2

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
          pointsDrawn++
        })

        ctx.stroke()
      }, 100) // 减少延迟时间
    })
  })
}

// ==================== Lifecycle Hooks ====================
// 组件挂载时加载数据
onMounted(async () => {
  await loadHistoryData()

  // 设置 Intersection Observer 来检测组件可见性
  if (trendContainer.value) {
    visibilityObserver.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const wasVisible = isVisible.value
        isVisible.value = entry.isIntersecting
        // 当组件从不可见变为可见时，重新绘制
        if (entry.isIntersecting && !wasVisible) {
          nextTick(() => {
            drawLines()
            // 延迟再绘制一次，确保 DOM 完全渲染
            setTimeout(() => {
              drawLines()
            }, 200)
          })
        }
      })
    }, {
      threshold: 0.1 // 当至少 10% 的元素可见时触发
    })

    // 观察容器的父元素（因为容器本身可能一直存在，只是 v-show 控制了父元素）
    const parent = trendContainer.value.closest('.tab-pane') || trendContainer.value
    visibilityObserver.value.observe(parent)
  }

  // 等待数据加载后绘制
  nextTick(() => {
    drawLines()
    // 多次延迟绘制，确保首次加载时也能显示
    setTimeout(() => {
      drawLines()
    }, 300)
    setTimeout(() => {
      drawLines()
    }, 600)
  })
})

// 组件激活时重绘（用于 keep-alive 或 v-show 场景）
onActivated(() => {
  // 组件从隐藏变为可见时，重新绘制连线
  nextTick(() => {
    setTimeout(() => {
      drawLines()
    }, 100)
  })
})

// 组件卸载时清理 Observer
onUnmounted(() => {
  if (visibilityObserver.value) {
    visibilityObserver.value.disconnect()
    visibilityObserver.value = null
  }
})

// ==================== Watchers ====================
// 监听 count 变化 - 只需重绘，不需要重新加载数据
watch(() => props.count, () => {
  // 数据会通过 displayRecords computed 自动更新
  // 只需要在下一帧重绘连线即可
  nextTick(() => {
    drawLines()
  })
})

// 监听 gameCode 变化 - 需要重新加载数据
watch(() => props.gameCode, async () => {
  await loadHistoryData()
  drawLines()
})

// 监听数据变化后重绘
watch(() => displayRecords.value.length, (newLength) => {
  if (newLength > 0) {
    // 数据变化后，延迟绘制确保 DOM 已渲染
    nextTick(() => {
      drawLines()
      // 再次延迟绘制，确保首次加载时也能显示
      setTimeout(() => {
        drawLines()
      }, 500)
    })
  }
})

// 🔥 监听共享历史数据的变化（开奖更新时）
watch(() => lotteryHistory.value, (newData, oldData) => {
  // 检查数据是否真的变化了（比较第一条记录的期号）
  if (newData && newData.length > 0 && oldData && oldData.length > 0) {
    const newFirstPeriod = newData[0]?.number
    const oldFirstPeriod = oldData[0]?.number

    if (newFirstPeriod !== oldFirstPeriod) {
      // 数据更新后，需要等待DOM完全更新再绘制
      nextTick(() => {
        setTimeout(() => {
          drawLines()
        }, 300)
        // 再次延迟绘制，确保稳定
        setTimeout(() => {
          drawLines()
        }, 600)
      })
    }
  }
}, { deep: true })
</script>

<style scoped>
.trend-simple {
  width: 100%;
  overflow-x: auto;
}

.trend-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
  color: #555;
}

.trend-table > tbody > tr > td {
  vertical-align: top;
  padding: 0;
  margin: 0;
}

.inner-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}

.header-table {
  margin-bottom: 0;
}

/* 完全匹配原版样式 */
.header-row th {
  background-color: #f5f5f5;
  border: 1px solid #e1e1e1;
  height: 33px;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.header-row th:first-child {
  border-left: 0;
}

.inner-table tbody td {
  height: 33px;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #999999;
}

.inner-table tbody td:first-child {
  border-left: 0;
}

.inner-table tbody tr:last-child td {
  border-bottom: 0;
}

/* 左列：开奖记录 */
.col-opencode {
  width: 248px;
  min-width: 248px;
}

/* 中列：和值走势 */
.col-trend {
  width: 577px;
  min-width: 577px;
}

.scroll-container {
  width: 577px;
  overflow-x: hidden;
  overflow-y: visible;
  position: relative;
}

.trend-table-inner {
  min-width: 577px;
  table-layout: auto;
}

.col-sum {
  width: 33px;
  min-width: 33px;
  max-width: 33px;
  color: #dc3545 !important;
  font-weight: bold;
  font-size: 12px;
  border-left: 1px solid #e1e1e1 !important;
}

.col-num {
  width: 33px;
  min-width: 33px;
  max-width: 33px;
  background-color: #fcf9f2;
}

/* 最后一列（18）的右边框 */
.col-num:last-child {
  border-right: 1px solid #e1e1e1;
}

.sum-value {
  color: #dc3545 !important;
  font-weight: bold;
}

/* 球形样式 - 完全匹配原版 */
.ball {
  display: inline-block;
  border-radius: 50%;
  line-height: 24px;
  width: 24px;
  height: 24px;
  background: #1fa6e8;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  position: relative;
  z-index: 3;
}

.miss-value {
  color: #999999;
  font-size: 13px;
}

/* 右列：形态表 */
.col-pattern {
  width: 131px;
  min-width: 131px;
}

.col-pattern th {
  width: 32.75px;
}

.col-pattern td {
  width: 32.75px;
}

.pattern-hit {
  padding: 0;
  margin: 0;
}

/* 形态颜色 - 完全匹配原版 */
.pattern-tai {
  background: rgb(60, 176, 236) !important;
}

.pattern-xiu {
  background: rgb(250, 153, 50) !important;
}

.pattern-le {
  background: rgb(60, 176, 236) !important;
}

.pattern-chan {
  background: rgb(250, 153, 50) !important;
}

/* 形态球 - 完全匹配原版 zoushiqiuf */
.pattern-ball {
  border-radius: 0;
  width: 100%;
  display: inline-block;
  z-index: 1;
  color: #ffffff;
  position: relative;
  /* line-height: 33px;
  height: 33px; */
  font-weight: bold;
  font-size: 12px;
  text-align: center;
}

/* 统计数据行样式 */
.stats-header th {
  background-color: #f5f5f5 !important;
}

.stats-body td {
  background-color: #ffffff;
  color: #999999;
  font-size: 13px;
}

.stats-body tr:hover td {
  background-color: #f8f9fa;
}
</style>
