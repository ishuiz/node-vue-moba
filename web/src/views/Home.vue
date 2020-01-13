<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/f37e7da410a0641b502bdff9fff1f0ea.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/f37e7da410a0641b502bdff9fff1f0ea.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/f37e7da410a0641b502bdff9fff1f0ea.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home pr-2 text-right" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons text-center text-gray-900 fs-xs mt-2">
      <div class="d-flex flex-wrap bg-white pt-3">
        <div
          class="nav-item mb-3 d-flex flex-column ai-center"
          v-for="n in 10"
          :key="n">
          <i class="sprite sprite-news"></i>
          <span class="py-1">爆料站</span>
        </div>
      </div>
      <div class="bg-gray-100 py-1">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <TheCard title="新闻资讯" icon="category">
      <div class="nav jc-between">
        <div class="nav-item is-active">
          <span class="nav-link">热门</span>
        </div>
        <div class="nav-item">
          <span class="nav-link">新闻</span>
        </div>
        <div class="nav-item">
          <span class="nav-link">公告</span>
        </div>
        <div class="nav-item">
          <span class="nav-link">活动</span>
        </div>
        <div class="nav-item">
          <span class="nav-link">赛事</span>
        </div>
      </div>
      <swiper class="mt-2">
        <swiper-slide v-for="n in 5" :key="n">
          <div
            class="py-1"
            v-for="m in 5"
            :key="m">
            <span class="category">[新闻]</span>
            <span class="split">|</span>
            <span class="title">赛季奖励领取调整说明及未领取奖励补发公告</span>
            <span class="time">01/09</span>
          </div>
        </swiper-slide>
      </swiper>
    </TheCard>
  </div>
</template>

<script>
import TheCard from '../components/Card'

export default {
  name: 'Home',
  components: {
    TheCard
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.pagination-home {
  ::v-deep .swiper-pagination-bullet {
    background: map-get($map: $colors, $key: 'white');
    border-radius: .04rem /* 2/50 */;
    opacity: 1;
  }
  ::v-deep .swiper-pagination-bullet-active {
    background: map-get($map: $colors, $key: 'info');
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;

    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
