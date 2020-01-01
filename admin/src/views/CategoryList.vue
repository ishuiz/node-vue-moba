<template>
  <div class="catogory">
    <h1>分类列表</h1>
    <el-table :data="list">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.queryList()
  },
  methods: {
    async queryList () {
      const res = await this.$http.get('categories')
      this.list = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
