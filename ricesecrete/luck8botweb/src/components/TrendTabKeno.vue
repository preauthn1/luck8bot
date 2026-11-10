<template>
  <div id="TrendTabKeno" class="tab-pane fade" role="tabpanel">
    <div class="table-wrapper">
      <table id="tableTrend" class="table-weizhi" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td valign="top">
              <table class="table-weizhi-child" style="width:248px;" border="0" cellpadding="0" cellspacing="0">
                <thead>
                  <tr class="firthtd">
                    <th style="height:66px;">Kỳ mở thưởng</th>
                    <th>Số trúng thưởng</th>
                  </tr>
                </thead>
                <tbody id="tbodyOpenCode" style="color:#999999;"></tbody>
              </table>
            </td>
            <td id="tdKENOHeZhiXingTai" valign="top">
              <div style="position:relative;">
                <span id="spanHeZhiKENOScrollLeft" class="click-scroll scroll-left"></span>
                <span id="spanHeZhiKENOScrollRight" class="click-scroll scroll-right"></span>
                <div id="divHeZhiKENO" style="width:709px;overflow-x:hidden;overflow-y:hidden;position:relative;z-index:1;">
                <table id="tableHeZhiKENO" class="table-weizhi" style="width:auto;position:relative;z-index:1;" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:56px;" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr class="firthtd"><th style="color:#dc3545;height:66px;">Tổng</th></tr>
                          </thead>
                          <tbody id="tbodyKENOHZ" style="color:#999999;"></tbody>
                        </table>
                      </td>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:200px;" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr class="firthtd"><th colspan="4">Kèo tổng</th></tr>
                            <tr class="firthtd"><th>Tài</th><th>Xỉu</th><th>Lẻ</th><th>Chẵn</th></tr>
                          </thead>
                          <tbody id="tbodyKENOHeZhiXingTai" style="color:#999999;"></tbody>
                        </table>
                      </td>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:150px;" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr class="firthtd"><th colspan="3">Trên/Hòa/Dưới</th></tr>
                            <tr class="firthtd"><th>Trên</th><th>Hòa</th><th>Dưới</th></tr>
                          </thead>
                          <tbody id="tbodyKENOSZXZhiXingTai" style="color:#999999;"></tbody>
                        </table>
                      </td>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:300px;" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr class="firthtd"><th colspan="5">Kim/Mộc/Thủy/Hỏa/Thổ</th></tr>
                            <tr class="firthtd"><th>Kim</th><th>Mộc</th><th>Thủy</th><th>Hỏa</th><th>Thổ</th></tr>
                          </thead>
                          <tbody id="tbodyKENOJMSHTZhiXingTai" style="color:#999999;"></tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td valign="top">
            <table class="table-weizhi-child" style="width:248px;" border="0" cellpadding="0" cellspacing="0">
              <thead>
                <tr class="firthtd"><th colspan="2" style="height:66px;background-color:#f5f5f5;">Số liệu thống kê</th></tr>
              </thead>
              <tbody>
                <tr style="height:33px !important;"><td colspan="2" style="height:33px !important;line-height:33px !important;box-sizing:border-box !important;">Số lần xuất hiện</td></tr>
                <tr style="height:33px !important;"><td colspan="2" style="height:33px !important;line-height:33px !important;box-sizing:border-box !important;">Số chuỗi liên kéo dài nhất</td></tr>
                <tr style="height:33px !important;"><td colspan="2" style="height:33px !important;line-height:33px !important;box-sizing:border-box !important;">Vẫn chưa xuất hiện</td></tr>
                <tr style="height:33px !important;"><td colspan="2" style="height:33px !important;line-height:33px !important;box-sizing:border-box !important;">Chuỗi số chưa xuất hiện nhiều nhất</td></tr>
                <tr style="height:33px !important;"><td colspan="2" style="height:33px !important;line-height:33px !important;box-sizing:border-box !important;">Bình quân số chưa xuất hiện</td></tr>
              </tbody>
            </table>
          </td>
          <td id="tdKENOHeZhiCountXingTai" valign="top">
            <div style="position:relative;">
              <span id="spanHeZhiCountKENOScrollLeft" class="click-scroll scroll-left"></span>
              <span id="spanHeZhiCountKENOScrollRight" class="click-scroll scroll-right"></span>
              <div id="divHeZhiCountKENO" style="width:709px;overflow-x:hidden;overflow-y:hidden;position:relative;z-index:1;">
                <table id="tableHeZhiCountKENO" class="table-weizhi" style="width:auto;position:relative;z-index:1;" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:56px;" border="0" cellpadding="0" cellspacing="0">
                          <thead style="background-color:#f5f5f5;">
                            <tr class="firthtd"><th style="color:#dc3545;height:66px;"></th></tr>
                          </thead>
                          <tbody id="tbodyKENOHZCount" style="color:#999999;"></tbody>
                        </table>
                      </td>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:200px;" border="0" cellpadding="0" cellspacing="0">
                          <thead style="background-color:#f5f5f5;">
                            <tr class="firthtd"><th colspan="4">Kèo tổng</th></tr>
                            <tr class="firthtd"><th>Tài</th><th>Xỉu</th><th>Lẻ</th><th>Chẵn</th></tr>
                          </thead>
                          <tbody id="tbodyKENOHeZhiCountXingTai" style="color:#999999;"></tbody>
                        </table>
                      </td>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:150px;" border="0" cellpadding="0" cellspacing="0">
                          <thead style="background-color:#f5f5f5;">
                            <tr class="firthtd"><th colspan="3">Trên/Hòa/Dưới</th></tr>
                            <tr class="firthtd"><th>Trên</th><th>Hòa</th><th>Dưới</th></tr>
                          </thead>
                          <tbody id="tbodyKENOSZXZhiCountXingTai" style="color:#999999;"></tbody>
                        </table>
                      </td>
                      <td valign="top">
                        <table class="table-weizhi-child" style="width:300px;" border="0" cellpadding="0" cellspacing="0">
                          <thead style="background-color:#f5f5f5;">
                            <tr class="firthtd"><th colspan="5">Kim/Mộc/Thủy/Hỏa/Thổ</th></tr>
                            <tr class="firthtd"><th>Kim</th><th>Mộc</th><th>Thủy</th><th>Hỏa</th><th>Thổ</th></tr>
                          </thead>
                          <tbody id="tbodyKENOJMSHTZhiCountXingTai" style="color:#999999;"></tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, watch, ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { LotteryHistoryItem } from '@/services/lotteryService'
import { loadTrend as loadTrendUtil } from '@/utils/trendLoader'

interface Props {
  gameType: 'keno'
  count?: number
  gameCode?: string
}

const props = withDefaults(defineProps<Props>(), {
  count: 30
})

// ==================== Inject Shared Data ====================
const sharedHistoryData = inject<{
  data: Ref<LotteryHistoryItem[]>
  isLoading: Ref<boolean>
  refresh: (gameCode?: string, forceRefresh?: boolean) => Promise<void>
}>('sharedHistoryData')

const lotteryHistory = sharedHistoryData?.data || ref<LotteryHistoryItem[]>([])

// ==================== Data Loading ====================
const loadHistoryData = async () => {
  if (!props.gameCode) {
    console.warn('⚠️ No gameCode provided for TrendTabKeno')
    return
  }

  if (sharedHistoryData?.refresh) {
    await sharedHistoryData.refresh(props.gameCode)
  } else {
    console.warn('⚠️ TrendTabKeno: 未找到共享数据源')
  }
}

// ==================== Trend Rendering ====================
const renderTrend = () => {
  if (!lotteryHistory.value || lotteryHistory.value.length === 0) {
    console.warn('⚠️ No lottery data available for TrendTabKeno')
    return
  }

  // 验证数据是否匹配当前 gameCode（仅在有 gameCode 时验证）
  if (props.gameCode) {
    const firstItem = lotteryHistory.value[0]
    if (firstItem && firstItem.code && firstItem.code !== props.gameCode) {
      console.warn('⚠️ 数据不匹配！当前 gameCode:', props.gameCode, '数据 code:', firstItem.code, '- 等待正确数据')
      return
    }
  }

  const lotteryList = lotteryHistory.value.map(item => ({
    Expect: item.number || '',
    OpenCode: item.lottery_results || ''
  }))
  // 调用工具函数加载走势
  loadTrendUtil({
    gameType: props.gameType,
    lotteryList,
    count: props.count
  })
}

// ==================== Lifecycle ====================
onMounted(async () => {
  await loadHistoryData()
  nextTick(() => {
    renderTrend()
    // 设置滚动按钮
    setTimeout(() => {
      setupScrollButtons()
    }, 100)
  })
})

// ==================== Watchers ====================
// 监听 count 变化
watch(() => props.count, () => {
  nextTick(() => {
    renderTrend()
  })
})

// 监听 gameCode 变化
watch(() => props.gameCode, async () => {
  await loadHistoryData()
  nextTick(() => {
    renderTrend()
  })
})

// 监听数据变化并设置滚动按钮
watch(() => lotteryHistory.value, () => {
  nextTick(() => {
    renderTrend()
    // 延迟一下等待 DOM 更新完成
    setTimeout(() => {
      setupScrollButtons()
    }, 100)
  })
}, { deep: true })

// ==================== 滚动按钮功能 (原版鼠标跟随实现) ====================
const setupScrollButtons = () => {
  // 设置鼠标跟随滚动事件
  const mouseScrollEvent = (containerId: string, leftBtnId: string, rightBtnId: string, linkedContainerId?: string) => {
    const leftBtn = document.getElementById(leftBtnId) as HTMLElement | null
    const rightBtn = document.getElementById(rightBtnId) as HTMLElement | null
    const container = document.getElementById(containerId) as HTMLElement | null
    const linkedContainer = linkedContainerId ? document.getElementById(linkedContainerId) as HTMLElement | null : null
    const table = container?.querySelector('table') as HTMLElement | null

    if (!leftBtn || !rightBtn || !container || !table) return

    // KENO 每次滚动约 350px（可以滚动1-2个表格）
    const scrollWidth = 350

    // 鼠标移动函数：更新按钮Y位置和显示状态
    const mousefunc = (e: MouseEvent) => {
      const tableWidth = table.offsetWidth
      if (tableWidth > container.clientWidth) {
        const rect = container.getBoundingClientRect()
        // 按钮高度是 100% 但最大 66px，取容器高度和 66px 的较小值
        const btnHeight = Math.min(container.clientHeight, 66)
        const scroll50Height = btnHeight / 2
        // 使用 pageY - offsetTop 计算相对容器的Y位置（和原版jQuery的逻辑一致）
        const containerOffsetTop = rect.top + window.scrollY
        let top = e.pageY - containerOffsetTop

        // 限制按钮Y坐标范围，使按钮中心对齐鼠标Y位置
        if (top < scroll50Height) {
          top = 0
        } else if (top + scroll50Height > container.clientHeight) {
          top = container.clientHeight - btnHeight
        } else {
          top -= scroll50Height
        }

        leftBtn.style.top = top + 'px'
        rightBtn.style.top = top + 'px'

        // 根据滚动位置显示/隐藏按钮
        const scrollLeft = container.scrollLeft
        if (scrollLeft > 0) {
          leftBtn.style.display = 'block'
          if ((container.scrollWidth - scrollLeft) <= container.clientWidth) {
            rightBtn.style.display = 'none'
          } else {
            rightBtn.style.display = 'block'
          }
        } else {
          rightBtn.style.display = 'block'
          leftBtn.style.display = 'none'
        }
      }
    }

    // 左按钮事件 - 移除 mouseout，避免闪烁
    leftBtn.addEventListener('mousemove', mousefunc)
    leftBtn.addEventListener('click', (e) => {
      const left = container.scrollLeft - scrollWidth - 1
      container.scrollLeft = left
      if (linkedContainer) linkedContainer.scrollLeft = left
      mousefunc(e)
    })

    // 右按钮事件 - 移除 mouseout，避免闪烁
    rightBtn.addEventListener('mousemove', mousefunc)
    rightBtn.addEventListener('click', (e) => {
      const left = container.scrollLeft + scrollWidth + 1
      container.scrollLeft = left
      if (linkedContainer) linkedContainer.scrollLeft = left
      mousefunc(e)
    })

    // 容器鼠标移动事件
    container.addEventListener('mousemove', mousefunc)
    container.addEventListener('mouseout', () => {
      leftBtn.style.display = 'none'
      rightBtn.style.display = 'none'
    })
  }

  // 设置两对滚动按钮，互相联动
  mouseScrollEvent('divHeZhiKENO', 'spanHeZhiKENOScrollLeft', 'spanHeZhiKENOScrollRight', 'divHeZhiCountKENO')
  mouseScrollEvent('divHeZhiCountKENO', 'spanHeZhiCountKENOScrollLeft', 'spanHeZhiCountKENOScrollRight', 'divHeZhiKENO')
}
</script>

<!-- 全局样式 - 用于 trendLoader.ts 动态插入的HTML -->
<style>
/* 动态插入的表格单元格样式 - KENO 专用 */
#tbodyOpenCode tr td,
#tbodyKENOHZ tr td,
#tbodyKENOHeZhiXingTai tr td,
#tbodyKENOSZXZhiXingTai tr td,
#tbodyKENOJMSHTZhiXingTai tr td,
#tbodyKENOHZCount tr td,
#tbodyKENOHeZhiCountXingTai tr td,
#tbodyKENOSZXZhiCountXingTai tr td,
#tbodyKENOJMSHTZhiCountXingTai tr td {
  height: 33px !important;
  min-height: 33px !important;
  line-height: 33px !important;
  text-align: center;
  align-content: center;
  border: 1px solid #e1e1e1;
  font-size: 13px;
  box-sizing: border-box !important;
  padding: 0 !important;
  margin: 0 !important;
}

.zoushiqiuf {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 33px;
  text-align: center;
  font-weight: bold;
  color: #fff !important;
  font-size: 13px;
}

.zoushiqiu {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
}
</style>

<style scoped>
/* 基础表格样式 - 完全还原原始HTML的样式 */
.tab-pane {
  width: 100%;
  opacity: 1 !important;
  display: block !important;
}

/* 整个表格的滚动容器 - 手机端可以滚动整个表格 */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
}

/* 隐藏整个表格容器的滚动条 */
.table-wrapper::-webkit-scrollbar {
  display: none;
}

.table-wrapper {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* PC端：隐藏内部容器的滚动条（由按钮控制滚动） */
#divHeZhiKENO::-webkit-scrollbar,
#divHeZhiCountKENO::-webkit-scrollbar {
  display: none;
}

#divHeZhiKENO,
#divHeZhiCountKENO {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.table-weizhi {
  border-collapse: collapse;
  border-spacing: 0;
  color: #555;
  width: auto;
  min-width: 100%;
  margin: 0;
  padding: 0;
}

.table-weizhi tr td,
.table-weizhi tr th {
  height: 33px;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  margin: 0;
  padding: 0;
}

.table-weizhi tr td:first-child,
.table-weizhi tr.firthtd th:first-child {
  border-left: 0;
}

.table-weizhi tr:last-child td {
  border-bottom: 0;
}

.table-weizhi-child {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.table-weizhi-child tbody tr td {
  border-bottom: 1px solid #e1e1e1;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 33px !important;
  min-height: 33px !important;
  line-height: 33px;
  box-sizing: border-box;
}

.table-weizhi-child tr:last-child td {
  border-bottom: 0;
}

.table-weizhi-child thead tr.firthtd th {
  background-color: #f5f5f5;
  border: 1px solid #e1e1e1;
  padding: 0;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  height: 33px;
  width: 50px;
  min-width: 50px;
  margin: 0;
}

/* KENO 特定的列宽 */
#tableHeZhiKENO .table-weizhi-child thead tr.firthtd th,
#tableHeZhiCountKENO .table-weizhi-child thead tr.firthtd th {
  width: 50px;
  min-width: 50px;
  max-width: 50px;
}

/* 左侧第一列的标题不限制宽度，允许自动填充 */
.table-weizhi-child thead tr.firthtd th:only-child {
  width: auto;
  min-width: auto;
  max-width: none;
}

.table-weizhi-child tbody td {
  border: 1px solid #e1e1e1;
  padding: 0;
  text-align: center;
  align-content: center;
  white-space: nowrap;
  font-size: 13px;
  color: #999999;
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  height: 33px;
  margin: 0;
}

/* 滚动按钮样式 */
.click-scroll {
  display: none;
  z-index: 1000;
  position: absolute;
  top: 0;
  height: 100%;
  max-height: 66px;
  width: 33px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-color: rgb(8, 191, 2);
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.3s;
}

.click-scroll:hover {
  opacity: 0.8;
}

.scroll-left {
  left: 0;
}

.scroll-right {
  right: 0;
}

.scroll-left::after,
.scroll-right::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-style: solid;
}

.scroll-left::after {
  border-width: 8px 12px 8px 0;
  border-color: transparent #fff transparent transparent;
  margin-left: -3px;
}

.scroll-right::after {
  border-width: 8px 0 8px 12px;
  border-color: transparent transparent transparent #fff;
  margin-left: 3px;
}
</style>
