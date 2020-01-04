<template>
  <div class="hero">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'HeroEdit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        name: '',
        avatar: ''
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
        await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/heroes', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/heroes/list')
    },
    async queryDetail () {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      this.model = res.data
    },
    handleUploadSuccess (res) {
      this.model.avatar = res.url
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
