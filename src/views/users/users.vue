<template>
<!-- 卡片包裹 -->
    <el-card class="box-card">
        <!-- 、面包屑、 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <el-row class="searchArea">
            <el-col :span="24">
                <el-input class="searchInput" clearable placeholder="请输入内容">
                    <!-- Table Slot文档中有具体的说明 -->
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" plain>添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
            v-loading="loading"
            stripe
            border
            :data="list"
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="username"
                label="姓名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话">
            </el-table-column>
            <el-table-column
                label="创建日期">
                <template slot-scope="scope">
                <!-- 当前行绑定到的数据对象 -- 用户对象 -->
                <!-- {{ scope.row }} -->
                <!-- <hr> -->
                <!-- 当前行的索引 -->
                <!-- {{ scope.$index }} -->
                <!-- <hr> -->
                <!-- 当前列的配置内容 -->
                <!-- {{ scope.column }} -->
                <!-- <hr> -->
                {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column
                label="用户状态" width="100">
                <template slot-scope="scope">
                <!-- scope.row 就是当前行绑定的数据对象 -->
                <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                <el-button plain size="mini" type="primary" icon="el-icon-edit" ></el-button>
                <el-button plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
                <el-button plain size="mini" type="success" icon="el-icon-check" ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 用户列表信息
      list: []
    };
  },
  created() {
    // 发送请求数据
    this.loadData();
  },
  methods: {
    // 发送异步请求，获取数据
    async loadData() {
      // 发送异步请求之前
      this.loading = true;

      // 发送请求之前，获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;

      const res = await this.$http.get('users?pagenum=1&pagesize=10');

      // 异步请求结束
      this.loading = false;

      // 获取响应数据
      const data = res.data;
      // meta中的msg 和 status
      const { meta: { msg, status } } = data;
      if (status === 200) {
        const { data: { users } } = data;
        this.list = users;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.el-breadcrumb{
    margin-bottom:20px;
}
.box-card .searchInput{
    width: 400px;
}
</style>
