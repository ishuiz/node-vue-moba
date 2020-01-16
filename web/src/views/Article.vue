<template>
  <div class="article">
    <div class="d-flex ai-center px-1 py-2 border-bottom">
      <i class="iconfont icon-arrow-lift" @click="back"></i>
      <span class="px-2 fs-lg flex-1 text-ellipsis text-blue">{{article.title}}</span>
      <span class="fs-xs text-gray-600">2020-01-01</span>
    </div>
    <div class="p-2" v-html="article.body"></div>
    <div class="border-top my-3">
      <div class="d-flex ai-center p-1">
        <i class="iconfont icon-category"></i>
        <span class="text-blue">相关资讯</span>
      </div>
      <div class="px-1">
        <router-link
          class="pb-1"
          tag="p"
          v-for="item in article.related"
          :key="item._id"
          :to="`/articles/${item._id}`">
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.fetchArticle()
  },
  watch: {
    id () {
      this.fetchArticle()
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async fetchArticle () {
      const res = await this.$http(`/articles/${this.id}`)
      this.article = res.data
    }
  }
}
</script>
