<template>
  <div class="feature-box">
    <div class="content" @click="navigateToTab(gameInfo.code)">
      <div class="top">
        <div class="txt">
          <div class="game-title">
            <img :src="get_icon(gameInfo.code)" width="30" height="30" alt="">
            <h5>
              {{ get_title(gameInfo.code) }}
              <!-- v-if="showHotIcon" -->
            </h5>
            <img v-if="gameInfo.is_hot==1" src="/images/hot.png" width="20" height="20" class="hot-icon" alt="hot">
          </div>
          <p class="gtem">
            <a @click.stop="navigateToTab(gameInfo.code,'history')">Lịch sử mở thưởng</a>
            <a @click.stop="navigateToTab(gameInfo.code,'plan')">Kế hoạch</a>
            <a @click.stop="navigateToTab(gameInfo.code,'trend')">Những số hay xổ</a>
          </p>
        </div>
        <div class="time">{{ getUpdateCountdown() }}</div>
      </div>
      <div class="past-part">
        <div class="left-content open-numbers" v-if="gameData">
          <span v-for="(num, index) in gameData?.lottery_results?.split(',')" :key="index">{{ num }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { HomeGameData } from '@/services/lotteryService'
import { currentTime } from '@/utils/newCurrentTime'
import { update_data } from '@/api/index'
import { get_title,get_icon} from '@/utils/title'

interface Props {
  gameInfo: HomeGameData
  circleCount?: number
  showHot?: boolean
  index: number
  title: string
}


const props = withDefaults(defineProps<Props>(), {
  circleCount: 3,
  showHot: false,
  time: 0,
  index: 0,
  title: ''
})

// const emit = defineEmits(['get-data'])
const router = useRouter()
const gameData = ref<HomeGameData | null>(props.gameInfo)
// 响应式倒计时值
// const formattedCountdown = ref<string>('00:00:00')

// 导航到游戏详情页并显示对应的tab
const navigateToTab = (code:string,tab?: string) => {
  router.push({
    path: `/game/${code}`,
    query: { tab }
  })
}

const updata = async (code: string) => {
  const res = await update_data({ code: code })
  gameData.value = res.data
}
// 根据game code计算倒计时
const calculateRemainingSeconds = (current: number): number => {
  // 检查必要属性是否存在
  if (!gameData.value || gameData.value.lottery_time === undefined || gameData.value.lottery_cycle === undefined) {
    return 0; // 返回默认值或错误处理
  }
  let nextLotteryTime = gameData?.value?.lottery_time + gameData?.value?.lottery_cycle

  // taixiu5m 需要额外延迟 60 秒开奖
  if (gameData?.value?.code.includes('taixiu5m')) {
    nextLotteryTime += gameData?.value?.lottery_cycle
  }

  let remaining = nextLotteryTime - current

  // 如果已经过了开奖时间（数据过期），循环计算到下一个未来的开奖时间
  if (remaining <= 0) {
    nextLotteryTime += gameData?.value?.lottery_cycle
    remaining = nextLotteryTime - current
    return 0;
  }

  return remaining
}

// 格式化倒计时显示
const formatTime = (seconds: number): string => {
  if (seconds <= 0) return '00:00:00'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `00:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
// 更新倒计时显示
const is_success = ref<boolean>(true)
const getUpdateCountdown = (): string => {
  const remainingSeconds = calculateRemainingSeconds(currentTime.value)
  if (remainingSeconds <= 0) {
    // formattedCountdown.value = '00:00:00'
    if (gameData.value?.code) {
      if (is_success.value) {
        is_success.value = false
        updata(gameData?.value?.code)
      }

    }
    return "00:00:00"
  }

  return formatTime(remainingSeconds)
}

let get_data_countdownInterval: number | null = null


// 组件挂载时立即更新一次倒计时
onMounted(() => {
  get_data_countdownInterval = window.setInterval(() => {
    console.log('获取数据倒计时执行')
    if (gameData.value?.code && is_success.value == false) {
      updata(gameData?.value?.code)
    }
  }, 2000)
})

// 监听游戏信息变化
watch(() => gameData.value, (newVal, oldVal) => {
  console.log('游戏信息变化' + newVal?.code, newVal?.lottery_time, oldVal?.lottery_time)
  if (newVal?.lottery_time !== oldVal?.lottery_time) {
    is_success.value = true
    // // formattedCountdown.value = '00:00:00'
    // if (get_data_countdownInterval) {
    //   clearInterval(get_data_countdownInterval)
    //   get_data_countdownInterval = null
    // }
    // 重新开始倒计时
  }
}, { immediate: true })

// 组件卸载时清理定时器
onUnmounted(() => {
  if (get_data_countdownInterval) {
    clearInterval(get_data_countdownInterval)
    get_data_countdownInterval = null
  }
})
</script>

<style scoped>
/* 保持原有的样式不变 */
.feature-box {
  overflow: hidden;
  margin-top: 30px;
  position: relative;
  background-color: white;
  box-shadow: 0px 11px 25px 0px rgba(244, 244, 244, 0.2);
  border-radius: 15px;
  z-index: 1;
  transition: 0.3s;
}

.feature-box:hover {
  transform: translateY(-5px);
  box-shadow: 0px 15px 35px 0px rgba(244, 244, 244, 0.4);
}

.content {
  padding: 15px;
}

.top {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.txt {
  position: relative;
  flex: 1;
}

.txt img {
  position: absolute;
  left: 7px;
  top: 0;
}

.txt .game-title {
  display: flex;
  align-items: center;
}

.txt h5 {
  margin-left: 47px;
  font-size: 18px;
  line-height: 1.55;
  font-weight: 600;
  color: #051c35;
  font-family: 'Josefin Sans', sans-serif;
  margin-top: 0;
  margin-bottom: 14px;
  display: inline-block;
}

.hot-icon {
  margin-top: -15px;
  position: relative !important;
  vertical-align: middle;
  margin-left: 4px;
}

.gtem {
  margin-top: 14px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 0;
}

.gtem a {
  background: #f8f9fa;
  border-radius: 20px;
  color: #90a2dc;
  font-size: 13px;
  padding: 2px 9px;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
}

.gtem a:hover {
  background-color: #0056b3;
  color: #fff;
}

.time {
  position: absolute;
  right: 0;
  top: -3px;
  color: #fff;
  padding: 2px 12px;
  background-image: linear-gradient(180deg, #ff598e, #ff2d55);
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.past-part {
  padding-top: 10px;
  display: flex;
}

.open-numbers {
  display: flex;
  flex-wrap: wrap;
}

.open-numbers span {
  border-radius: 50%;
  color: #292b31;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 4px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  background: url(/images/no-bg.png) no-repeat 50%/120%;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }

  .txt h5 {
    font-size: 16px;
    margin-left: 40px;
  }

  .txt img {
    width: 26px;
    height: 26px;
    left: 5px;
  }

  .time {
    font-size: 10px;
    padding: 2px 10px;
  }

  .open-numbers span {
    width: 28px;
    height: 28px;
    font-size: 13px;
    margin: 3px;
  }
}
</style>