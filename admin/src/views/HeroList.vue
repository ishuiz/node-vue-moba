<template>
  <div class="hero">
    <h1>英雄列表</h1>
    <el-table :data="list">
      <el-table-column
        prop="_id"
        label="ID"
        width="240">
      </el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column label="头像">
        <template v-slot="scope">
          <img :src="scope.row.avatar" style="height: 3rem;" alt="">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template v-slot="scope">
          <el-button
            @click="handleClickEdit(scope.row)"
            type="text"
            size="small">编辑</el-button>
          <el-button
            @click="handleClickDelete(scope.row)"
            type="text"
            size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HeroList',
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
      const res = await this.$http.get('rest/heroes')
      this.list = res.data
    },
    handleClickEdit (row) {
      this.$router.push({
        path: `/heroes/edit/${row._id}`
      })
    },
    handleClickDelete (row) {
      this.$confirm(`确定删除英雄 "${row.name}"？`, {
        type: 'warning'
      }).then(async () => {
        await this.handleDelete(row._id)
        this.queryList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {})
    },
    handleDelete (id) {
      return this.$http.delete(`rest/heroes/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
