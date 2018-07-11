<template>
    <!--  权限列表 -->
    <el-card class= "box-card">
        <!-- 面包屑 -->
         <my-breadcrumb level1="权限管理" level2="权限列表"></my-breadcrumb>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 表格 -->
        <!-- :data="list"是ui框架给提供的方法 data是提供的数据 为数组 -->
        <el-table
            border
            stripe
            :data="list">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="authName"
                label="权限名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                width="180">
            </el-table-column>
            <el-table-column
                label="层级">
               <template slot-scope="scope">
                    <span v-if="scope.row.level.length === 0 ">一级</span>
                    <span v-if="scope.row.level.length === 1 ">二级</span>
                    <span v-if="scope.row.level.length === 2 ">三级</span>
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
    this.loadData();
  },
  methods: {
    //    加载数据
    async  loadData() {
      const res = await this.$http.get('rights/list');
      const data = res.data;
      this.list = data.data;
    }
  }
};
</script>

<style>
.el-table{
    margin-top:10px;
}
</style>
