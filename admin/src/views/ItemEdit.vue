<template>
  <div class="item">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ItemEdit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        name: '',
        icon: ''
      }
    }
  },
  created () {
    this.id && this.queryDetail()
  },
  methods: {
    async handleSave () {
      if (!this.model.name) {
        return
      }
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/items', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/items/list')
    },
    async queryDetail () {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
