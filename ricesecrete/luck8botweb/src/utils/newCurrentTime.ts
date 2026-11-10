// 全局变量存储当前时间戳
// 改进版本 - 使用响应式变量
import { ref } from 'vue'

const currentTime = ref<number>(Math.floor(Date.now() / 1000))

let intervalId: number | null = null;
/**
 * 启动倒计时并更新全局时间戳
 * @param targetTimestamp 目标时间戳（秒）
 * @param onTick 每秒回调函数
 * @param onComplete 倒计时结束回调函数
 * @returns interval ID，可用于手动停止倒计时
 */
function newCurrentTime(targetTimestamp: number) {
  //更新当前时间戳
  currentTime.value = targetTimestamp;
  if (!intervalId) {
    intervalId = window.setInterval(() => {
      // 更新全局时间戳
      currentTime.value += 1;
    }, 1000);
  }else{
    clearInterval(intervalId)
    intervalId = window.setInterval(() => {
      // 更新全局时间戳
      currentTime.value += 1;
    }, 1000);
  }
}

// 导出全局变量和方法
export { currentTime, newCurrentTime };
