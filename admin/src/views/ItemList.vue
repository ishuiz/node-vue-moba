<template>
  <div class="item">
    <h1>物品列表</h1>
    <el-table :data="list">
      <el-table-column
        prop="_id"
        label="ID"
        width="240">
      </el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
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
  name: 'ItemList',
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
      const res = await this.$http.get('rest/items')
      this.list = res.data
    },
    handleClickEdit (row) {
      this.$router.push({
        path: `/items/edit/${row._id}`
      })
    },
    handleClickDelete (row) {
      this.$confirm(`确定删除物品 "${row.name}"？`, {
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
      return this.$http.delete(`rest/items/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
