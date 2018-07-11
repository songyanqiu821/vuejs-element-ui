<template>
<!-- 角色列表 -->
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
        <!-- 添加角色按钮 -->
        <el-row class="addrole">
            <el-col>
                <el-button type="success" plain>添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
            border
            stripe
            :data="list"
            style="width: 100%">
            <el-table-column type="expand">

            </el-table-column>
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
                width="400">
            </el-table-column>
            <el-table-column
                prop="roleDesc"
                label="角色描述"
                width="400">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                    <el-button  type="danger" size="mini" icon="el-icon-delete"></el-button>
                    <el-button  plain type="success" size="mini" icon="el-icon-check"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.loadDate();
  },
  methods: {
    // 加载角色列表
    async loadDate() {
      const res = await this.$http.get('roles');
      const data = res.data;
      this.list = data.data;
    }
  }
};
</script>

<style>
.addrole{
    margin:20px 0 20px 0;
}
</style>
