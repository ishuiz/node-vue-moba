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
  </div>
</template>

<script>

export default {
  name: 'Home',
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
</style>
