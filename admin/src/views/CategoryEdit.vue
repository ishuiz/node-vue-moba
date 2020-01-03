<template>
  <div class="catogory">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
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
  props: {
    id: String
  },
  data () {
    return {
      model: {
        parent: '',
        name: ''
      },
      parents: []
    }
  },
  created () {
    this.queryParents()
    this.id && this.queryDetail()
  },
  methods: {
    async handleSave () {
      if (!this.model.name) {
        return
      }
      if (this.id) {
        await this.$http.put(`categories/${this.id}`, this.model)
      } else {
        await this.$http.post('categories', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/categories/list')
    },
    async queryDetail () {
      const res = await this.$http.get(`categories/${this.id}`)
      this.model = res.data
    },
    async queryParents () {
      const res = await this.$http.get('categories')
      this.parents = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
