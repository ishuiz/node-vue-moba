<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="handleAddItem">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flexWrap: wrap; marginTop: 20px;">
          <el-col v-for="(item, index) in model.items" :key="index">
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                size="small"
                @click="handleDeleteItem(index)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdEdit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        name: '',
        items: []
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
        await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/ads', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/ads/list')
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
      const res = await this.$http.get(`rest/ads/${this.id}`)
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
