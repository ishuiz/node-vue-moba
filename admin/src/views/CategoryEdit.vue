<template>
  <div class="catogory">
    <h1>新建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  data () {
    return {
      model: {
        name: ''
      }
    }
  },
  methods: {
    async save () {
      if (!this.model.name) {
        return
      }
      await this.$http.post('categories', this.model)
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/categories/list')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
