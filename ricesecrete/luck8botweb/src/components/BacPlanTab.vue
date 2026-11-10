<template>
  <div id="PlanTabBac" class="tab-pane">
    <div class="table-container">
      <table class="pane-table" border="0">
        <tbody>
          <tr>
            <th width="80px">Kỳ</th>
            <th width="160px">Kết quả lô 2 số các giải</th>
            <th width="240px">Dự đoán 8 Số</th>
            <th width="160px">Kết quả dự đoán</th>
          </tr>
          <tr v-if="isLoading">
            <td colspan="4" height="300px" style="text-align:center;">Đang phát kế hoạch , vui lòng đợi...</td>
          </tr>
          <tr v-for="forecast in forecastList" :key="forecast.id" v-else>
            <td>{{ forecast.period }}</td>
            <td v-html="forecast.lotteryResult"></td>
            <td>{{ forecast.prediction }}</td>
            <td v-html="forecast.hitResult"></td>
          </tr>
          <tr v-if="!isLoading && forecastList.length === 0">
            <td colspan="4" height="300px" style="text-align:center; color: #999;">Chưa có dữ liệu kế hoạch</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, inject } from 'vue'
import type { Ref } from 'vue'
import type { LotteryHistoryItem } from '@/services/lotteryService'

interface Props {
  formula: string  // '1', '2', '3'
  gameCode?: string
}

const props = defineProps<Props>()

// ==================== Inject Shared Data ====================
const sharedHistoryData = inject<{
  data: Ref<LotteryHistoryItem[]>
  isLoading: Ref<boolean>
  refresh: (gameCode?: string, forceRefresh?: boolean) => Promise<void>
}>('sharedHistoryData')

const lotteryHistory = sharedHistoryData?.data || ref<LotteryHistoryItem[]>([])
const isLoading = sharedHistoryData?.isLoading || ref(false)

// 预测数据类型
interface BacForecastData {
  id: string
  period: string           // 期号 - Issue number
  lotteryResult: string    // 开奖结果 - HTML string - 显示命中的号码用红色
  prediction: string       // 预测内容 - 预测的8个号码
  hitResult: string        // 命中结果 - HTML string - 显示命中个数或"Trượt"
}

// 处理 lottery_data 字段，提取后两位数字，去重并排序
const processLotteryData = (lottery_data: string): string[] => {
  if (!lottery_data) return []

  // 用 "|" 分隔不同奖项组，再用 "," 分隔每个号码
  const groups = lottery_data.split('|')
  const allNumbers: string[] = []

  groups.forEach(group => {
    const numbers = group.split(',').map(s => s.trim()).filter(s => s)
    numbers.forEach(num => {
      if (num.length >= 2) {
        // 取后两位
        allNumbers.push(num.substring(num.length - 2))
      }
    })
  })

  // 去重并排序
  const uniqueNumbers = Array.from(new Set(allNumbers))
  return uniqueNumbers.sort((a, b) => parseInt(a) - parseInt(b))
}

// 加载历史数据
const loadHistoryData = async () => {
  if (!props.gameCode) {
    // console.warn('⚠️ BacPlanTab: No gameCode provided')
    return
  }

  if (sharedHistoryData?.refresh) {
    await sharedHistoryData.refresh(props.gameCode)
  } else {
    // console.warn('⚠️ BacPlanTab: 未找到共享数据源')
  }
}

// 预测数据列表
const forecastList = computed<BacForecastData[]>(() => {
  if (!lotteryHistory.value || lotteryHistory.value.length === 0) {
    return []
  }

  // 验证数据是否匹配当前 gameCode
  if (props.gameCode) {
    const firstItem = lotteryHistory.value[0]
    if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
      // console.warn('⚠️ BacPlanTab 数据不匹配！当前 gameCode:', props.gameCode, '数据 code:', firstItem.code, '- 等待正确数据')
      return []
    }
  }

  const results: BacForecastData[] = []

  // 确定使用哪个预测字段
  const forecastField = props.formula === '1' ? 'forecast1_num_result'
                      : props.formula === '2' ? 'forecast2_num_result'
                      : 'forecast3_num_result'
  // 第一行：预测行（期号 = 最新期号 + 1）
  const latestItem = lotteryHistory.value[0]
  const latestPeriod = parseInt(latestItem.lottery_number || '0')
  let nextPeriod = latestPeriod + 1
  if (nextPeriod > 288) {
    nextPeriod = 1
  }

  // 处理预测数字：分割、去重、排序
  const predictionStr = (latestItem as any)[forecastField] || ''
  const predictionArray = predictionStr.split(',').map((s: string) => s.trim()).filter((s: string) => s)
  const uniquePredictions: string[] = Array.from(new Set(predictionArray))
  const sortedPredictions = uniquePredictions.sort((a, b) => parseInt(a) - parseInt(b))
  const predictionNumbers = sortedPredictions.join(',')

  results.push({
    id: `pred-${nextPeriod}`,
    period: String(nextPeriod).padStart(3, '0'),
    lotteryResult: "<span style='color:green;'> Đợi...</span>",
    prediction: predictionNumbers,
    hitResult: "<span style='color:#007bff;'>Đợi mở</span>"
  })

  // 后续行：使用历史数据（跳过最后一条）
  // historyData[0] → 表格第2行
  // historyData[1] → 表格第3行
  // ...
  // historyData[n-2] → 表格第n行（最后一条不显示）
  const historyCount = lotteryHistory.value.length - 1 // 跳过最后一条

  for (let i = 0; i < historyCount; i++) {
    const currentItem = lotteryHistory.value[i]
    const nextItem = lotteryHistory.value[i + 1] // 用于获取预测内容

    // 当前期的开奖号码（Lô 2 số）
    const openedNumbers = processLotteryData(currentItem.lottery_data)

    // 下一期的预测号码（来自 nextItem 的 forecast 字段）
    const rawPredictionStr = nextItem ? ((nextItem as any)[forecastField] || '') : ''
    const rawPredictedArray: string[] = rawPredictionStr.split(',').map((s: string) => s.trim()).filter((s: string) => s)
    // 对预测数字进行去重和排序
    const uniquePredicted: string[] = Array.from(new Set(rawPredictedArray))
    const sortedPredicted: string[] = uniquePredicted.sort((a, b) => parseInt(a) - parseInt(b))
    const predictionStr = sortedPredicted.join(',')
    const predictedNumbers = sortedPredicted

    // 计算命中的号码
    const hits: string[] = []
    openedNumbers.forEach(opened => {
      if (predictedNumbers.includes(opened)) {
        hits.push(opened)
      }
    })

    // 生成开奖结果HTML（命中的号码用红色显示）
    const resultHtml = openedNumbers.map(num => {
      if (hits.includes(num)) {
        return `<span style='color:red;display:inline;'>${num}</span>`
      }
      return num
    }).join(',')

    // 命中结果
    let hitResult = ''
    if (hits.length > 0) {
      hitResult = `<span style='color:green;'>${hits.length}</span>`
    } else {
      hitResult = "<span style='color:red;'>Trượt</span>"
    }

    results.push({
      id: `bac-plan-${currentItem.number}`,
      period: String(currentItem.lottery_number).padStart(3, '0'),
      lotteryResult: resultHtml,
      prediction: predictionStr,
      hitResult
    })
  }
  return results
})

// 组件挂载时加载数据
onMounted(async () => {
  if (props.gameCode) {
    await loadHistoryData()
  }
})

// 监听 gameCode 变化
watch(() => props.gameCode, async () => {
  if (props.gameCode) {
    await loadHistoryData()
  }
})

// 监听 formula 变化（切换预测字段）
watch(() => props.formula, () => {
  // forecastList computed 会自动重新计算
})
</script>

<style scoped>
.tab-pane {
  border: solid 1px #dfdfdf;
  overflow: hidden;
  border-radius: 10px;
}

/* 手机端滑动容器 */
.table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.pane-table {
  width: 100%;
  min-width: 640px; /* 80 + 160 + 240 + 160 = 640px */
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
}

.pane-table tr td,
.pane-table tr th {
  padding: 10px;
  border-collapse: collapse;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
}

.pane-table tr th {
  background-color: #f1f1f1;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.pane-table tr td {
  text-align: center;
  color: #555;
}

.pane-table tr td:first-child,
.pane-table tr th:first-child {
  border-left: 0;
}

.pane-table tr:last-child td {
  border-bottom: 0;
}

.pane-table tr:hover {
  background: #f8f9fa;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .pane-table tr td,
  .pane-table tr th {
    padding: 8px 6px;
    font-size: 13px;
  }

  /* 隐藏滚动条但保持可滑动 */
  .table-container::-webkit-scrollbar {
    display: none;
  }

  .table-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
