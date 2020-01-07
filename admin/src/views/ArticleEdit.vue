<template>
  <div class="article">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="所属分类">
        <el-select
          v-model="model.categories"
          placeholder="请选择"
          multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <VueEditor
          useCustomImageHandler
          @image-added="handleImageAdded"
          style="lineHeight: 24px;"
          v-model="model.body">
        </VueEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'ArticleEdit',
  components: {
    VueEditor
  },
  props: {
    id: String
  },
  data () {
    return {
      model: {
        categories: [],
        title: '',
        body: ''
      },
      categories: []
    }
  },
  created () {
    this.queryCategories()
    this.id && this.queryDetail()
  },
  methods: {
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    async handleSave () {
      if (!this.model.title) {
        return
      }
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/articles', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/articles/list')
    },
    async queryDetail () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async queryCategories () {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
