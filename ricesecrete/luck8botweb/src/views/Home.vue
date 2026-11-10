<template>
  <div class="home-page">
    <Header :menudata="menuItems"/>

    <!-- Banner 区域 - 轮播图 -->
    <section class="banner">
      <div class="banner-bg">
        <swiper :modules="modules" :slides-per-view="1" :space-between="0" :loop="true" :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }" :pagination="{ clickable: true }" class="banner-swiper">
          <swiper-slide v-for="(image, index) in bannerImages" :key="index">
            <div class="banner-slide">
              <img :src="image" :alt="`Banner ${index + 1}`" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
    <section class="feature item three">
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-5 col-md-6">
            <div class="section-head">
              <h2 class="title">
                Luckywin&nbsp;<img src="/images/hot.png" width="32" height="32" style="margin-top:-12px;">
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="margin-bottom:40px;">
        <div class="row">
          <div class="col-4" v-for="(game, index) in luckywinGames" :key="game.code" v-if="luckywinGames.length > 0">
            <GameCard :game-info="game" :circle-count="3"  :index="index" title="luck" />

          </div>
          <div class="col-4" v-else v-for="value in 3" :key="value">
            <div class="feature-box">
              <div class="content" style="height: 159px;width: 100%;">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-5 col-md-6">
            <div class="section-head">
              <h2 class="title">
                Miền Bắc&nbsp;<img src="/images/hot.png" width="32" height="32" style="margin-top:-12px;">
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="margin-bottom:40px;">
        <div class="row">
          <div class="col-4" v-for="(game, index) in mienBacGames" :key="index" v-if="mienBacGames.length > 0">
            <GameCard :game-info="game" :circle-count="5"  :index="index" title="mienB" />

          </div>
          <div class="col-4" v-else v-for="value in 3" :key="value">
            <div class="feature-box">
              <div class="content" style="height: 159px;width: 100%;">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-5 col-md-6">
            <div class="section-head">
              <h2 class="title">Miền Nam</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="margin-bottom:40px;">
        <div class="row">
          <div class="col-4" v-for="(game, index) in mienNamGames" :key="index" v-if="mienNamGames.length > 0">
            <GameCard :game-info="game" :circle-count="6"  :index="index" title="mienN" />
          </div>
          <div class="col-4" v-else v-for="value in 3" :key="value">
            <div class="feature-box">
              <div class="content" style="height: 159px;width: 100%;">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-5 col-md-6">
            <div class="section-head">
              <h2 class="title">Keno</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="margin-bottom:40px;">
        <div class="row">
          <div class="col-4" v-for="(game, index) in kenoGames" :key="index" v-if="kenoGames.length > 0">
            <GameCard :game-info="game" :circle-count="20"  :index="index" title="kenoG" />
          </div>
          <div class="col-4" v-else v-for="value in 3" :key="value">
            <div class="feature-box">
              <div class="content" style="height: 159px;width: 100%;">
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-5 col-md-6">
            <div class="section-head">
              <h2 class="title">Sicbo</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="margin-bottom:40px;">
        <div class="row">
          <div class="col-4" v-for="(game, index) in sicboGames" :key="index" v-if="sicboGames.length > 0">
            <GameCard :game-info="game" :circle-count="3" :index="index" title="sicboG" />
          </div>
          <div class="col-4" v-else v-for="value in 3" :key="value">
            <div class="feature-box">
              <div class="content" style="height: 159px;width: 100%;">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import Header from '@/components/Header.vue'
import GameCard from '@/components/GameCard.vue'
import type { HomeGameData } from '@/services/lotteryService'
import { home_data } from '@/api/index'
import { newCurrentTime } from '@/utils/newCurrentTime'
import { all_data } from '@/utils/title'

// Swiper modules
const modules = [Autoplay, Pagination]

// Banner 轮播图片
const bannerImages = ref<string[]>([
  'https://slotsdyn.s3.ap-southeast-1.amazonaws.com/luck8/banner3-pc.jpg',
  'https://slotsdyn.s3.ap-southeast-1.amazonaws.com/luck8/banner4-pc.jpg'
])

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

const menuItems = ref()

const get_num = ref(0)
// 获取首页数据
const getHomeData = async () => {
  try {
    const res = await home_data()
    menuItems.value = res.data
    all_data.value = res.data
    newCurrentTime(res.timestamp)
    luckywinGames.value = res.data.taixiu
    mienBacGames.value = res.data.mb
    mienNamGames.value = res.data.mn
    kenoGames.value = res.data.keno
    sicboGames.value = res.data.sicbo
  } catch (error) {
    if (get_num.value < 10) {
      getHomeData()
      get_num.value++
    }
  }

}

onMounted(async () => {
  await getHomeData()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})



// Luckywin 游戏数据
const luckywinGames = ref<HomeGameData[]>([])

// Miền Bắc 游戏数据
const mienBacGames = ref<HomeGameData[]>([])

// Miền Nam 游戏数据
const mienNamGames = ref<HomeGameData[]>([])

// Keno 游戏数据
const kenoGames = ref<HomeGameData[]>([])

// Sicbo 游戏数据
const sicboGames = ref<HomeGameData[]>([])
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f5f7fa;
  font-family: 'Roboto', sans-serif;
}

.banner {
  width: 100%;
  background: #fff;
  padding: 0;
  margin: 0;
}

.banner-bg {
  margin: 0 auto;
  padding: 0;
  width: 100%;
}

.banner-swiper {
  max-height: 600px;
  width: 100%;
  margin: 0;
  border-radius: 0;
  overflow: hidden;
}

.banner-slide {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.banner-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Swiper 分页器样式 */
.banner-swiper :deep(.swiper-pagination) {
  bottom: 0px;
}

.banner-swiper :deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgb(134, 151, 145);

  opacity: 0.5;
  /* border: 2px solid #fff; */
}

.banner-swiper :deep(.swiper-pagination-bullet-active) {
  background: rgb(134, 151, 145);
  width: 12px;
  border-radius: 5px;
  opacity: 1;
}

.feature {
  padding: 60px 0 30px;
  background: #f5f7fa;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
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
    max-width: 1470px;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.justify-content-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

.col-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-lg-5 {
  flex: 0 0 41.666667%;
  max-width: 41.666667%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-md-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.section-head h2.title {
  padding-bottom: 11px;
  font-size: 32px;
  font-weight: 700;
  color: #051c35;
  font-family: 'Josefin Sans', sans-serif;
  margin: 0;
  line-height: 1.2;
  display: flex;
}

.copyright {
  background-color: #011025;
  padding: 30px 0;
  border-top: 1px solid #e8ecf1;
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
}

.copyright .text a:hover {
  color: #5a2ab5;
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.text-center {
  text-align: center;
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

@media (max-width: 992px) {
  .col-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  /* .banner-swiper {
    height: 250px;
  } */

  .feature {
    padding: 30px 0 20px;
  }

  .section-head h2.title {
    font-size: 24px;
  }

  .col-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .floating-button {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
  }

  .float-icon {
    font-size: 18px;
  }

  .copyright {
    padding: 20px 0;
  }

  .copyright .text {
    font-size: 12px;
  }
}
</style>
