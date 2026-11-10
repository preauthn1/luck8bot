<template>
  <div class="menu">
    <h2 class="menu-title">
      <span>DANH SÁCH TRÒ CHƠI</span>
    </h2>
    <ul class="menu-inline">
      <li v-for="(category, index) in gameCategories" :key="index" class="li"
        :class="{ active: expandedCategories[category.type] }">
        <div class="el-submenu-title" @click="toggleCategory(category.type)">
          <span>
            {{ category.name }}&nbsp;
            <img v-if="category.hot" src="/images/hot.png" width="20" height="20" style="margin-top:-3px;">
          </span>
          <Icon :class="{ rotated: expandedCategories[category.type] }">
            <ArrowDownBold />
          </Icon>
        </div>
        <ul :class="{ expanded: expandedCategories[category.type] }">
          <li v-for="game in category.games" :key="game.code" class="menu-item">
            <a :class="{ select: currentGameId === game.code }" @click="selectGame(game.code)">
              <div class="menu-name">
                {{ game.name }}&nbsp;
                <img v-if="game.hot" src="/images/hot.png" width="20" height="20" style="margin-top:-3px;">
              </div>
              <div class="time">{{ getCountdown(game.code) }}</div>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from './icons/Icon.vue'
import ArrowDownBold from './icons/ArrowDownBold.vue'
import { luckywinGames, mienBacGames, mienNamGames, kenoGames, sicboGames } from '@/data/games'
import type { HomeGameData } from '@/services/lotteryService'
import { currentTime } from '@/utils/newCurrentTime'
import { all_data, get_title, get_icon } from '@/utils/title'
interface Props {
  currentGameId: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  selectGame: [gameId: string]
  countdownEnd: [gameCode: string]
}>()

// 刷新时间
// const updateTime = ref<number>(currentTime.value)
// let countdownTimer: number | null = null

// 记录每个游戏上次倒计时结束的时间戳，避免重复触发
const lastCountdownEndTime = ref<Record<string, number>>({})

// 每秒更新时间
onMounted(() => {
  // countdownTimer = window.setInterval(() => {
  //   updateTime.value = currentTime
  // }, 1000)
})

onUnmounted(() => {
  // if (countdownTimer) {
  //   clearInterval(countdownTimer)
  // }
})

// 根据game code查找倒计时
const getCountdown = (gameCode: string): string => {
  if (!all_data.value) return '--:--'
  const allGames: HomeGameData[] = [
    ...(all_data.value.taixiu || []),
    ...(all_data.value.mb || []),
    ...(all_data.value.mn || []),
    ...(all_data.value.keno || []),
    ...(all_data.value.sicbo || []),
  ]

  const game = allGames.find(g => g.code === gameCode)
  if (!game) return '--:--'

  // lottery_time 是上一次开奖时间，加上 lottery_cycle 才是下一次开奖时间
  let nextLotteryTime = game.lottery_time + game.lottery_cycle

  // taixiu5m 需要额外延迟 60 秒开奖
  if (gameCode.includes('taixiu5m')) {
    nextLotteryTime += 60
  }
  let remaining = nextLotteryTime - currentTime.value

  // 如果已经过了开奖时间（数据过期），循环计算到下一个未来的开奖时间
  // if (remaining <= 0) {
  //   console.log('游戏', gameCode, '已经过了开奖时间，循环计算到下一个未来的开奖时间')
  //   nextLotteryTime += game.lottery_cycle
  // }
  // 如果已经过了开奖时间（数据过期），计算下一个未来的开奖时间
  // console.log("每秒更新时间",gameCode, '剩余时间', remaining);
  // 检测倒计时是否刚结束（remaining <= 1 秒）
  // 需要检查是否是当前选中的游戏
  // const allLocalGames = [...luckywinGames, ...mienBacGames, ...mienNamGames, ...kenoGames, ...sicboGames]
  const currentGame = allGames.find(g => g.code === props.currentGameId)
  if (remaining <= 0 && currentGame && currentGame.code !== gameCode) {
    game.lottery_time += game.lottery_cycle
  }
  if (remaining <= 0 && currentGame && currentGame.code === gameCode) {
    // console.log("倒计时结束",remaining)
    const lastEndTime = lastCountdownEndTime.value[gameCode] || 0
    remaining = 0;
    // 避免在同一个周期内重复触发（至少间隔 lottery_cycle 秒）
    if (currentTime.value - lastEndTime >= game.lottery_cycle) {
      lastCountdownEndTime.value[gameCode] = currentTime.value
      emit('countdownEnd', gameCode)
    }
  }

  const hours = Math.floor(remaining / 3600)

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const gameCategories = ref([
  { type: 'luckywin', name: 'Luckywin', hot: true, games: luckywinGames },
  { type: 'mienbac', name: 'Miền Bắc', hot: true, games: mienBacGames },
  { type: 'miennam', name: 'Miền Nam', hot: false, games: mienNamGames },
  { type: 'keno', name: 'Keno', hot: false, games: kenoGames },
  { type: 'sicbo', name: 'Sicbo', hot: false, games: sicboGames }
])

// 管理每个分类的展开/折叠状态
const expandedCategories = ref<Record<string, boolean>>({
  luckywin: false,
  mienbac: false,
  miennam: false,
  keno: false,
  sicbo: false
})

// 切换分类展开/折叠状态
const toggleCategory = (categoryType: string) => {
  // 如果点击的是已展开的分类，则折叠它
  if (expandedCategories.value[categoryType]) {
    expandedCategories.value[categoryType] = false
  } else {
    // 否则，先折叠所有分类，再展开当前分类
    Object.keys(expandedCategories.value).forEach(key => {
      expandedCategories.value[key] = false
    })
    expandedCategories.value[categoryType] = true
  }
}

// 选择游戏
const selectGame = (gameId: string) => {
  emit('selectGame', gameId)
}

// 监听当前游戏变化,自动展开对应分类
watch(() => props.currentGameId, (newGameId) => {
  if (newGameId) {
    // 先折叠所有分类
    Object.keys(expandedCategories.value).forEach(key => {
      expandedCategories.value[key] = false
    })

    // 然后只展开包含当前游戏的分类
    gameCategories.value.forEach(category => {
      if (category.games.some(g => g.code === newGameId)) {
        expandedCategories.value[category.type] = true
      }
    })
  }
}, { immediate: true })

watch(() => all_data.value, (newVal) => {
  if (newVal) {
    gameCategories.value = [
      {
        type: 'luckywin', name: 'Luckywin', hot: true, games: newVal.taixiu.map(g => ({
          ...g,
          id: g.code,
          code: g.code,
          name: get_title(g.code),
          icon: get_icon(g.code),
          countdown: 7709,
          hot: g.is_hot == 1
        }))
      },
      {
        type: 'mienbac', name: 'Miền Bắc', hot: true, games: newVal.mb.map(g => ({
          ...g,
          code: g.code,
          name: get_title(g.code),
          icon: get_icon(g.code),
          countdown: 7709,
          hot: g.is_hot == 1
        }))
      },
      {
        type: 'miennam', name: 'Miền Nam', hot: false, games: newVal.mn.map(g => ({
          ...g,
          code: g.code,
          name: get_title(g.code),
          icon: get_icon(g.code),
          countdown: 7709,
          hot: g.is_hot == 1
        }))
      },
      {
        type: 'keno', name: 'Keno', hot: false, games: newVal.keno.map(g => ({
          ...g,
          code: g.code,
          name: get_title(g.code),
          icon: get_icon(g.code),
          countdown: 7709,
          hot: g.is_hot == 1
        }))
      },
      {
        type: 'sicbo', name: 'Sicbo', hot: false, games: newVal.sicbo.map(g => ({
          ...g,
          code: g.code,
          name: get_title(g.code),
          icon: get_icon(g.code),
          countdown: 7709,
          hot: g.is_hot == 1
        }))
      }
    ]
  }
}, {immediate: true })
</script>

<style scoped>
.menu {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.menu-title {
  padding: 20px;
  font-size: 20px;
  color: #FFFFFF;
  margin: 0;
  background: linear-gradient(to right, #7e3afb, #29b9f5);
}

.menu-inline {
  list-style: none;
  margin: 0 0 0 0;
  padding: 0;
}

.li {
  list-style: none;
  margin: 0;
  color: #000;
}

.el-submenu-title {
  position: relative;
  cursor: pointer;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: 18px;
  padding: 20px;
  font-weight: 700;
  box-shadow: inset 0 -0.5px 0 0 rgb(132 144 167 / 30%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-submenu-title .icon {
  transition: transform .3s;
  position: absolute;
  right: 20px;
}

.el-submenu-title .icon.rotated {
  transform: rotate(180deg);
}

.li.active .el-submenu-title {
  background-color: rgba(176, 163, 231, 0.26);
  box-shadow: 9.272px 3.746px 28px 0px rgba(176, 163, 231, 0.26);
}

.li ul {
  display: none;
  background: linear-gradient(to right, #f9f9f9, rgba(176, 163, 231, 0.16));
  margin-bottom: 0;
  margin-left: 0;
  padding: 0;
}

.li.active ul,
.li ul.expanded {
  display: block;
}

.li li {
  box-shadow: inset 0 -0.5px 0 0 rgb(132 144 167 / 30%);
}

.menu-item {
  padding: 20px;
  list-style: none;
}

.menu-item a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #323232;
  text-decoration: none;
  cursor: pointer;
}

.menu-item a:hover {
  color: #547af8;
}

.menu-item a.select {
  color: #547af8;
  font-weight: bold;
}

.menu-name {
  font-size: 14px;
  flex: 1;
}

.time {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  margin-left: 10px;
}
</style>
