<template>
  <header :class="['header', { scrolled: isScrolled }]">
    <div class="header-container">
      <!-- Logo -->
      <div :class="['logo', !isScrolled ? 'logo_ani' : '']" @click="$router.push('/')">
        <img src="/images/logo.png" alt="logo" class="logo-icon">
        <span class="logo-text">LUCK8 BOT</span>
        <img src="/images/yn.png" alt="logo_text" class="logo-emoji">
      </div>

      <div :class="['nav-right', !isScrolled ? 'nav-right_ani' : '']" v-show="!is_mobile">
        <!-- 导航菜单 -->
        <nav class="nav-menu">
          <div v-for="item in menuItems" :key="item.path" :class="['menu-item', { active: isActive(item.path) }]"
            @click="handleMenuClick(item)">
            <span class="menu-label">{{ item.label }}</span>
            <img src="/images/hot.png" alt="down" class="menu-emoji" v-if="item.emoji">
            <span class="">+</span>

            <!-- 下拉菜单 -->
            <div v-if="item.children" class="dropdown-menu">
              <div v-for="(child, index) in item.children" :key="child.path"
                :class="['dropdown-item', index == item.children.length - 1 ? '' : 'border-bottom']"
                @click.stop="$router.push(child.path)">
                {{ child.label }}
                <img src="/images/hot.png" v-if="child.is_hot" alt="down" class="menu-emoji">
              </div>
            </div>
          </div>
        </nav>

        <!-- 登录按钮 -->
        <div class="header-actions">
          <button class="login-btn" @click="router.replace('/')">
            <span style="margin-top: 5px;">
              <svg t="1767160421957" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3305" width="22" height="22">
                <path
                  d="M567.68 808.32 567.68 632.192 456.96 632.192l0 176.64c-3.456 0.128-6.272 0.384-8.96 0.384-52.352 0-104.576 0-156.928 0-17.92 0-30.08-11.52-30.08-30.592-0.384-72.448-0.256-145.024 0.128-217.472 0-3.84 2.944-8.704 5.888-11.264 47.36-41.856 94.848-83.328 142.464-124.928 31.616-27.648 63.232-55.424 94.848-83.072 2.432-2.176 4.992-4.224 8.064-6.784 18.816 16.512 37.632 32.896 56.448 49.28 61.824 54.144 123.648 108.416 185.728 162.304 6.656 5.76 9.472 11.648 9.472 20.992-0.384 68.864-0.256 137.728-0.128 206.464 0 12.544-2.944 23.424-13.312 30.336-3.712 2.56-8.576 4.736-12.928 4.736-55.552 0.256-110.976 0.128-166.528 0.128C569.984 809.216 569.216 808.832 567.68 808.32L567.68 808.32 567.68 808.32zM651.008 320.512c0-29.056 0-55.936 0-82.688 0-17.152 3.84-21.248 19.968-21.248 24.96 0 50.048 0 75.008 0 12.928 0 17.408 4.864 17.408 19.328 0 57.344 0.256 114.816-0.128 172.288 0 8.832 2.304 14.592 8.832 20.224 27.392 23.424 54.272 47.488 81.28 71.424 13.312 11.776 13.568 17.408 2.432 31.36-6.784 8.448-13.312 17.152-20.224 25.6-8.32 10.496-15.232 11.136-25.344 2.176-95.872-84.992-191.872-170.112-287.744-255.104-3.328-2.944-6.784-5.76-10.624-9.216-21.632 19.072-43.008 38.016-64.384 56.96C369.792 420.608 291.84 489.6 214.016 558.592c-10.496 9.344-17.152 8.832-25.984-2.176-7.296-9.216-14.592-18.432-21.888-27.648-8.448-10.752-8.064-17.792 2.048-26.88 43.392-38.656 87.04-77.056 130.56-115.584 57.984-51.328 116.096-102.656 174.08-154.112 26.368-23.296 51.968-23.296 78.336 0.128 31.232 27.776 62.464 55.424 93.696 83.072C646.4 316.8 647.936 317.952 651.008 320.512L651.008 320.512 651.008 320.512zM651.008 320.512"
                  fill="#03142c" p-id="3306">
                </path>
              </svg>
            </span>
            Trang chủ
          </button>
        </div>
      </div>
      <div v-show="is_mobile" class="mobile-menu">
        <div :class="['nav-toggler', is_menu ? 'menu-opened' : '']" @click="is_menu = !is_menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </header>
  <div v-if="is_menu" :class="['mobile-menu-container', is_menu ? 'open-menu' : '']">
    <div class="" v-for="(item, index) in menuItems">
      <div class="mobile-menu-item">
        <div class="mobile-menu-item-content">
          {{ item.label }}
          <img src="/images/hot.png" alt="down" class="menu-emoji" v-if="item.emoji">
        </div>
        <div class="heng"></div>
        <div class="mobile-menu-item-jia" @click="handleClick(index)">
          +
        </div>
      </div>
      <transition name="drawer">
        <div class="mobile-menu-item-children" v-show="item.children && menu_open.includes(index)">
          <div class="mobile-menu-item-child" v-for="child in item.children" :key="child.path"
            @click.stop="handlejump(child.path)">
            {{ child.label }}
          </div>
        </div>
      </transition>
    </div>
    <div class="down-app">TẢI APP</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get_title ,all_data} from '@/utils/title';

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
//是否打开菜单 
const is_menu = ref(false)
interface MenuItem {
  label: string
  path: string
  emoji?: string
  children?: MenuItem[]
  is_hot?: boolean
}
const is_mobile = ref(window.innerWidth < 991)

//监听页面宽度
const handleResize = () => {
  if (window.innerWidth < 991) {
    is_mobile.value = true
  } else {
    is_mobile.value = false
    is_menu.value = false
  }
}

const handlejump = (url: string) => {
  is_menu.value = false
  router.push(url)
}

const menu_open = ref<number[]>([])
const handleClick = (index: number) => {
  if (menu_open.value.includes(index)) {
    menu_open.value = menu_open.value.filter(i => i !== index)
  } else {
    menu_open.value.push(index)
  }
}
// children: props.menudata.taixiu.map(item => {
//       return {
//         label: get_title(item.code),
//         path: `/game/${item.code}`,
//         is_hot: item?.is_hot == 1
//       }
//     })
const menuItems = ref<MenuItem[]>([
  {
    label: 'Luckywin',
    path: '/luckywin',
    emoji: '🔥',
    children: [
      { label: 'TÀI XỈU', path: '/game/1', is_hot: true },
      { label: 'TÀI XỈU 3 PHÚT', path: '/game/2', is_hot: true },
      { label: 'TÀI XỈU MD5', path: '/game/3', is_hot: true },
    ]
  },
  {
    label: 'Miền Bắc',
    path: '/mien-bac',
    emoji: '🔥',
    children: [
      { label: 'Miền Bắc 5 phút mới', path: '/game/4' },
      { label: 'Miền Bắc 3 phút mới', path: '/game/5' },
      { label: 'Miền Bắc', path: '/game/6' },
      { label: 'Miền Bắc VIP 45 giây', path: '/game/7', is_hot: true },
      { label: 'Miền Bắc VIP 75 giây', path: '/game/8', is_hot: true },
      { label: 'Miền Bắc VIP 2 phút', path: '/game/9' }
    ]
  },
  {
    label: 'Miền Nam',
    path: '/mien-nam',
    children: [
      { label: 'Miền Nam VIP 45 giây', path: '/game/10' },
      { label: 'Miền Nam VIP 90 giây', path: '/game/11' },
      { label: 'Miền Nam VIP 1 phút', path: '/game/12' },
      { label: 'Miền Nam VIP 2 phút', path: '/game/13' },
      { label: 'Miền Nam VIP 5 phút', path: '/game/14' }
    ]
  },
  {
    label: 'Keno',
    path: '/keno',
    children: [
      { label: 'Keno VIP 20 giây', path: '/game/15' },
      { label: 'Keno VIP 30 giây', path: '/game/16' },
      { label: 'Keno VIP 40 giây', path: '/game/17' },
      { label: 'Keno VIP 50 giây', path: '/game/18' },
      { label: 'Keno VIP 1 phút', path: '/game/19' },
      { label: 'Keno VIP 5 phút', path: '/game/20' }
    ]
  },
  {
    label: 'Sicbo',
    path: '/sicbo',
    children: [
      { label: 'Sicbo 20 giây', path: '/game/21' },
      { label: 'Sicbo 30 giây', path: '/game/22' },
      { label: 'Sicbo 40 giây', path: '/game/23' },
      { label: 'Sicbo 50 giây', path: '/game/24' },
      { label: 'Sicbo 1 phút', path: '/game/25' },
      { label: 'Sicbo 1.5 phút', path: '/game/26' }
    ]
  }
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const isActive = (path: string): boolean => {
  return route.path.startsWith(path)
}

const handleMenuClick = (item: MenuItem) => {
  if (!item.children) {
    router.push(item.path)
  }
}

watch(() => all_data.value, (newVal) => {
  if (newVal) {
    menuItems.value = [
      {
        label: 'Luckywin',
        path: '/luckywin',
        emoji: '🔥',
        children: newVal.taixiu.map(item => {
          return {
            label: get_title(item.code),
            path: `/game/${item.code}`,
            is_hot: item?.is_hot == 1
          }
        })
      },
      {
        label: 'Miền Bắc',
        path: '/mien-bac',
        emoji: '🔥',
        children: newVal.mb.map(item => {
          return {
            label: get_title(item.code),
            path: `/game/${item.code}`,
            is_hot: item?.is_hot == 1
          }
        })
      },
      {
        label: 'Miền Nam',
        path: '/mien-nam',
        children: newVal.mn.map(item => {
          return {
            label: get_title(item.code),
            path: `/game/${item.code}`,
            is_hot: item?.is_hot == 1
          }
        })
      },
      {
        label: 'Keno',
        path: '/keno',
        children: newVal.keno.map(item => {
          return {
            label: get_title(item.code),
            path: `/game/${item.code}`,
            is_hot: item?.is_hot == 1
          }
        })
      },
      {
        label: 'Sicbo',
        path: '/sicbo',
        children: newVal.sicbo.map(item => {
          return {
            label: get_title(item.code),
            path: `/game/${item.code}`,
            is_hot: item?.is_hot == 1
          }
        })
      }
    ]

  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 默认状态 - 白色背景，黑色字体 */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

}

/* 滚动后状态 - 渐变背景，白色字体 */
.header.scrolled {
  background: linear-gradient(to right, #7e3afb, #29b9f5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* 从上到下缓慢淡入动画 */
  animation: down 1s ease-in-out;
}

@keyframes down {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.header-container {
  width: 80%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 1600px) {
  .header-container {
    width: 100%;
    padding: 0 10px;
  }
}

@media (max-width: 991px) {
  .header-container {
    width: 100%;
    padding: 10px 10px !important;
  }

  .logo-emoji {
    display: none;
  }
}


.logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s;
}

@media (max-width:1200px) {
  .logo {
    font-size: 16px !important;
  }

  .logo-text {
    font-size: 25px !important;
  }

  .logo-icon {
    width: 40px !important;
    height: 40px !important;
  }
}

.logo_ani {
  animation: fadezou 0.5s ease-in-out;
}

@keyframes fadezou {
  from {
    opacity: 0;
    transform: translateX(-400px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}


.header.scrolled .logo {
  color: #fff;
}

.logo-icon {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.logo-text {
  font-weight: 800;
  letter-spacing: 0.5px;
  font-size: 40px;
}

.logo-emoji {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 页面宽度小于1400px时，导航菜单左右边距为0   */

@media (max-width: 1400px) {
  .nav-menu {
    margin: 0px;
  }

  .menu-item {
    padding: 0px 6px !important;
  }

  .logo-emoji {
    width: 40px;
    height: 40px;
  }
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-right_ani {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(400px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0px 20px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
  white-space: nowrap;
}

.menu-label {
  font-size: 18px;
  height: 80px;
  line-height: 80px;
}

.menu-item:hover {
  color: #007bff;
}

.header.scrolled .menu-item {
  color: #fff;
}

.menu-item:hover {}

.menu-item.active {
  background-color: rgba(0, 0, 0, 0.1);
}


.menu-emoji {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: #fff;
  border-top: 2px solid #547af8;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  color: #03142c;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s;
  z-index: 100;
}

.menu-item:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: 14px 20px;
  font-size: 16px;
  display: flex;
  gap: 5px;
  align-items: center;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s;
}

.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-item:hover {
  background-color: #547af8;
  color: #fff;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 20px;
  background: transparent;
  border: 2px solid #03142c;
  color: #03142c;
  border-radius: 40px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.header.scrolled .login-btn {
  border: 2px solid #fff;
  color: #fff;
}

.login-btn:hover {
  color: #004db3;
}

.login-btn:hover svg path {
  transition: all 0.3s;
  fill: #004db3 !important;
}

.btn-icon {
  font-size: 16px;
}

.header.scrolled .login-btn svg path {
  transition: all 0.3s;
  fill: #fff !important;
}

.nav-toggler {
  display: flex;
  position: relative;
  width: 25px;
  height: 25px;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 1;
  cursor: pointer;
}

.nav-toggler span {
  background-color: #03142c;
  height: 2px;
  width: 100%;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  position: relative;
}

.header.scrolled .nav-toggler span {
  border: 1px solid #fff;
  color: #fff;
}

.nav-toggler.menu-opened span:nth-child(1) {
  -webkit-transform: rotate3d(0, 0, 1, 45deg);
  transform: rotate3d(0, 0, 1, 45deg);
  top: 8px;
}

.nav-toggler.menu-opened span:nth-child(2) {
  opacity: 0;
}

.nav-toggler.menu-opened span:nth-child(3) {
  -webkit-transform: rotate3d(0, 0, 1, -45deg);
  transform: rotate3d(0, 0, 1, -45deg);
  top: -8px;
}

.mobile-menu-container {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 80%;
  padding: 10px;
  background-color: #051c35;
  z-index: 9999;
  overflow-x: hidden;
  overflow-y: scroll;
  left: 0px;
  opacity: 1;
}

.open-menu {
  animation: fade666 0.5s ease-in-out;
}

@keyframes fade666 {
  from {
    opacity: 0;
    transform: translateX(-400px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

.down-app {
  border: 2px solid #fff;
  padding: 5px 15px;
  text-align: center;
  display: block;
  margin-top: 10px;
  color: #FFF;
  border-radius: 20px
}



.mobile-menu-item {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  line-height: 1.66;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.mobile-menu-item-content {
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px 25px 15px 0;
  display: flex;
  flex: 1;
  color: #fff;
  width: 100%;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  gap: 4px;
}

.mobile-menu-item-jia {
  width: 50px;
  text-align: center;
  line-height: 54px;
  color: #fff;
  cursor: pointer;
}

.mobile-menu-emoji {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.mobile-menu-item-children {
  margin-left: 1.5em;
  padding-left: 15px;
}

.mobile-menu-item-child {
  color: #fff !important;
  display: flex;
  padding: 15px 25px 15px 0;
  gap: 4px;
  font-size: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* 抽屉动画 */
.drawer-enter-active,
.drawer-leave-active {
  transition: max-height 0.35s ease, opacity 0.25s ease;
  overflow: hidden;
}

.drawer-enter-from,
.drawer-leave-to {
  max-height: 0;
  opacity: 0;
}

.drawer-enter-to,
.drawer-leave-from {
  max-height: 500px;
  /* 根据子菜单最大高度调 */
  opacity: 1;
}
</style>
