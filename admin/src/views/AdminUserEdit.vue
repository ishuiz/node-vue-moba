<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminUserEdit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    this.id && this.queryDetail()
  },
  methods: {
    async handleSave () {
      if (!this.model.username) {
        return
      }
      if (this.id) {
        await this.$http.put(`rest/admin_user/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/admin_user', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/admin_user/list')
    },
    handleAddItem () {
      this.model.items.push({})
    },
    handleDeleteItem (index) {
      this.$confirm(`确定删除？`, {
        type: 'warning'
      }).then(() => {
        this.model.items.splice(index, 1)
      }).catch(() => {})
    },
    async queryDetail () {
      const res = await this.$http.get(`rest/admin_user/${this.id}`)
      this.model = {
        ...this.model,
        ...res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
