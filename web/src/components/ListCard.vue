<template>
  <div class="list-card">
    <TheCard :title="title" :icon="icon">
      <div class="nav jc-between">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="nav-item"
          :class="{
            'is-active': active === index
          }"
          @click="handleClickNav(index)">
          <span class="nav-link">{{category.name}}</span>
        </div>
      </div>
      <swiper class="mt-2">
        <swiper-slide
          v-for="(category, index) in categories"
          :key="index">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </TheCard>
  </div>
</template>

<script>
import TheCard from './TheCard'

export default {
  name: 'CardList',
  components: {
    TheCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    handleClickNav (index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
