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
    <ListCard title="新闻资讯" icon="category" :categories="newsCats">
      <template v-slot:items="{category}">
        <div
          class="py-1"
          v-for="(item, index) in category.list"
          :key="index">
          <span class="category">{{item.categoryName}}</span>
          <span class="split">|</span>
          <span class="title">{{item.title}}</span>
          <span class="time">{{item.date}}</span>
        </div>
      </template>
    </ListCard>
  </div>
</template>

<script>
import ListCard from '../components/ListCard'

export default {
  name: 'Home',
  components: {
    ListCard
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      },
      newsCats: [
        {
          name: '热门',
          list: new Array(5).fill(true).map(() => ({
            categoryName: '公告',
            title: '赛季奖励领取调整说明及未领取奖励补发公告',
            date: '06/01'
          }))
        },
        {
          name: '新闻',
          list: new Array(5).fill(true).map(() => ({
            categoryName: '公告',
            title: '赛季奖励领取调整说明及未领取奖励补发公告',
            date: '06/01'
          }))
        },
        {
          name: '公告',
          list: new Array(5).fill(true).map(() => ({
            categoryName: '公告',
            title: '赛季奖励领取调整说明及未领取奖励补发公告',
            date: '06/01'
          }))
        },
        {
          name: '活动',
          list: new Array(5).fill(true).map(() => ({
            categoryName: '公告',
            title: '赛季奖励领取调整说明及未领取奖励补发公告',
            date: '06/01'
          }))
        },
        {
          name: '赛事',
          list: new Array(5).fill(true).map(() => ({
            categoryName: '公告',
            title: '赛季奖励领取调整说明及未领取奖励补发公告',
            date: '06/01'
          }))
        }
      ]
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
