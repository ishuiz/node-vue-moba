<template>
  <div class="card bg-white p-2 mt-2">
    <div class="card-header d-flex ai-center pb-2">
      <i class="iconfont" :class="'icon-' + icon"></i>
      <span class="fs-xl flex-1 px-1">{{title}}</span>
      <i class="iconfont icon-ellipsis"></i>
    </div>
    <div class="card-body pt-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCard',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>
