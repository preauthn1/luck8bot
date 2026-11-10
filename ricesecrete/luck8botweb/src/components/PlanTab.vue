<template>
  <div id="PlanTab" class="tab-panetab">
    <table class="pane-table" border="0">
      <tbody>
        <tr>
          <th width="150px">Kỳ</th>
          <th width="200px">Kết quả mở thưởng</th>
          <th width="120px">Kết quả dự đoán</th>
          <th width="200px">Dự đoán</th>
        </tr>
        <tr v-if="isLoading">
          <td colspan="4" height="300px" style="text-align:center;">Đang phát kế hoạch , vui lòng đợi...</td>
        </tr>
        <tr v-for="(forecast, index) in changeData" :key="index" v-else>
          <td>{{ forecast.lottery_number }}</td>
          <td :class="[index == 0 ? 'green' : '']">{{ index == 0 ? 'Đợi...' : forecast.lottery_results }}</td>
          <td
            :class="[index == 0 ? 'ruselt' : handleresult(formula == '1' ? forecast.forecast1_result : formula == '2' ? forecast.forecast2_result : formula == '3' ? forecast.forecast3_result : forecast.forecast1_result, forecast.lottery_results) == 'Trúng' ? 'green' : 'red']">
            {{ index == 0 ? 'Đợi mở' : handleresult(formula == '1' ? forecast.forecast1_result : formula == '2' ?
              forecast.forecast2_result : formula == '3' ? forecast.forecast3_result : forecast.forecast1_result,
              forecast.lottery_results) }}
          </td>
          <td>
           
            {{ result(formula == '1' ? forecast.forecast1_result : formula == '2' ? forecast.forecast2_result : formula
              == '3' ? forecast.forecast3_result : forecast.forecast1_result) }}
          </td>
        </tr>
        <!-- <tr v-if="!isLoading && forecastList.length === 0">
          <td colspan="4" height="300px" style="text-align:center; color: #999;">Chưa có dữ liệu kế hoạch</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GameInfo } from '@/types/game'
import type { LotteryHistoryItem } from '@/services/lotteryService'

interface Props {
  gameType: 'luckywin' | 'sicbo' | 'mienbac' | 'miennam' | 'keno'
  formula: string  // '1', '2', '3'
  historyData: LotteryHistoryItem[]
  game: GameInfo
}

const props = defineProps<Props>()

const isLoading = ref(true)


const historyData = ref(props.historyData) //这是原数据
const changeData = ref<LotteryHistoryItem[]>([])
const handle = () => {

  const nextNumber = timebianli()
  changeData.value.push({
    id: 0,
    code: props.game.code,
    number: '',
    lottery_number: nextNumber,
    lottery_results: '',
    forecast1_result: '',
    forecast2_result: '',
    forecast3_result: '',
    lottery_data: '',
    lottery_time: 0,
    lottery_cycle: 0,
    created_at: '',
    updated_at: '',
    number_count: 0
  })
  changeData.value = [...changeData.value, ...historyData.value]
  //循环historyData.value,将开奖结果和预测结果添加到changeData.value中
  for (let i = 0; i < historyData.value.length; i++) {
    changeData.value[i].forecast1_result = historyData.value[i].forecast1_result
    changeData.value[i].forecast2_result = historyData.value[i].forecast2_result
    changeData.value[i].forecast3_result = historyData.value[i].forecast3_result
  }
  changeData.value.pop()

}

//更新数据

const timebianli = () => {
  if (props.game?.code == 'mien-bac') {
    const lotteryTime = props.game.lottery_time ?? 0
    const lotteryCycle = props.game.lottery_cycle ?? 0
    let timer = lotteryTime + lotteryCycle
    return formatDate(timer * 1000)

  } else {
    const lotteryNumber = props.game?.lottery_number ?? props.game?.number ?? '0'
    const maxNum = props.game?.max_num ?? 0
    let number = Number(lotteryNumber)
    let result = number < maxNum ? number + 1 : 1
    let length = lotteryNumber.length
    return String(result).padStart(length, '0')
  }

}

const formatDate = (timestamp: number) => {
  const d = new Date(timestamp)
  const pad = (n: number) => String(n).padStart(2, '0')

  return `${pad(d.getMonth() + 1)}${pad(d.getDate())} `
}
//大小单双
const result = (name: string) => {
  const map: Record<string, string> = {
    '大': 'Tài',
    '小': 'Xỉu',
    '单': 'Lẻ',
    '双': 'Chẵn'
  }
  return map[name]
}


const handleresult = (lottery_results: string, result: string) => {
  const sum = result
    .split(',')
    .map(item => item.trim())          // 去空格
    .map(item => Number(item))         // 转数字
    .filter(n => Number.isFinite(n))   // 过滤 NaN
    .reduce((a, b) => a + b, 0)         // 一定给 0
  //平均值
  let avg: number
  if (props.gameType === 'luckywin' || props.gameType === 'sicbo') {
    avg = 9
  } else if (props.gameType === 'mienbac' || props.gameType === 'miennam') {
    avg = 22
  } else if (props.gameType === 'keno') {
    avg = 705
  } else {
    throw new Error('未知的游戏类型');
  }
  if (lottery_results == '大') {
    if (sum < avg) {
      return 'Trượt'
    } else {
      return 'Trúng'
    }
  } else if (lottery_results == '小') {
    if (sum > avg) {
      return 'Trượt'
    } else {
      return 'Trúng'
    }

  } else if (lottery_results == '单') {
    if (sum % 2 != 0) {
      return 'Trúng'
    } else {
      return 'Trượt'
    }

  } else if (lottery_results == '双') {
    if (sum % 2 == 0) {
      return 'Trúng'
    } else {
      return 'Trượt'
    }

  }

}


// 监听formula变化,重新加载
watch(() => props.historyData, (newVal) => {
  if (newVal) {
    console.log('更新historyData.value:', newVal);
    changeData.value = []
    historyData.value = props.historyData
    handle()
    isLoading.value = false
  }
}, { immediate: true})
// watch(() => props.formula, (newVal) => {
//   if (newVal) {
//     changeData.value = []
//     historyData.value = props.historyData
//     handle()
//     isLoading.value = false
//   }
// }, { immediate: true, deep: true })


</script>

<style scoped>
.tab-panetab {
  border: solid 1px #e1e1e1;
  overflow: auto;
  border-radius: 10px;
}

.pane-table {
  width: 100%;
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

.green {
  color: green !important;
}

.ruselt {
  color: #007bff !important;
}

.red {
  color: red !important;
}
</style>
