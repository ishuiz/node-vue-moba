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
          class="py-1 d-flex"
          v-for="(item, index) in category.newsList"
          :key="index">
          <span class="category text-info">{{item.categoryName}}</span>
          <span class="split px-2">|</span>
          <span class="title flex-1 pr-2 text-ellipsis">{{item.title}}</span>
          <span class="time text-gray-600">{{item.createdAt | date}}</span>
        </div>
      </template>
    </ListCard>
  </div>
</template>

<script>
import ListCard from '../components/ListCard'
import dayjs from 'dayjs'

export default {
  name: 'Home',
  components: {
    ListCard
  },
  filters: {
    date (val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      },
      newsCats: []
    }
  },
  methods: {
    async fetchNewsCats () {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    }
  },
  created () {
    this.fetchNewsCats()
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
