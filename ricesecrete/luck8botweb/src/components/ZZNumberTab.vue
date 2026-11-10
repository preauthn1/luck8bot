<template>
  <div id="ZZNumberTab" class="">
    <div class="zz-number-wrapper">
      <div class="card-header">
        <div class="radio-content" >
          <div class="radio-style"  v-for="i in tabs"
            :key="i.value">
            <input type="radio" class="input-radio" :id="`tab${i.value}`" :value="i.value"
              :checked="i.value === currentTab" @change="handleTabChange">
            {{ i.name }}
          </div>
        </div>
        <div class="" style="display: flex;gap: 10px;">
          <div class="" style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.5rem;"
            v-for="i in tabs_type" :key="i.value">
            <input type="radio" class="input-radio" :id="`tab${i.value}`" :value="i.value"
              :checked="i.value === currentTabType" @change="handleTabChangetype">
            {{ i.name }}
          </div>
        </div>
      </div>
      <div class="head py-2 px-2">
        Xếp hạng <span class="red-text">{{ count }}</span> kỳ tổ hợp xuất hiện nhiều nhất

      </div>
      <div class="zz-table-wrapper">
        <table class="zz-table">
          <tbody>
            <tr v-for="(item, index) in zzNumberData" :key="index">
              <td v-for="i in item"><b>{{ i.number }}</b>: {{ i.number_count + ' lần' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { lottery_list } from '@/api/index'
import type { LotteryHistoryItem } from '@/services/lotteryService'
interface Props {
  count: number
  code: string
}
const currentTab = ref(1)
const currentTabType = ref(5)
const tabs = ref([
  { name: 'Số thứ 1', value: 1 },
  { name: 'Số thứ 2', value: 2 },
  { name: 'Số thứ 3', value: 3 },
  { name: 'Số thứ 4', value: 4 },
  { name: 'Số thứ 5', value: 5 },

])
// { name: 'Số thứ 6', value: 6 },
const tabs_type = [
  { name: 'Tổ hợp 5 số', value: 5 },
  { name: 'Tổ hợp 6 số', value: 6 },

]

const props = defineProps<Props>()

const handleTabChange = (event: Event) => {
  currentTab.value = parseInt((event.target as HTMLInputElement).value)
  get_data()
}

const handleTabChangetype = (event: Event) => {
  currentTabType.value = parseInt((event.target as HTMLInputElement).value)
  get_data()
}

// 完整追号数据
const zzNumberData = ref<LotteryHistoryItem[][]>([])

const get_data = async () => {
  
  const res = await lottery_list({ code: props.code, limit: props.count, type: currentTabType.value, ladder: currentTab.value })

  // 检查返回数据是否有效
  if (!res || !res.data || !Array.isArray(res.data)) {
    console.warn('⚠️ ZZNumberTab: 无效的返回数据', res)
    return
  }

  //将返回的数据以五个为一组进行分组
  const groupData = []
  for (let i = 0; i < res.data.length; i += 5) {
    groupData.push(res.data.slice(i, i + 5))
  }
  zzNumberData.value = groupData
}

watch(() => props.count, (newVal) => {
  if (newVal) {
    get_data()
  }
}, { immediate: true })

const get_code = (code: string) => {
  const code_list: Record<string, boolean> = {
    'mn45g': true,
    'mn90g': true,
    'mn1p': true,
    'mn2p': true,
    'mn5p': true,
  }
  return code_list[code] || false
}

watch(() => props.code, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (get_code(newVal) && tabs.value.length < 6) {
      tabs.value.push({ name: 'Số thứ 6', value: 6 })
    } else {
      if (tabs.value.length > 5) {
        tabs.value.pop()
      }
    }
    get_data()
  }
}, { immediate: true })
</script>

<style scoped>
.tab-pane {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}

.zz-number-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-text {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  padding: 10px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 22px;
}

.hot-recommendations {
  margin-bottom: 30px;
}

.hot-numbers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.hot-number-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 15px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.input-radio {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.hot-number-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.number-display {
  font-size: 32px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.number-stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.stat-label {
  opacity: 0.9;
}

.stat-value {
  font-weight: 700;
}

.stat-value.danger {
  color: #ffeb3b;
}

.stat-value.success {
  color: #4caf50;
}

.zz-table-wrapper {
  overflow-x: auto;
}

.zz-table {
  background: rgba(186, 191, 199, 0.12);
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
  min-height: 50vh;
}

.zz-table th,
.zz-table td {
  padding: 6px;
  border: 1px solid #e1e1e1;
  text-align: center;
  color: #4A5159;
  font-size: 15px;
}

.zz-table th {
  background-color: #f1f1f1;
  font-weight: 600;
  color: #4A5159;
}




@media (max-width: 768px) {
  .hot-numbers {
    grid-template-columns: 1fr;
  }
  .radio-content{
    flex-wrap: nowrap;
    width: 100%;
    overflow: auto;
  }
 
}

.card-header {
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid rgba(186, 191, 199, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 17px;
  color: #2d3483;
  font-weight: 700;
  white-space: nowrap;
}
.radio-content{
  display: flex;
  gap: 10px;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
}

.radio-content::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}
.radio-style{
  display: flex; 
  align-items: center; 
  gap: 10px; 
  margin-bottom: 0.5rem;
}

.head {
  font-weight: 700;
  padding: 0.5rem;
  color: #4A5159;
}

.red-text {
  color: #e80000;
}
</style>
