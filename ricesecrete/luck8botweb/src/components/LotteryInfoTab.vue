<template>
  <div id="LotteryInfoTab" class="">
    <div v-if="loading" style="text-align: center; padding: 40px 0;">
      <span>Đang tải...</span>
    </div>

    <div v-else-if="lotteryData.length === 0" style="text-align: center; padding: 40px 0; color: #999;">
      Chưa có dữ liệu
    </div>

    <div v-else v-for="lottery in lotteryData" :key="lottery.number" class="lottery-result-wrapper">
      <!-- Miền Nam Layout: 左侧奖项 + 右侧头尾统计 -->
      <div v-if="!isBac" class="kqsx-today text-center v-card mb-3">
        <h1 class="lead df-title pt-3 pb-3 d-block">
          Kết quả Xổ số Miền Nam - {{ lottery.number }}
        </h1>

        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tbody>
            <tr>
              <td valign="top">
              <!-- 左侧：奖项表格 -->
              <table class="kqmb colgiai extendable responsive tdfirstlb0" :class="digitClass">
                <tbody>
                  <tr style="display:none;"><td colspan="2"></td></tr>

                  <!-- 特等奖 ĐB -->
                  <tr class="db">
                    <td class="txt-giai" width="80" height="53">ĐB</td>
                    <td class="v-giai number">
                      <span class="v-gdb number-span" :data-html="lottery.prizes[0]">{{ displayNumber(lottery.prizes[0]) }}</span>
                    </td>
                  </tr>

                  <!-- G.1 -->
                  <tr>
                    <td class="txt-giai" height="53">G.1</td>
                    <td class="v-giai number">
                      <span class="v-g1 number-span" :data-html="lottery.prizes[1]">{{ displayNumber(lottery.prizes[1]) }}</span>
                    </td>
                  </tr>

                  <!-- G.2 -->
                  <tr>
                    <td class="txt-giai" height="53">G.2</td>
                    <td class="v-giai number">
                      <span class="v-g1 number-span" :data-html="lottery.prizes[2]">{{ displayNumber(lottery.prizes[2]) }}</span>
                    </td>
                  </tr>

                  <!-- G.3 -->
                  <tr>
                    <td class="txt-giai" height="53">G.3</td>
                    <td class="v-giai number">
                      <div class="v-g1">
                        <span class="number-span" :data-html="lottery.prizes[3]">{{ displayNumber(lottery.prizes[3]) }}</span>，
                        <span class="number-span" :data-html="lottery.prizes[4]">{{ displayNumber(lottery.prizes[4]) }}</span>
                      </div>
                    </td>
                  </tr>

                  <!-- G.4 -->
                  <tr>
                    <td class="txt-giai" height="159">G.4</td>
                    <td class="v-giai number">
                      <div class="v-g1">
                        <span class="number-span" :data-html="lottery.prizes[5]">{{ displayNumber(lottery.prizes[5]) }}</span>，
                        <span class="number-span" :data-html="lottery.prizes[6]">{{ displayNumber(lottery.prizes[6]) }}</span>，
                        <span class="number-span" :data-html="lottery.prizes[7]">{{ displayNumber(lottery.prizes[7]) }}</span><br />
                        <span class="number-span" :data-html="lottery.prizes[8]">{{ displayNumber(lottery.prizes[8]) }}</span>，
                        <span class="number-span" :data-html="lottery.prizes[9]">{{ displayNumber(lottery.prizes[9]) }}</span>，
                        <span class="number-span" :data-html="lottery.prizes[10]">{{ displayNumber(lottery.prizes[10]) }}</span><br />
                        <span class="number-span" :data-html="lottery.prizes[11]">{{ displayNumber(lottery.prizes[11]) }}</span>
                      </div>
                    </td>
                  </tr>

                  <!-- G.5 -->
                  <tr>
                    <td class="txt-giai" height="53">G.5</td>
                    <td class="v-giai number">
                      <span class="v-g1 number-span" :data-html="lottery.prizes[12]">{{ displayNumber(lottery.prizes[12]) }}</span>
                    </td>
                  </tr>

                  <!-- G.6 -->
                  <tr>
                    <td class="txt-giai" height="53">G.6</td>
                    <td class="v-giai number">
                      <div class="v-g1">
                        <span class="number-span" :data-html="lottery.prizes[13]">{{ displayNumber(lottery.prizes[13]) }}</span>，
                        <span class="number-span" :data-html="lottery.prizes[14]">{{ displayNumber(lottery.prizes[14]) }}</span>，
                        <span class="number-span" :data-html="lottery.prizes[15]">{{ displayNumber(lottery.prizes[15]) }}</span>
                      </div>
                    </td>
                  </tr>

                  <!-- G.7 -->
                  <tr>
                    <td class="txt-giai" height="53">G.7</td>
                    <td class="v-giai number">
                      <span class="v-g1 number-span" :data-html="lottery.prizes[16]">{{ displayNumber(lottery.prizes[16]) }}</span>
                    </td>
                  </tr>

                  <!-- G.8 (仅Miền Nam) -->
                  <tr>
                    <td class="txt-giai" height="53">G.8</td>
                    <td class="v-giai number">
                      <span class="v-g1 number-span" :data-html="lottery.prizes[17]">{{ displayNumber(lottery.prizes[17]) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>

            <!-- 右侧：按首位分组统计 -->
            <td width="350" valign="top">
              <table class="kqmb colgiai extendable responsive tdfirstlb0 tdlastrb0">
                <tbody>
                  <tr style="display:none;"><td colspan="2"></td></tr>
                  <tr class="db">
                    <td class="txt-giai" width="80" height="53">Đầu</td>
                    <td class="txt-giai">Đuôi</td>
                  </tr>
                  <tr v-for="i in 10" :key="i">
                    <td class="txt-giai" height="53">{{ i - 1 }}</td>
                    <td class="v-giai number">
                      <span class="v-g1">{{ lottery.headGroups && lottery.headGroups[i - 1]?.length ? lottery.headGroups[i - 1].join(',&nbsp;') : '&nbsp;' }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>

        <!-- 数字显示控制 -->
        <div class="control-panel">
          <form class="digits-form mt-3 mb-3 text-left">
            <label class="radio" @click="digitMode = '0'">
              <input type="radio" name="showed-digits" value="0" :checked="digitMode === '0'">
              <b></b>
              <span>Tất cả</span>
            </label>
            <label class="radio" @click="digitMode = '2'">
              <input type="radio" name="showed-digits" value="2" :checked="digitMode === '2'">
              <b></b>
              <span>2 số cuối</span>
            </label>
            <label class="radio" @click="digitMode = '3'">
              <input type="radio" name="showed-digits" value="3" :checked="digitMode === '3'">
              <b></b>
              <span>3 số cuối</span>
            </label>
          </form>
        </div>
      </div>

      <!-- Miền Bắc Layout: 单列奖项 + 底部头尾统计 -->
      <div v-else>
        <div class="kqsx-today text-center v-card mb-3">
          <h1 class="lead df-title pt-3 pb-3 d-block">
            Kết quả Xổ số Miền Bắc - {{ lottery.number }}
          </h1>

          <table class="kqmb colgiai extendable responsive tdfirstlb0 tdlastrb0" :class="digitClass" data-zone="kqmb">
            <tbody>
              <tr style="display:none;"><td colspan="2"></td></tr>

              <!-- ĐB -->
              <tr class="db">
                <td class="txt-giai" width="80">ĐB</td>
                <td class="v-giai number">
                  <span data-nc="5" class="v-gdb number-span" :data-html="lottery.prizes[0]">{{ displayNumber(lottery.prizes[0]) }}</span>
                </td>
              </tr>

              <!-- G.1 -->
              <tr>
                <td class="txt-giai">G.1</td>
                <td class="v-giai number">
                  <span class="v-g1 number-span" :data-html="lottery.prizes[1]">{{ displayNumber(lottery.prizes[1]) }}</span>
                </td>
              </tr>

              <!-- G.2 -->
              <tr class="bg_ef">
                <td class="txt-giai">G.2</td>
                <td class="v-giai number">
                  <span class="v-g2-0 number-span" :data-html="lottery.prizes[2]">{{ displayNumber(lottery.prizes[2]) }}</span>
                  <span class="v-g2-1 number-span" :data-html="lottery.prizes[3]">{{ displayNumber(lottery.prizes[3]) }}</span>
                </td>
              </tr>

              <!-- G.3 -->
              <tr>
                <td class="txt-giai">G.3</td>
                <td class="v-giai number">
                  <span class="v-g3-0 number-span" :data-html="lottery.prizes[4]">{{ displayNumber(lottery.prizes[4]) }}</span>
                  <span class="v-g3-1 number-span" :data-html="lottery.prizes[5]">{{ displayNumber(lottery.prizes[5]) }}</span>
                  <span class="v-g3-2 number-span" :data-html="lottery.prizes[6]">{{ displayNumber(lottery.prizes[6]) }}</span>
                  <span class="v-g3-3 number-span" :data-html="lottery.prizes[7]">{{ displayNumber(lottery.prizes[7]) }}</span>
                  <span class="v-g3-4 number-span" :data-html="lottery.prizes[8]">{{ displayNumber(lottery.prizes[8]) }}</span>
                  <span class="v-g3-5 number-span" :data-html="lottery.prizes[9]">{{ displayNumber(lottery.prizes[9]) }}</span>
                </td>
              </tr>

              <!-- G.4 -->
              <tr class="bg_ef">
                <td class="txt-giai">G.4</td>
                <td class="v-giai number">
                  <span class="v-g4-0 number-span" :data-html="lottery.prizes[10]">{{ displayNumber(lottery.prizes[10]) }}</span>
                  <span class="v-g4-1 number-span" :data-html="lottery.prizes[11]">{{ displayNumber(lottery.prizes[11]) }}</span>
                  <span class="v-g4-2 number-span" :data-html="lottery.prizes[12]">{{ displayNumber(lottery.prizes[12]) }}</span>
                  <span class="v-g4-3 number-span" :data-html="lottery.prizes[13]">{{ displayNumber(lottery.prizes[13]) }}</span>
                </td>
              </tr>

              <!-- G.5 -->
              <tr>
                <td class="txt-giai">G.5</td>
                <td class="v-giai number">
                  <span class="v-g5-0 number-span" :data-html="lottery.prizes[14]">{{ displayNumber(lottery.prizes[14]) }}</span>
                  <span class="v-g5-1 number-span" :data-html="lottery.prizes[15]">{{ displayNumber(lottery.prizes[15]) }}</span>
                  <span class="v-g5-2 number-span" :data-html="lottery.prizes[16]">{{ displayNumber(lottery.prizes[16]) }}</span>
                  <span class="v-g5-3 number-span" :data-html="lottery.prizes[17]">{{ displayNumber(lottery.prizes[17]) }}</span>
                  <span class="v-g5-4 number-span" :data-html="lottery.prizes[18]">{{ displayNumber(lottery.prizes[18]) }}</span>
                  <span class="v-g5-5 number-span" :data-html="lottery.prizes[19]">{{ displayNumber(lottery.prizes[19]) }}</span>
                </td>
              </tr>

              <!-- G.6 -->
              <tr class="bg_ef">
                <td class="txt-giai">G.6</td>
                <td class="v-giai number">
                  <span class="v-g6-0 number-span" :data-html="lottery.prizes[20]">{{ displayNumber(lottery.prizes[20]) }}</span>
                  <span class="v-g6-1 number-span" :data-html="lottery.prizes[21]">{{ displayNumber(lottery.prizes[21]) }}</span>
                  <span class="v-g6-2 number-span" :data-html="lottery.prizes[22]">{{ displayNumber(lottery.prizes[22]) }}</span>
                </td>
              </tr>

              <!-- G.7 -->
              <tr class="g7">
                <td class="txt-giai">G.7</td>
                <td class="v-giai number">
                  <span class="v-g7-0 number-span" :data-html="lottery.prizes[23]">{{ displayNumber(lottery.prizes[23]) }}</span>
                  <span class="v-g7-1 number-span" :data-html="lottery.prizes[24]">{{ displayNumber(lottery.prizes[24]) }}</span>
                  <span class="v-g7-2 number-span" :data-html="lottery.prizes[25]">{{ displayNumber(lottery.prizes[25]) }}</span>
                  <span class="v-g7-3 number-span" :data-html="lottery.prizes[26]">{{ displayNumber(lottery.prizes[26]) }}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 数字显示控制 -->
          <div class="control-panel">
            <form class="digits-form mt-3 mb-3 text-left" data-control="kqmb">
              <label class="radio" @click="digitMode = '0'">
                <input type="radio" name="showed-digits" value="0" :checked="digitMode === '0'">
                <b></b>
                <span>Tất cả</span>
              </label>
              <label class="radio" @click="digitMode = '2'">
                <input type="radio" name="showed-digits" value="2" :checked="digitMode === '2'">
                <b></b>
                <span>2 số cuối</span>
              </label>
              <label class="radio" @click="digitMode = '3'">
                <input type="radio" name="showed-digits" value="3" :checked="digitMode === '3'">
                <b></b>
                <span>3 số cuối</span>
              </label>
            </form>
          </div>
        </div>

        <!-- 底部统计表 (仅Miền Bắc) -->
        <div class="thongke mb-3">
          <table class="extendable colthreecity w-100 tbl-thongke font-weight-bold layout-fixed">
            <tbody>
              <tr class="first">
                <th class="td-h">Đầu</th>
                <th>Lô tô</th>
                <th class="td-h">Đuôi</th>
                <th>Lô tô</th>
              </tr>
              <tr v-for="i in 10" :key="i" class="l">
                <td class="w75">{{ i - 1 }}</td>
                <td class="text-left" v-html="formatGroupNumbers(lottery.headQGroups?.[i - 1], lottery.redCode)"></td>
                <td class="td-h">{{ i - 1 }}</td>
                <td class="text-left" v-html="formatGroupNumbers(lottery.headHGroups?.[i - 1], lottery.redCode)"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, inject } from 'vue'
import type { Ref } from 'vue'
import type { LotteryHistoryItem } from '@/services/lotteryService'

interface Props {
  gameType: 'mienbac' | 'miennam'
  count: number
  gameCode?: string
}

interface LotteryResult {
  number: string
  prizes: string[]
  headGroups?: string[][]
  headQGroups?: string[][]
  headHGroups?: string[][]
  redCode?: string
}

const props = defineProps<Props>()

const digitMode = ref('0')  // '0': 全部, '2': 2位, '3': 3位

// ==================== Inject Shared Data ====================
// 从父组件获取共享的历史数据
const sharedHistoryData = inject<{
  data: Ref<LotteryHistoryItem[]>
  isLoading: Ref<boolean>
  refresh: (gameCode?: string, forceRefresh?: boolean) => Promise<void>
}>('sharedHistoryData')

// 如果没有共享数据，使用本地数据（兼容独立使用场景）
const rawData = sharedHistoryData?.data || ref<any[]>([])
const loading = sharedHistoryData?.isLoading || ref(false)

const isBac = computed(() => props.gameType === 'mienbac')

const digitClass = computed(() => {
  if (digitMode.value === '2') return 'digits-2'
  if (digitMode.value === '3') return 'digits-3'
  return ''
})

// 根据digitMode显示数字
const displayNumber = (num: string) => {
  if (!num) return ''
  const length = parseInt(digitMode.value)
  if (length === 0) return num
  return num.substring(num.length - length)
}

// 格式化底部统计表的数字，红色高亮redCode
const formatGroupNumbers = (numbers: string[] | undefined, redCode: string | undefined) => {
  if (!numbers || numbers.length === 0) {
    return '&nbsp;'
  }

  const formatted = numbers.map(num => {
    if (redCode && num === redCode) {
      return `<span style="color:#e80000;">${num}</span>`
    }
    return num
  })

  return formatted.join(',&nbsp;')
}

// 加载数据 - 使用共享数据
const loadData = async () => {
  if (!props.gameCode) {
    // console.warn('⚠️ LotteryInfoTab: No gameCode provided')
    return
  }

  // 如果有共享数据源，使用共享的 refresh 方法
  if (sharedHistoryData?.refresh) {
    await sharedHistoryData.refresh(props.gameCode)
  } else {
    // console.warn('⚠️ LotteryInfoTab: 未找到共享数据源')
  }
}

// 处理彩票数据
const lotteryData = computed<LotteryResult[]>(() => {
  if (!rawData.value || rawData.value.length === 0) {
    return []
  }

  // 验证数据是否匹配当前 gameCode
  if (props.gameCode) {
    const firstItem = rawData.value[0]
    if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
      console.warn('⚠️ LotteryInfoTab 数据不匹配！当前 gameCode:', props.gameCode, '数据 code:', firstItem.code, '- 等待正确数据')
      // 返回空数组，等待正确数据
      return []
    }
  }
  const results: LotteryResult[] = []

  // 只处理 count 指定数量的数据
  const itemsToProcess = rawData.value.slice(0, props.count)

  // 遍历每期数据
  for (const item of itemsToProcess) {
    if (!item || !item.lottery_data) {
      continue
    }
    // lottery_data 格式: "ĐB|G.1|G.2,G.2|G.3,G.3,G.3,G.3,G.3,G.3|..."
    // 用 | 分隔不同奖项等级，每个等级内用 , 分隔多个号码
    const prizeGroups = item.lottery_data.split('|')

    // 展平所有奖项到一个数组
    const prizes: string[] = []
    prizeGroups.forEach((group: string) => {
      const numbers = group.split(',').map((s: string) => s.trim()).filter((s: string) => s)
      prizes.push(...numbers)
    })

    // 验证数据格式：Miền Bắc 应该有27个奖项，Miền Nam 应该有18个奖项
    const expectedCount = isBac.value ? 27 : 18
    if (prizes.length !== expectedCount) {
      // console.warn(`⚠️ 跳过不匹配的数据: 期号 ${item.number}, 预期 ${expectedCount} 个奖项，实际 ${prizes.length} 个`)
      continue
    }

    if (isBac.value) {
      // Miền Bắc: 需要 headQGroups (按首位分组) 和 headHGroups (按尾位分组)
      const headQGroups: string[][] = Array(10).fill(null).map(() => [])
      const headHGroups: string[][] = Array(10).fill(null).map(() => [])
      const redCode = prizes[0] ? prizes[0].substring(prizes[0].length - 2) : ''

      prizes.forEach((prize: string) => {
        if (prize && prize.length >= 2) {
          const last2 = prize.substring(prize.length - 2)
          const firstDigit = parseInt(last2[0])
          const secondDigit = parseInt(last2[1])

          // 按首位分组 (Đầu)
          if (!isNaN(firstDigit)) {
            headQGroups[firstDigit].push(last2)
          }

          // 按尾位分组 (Đuôi)
          if (!isNaN(secondDigit)) {
            headHGroups[secondDigit].push(last2)
          }
        }
      })

      // 排序每组
      headQGroups.forEach(group => {
        group.sort((a, b) => parseInt(a) - parseInt(b))
      })
      headHGroups.forEach(group => {
        group.sort((a, b) => parseInt(a) - parseInt(b))
      })

      results.push({
        number: item.number || '',
        prizes: prizes,
        headQGroups,
        headHGroups,
        redCode
      })
    } else {
      // Miền Nam: 只需要 headGroups (按首位分组，只显示尾数)
      const headGroups: string[][] = Array(10).fill(null).map(() => [])

      prizes.forEach((prize: string) => {
        if (prize && prize.length >= 2) {
          const last2 = prize.substring(prize.length - 2)
          const firstDigit = parseInt(last2[0])
          if (!isNaN(firstDigit)) {
            headGroups[firstDigit].push(last2[1])
          }
        }
      })

      // 排序每组
      headGroups.forEach(group => {
        group.sort((a, b) => parseInt(a) - parseInt(b))
      })

      results.push({
        number: item.number || '',
        prizes: prizes,
        headGroups
      })
    }
  }
  return results
})

// 监听 gameCode 变化，重新加载数据
watch(() => props.gameCode, async () => {
  if (props.gameCode) {
    await loadData()
  }
})

// count 变化不需要重新加载数据，computed 会自动处理

onMounted(() => {
  if (props.gameCode) {
    loadData()
  }
})
</script>

<style scoped>
.tab-pane {
  padding: 20px 0;
}

.lottery-result-wrapper {
  margin-bottom: 30px;
}

.v-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 2px solid #e80000;
}

.df-title {
  font-size: 22px;
  color: #2d3483;
  font-weight: 700;
  text-align: center;
  margin: 0;
  border-bottom: 1px solid rgba(186, 191, 199, 0.12);
}

.kqmb {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.kqmb td {
  padding: 10px;
  border: 1px solid #e1e4e9;
  font-weight: 700;
  font-size: 16px;
  color: #0A0A0A;
}

.txt-giai {
  background-color: #f1f1f1;
  font-weight: 700;
  font-size: 24px !important;
  color: #0A0A0A;
  text-align: center;
}

.v-giai {
  text-align: center;
  padding: 0 !important;
}

.v-giai span {
  display: inline-block;
  font-weight: 700;
  font-size: 24px;
  color: #0A0A0A;
  padding: 6px 0;
}

/* Miền Bắc 数字分隔样式 - 参照原版 */
.kqmb td.v-giai span[class^=v-g] {
  display: inline-block;
  width: 100%;
  min-width: 20px;
  padding: 6px 0;
  float: left;
}

/* G.2 的2个号码，每个占50%宽度（1行2列布局） */
.kqmb td.v-giai span[class^=v-g2-] {
  width: 50%;
}

/* G.3 的6个号码，每个占33.33%宽度（2行3列布局） */
.kqmb td.v-giai span[class^=v-g3-] {
  width: 33.33%;
}

/* G.4 的4个号码，每个占25%宽度（1行4列布局） */
.kqmb td.v-giai span[class^=v-g4-] {
  width: 25%;
}

/* G.5 的6个号码，每个占33.33%宽度（2行3列布局） */
/* G.6 的3个号码，每个占33.33%宽度（1行3列布局） */
.kqmb td.v-giai span[class^=v-g5-],
.kqmb td.v-giai span[class^=v-g6-] {
  width: 33.33%;
}

/* G.7 的4个号码，每个占25%宽度（1行4列布局） */
.kqmb td.v-giai span[class^=v-g7-] {
  width: 25%;
}

/* 在特定位置添加左边框作为分隔线（纵向分割） */
.kqmb td.v-giai span.v-g2-1,
.kqmb td.v-giai span.v-g3-1,
.kqmb td.v-giai span.v-g3-2,
.kqmb td.v-giai span.v-g3-4,
.kqmb td.v-giai span.v-g3-5,
.kqmb td.v-giai span.v-g4-1,
.kqmb td.v-giai span.v-g4-2,
.kqmb td.v-giai span.v-g4-3,
.kqmb td.v-giai span.v-g5-1,
.kqmb td.v-giai span.v-g5-2,
.kqmb td.v-giai span.v-g5-4,
.kqmb td.v-giai span.v-g5-5,
.kqmb td.v-giai span.v-g6-1,
.kqmb td.v-giai span.v-g6-2,
.kqmb td.v-giai span.v-g7-1,
.kqmb td.v-giai span.v-g7-2,
.kqmb td.v-giai span.v-g7-3 {
  border-left: 1px solid #ccc;
}

/* G.3 和 G.5 第二行的上边框（横向分割线） */
.kqmb td.v-giai span.v-g3-3,
.kqmb td.v-giai span.v-g3-4,
.kqmb td.v-giai span.v-g3-5,
.kqmb td.v-giai span.v-g5-3,
.kqmb td.v-giai span.v-g5-4,
.kqmb td.v-giai span.v-g5-5 {
  border-top: 1px solid #ccc;
}

.v-gdb {
  color: #e80000 !important;
  font-weight: 700 !important;
  font-size: 28px !important;
}

.v-g1 span {
  padding: 6px;
}

.db {
  background-color: rgba(234, 84, 85, 0.1);
}

.db .txt-giai {
  background: rgba(234, 84, 85, 1);
  color: #fff;
  font-weight: 700;
  font-size: 24px;
}

.bg_ef {
  background-color: #f5f5f5;
}

.g7 {
  background-color: #fff;
}

.g7 .number,
.g7 .number span,
.g7 span.number-span {
  color: #e80000 !important;
}

/* 数字显示模式 */
.kqmb.digits-2 .number-span,
.kqmb.digits-3 .number-span {
  /* JavaScript会动态更新内容 */
}

.control-panel {
  border-top: 1px solid #e1e1e1;
  padding: 10px 0;
  background: #fff;
}

.digits-form {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin: 0;
  padding-left: 30px;
}

.digits-form label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  margin: 0;
}

.digits-form input[type="radio"] {
  display: none;
}

.digits-form b {
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 6px;
  position: relative;
  display: inline-block;
}

.digits-form input[type="radio"]:checked + b {
  border-color: #007bff;
}

.digits-form input[type="radio"]:checked + b::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #007bff;
  border-radius: 50%;
}

.tdfirstlb0 tr td:first-child {
  border-left: 0;
}

.tdlastrb0 tr td:last-child {
  border-right: 0;
}

/* Miền Bắc 底部统计表样式 */
.thongke {
  margin-bottom: 20px;
}

.tbl-thongke {
  width: 100%;
  border-collapse: collapse;
  background: #FFFFFF;
  box-shadow: 0 5px 25px rgb(34 41 47 / 10%);
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
}

.tbl-thongke.layout-fixed {
  table-layout: fixed;
}

.tbl-thongke tr:nth-child(even) {
  background: rgba(186, 191, 199, 0.12);
}

.tbl-thongke tr.l td {
  font-size: 17px !important;
  height: 31px;
  color: #0A0A0A;
}

.tbl-thongke td:first-child,
.tbl-thongke th:first-child,
.tbl-thongke .td-h {
  border-left: 0;
  width: 50px;
  padding: 0;
  color: #2d3483;
}

.tbl-thongke td,
.tbl-thongke th {
  padding: 5px 5px;
  font-weight: bold;
  font-size: 16px;
  border: 1px solid rgba(30, 30, 30, 0.12);
}

.tbl-thongke th {
  background-color: #f1f1f1;
  border-top: 0;
  text-align: center !important;
  color: #333;
}

.tbl-thongke .td-h {
  background-color: #f5f5f5;
  text-align: center;
  font-weight: 600;
}

.tbl-thongke .w75 {
  width: 75px;
  text-align: center;
  background-color: #f5f5f5;
  font-weight: 600;
}

.tbl-thongke .text-left {
  text-align: left;
  padding-left: 15px;
}

.tbl-thongke tr.first {
  background-color: #FFFFFF;
}

.tbl-thongke tr.first th {
  background-color: #f1f1f1;
  color: #2d3483;
}

.tbl-thongke tr.l:hover {
  background-color: #f8f9fa;
}

.mb-3 {
  margin-bottom: 20px;
}

.mt-3 {
  margin-top: 20px;
}

.pt-3 {
  padding-top: 15px;
}

.pb-3 {
  padding-bottom: 15px;
}

.d-block {
  display: block;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.w-100 {
  width: 100%;
}

.font-weight-bold {
  font-weight: 700;
}

/* 响应式适配 - 移动端支持横向滚动 */
@media (max-width: 768px) {
  /* 允许横向滚动的容器 */
  #LotteryInfoTab {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .lottery-result-wrapper {
    min-width: 800px; /* 固定最小宽度，防止挤压 */
  }

  .v-card {
    min-width: 800px; /* 固定最小宽度，防止挤压 */
    border-width: 1px;
  }

  /* 保持表格原始尺寸，不压缩 */
  .kqmb {
    table-layout: fixed;
    width: 100%;
  }

  /* Miền Nam 外层表格 */
  .kqsx-today > table {
    min-width: 800px;
    table-layout: fixed;
  }

  /* 底部统计表保持原始尺寸 */
  .tbl-thongke {
    min-width: 800px;
    table-layout: fixed;
  }
}
</style>
