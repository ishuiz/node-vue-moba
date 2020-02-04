<template>
  <div class="page-hero">
    <div class="topbar text-white bg-black py-2 px-3 d-flex ai-center">
      <router-link class="sprite sprite-logo" to="/"></router-link>
      <div class="px-2 flex-1">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link tag="div" to="/">更多英雄 &gt;</router-link>
    </div>
    <div class="header-hero">
      <img :src="model.banner" alt="">
      <div class="hero-attribute text-white p-3">
        <p class="fs-sm">{{model.title}}</p>
        <h2 class="m-0">{{model.name}}</h2>
        <p v-if="model.categories">{{model.categories.map(v => v.name).join('/')}}</p>
        <div v-if="model.scores" class="hero-cover d-flex">
          <ul class="cover-list d-flex flex-1 fs-sm">
            <li>难度<span class="badge bg-primary">{{model.scores.difficult}}</span></li>
            <li>技能<span class="badge bg-blue">{{model.scores.skills}}</span></li>
            <li>攻击<span class="badge bg-danger">{{model.scores.attack}}</span></li>
            <li>生存<span class="badge bg-gray-900">{{model.scores.survive}}</span></li>
          </ul>
          <router-link tag="span" to="/" class="fs-sm text-gray-400">皮肤: 2 &gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.page-hero {
  .header-hero {
    position: relative;
    width: 100%;
    height: 3.82rem;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
    }

    img {
      width: 100%;
      height: 100%;
    }

    .hero-attribute {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 1;
    }

    .hero-cover {
      .badge {
        display: inline-block;
        width: .28rem /* 14/50 */;
        height: .28rem /* 14/50 */;
        line-height: .28rem /* 14/50 */;
        font-size: map-get($map: $font-sizes, $key: 'xs') * $font-size-base;
        border-radius: 50%;
        text-align: center;
        margin: 0 .12rem /* 6/50 */;
      }
    }
  }
}
</style>
