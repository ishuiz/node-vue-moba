<template>
  <div class="main">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <router-link class="sprite sprite-logo" to="/"></router-link>
      <div class="px-2 flex-1">
        <p class="text-white">王者荣耀</p>
        <p class="text-gray-600 fs-xxs">团队成就更多</p>
      </div>
      <a class="btn bg-primary text-gray-900">立即下载</a>
    </div>
    <div class="bg-primary py-2">
      <div class="nav nav-inverse">
        <div class="nav-item is-active">
          <router-link class="nav-link text-white" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link text-white" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link text-white" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
