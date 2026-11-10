<template>
  <div class="game-info-wrapper">
    <div class="row game-info">
      <!-- 游戏信息左侧 -->
      <div class="col-6 lotteryInfo">
        <div class="col-6-right">
          <div class="detsils-radius pad30 left ">
            <h3>
              {{ game?.name }}&nbsp;
              <img v-if="game?.hot" src="/images/hot.png" width="20" height="20" style="margin-top:-9px;">
            </h3>
            <div class="con">
              <div class="lotteryIcon">
                <img :src="game?.icon" :alt="game?.name" />
              </div>
              <div class="lotteryDown">
                <p style="padding-left:5px;">Khoảng cách lượt xổ kỳ tiếp theo</p>
                <p style="padding-left:5px;">
                  <span style="color: #fe7373;">{{ game?.period }}</span> Kỳ Mở thưởng
                </p>
                <div class="time">
                  <span>{{ countdownHours[0] }}</span><span>{{ countdownHours[1] }}</span>&nbsp;&nbsp;:
                  <span>{{ countdownMinutes[0] }}</span><span>{{ countdownMinutes[1] }}</span>&nbsp;&nbsp;:
                  <span>{{ countdownSeconds[0] }}</span><span>{{ countdownSeconds[1] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏信息右侧 -->
      <div class="col-6 lotteryInfo lotteryInfo-right">
        <div class="col-6-left">
          <div class="detsils-radius pad30 right">
            <p class="info">
              <Icon>
                <Certificate />
              </Icon> Đã mở <span style="color: #fe7373;">{{ game?.current_num }}</span> Kỳ&nbsp;&nbsp;&nbsp;&nbsp;
              <Icon>
                <Star />
              </Icon> Còn lại <span style="color: #fe7373;">{{ game?.sub }}</span> Kỳ
            </p>
            <div class="bctil">
              <span class="blue-bar"></span>Kỳ <span style="color: #fe7373;">{{ game?.number }}</span> Số trúng thưởng
            </div>
            <div class="number">
              <span class="opencode" v-for="(num, idx) in displayNumbers" :key="idx" style="margin:3px 3px;">
                {{ num }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- Tab 内容区域 -->
      <div class="col-12" style="margin-top: 30px;">
        <div class="detsils-radius pad30 gxpr">
          <!-- Tab 和筛选器容器 -->
          <div class="tab-filter-container">
            <ul class="nav nav-pills">
              <!-- 所有游戏都有的基础Tab -->
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'history' }" @click="activeTab = 'history'">
                  Lịch sử mở thưởng
                </a>
              </li>

              <!-- Kế hoạch Tab - 所有游戏 -->
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'plan' }" @click="activeTab = 'plan'">
                  Kế hoạch
                </a>
              </li>

              <!-- Miền Bắc 特有的 Lô 2 Số Tab -->
              <li v-if="showBacTabs" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'planBac' }" @click="activeTab = 'planBac'">
                  Lô 2 Số
                </a>
              </li>

              <!-- Những số hay xổ Tab - 所有游戏 -->
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'trend' }" @click="activeTab = 'trend'">
                  Những số hay xổ
                </a>
              </li>

              <!-- Taixiu 和 Sicbo 特有的 Trend biến hình Tab -->
              <li v-if="showTrendLuckywin" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'trendLuckywin' }"
                  @click="activeTab = 'trendLuckywin'">
                  Trend biến hình
                </a>
              </li>

              <!-- Miền Nam 特有的 Số trúng thưởng Tab -->
              <li v-if="showNamTabs" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'lotteryInfoNam' }"
                  @click="activeTab = 'lotteryInfoNam'">
                  Số trúng thưởng
                </a>
              </li>

              <!-- Miền Bắc 特有的 Số trúng thưởng Tab -->
              <li v-if="showBacTabs" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'lotteryInfo' }" @click="activeTab = 'lotteryInfo'">
                  Số trúng thưởng
                </a>
              </li>

              <!-- Miền Bắc 特有的 Phân tích thống kê Tab -->
              <li v-if="showBacTabs" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'lotteryStatistic' }"
                  @click="activeTab = 'lotteryStatistic'">
                  Phân tích thống kê
                </a>
              </li>

              <!-- Miền Bắc/Miền Nam 特有的 Những số hay xổ + Tab -->
              <li v-if="showBacTabs || showNamTabs" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'trendIndex' }" @click="activeTab = 'trendIndex'">
                  Những số hay xổ +
                </a>
              </li>

              <!-- Miền Bắc/Miền Nam 特有的 Viên bi Lô 2 Số Tab -->
              <li v-if="showBacTabs || showNamTabs" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'trendXingTai' }"
                  @click="activeTab = 'trendXingTai'">
                  Viên bi Lô 2 Số
                </a>
              </li>

              <!-- Miền Bắc/Miền Nam 特有的 Số đuổi theo VIP Tab -->
              <li v-if="showBacTabs || showNamTabs" class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'zzNumber' }" @click="activeTab = 'zzNumber'">
                  Số đuổi theo VIP
                </a>
              </li>
            </ul>

            <!-- 筛选下拉框区域 - 根据不同tab显示不同的筛选 -->
            <div class="filter-wrapper">
              <!-- Kế hoạch 筛选 (普通) -->
              <div v-show="activeTab === 'plan'" class="filter-select">
                <select v-model="planFormula" class="select-dropdown">
                  <option value="1">Kế hoạch 1</option>
                  <option value="2">Kế hoạch 2</option>
                  <option value="3">Kế hoạch 3</option>
                </select>
              </div>

              <!-- Lô 2 Số 筛选 (Miền Bắc) -->
              <div v-show="activeTab === 'planBac'" class="filter-select">
                <select v-model="bacPlanFormula" class="select-dropdown">
                  <option value="1">Kế hoạch 1</option>
                  <option value="2">Kế hoạch 2</option>
                  <option value="3">Kế hoạch 3</option>
                </select>
              </div>

              <!-- Những số hay xổ 筛选 -->
              <div v-show="activeTab === 'trend'" class="filter-select">
                <select v-model="trendCount" class="select-dropdown">
                  <option :value="15">15</option>
                  <option :value="30">30</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
              </div>

              <!-- Trend biến hình 筛选 (Taixiu/Sicbo) -->
              <div v-show="activeTab === 'trendLuckywin'" class="filter-select">
                <select v-model="trendLuckywinCount" class="select-dropdown">
                  <option :value="15">15</option>
                  <option :value="30">30</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
              </div>

              <!-- Số trúng thưởng Nam 筛选 -->
              <div v-show="activeTab === 'lotteryInfoNam'" class="filter-select">
                <select v-model="lotteryInfoNamCount" class="select-dropdown">
                  <option :value="30">30</option>
                  <option :value="40">40</option>
                  <option :value="50">50</option>
                  <option :value="70">70</option>
                  <option :value="100">100</option>
                </select>
              </div>

              <!-- Số trúng thưởng Bắc 筛选 -->
              <div v-show="activeTab === 'lotteryInfo'" class="filter-select">
                <select v-model="lotteryInfoCount" class="select-dropdown">
                  <option :value="30">30</option>
                  <option :value="40">40</option>
                  <option :value="50">50</option>
                  <option :value="70">70</option>
                  <option :value="100">100</option>
                </select>
              </div>

              <!-- Phân tích thống kê 筛选 -->
              <div v-show="activeTab === 'lotteryStatistic'" class="filter-select">
                <select v-model="lotteryStatisticCount" class="select-dropdown">
                  <option :value="30">30</option>
                  <option :value="40">40</option>
                  <option :value="50">50</option>
                  <option :value="70">70</option>
                  <option :value="100">100</option>
                </select>
              </div>

              <!-- Những số hay xổ + 筛选 -->
              <div v-show="activeTab === 'trendIndex'" class="filter-select">
                <select v-model="trendIndexCount" class="select-dropdown">
                  <option :value="30">30</option>
                  <option :value="40">40</option>
                  <option :value="50">50</option>
                  <option :value="70">70</option>
                  <option :value="100">100</option>
                </select>
              </div>

              <!-- Viên bi Lô 2 Số 筛选 -->
              <div v-show="activeTab === 'trendXingTai'" class="filter-select">
                <select v-model="trendXingTaiCount" class="select-dropdown">
                  <option :value="15">15</option>
                  <option :value="30">30</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
              </div>

              <!-- Số đuổi theo VIP 筛选 -->
              <div v-show="activeTab === 'zzNumber'" class="filter-select">
                <select v-model="zzNumberCount" class="select-dropdown">
                  <option :value="15">15</option>
                  <option :value="30">30</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
              </div>
            </div>
          </div>

          <div class="tab-content" style="margin-top: 20px;">
            <!-- 历史开奖 -->
            <div v-show="activeTab === 'history'" class="tab-pane">
              <table class="pane-table" border="0">
                <tbody>
                  <tr>
                    <th style="text-align:center;">Kỳ mở thưởng</th>
                    <th width="500px" class="numberbtn" style="text-align:center;">Số trúng thưởng</th>
                    <th style="text-align:center;">Thời gian mở thưởng</th>
                  </tr>
                  <tr v-if="isLoadingHistory">
                    <td colspan="3" style="text-align:center; padding: 40px 0; color: #999;">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                  <tr v-else-if="historyRecords.length === 0">
                    <td colspan="3" style="text-align:center; padding: 40px 0; color: #999;">
                      Không có dữ liệu
                    </td>
                  </tr>
                  <tr v-else v-for="record in historyRecords" :key="record.expect">
                    <td style="text-align:center;">{{ record.expect }}</td>
                    <td class="blueqiu" style="text-align:center;">
                      <div class="number">
                        <span class="opencode" v-for="(num, idx) in getRecordNumbers(record)" :key="idx"
                          style="margin:5px 5px;">
                          {{ num }}
                        </span>
                      </div>
                    </td>
                    <td style="text-align:center;">{{ record.time }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 计划 (普通) -->
            <div v-show="activeTab === 'plan'">
              <PlanTab v-if="game && game.type && historyData.length > 0"
                :gameType="game.type as 'luckywin' | 'mienbac' | 'miennam' | 'keno' | 'sicbo'" :formula="planFormula"
                :game="game" :historyData="historyData" />
            </div>

            <!-- 计划 Bắc (Miền Bắc) -->
            <div v-show="activeTab === 'planBac'" class="tab-pane">
              <BacPlanTab :formula="bacPlanFormula" :gameCode="game?.code" />
            </div>

            <!-- 走势 -->
            <div v-show="activeTab === 'trend'" class="tab-pane">
              <!-- Luckywin/Sicbo 使用简化组件 -->
              <TrendTabSimple v-if="game && (game.type === 'luckywin' || game.type === 'sicbo')"
                :gameType="game.type as 'luckywin' | 'sicbo'" :count="trendCount" :gameCode="game.code" />
              <!-- KENO 使用专用组件 -->
              <TrendTabKeno v-else-if="game && game.type === 'keno'" :gameType="'keno'" :count="trendCount"
                :gameCode="game.code" />
              <!-- MienBac/MienNam 使用原组件 -->
              <TrendTab v-else-if="game && game.type" :gameType="game.type as 'mienbac' | 'miennam'" :count="trendCount"
                :gameCode="game.code" />
            </div>

            <!-- Trend biến hình (Taixiu/Sicbo) -->
            <div v-show="activeTab === 'trendLuckywin'" class="tab-pane">
              <TrendTabLuckywin v-if="game && game.type"
                :gameType="game.type as 'luckywin' | 'mienbac' | 'miennam' | 'keno' | 'sicbo'"
                :count="trendLuckywinCount" :gameCode="game.code" />
            </div>

            <!-- Lottery Info (Miền Bắc) -->
            <div v-show="activeTab === 'lotteryInfo'" class="">
              <LotteryInfoTab gameType="mienbac" :count="lotteryInfoCount" :gameCode="game?.code" />
            </div>

            <!-- Thống kê xổ số (Miền Bắc) -->
            <div v-if="activeTab === 'lotteryStatistic' && code_list.includes(game?.code)" class="">
              <LotteryStatisticTab :count="lotteryStatisticCount" :gameCode="game?.code" />
            </div>

            <!-- Biểu đồ (Miền Bắc/Miền Nam) -->
            <div v-show="activeTab === 'trendIndex'" class="tab-pane">
              <TrendIndexTab :count="trendIndexCount" :gameCode="game?.code" />
            </div>

            <!-- Xu hướng hình thái (Miền Bắc/Miền Nam) -->
            <div v-show="activeTab === 'trendXingTai'" class="tab-pane">
              <TrendXingTaiTab :count="trendXingTaiCount" :gameCode="game?.code" />
            </div>

            <!-- ZZ Number (Miền Bắc/Miền Nam) -->
            <div v-if="activeTab === 'zzNumber'">
              <ZZNumberTab :count="zzNumberCount" :code="props.game?.code" v-if="props.game?.code" />
            </div>

            <!-- Lottery Info Nam (Miền Nam) -->
            <div v-show="activeTab === 'lotteryInfoNam'" class="">
              <LotteryInfoTab gameType="miennam" :count="lotteryInfoNamCount" :gameCode="game?.code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue'
import { useRoute } from 'vue-router'
import Icon from './icons/Icon.vue'
import Certificate from './icons/Certificate.vue'
import Star from './icons/Star.vue'
import type { GameInfo } from '@/types/game'
import { lottery_history } from '@/api/index'
import type { LotteryHistoryItem } from '@/services/lotteryService'
import TrendTab from './TrendTab.vue'
import TrendTabSimple from './TrendTabSimple.vue'
import TrendTabLuckywin from './TrendTabLuckywin.vue'
import TrendTabKeno from './TrendTabKeno.vue'
import PlanTab from './PlanTab.vue'
import BacPlanTab from './BacPlanTab.vue'
import LotteryInfoTab from './LotteryInfoTab.vue'
import LotteryStatisticTab from './LotteryStatisticTab.vue'
import TrendIndexTab from './TrendIndexTab.vue'
import TrendXingTaiTab from './TrendXingTaiTab.vue'
import ZZNumberTab from './ZZNumberTab.vue'
import { currentTime } from '@/utils/newCurrentTime'

// ==================== Props ====================
interface Props {
  game: GameInfo
}

const props = defineProps<Props>()

// ==================== Refs ====================
const route = useRoute()
const activeTab = ref('history')

// ==================== Tab Filter States ====================
// 筛选数量变量 - 对应原始HTML中的所有筛选器
const planFormula = ref('1') // Kế hoạch 普通
const bacPlanFormula = ref('1') // Lô 2 Số (Miền Bắc)
const trendCount = ref(30) // Những số hay xổ
const trendLuckywinCount = ref(30) // Trend biến hình
const lotteryInfoNamCount = ref(30) // Số trúng thưởng Nam
const lotteryInfoCount = ref(30) // Số trúng thưởng Bắc
const lotteryStatisticCount = ref(30) // Phân tích thống kê
const trendIndexCount = ref(30) // Những số hay xổ +
const trendXingTaiCount = ref(30) // Viên bi Lô 2 Số
const zzNumberCount = ref(15) // Số đuổi theo VIP

// ==================== History Data (Shared) ====================
// 历史记录数据 - 统一管理，通过 provide 共享给子组件
const historyData = ref<LotteryHistoryItem[]>([])
const isLoadingHistory = ref(false)


// 获取历史开奖数据 - 带缓存机制
const fetchHistoryData = async () => {
  try {
    // 默认获取100条数据，支持最大筛选器数量
    const response = await lottery_history({ code: props.game.code, limit: 100 })
    if (response.code === 0 && response.data) {
      historyData.value = response.data

    }
  } catch (error) {
    console.error('❌ 获取历史数据失败:', error)
  } finally {
    isLoadingHistory.value = false
  }
}

// Provide 历史数据给子组件
provide('sharedHistoryData', {
  data: historyData,
  isLoading: isLoadingHistory,
  // refresh: fetchHistoryData
})

// ==================== Countdown ====================
// 倒计时相关
const countdown = ref({
  hours: 0,
  minutes: 0,
  seconds: 0
})
// let countdownTimer: number | null = null
const isMounted = ref(false) // 组件是否已挂载


const code_list = ['pmb5p', 'pmb3p', 'mien-bac', 'mb45g', 'mb75g', 'mb2p']

// ==================== Countdown Functions ====================
// 计算倒计时
const updateCountdown = () => {

  // 安全检查：确保组件已挂载且未被销毁
  if (!isMounted.value) {
    return
  }

  if (!props.game?.lottery_time || !props.game?.lottery_cycle) {
    // 使用安全的更新方式
    countdown.value.hours = 0
    countdown.value.minutes = 0
    countdown.value.seconds = 0
    return [0, 0, 0]
  }

  const now = currentTime.value
  let nextLotteryTime = props.game.lottery_time
  // 如果开奖时间已过期，计算下一期开奖时间
  // if (nextLotteryTime <= now) {
  //   const passedTime = now - props.game.lottery_time
  //   const cyclesPassed = Math.floor(passedTime / props.game.lottery_cycle)
  //   nextLotteryTime = props.game.lottery_time + (cyclesPassed + 1) * props.game.lottery_cycle
  // }
  if ( props.game.code.includes('taixiu5m')) {
    nextLotteryTime += 60
  }
  const remaining = nextLotteryTime - now + props.game.lottery_cycle
  if (remaining <= 0) {
    // 使用安全的更新方式
    countdown.value.hours = 0
    countdown.value.minutes = 0
    countdown.value.seconds = 0
    return [0, 0, 0]
  }

  const hours = Math.floor(remaining / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60
  countdown.value.hours = hours
  countdown.value.minutes = minutes
  countdown.value.seconds = seconds
  return [hours, minutes, seconds]
}

// 监听 currentTime 变化来更新倒计时
watch(() => currentTime.value, () => {
  updateCountdown()
}, { immediate: true })

// ==================== Computed Properties ====================
// 格式化数字为两位数
const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0')
}

// 获取倒计时显示的小时数组
const countdownHours = computed(() => {

  const hours = formatNumber(countdown.value.hours)
  return [hours[0], hours[1]]
})

// 获取倒计时显示的分钟数组
const countdownMinutes = computed(() => {
  const minutes = formatNumber(countdown.value.minutes)
  return [minutes[0], minutes[1]]
})

// 获取倒计时显示的秒数组
const countdownSeconds = computed(() => {
  const seconds = formatNumber(countdown.value.seconds)
  return [seconds[0], seconds[1]]
})


// ==================== Route & Tab Management ====================
// 监听路由查询参数，自动切换到对应的tab
watch(() => route.query.tab, (newTab) => {
  if (newTab && typeof newTab === 'string') {
    console.log('🎯 切换到:', newTab)
    activeTab.value = newTab
  }
}, { immediate: true })

// 监听统一时间变化，更新倒计时
watch(() => currentTime, () => {
  updateCountdown()
})

// ==================== Game Type Helpers ====================
// 判断游戏类型
const isTaixiuOrSicbo = computed(() => {
  return props.game?.type === 'luckywin' || props.game?.type === 'sicbo'
})

const isMienBac = computed(() => {
  return props.game?.type === 'mienbac'
})

const isMienNam = computed(() => {
  return props.game?.type === 'miennam'
})

// const isKeno = computed(() => {
//   return props.game?.type === 'keno'
// })

// 判断是否显示特定Tab
const showTrendLuckywin = computed(() => isTaixiuOrSicbo.value)
const showBacTabs = computed(() => isMienBac.value)
const showNamTabs = computed(() => isMienNam.value)

// ==================== Data Processing ====================
// 解析开奖号码
const parseOpenCode = (openCode: string, gameType: string): (string | number)[] => {
  if (!openCode) return []

  // Miền Bắc 和 Miền Nam: 复杂格式,提取第一个*号前的数字
  if (gameType === 'mienbac' || gameType === 'miennam') {
    const parts = openCode.split(',')
    if (parts[0].indexOf('*') > -1) {
      // 提取第一个*号前的数字,分解成单个字符
      const firstPart = parts[0].split('*')[0]
      return Array.from(firstPart).map(Number)
    }
  }

  // Keno: 20个号码,逗号分隔
  if (gameType === 'keno') {
    return openCode.split(',').map(Number)
  }

  // Taixiu/Sicbo: 简单格式,逗号分隔
  return openCode.split(',').map(Number)
}

const displayNumbers = computed(() => {
  if (props.game?.resultNumbers && props.game.resultNumbers.length > 0) {
    return props.game.resultNumbers
  }
  // 默认显示
  return [5, 3, 3]
})


// 根据游戏类型生成历史记录
const historyRecords = computed(() => {
  // 如果有接口数据，优先使用接口数据
  if (historyData.value.length > 0) {
    return historyData.value.map(item => ({
      expect: item.number,
      openCode: item.lottery_results,
      time: item.created_at
    }))
  }
  return []
})

// 处理历史记录显示的号码
const getRecordNumbers = (record: { openCode: string }) => {
  if (!props.game || !props.game.type) return []
  return parseOpenCode(record.openCode, props.game.type)
}

// ==================== Watchers & Lifecycle ====================
// 监听游戏变化，重新获取历史数据和启动倒计时
watch(() => props.game?.code, (newCode, oldCode) => {
  if (newCode) {

    if (oldCode && newCode !== oldCode) {
      activeTab.value = 'history'
    }
    console.log('🎯 游戏代码变化，重新获取历史数据:', newCode)
    fetchHistoryData()
    // startCountdown()
  }
}, { immediate: true })

// 监听开奖时间变化，更新倒计时
watch(() => props.game?.lottery_time, () => {
  if (props.game?.lottery_time) {
    updateCountdown()
  }
})

// ==================== Lifecycle Hooks ====================
// 组件挂载时设置标志
onMounted(() => {
  isMounted.value = true
})

// 组件卸载时清理定时器
onUnmounted(() => {
  isMounted.value = false
})

// ==================== Expose Methods ====================
// 暴露方法给父组件调用
defineExpose({
  fetchHistoryData
})
</script>

<style scoped>
.game-info-wrapper {
  width: 100%;
}

.game-info {
  padding: 0 15px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  /* margin-right: -15px;
  margin-left: -15px; */
}

.margin-left {
  margin-left: 15px;
}

.margin-right {
  margin-right: 15px;
}

.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  width: 100%;
}

.col-12 {
  /* flex: 0 0 100%;
  max-width: 100%;
  position: relative; */
  width: 100%;
  /* padding-right: 5px;
  padding-left: 5px; */
}

.lotteryInfo {
  margin-bottom: 20px;
}

.detsils-radius {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.detsils-radius.pad30 {
  padding: 30px;
}

.detsils-radius h3 {
  font-size: 20px;
  font-weight: 700;
  color: #051c35;
  margin: 0 0 20px 0;
  font-family: 'Josefin Sans', sans-serif;
}

.detsils-radius .con {
  display: flex;
  align-items: center;
}

.lotteryInfo .left .lotteryIcon {
  width: 100px;
}

.lotteryInfo .left .lotteryIcon img {
  width: 100%;
}

.lotteryInfo .left .lotteryDown {
  margin-left: 30px;
}

.lotteryInfo .left .lotteryDown .time {
  margin-top: 10px;
}

.lotteryInfo .left .lotteryDown .time span {
  width: 24px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  text-align: center;
  background-color: #fff;
  font-weight: 500;
  color: #fe7373;
  font-size: 18px;
  margin-left: 4px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);
  border-radius: 4px;
}

.col-6-right {
  padding-right: 15px;
}

.col-6-left {
  padding-left: 15px;
}

.detsils-radius.right .info {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detsils-radius.right .info .icon {
  color: #333;
  font-size: 16px;
}

.detsils-radius.right .bctil {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  position: relative;
  padding-left: 15px;
}

.lotteryInfo-right {
  background: #fff;
  border-radius: 10px;
}

.blue-bar {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: #0c59db;
  border-radius: 2px;
}

.detsils-radius.right .number {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.opencode {
  width: 32px !important;
  height: 32px !important;
  line-height: 32px !important;
  display: inline-block !important;
  text-align: center !important;
  border-radius: 50% !important;
  font-size: 16px !important;
  background: #fff !important;
  box-shadow: 0 2px 8px 0 rgba(114, 70, 255, 0.3) !important;
  border: none !important;
  box-sizing: border-box !important;
  color: #292b31;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
}

.gxpr {
  padding: 15px !important;
}

.nav-pills {
  float: left;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-link {
  display: inline-block;
  margin-bottom: 10px;
  background-color: #f7f7f7;
  height: 45px;
  border-radius: 40px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0.5rem 0.8rem;
  font-size: 16px;
  color: #6f7987;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 10px;
  line-height: 29px;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.nav-link.active {
  background-color: #547af8;
  color: #fff;
}

.tab-content {
  min-height: 400px;
  clear: both;
}

.tab-pane {
  border: solid 1px #dfdfdf;
  overflow: hidden;
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

.pane-table .number {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
}

.pane-table .opencode {
  width: 32px !important;
  height: 32px !important;
  line-height: 32px !important;
  font-size: 16px !important;
}

/* 筛选器样式 - 复刻原始HTML */
.tab-filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 15px;
}

.filter-wrapper {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.select-dropdown {
  padding: 8px 30px 8px 12px;
  font-size: 14px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  outline: none;
  transition: all 0.3s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #666 50%), linear-gradient(135deg, #666 50%, transparent 50%);
  background-position: calc(100% - 14px) center, calc(100% - 9px) center;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}

.select-dropdown:hover {
  border-color: #547af8;
  background-image: linear-gradient(45deg, transparent 50%, #547af8 50%), linear-gradient(135deg, #547af8 50%, transparent 50%);
}

.select-dropdown:focus {
  border-color: #547af8;
  box-shadow: 0 0 0 2px rgba(84, 122, 248, 0.1);
  background-image: linear-gradient(45deg, transparent 50%, #547af8 50%), linear-gradient(135deg, #547af8 50%, transparent 50%);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .col-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  /* 减少卡片间距 */
  .lotteryInfo {
    margin-bottom: 8px;
    /* padding-right: 15px;
    padding-left: 15px; */
  }

  .lotteryDown .time span {
    width: 30px;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
  }

  /* 减少卡片内边距 */
  .detsils-radius.pad30 {
    padding: 15px;
  }

  /* 减少标题间距 */
  .detsils-radius h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
  }

  /* 减少图标和文字间距 */
  .lotteryInfo .left .lotteryDown {
    margin-left: 15px;
  }

  /* 减少信息区域间距 */
  .detsils-radius.right .info {
    margin-bottom: 15px;
    font-size: 13px;
  }

  .detsils-radius.right .bctil {
    margin-bottom: 12px;
    font-size: 13px;
  }

  /* 减少号码球间距 */
  .detsils-radius.right .number {
    gap: 8px;
  }

  .opencode {
    width: 36px !important;
    height: 36px !important;
    line-height: 36px !important;
    font-size: 14px !important;
    margin: 2px 2px !important;
  }

  /* 减少Tab区域上边距 */
  .col-12 {
    margin-top: 15px !important;
    /* padding-right: 10px;
    padding-left: 10px; */
  }

  /* 减少Tab内容区域内边距 */
  .gxpr {
    padding: 15px !important;
  }

  /* Tab 导航横向滚动 */
  .tab-filter-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 10px;
  }

  .nav-pills {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap;
    width: 100%;
    padding-bottom: 5px;
    float: none;
    /* 隐藏滚动条 */
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
  }

  /* 隐藏 WebKit 浏览器的滚动条 */
  .nav-pills::-webkit-scrollbar {
    display: none;
  }

  .nav-item {
    flex-shrink: 0;
    margin-bottom: 0;
  }

  .nav-link {
    white-space: nowrap;
    margin-right: 8px;
    margin-bottom: 5px;
    font-size: 13px;
    padding: 0.4rem 0.6rem;
    height: auto;
    /* min-height: 36px; */
    line-height: 20px;
  }

  /* 筛选器在移动端独占一行 */
  .filter-wrapper {
    width: 100%;
    display: block;
  }

  .select-dropdown {
    width: 100%;
    font-size: 13px;
    padding: 6px 24px 6px 10px;
    background-position: calc(100% - 10px) center, calc(100% - 6px) center;
  }

  /* 减少Tab内容区域上边距 */
  .tab-content {
    margin-top: 10px !important;
    min-height: 300px;
  }

  /* 减少表格单元格内边距 */
  .pane-table tr td,
  .pane-table tr th {
    padding: 8px 6px;
    font-size: 13px;
  }

  .pane-table .opencode {
    width: 32px !important;
    height: 32px !important;
    line-height: 32px !important;
    font-size: 14px !important;
    margin: 2px !important;
  }

  .pane-table .number {
    gap: 4px;
  }
}

@media (max-width: 991px) {
  .lotteryInfo {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .game-info {
    padding: 0px;
  }

  .col-6-right {
    padding-right: 0;
  }

  .col-6-left {
    padding-left: 0;
  }
}
</style>
