<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="list">
      <el-table-column
        prop="_id"
        label="ID"
        width="240">
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
  name: 'AdminUserList',
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
      const res = await this.$http.get('rest/admin_user')
      this.list = res.data
    },
    handleClickEdit (row) {
      this.$router.push({
        path: `/admin_user/edit/${row._id}`
      })
    },
    handleClickDelete (row) {
      this.$confirm(`确定删除用户 "${row.username}"？`, {
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
      return this.$http.delete(`rest/admin_user/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
