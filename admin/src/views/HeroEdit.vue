<template>
  <div class="hero">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleUploadAvatarSuccess"
              :headers="getAuthHeaders()"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select multiple v-model="model.categories">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.difficult"
              style="marginTop: 10px;">
            </el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.skills"
              style="marginTop: 10px;">
            </el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.attack"
              style="marginTop: 10px;">
            </el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.survive"
              style="marginTop: 10px;">
            </el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select multiple v-model="model.items1">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select multiple v-model="model.items2">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="skills" label="技能">
          <el-button size="small" @click="handleAddSkills">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flexWrap: wrap; marginTop: 20px;">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :headers="getAuthHeaders()"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="handleDeleteSkills(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="marginTop: 20px;">
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
        title: '',
        categories: [],
        avatar: '',
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        items1: [],
        items2: [],
        usageTips: '',
        battleTips: '',
        teamTips: '',
        skills: []
      },
      categories: [],
      items: []
    }
  },
  created () {
    this.queryCatogories()
    this.queryItems()
    this.id && this.queryDetail()
  },
  methods: {
    async queryCatogories () {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    },
    async queryItems () {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
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
      this.model = {
        ...this.model,
        ...res.data
      }
    },
    handleUploadAvatarSuccess (res) {
      this.model.avatar = res.url
    },
    handleAddSkills () {
      this.model.skills.push({})
    },
    handleDeleteSkills (index) {
      this.$confirm(`确定删除该技能？`, {
        type: 'warning'
      }).then(() => {
        this.model.skills.splice(index, 1)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
