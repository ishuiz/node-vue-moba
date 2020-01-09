<template>
  <div class="login-container">
    <el-card class="login-card" header="请先登录">
      <el-form :model="model">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$http.post('login', this.model)
      sessionStorage.setItem('token', JSON.stringify(res.data.token))
      this.$router.push('/')
      this.$message.success('登录成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 30rem;
  margin: 5rem auto;
}
</style>
