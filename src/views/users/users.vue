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
        <!-- 搜索功能
        1、绑定文本框
        2、给搜索按钮绑定事件 -->
        <el-row class="searchArea" >
            <el-col :span="24">
                <el-input v-model="searchValue" @change = "hanleShowData" class="searchInput" clearable placeholder="请输入内容">
                <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" plain @click="AdddialogFormVisible = true">添加用户</el-button>
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
                    @change="handleChange(scope.row)"
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
        <!-- 分页 -->
        <!-- @size-change 每页多少条数据发生改变 触发的事件 -->
        <!-- @current-change 当前页码改变发生 -->
        <!-- current-page 当前页码 -->
        <!-- page-sizes 每页多少条数据的下拉框 -->
        <!-- page-size 每页显示多少条数据 -->

        <!-- total  总条数 -->

        <!-- layout 分页所支持的功能 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <!-- 添加用户 -->
        <el-dialog title="添加用户" :visible.sync="AdddialogFormVisible" >
            <el-form :model="formDate"  label-width="100px" :rules="formRules" ref="ruleForm">
                <el-form-item label="用户名" prop ="username" >
                    <el-input v-model="formDate.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item type="password" label="密码"  prop ="password">
                    <el-input v-model="formDate.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="formDate.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" >
                    <el-input v-model="formDate.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AdddialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="Adduserialog">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 用户列表信息
      list: [],
      //   绑定表单
      formDate: {
        username: '',
        password: '',
        eamil: '',
        mobile: ''
      },
      //   表单验证规则  自定义
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 11, message: '长度在 4 到 11 个字符', trigger: 'blur' }
        ]
      },
      //   控制添加用户的对话框显示或者隐藏
      AdddialogFormVisible: false,
      //   绑定文本框
      searchValue: '',
      //   分页相关的数据
      pagenum: 1, // 页码
      pagesize: 6, // 每页条数
      total: 0 // 总共的数据条数，从服务器获取
    };
  },
  created() {
    // 发送请求数据
    this.loadData();
  },
  methods: {
    //   分页功能
    handleSizeChange(val) {
      // 当每页的条数改变的时候
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 当当前页码改变的时候、
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 发送异步请求，获取数据
    async loadData() {
      // 发送异步请求之前
      this.loading = true;

      // 发送请求之前，获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;

      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);

      // 异步请求结束
      this.loading = false;

      // 获取响应数据
      const data = res.data;
      // meta中的msg 和 status
      const { meta: { msg, status } } = data;
      if (status === 200) {
        const { data: {users, total} } = data;
        this.list = users;
        // 获取总共的条数
        this.total = total;
      } else {
        this.$message.error(msg);
      }
    },
    // 搜索功能
    handleSearch() {
      // 带上查询参数
      this.loadData();
    },
    // 当搜索文本框的内容改变的时候
    hanleShowData () {
      this.loadData();
    },
    // 当开关改变的时候
    async handleChange (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      const data = res.data;
      const {meta: {status, msg}} = data;
      if (status === 200) {
        // 修改状态成功
        // 提示
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 当点击添加用户对话框中的确定按钮执行
    async Adduserialog() {
      // this.$refs[ruleForm]表单的DOM对象 ===this.$refs.ruleForm
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请完整输入内容');
        }
        // 表单验证成功，添加的操作
        const res = await this.$http.post('users', this.formDate);
        const data = res.data;
        const {meta: {status, msg}} = data;
        if (status === 201) {
          // 用户添加成功
          // 隐藏对话框
          this.AdddialogFormVisible = false;
          // 提示
          this.$message.success(msg);
          // 重新加载数据
          this.loadData();
          // 清空对话框 ---》遍历formDate
          for (let key in this.formDate) {
            this.formDate[key] = '';
          }
        } else {
          // 用户添加失败
          this.$message.error(msg);
        }
      });
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
.el-table {
    margin-top:10px;
    margin-bottom :10px;
}
</style>
