<template>
  <div class="game-detail-page">
    <Header />

    <div class="feature item three">
      <div class="container">
        <div class="row">
          <!-- 左侧游戏导航栏 -->
          <div class="col-3 lottery-nav">
            <GameNav :current-game-id="currentGame?.code || 'taixiu'":current-time="currentTime"
              @select-game="handleSelectGame" @countdown-end="handleCountdownEnd" />
          </div>

          <!-- 右侧游戏详情 -->
          <div class="col-9" style="visibility: visible; animation-name: fadeInUp;">
            <GameInfo ref="gameInfoRef" :game="currentGame" v-if="currentGame" />
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="copyright">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <p class="text">@ 2026 <a href="/">LUCK8BOT.COM</a> All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 返回顶部按钮 -->
    <div v-if="showBackToTop" class="floating-button" @click="scrollToTop">
      <div class="float-icon">↑</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import GameNav from '@/components/GameNav.vue'
import GameInfo from '@/components/GameInfo.vue'
import type { GameInfo as GameInfoType } from '@/types/game'
import { home_data, update_data } from '@/api/index'
import type {UpdateDataResponse } from '@/services/lotteryService'
import { newCurrentTime } from '@/utils/newCurrentTime'
import { all_data, get_title, get_icon } from '@/utils/title'
import type { GameInfo as gameitem} from '@/types/game'
const route = useRoute()
const router = useRouter()
// 返回顶部按钮显示状态
const showBackToTop = ref(false)

// 监听滚动事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// 返回顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
const currentGameId = ref<string>('')
const currentGame = ref<GameInfoType>()
const currentGameData = ref<UpdateDataResponse | null>(null)
const gameInfoRef = ref<InstanceType<typeof GameInfo> | null>(null)

// 统一时间管理 - 用于同步所有倒计时
const currentTime = ref(0)

// 轮询重试相关
let retryTimer: number | null = null
const isMounted = ref(false) // 组件是否已挂载

const handleSelectGame = (gameId: string) => {
  // console.log('gameId', gameId)
  router.push(`/game/${gameId}`)
}

// 处理倒计时结束事件，调用 update_data 获取最新数据
const handleCountdownEnd = (gameCode: string) => {
  // console.log('倒计时结束，加载最新数据：', gameCode)
  loadCurrentGameData(gameCode, true)
}

const loadGame = async () => {
  const gameId = route.params.id as string
  const allGames = gameCategories.value
  const game = allGames.find(g => g.code === gameId)

  if (game) {
    // console.log('game', game)
    currentGameId.value = game.code

    // 先从 homeData 中获取数据（如果有的话），立即显示避免闪烁
    if (all_data.value) {
      // console.log('homeData', all_data.value)
      const homeGameData = allGames.find(g => g.code === game.code)
      if (homeGameData) {
        // 先显示 homeData 中的数据（避免白屏）
        currentGame.value = {
          ...game,
          ...homeGameData,
          period: homeGameData.number,
          resultNumbers: homeGameData.lottery_results?.split(',').map(Number) || []
        }
      } else {
        // 如果 homeData 中没有，先显示基础数据
        currentGame.value = game
      }
    } else {
      // 如果还没有 homeData，先显示基础数据
      currentGame.value = game
    }

    // 然后调用接口获取最新数据（每次切换都调用，确保数据最新）
    await loadCurrentGameData(game.code)
  } else {
    // console.error('未找到游戏：', gameId)
    // 默认显示第一个游戏
    currentGameId.value = allGames[0].code
    currentGame.value = allGames[0]
    router.replace(`/game/${allGames[0].code}`)
    // 递归调用以使用上面的逻辑
    await loadGame()
  }
}
const get_num = ref(0)
// 加载首页数据（只调用一次）
const loadHomeData = async () => {
  try {
    const data = await home_data()
    all_data.value = data.data
    gameCategories.value = [
      ...data.data.taixiu.map(g => ({
        ...g, type: 'luckywin',
        code: g.code,
        id: g.code,
        name: get_title(g.code),
        icon: get_icon(g.code),
        countdown: 7709,
        hot: g.is_hot == 1
      })),
      ...data.data.mb.map(g => ({
        ...g, type: 'mienbac',
        code: g.code,
        id: g.code,
        name: get_title(g.code),
        icon: get_icon(g.code),
        countdown: 7709,
        hot: g.is_hot == 1
      })),
      ...data.data.mn.map(g => ({
        ...g, type: 'miennam',
        code: g.code,
        id: g.code,
        name: get_title(g.code),
        icon: get_icon(g.code),
        countdown: 7709,
        hot: g.is_hot == 1
      })),
      ...data.data.keno.map(g => ({
        ...g, type: 'keno',
        code: g.code,
        id: g.code,
        name: get_title(g.code),
        icon: get_icon(g.code),
        countdown: 7709,
        hot: g.is_hot == 1
      })),
      ...data.data.sicbo.map(g => ({
        ...g, type: 'sicbo',
        code: g.code,
        id: g.code,
        name: get_title(g.code),
        icon: get_icon(g.code),
        countdown: 7709,
        hot: g.is_hot == 1
      })),
    ];
    newCurrentTime(data.timestamp)
    await loadGame()
  } catch (error) {
    // console.error('加载首页数据失败：', error)
    get_num.value += 1
    if (get_num.value < 10) {
      loadHomeData()
    }
  }

}

const gameCategories = ref<gameitem[]>([])

//定时器
let timer = ref<number | NodeJS.Timeout | null>(null)

// 启动倒计时
const startCountdown = (code: string) => {
  timer.value = setInterval(() => {
    loadCurrentGameData(code, true)
  }, 3000)
}

// 加载当前游戏的最新数据（倒计时结束后调用） isCountdownEnd: 是否是倒计时结束,倒计时结束去请求要是结果number一样重新请求，结果不一样清除定时器timer
const loadCurrentGameData = async (code: string, isCountdownEnd: boolean = false) => {
  // 安全检查：确保组件已挂载
  if (!isMounted.value) {
    return
  }

  try {
    const data = await update_data({ code })
    newCurrentTime(data.timestamp)
    // 判断期号是否更新
    const periodChanged = data.data.number !== currentGame.value?.number

    if (isCountdownEnd) {
      if (!periodChanged) {
        // 期号未变化，启动轮询
        if (timer.value == null) {
          startCountdown(code)
        }
      } else {
        // 期号已更新，清除定时器
        if (timer.value !== null) {
          clearInterval(timer.value);
          timer.value = null;
        }
      }
    }

    // 再次检查组件是否已卸载
    if (!isMounted.value) {
      return
    }

    currentGameData.value = data
    // 更新 currentGame 的数据
    if (currentGame.value && data.code === 0) {
      // 安全更新：逐个属性赋值而不是整体替换
      Object.assign(currentGame.value, {
        ...data.data,
        period: getNextPeriod(data),
        resultNumbers: data.data.lottery_results?.split(',').map(Number) || [],
        sub: handle_sub(data),
        current_num: handle_start(data)
      })
    }

    // 同时更新 homeData 中对应游戏的数据
    if (all_data.value && data.code === 0) {
      const gameData = data.data
      const updateGameInCategory = (games: any[]) => {
        const index = games.findIndex(g => g.code === code)
        if (index !== -1) {
          games[index] = gameData
        }
      }

      if (all_data.value?.taixiu) updateGameInCategory(all_data.value.taixiu)
      if (all_data.value?.mb) updateGameInCategory(all_data.value.mb)
      if (all_data.value?.mn) updateGameInCategory(all_data.value.mn)
      if (all_data.value?.keno) updateGameInCategory(all_data.value.keno)
      if (all_data.value?.sicbo) updateGameInCategory(all_data.value.sicbo)
    }

    // 🔥 关键优化：如果期号更新了（新开奖），立即刷新历史数据
    if (periodChanged && gameInfoRef.value?.fetchHistoryData) {
      await gameInfoRef.value.fetchHistoryData()
    }
  } catch (error) {
    console.error('获取游戏数据失败:', error)
  }
}

//下一期开奖期号
const getNextPeriod = (data: any) => {
  //获取当前时间以260108
  const d = new Date(data.timestamp * 1000)
  const code = `${String(d.getFullYear()).slice(-2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`

  let qihao: string

  if (data.data?.code == 'mien-bac') {
    let timer = data.data.lottery_time + data.data.lottery_cycle
    qihao = formatDate(timer * 1000)

  } else {
    let number = Number(data.data.lottery_number)
    let maxNum = Number(data.data.max_num)
    let result = number < maxNum ? number + 1 : 1
    let length = data.data.lottery_number.length
    qihao = String(result).padStart(length, '0')
  }
  if (data.data.code == 'pmb5p' || data.data.code == 'pmb3p') {
    return code + '8' + qihao
  }
  return code + qihao
}

const handle_sub = (data: any) => {
  let number = Number(data.data.lottery_number)
  let maxNum = Number(data.data.max_num)
  if (data.data.code == 'mien-bac') {
    const d = new Date(data.timestamp * 1000)
    let timestampUTC = Math.floor(
      Date.parse(`${d.getFullYear()}-12-31T23:59:59Z`) / 1000
    )
    return Math.floor((timestampUTC - data.data.lottery_time + 7 * 3600) / 86400)
  }
  return maxNum - number

}

const handle_start = (data: any) => {
  if (data.data.code == 'mien-bac') {
    const d = new Date(data.timestamp * 1000)
    let timestampUTC = Math.floor(
      Date.parse(`${d.getFullYear()}-01-01T00:00:00Z`) / 1000
    )
    return Math.floor((data.data.lottery_time + data.data.lottery_cycle - timestampUTC + 7 * 3600) / 86400)
  }
  return data.data.lottery_number
}
const formatDate = (timestamp: number) => {
  const d = new Date(timestamp)
  const pad = (n: number) => String(n).padStart(2, '0')

  return `${pad(d.getMonth() + 1)}${pad(d.getDate())} `
}
// 清理轮询定时器
const clearRetryTimer = () => {
  if (retryTimer !== null) {
    clearInterval(retryTimer)
    retryTimer = null
  }
}

watch(() => route.params.id, async () => {
  await loadGame()
})

// watch(() => all_data.value, async (newVal) => {
//   if (newVal) {
//     // let temp_taixiu = newVal.taixiu.map(g => ({
//     //     ...g, type: 'luckywin',
//     //     code: g.code,
//     //     name: get_title(g.code),
//     //     icon: get_icon(g.code),
//     //     countdown: 7709,
//     //     hot: g.is_hot == 1
//     //   }))
//     // gameCategories.value = [...temp_taixiu]

//     console.error('获取游戏数据失败:', gameCategories.value)
//   }
// }, { immediate: true })
onMounted(async () => {
  isMounted.value = true
  window.addEventListener('scroll', handleScroll)
  // 首先加载首页数据（用于左侧导航的倒计时）
  await loadHomeData()
  // 然后加载当前游戏数据
  // await loadGame()
})

onUnmounted(() => {
  isMounted.value = false
  // 清理轮询定时器
  clearRetryTimer()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.game-detail-page {
  min-height: 100vh;
  background: #f5f7fa;
  font-family: 'Roboto', sans-serif;
}

.feature {
  padding: 40px 0px 40px 0px;
  background: #f5f7fa;
  min-height: 100vh;
}

.container {
  width: 100%;
  /* padding-right: 15px;
  padding-left: 15px; */
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1400px;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  /* margin-right: -15px;
  margin-left: -15px; */
}

.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
  position: relative;
  width: 100%;
  padding-right: 5px;
  padding-left: 5px;
}

.col-9 {
  flex: 0 0 75%;
  max-width: 75%;
  position: relative;
  width: 100%;
  padding-right: 5px;
  padding-left: 5px;
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 5px;
  padding-left: 5px;
}

.copyright {
  background-color: #011025;
  padding: 30px 0;
  border-top: 1px solid #e8ecf1;
  margin-top: 50px;
}

.copyright .text {
  color: #8a8f9c;
  font-size: 14px;
  margin: 0;
}

.copyright .text a {
  color: #fff;
  font-weight: 600;
  transition: 0.3s;
  text-decoration: none;
}

.copyright .text a:hover {
  color: #5a2ab5;
}

.text-center {
  text-align: center;
}

@media (max-width: 991px) {
  .lottery-nav {
    display: none;
  }

  .col-9 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

/* 移动端间隙优化 */
@media (max-width: 768px) {
  .feature {
    padding: 20px 0px 20px 0px;
  }

  .container {
    /* padding-right: 10px;
    padding-left: 10px; */
  }

  .col-9 {
    /* padding-right: 10px;
    padding-left: 10px; */
  }

  .copyright {
    padding: 20px 0;
    margin-top: 30px;
  }

  .copyright .text {
    font-size: 12px;
  }
}

.floating-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #0c59db 0%, #0a47a8 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(12, 89, 219, 0.4);
  transition: all 0.3s;
  z-index: 999999;
}

.floating-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(12, 89, 219, 0.5);
}

.float-icon {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  line-height: 1;
}

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
</style>
