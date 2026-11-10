<template>
  <div id="LotteryStatisticTab" class="tab-pane noneborder">
    <div class="tk-truyenthong v-card mb-3">
      <div class="v-card-header">
        <h2 class="df-title">Thống kê nhanh truyền thống</h2>
      </div>

      <!-- 10 bộ số xuất hiện nhiều nhất -->
      <div class="statics-group">
        <div class="head py-2 px-2">
          10 bộ số xuất hiện <span class="red-text">nhiều nhất</span> trong <span>{{ count }}</span> kỳ qua
        </div>
        <table class="w-100">
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center">Đang tải...</td>
            </tr>
            <tr v-else-if="!statisticData.max10 || statisticData.max10.length === 0">
              <td colspan="5" class="text-center">Không có dữ liệu</td>
            </tr>
            <template v-else>
              <tr v-for="(row, rowIndex) in getRows(statisticData.max10)" :key="'max-' + rowIndex">
                <td v-for="item in row" :key="item.id">
                  <b>{{ item.number }}</b> {{ item.number_count }} lần
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- 10 bộ số xuất hiện ít nhất -->
      <div class="statics-group">
        <div class="head py-2 px-2">
          10 bộ số xuất hiện <span class="green-text">ít nhất</span> trong <span>{{ count }}</span> kỳ qua
        </div>
        <table class="w-100">
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center">Đang tải...</td>
            </tr>
            <tr v-else-if="!statisticData.min10 || statisticData.min10.length === 0">
              <td colspan="5" class="text-center">Không có dữ liệu</td>
            </tr>
            <template v-else>
              <tr v-for="(row, rowIndex) in getRows(statisticData.min10)" :key="'min-' + rowIndex">
                <td v-for="item in row" :key="item.id">
                  <b>{{ item.number }}</b> {{ item.number_count }} lần
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- 10 bộ số gan lâu nhất -->
      <div class="statics-group">
        <div class="head py-2 px-2">
          10 bộ số gan <span class="blue-text">lâu nhất</span> trong <span>{{ count }}</span> kỳ qua
        </div>
        <table class="w-100">
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center">Đang tải...</td>
            </tr>
            <tr v-else-if="!statisticData.maxyl10 || statisticData.maxyl10.length === 0">
              <td colspan="5" class="text-center">Không có dữ liệu</td>
            </tr>
            <template v-else>
              <tr v-for="(row, rowIndex) in getRows(statisticData.maxyl10)" :key="'maxyl-' + rowIndex">
                <td v-for="item in row" :key="item.id">
                  <b>{{ item.number }}</b> {{ item.number_count }} lần
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// @ts-ignore
import service from '@/utils/request'

interface Props {
  count: number
  gameCode?: string
}

interface StatisticItem {
  id: number
  code: string
  number: string
  type: string
  num: number
  number_count: number
  updated_at: string
}

interface StatisticData {
  max10: StatisticItem[]
  min10: StatisticItem[]
  maxyl10: StatisticItem[]
}

const props = defineProps<Props>()
const loading = ref(false)
const statisticData = ref<StatisticData>({
  max10: [],
  min10: [],
  maxyl10: []
})

// 将数据分成每行5个的二维数组（模拟原版HTML的布局）
const getRows = (items: StatisticItem[]) => {
  const rows: StatisticItem[][] = []
  const itemsPerRow = 5

  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow))
  }

  return rows
}

// 获取统计数据
const fetchStatisticData = async () => {
  if (!props.gameCode) {
    console.warn('gameCode is required')
    return
  }

  loading.value = true
  try {
    const response = await service.get('/v1/lottery_analyze', {
      params: {
        code: props.gameCode,
        limit: props.count || 30
      }
    })

    if (response.code === 0 && response.data) {
      statisticData.value = {
        max10: response.data.max10 || [],
        min10: response.data.min10 || [],
        maxyl10: response.data.maxyl10 || []
      }
    } else {
      console.error('获取统计数据失败:', response.msg)
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听 gameCode 和 count 变化
watch(() => [props.gameCode, props.count], () => {
  if (props.gameCode) {
    fetchStatisticData()
  }
}, { immediate: true })

</script>

<style scoped>
/* 基础布局 */
.tab-pane {
  padding: 0;
  background: transparent;
}

.tab-pane.noneborder {
  border: none;
}

.tk-truyenthong {
  background: #FFFFFF;
  /* box-shadow: 0 5px 25px rgb(34 41 47 / 10%); */
  /* border-radius: 8px; */
  overflow: hidden;
}

.v-card.mb-3 {
  margin-bottom: 1rem;
}

/* 卡片头部 */
.v-card-header {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid rgba(186, 191, 199, 0.12);
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
}

.df-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3483;
  margin: 0;
}

/* 统计组 */
.statics-group {
  margin-bottom: 0;
}

.statics-group .head {
  font-weight: 700;
  /* background: #f8f9fa; */
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid rgba(186, 191, 199, 0.12);
}

.statics-group .head span {
  font-weight: 700;
}

/* 颜色类 */
.red-text {
  color: #e80000;
}

.green-text {
  color: #28C76F;
}

.blue-text {
  color: #007bff;
}

/* 表格样式 - 完全参照原版 */
.tk-truyenthong table {
  background: rgba(186, 191, 199, 0.12);
  width: 100%;
  border-collapse: collapse;
}

.tk-truyenthong table td {
  padding: 8px 6px;
  border: 1px solid #2125291f;
  text-align: center;
  font-size: 14px;
  color: #0A0A0A;
}

.tk-truyenthong table td b {
  font-weight: 700;
  font-size: 16px;
  color: #051c35;
  margin-right: 4px;
}

.tk-truyenthong table tr:nth-child(even) {
  background: rgba(186, 191, 199, 0.06);
}

.tk-truyenthong table tr:hover {
  background: rgba(186, 191, 199, 0.18);
}

/* 工具类 */
.w-100 {
  width: 100%;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.text-center {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tk-truyenthong table td {
    padding: 6px 4px;
    font-size: 12px;
  }

  .tk-truyenthong table td b {
    font-size: 14px;
  }

  .statics-group .head {
    font-size: 13px;
    padding: 10px 15px;
  }

  .df-title {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .tk-truyenthong table td {
    padding: 5px 3px;
    font-size: 11px;
  }

  .tk-truyenthong table td b {
    font-size: 13px;
    margin-right: 2px;
  }

  .statics-group .head {
    font-size: 12px;
    padding: 8px 10px;
  }

  .df-title {
    font-size: 15px;
  }
}
</style>
