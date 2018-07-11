export default {
  data() {
    return {
      // 用户列表信息
      list: [],
      // 加载
      loading: true,
      //   绑定表单
      formDate: {
        username: '',
        password: '',
        eamil: '',
        mobile: ''
      },
      // 角色列表的相关数据
      currentUserName: '',
      currentRoleId: -1,
      roles: [],
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
      //   控制编辑用户的对话框显示或者隐藏
      EditdialogFormVisible: false,
      // 控制角色用户的对话框显示或者隐藏
      setRoleDialogVisible: false,
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

      // // 发送请求之前，获取token
      // const token = sessionStorage.getItem('token');
      // // 在请求头中设置token
      // this.$http.defaults.headers.common['Authorization'] = token;

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
          // for (let key in this.formDate) {
          //   this.formDate[key] = '';
          // }
        } else {
          // 用户添加失败
          this.$message.error(msg);
        }
      });
    },
    // 删除
    // 给删除绑定事件
    // 提示是否删除
    // 发送
    async handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.delete(`users/${id}`);
        const data = res.data;
        const {meta: {status, msg}} = data;
        if (status === 200) {
          // 删除成功 重新加载数据
          // 默认让其显示第一页
          this.pagenum = 1;
          this.loadData();
          this.$message({
            type: 'success',
            message: msg
          });
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 当点击编辑图标的时候 弹出对话框 并展示对应id的用户信息
    EditShowFormVisible(user) {
      // 弹出编辑对话框
      this.EditdialogFormVisible = true;
      this.formDate.username = user.username;
      this.formDate.email = user.email;
      this.formDate.mobile = user.mobile;
      this.formDate.id = user.id;
    },
    // 当点击编辑用户对话框中的确定按钮执行
    async handleEdit () {
      console.log(this.formDate);
      const res = await this.$http.put(`users/${this.formDate.id}`, {
        mobile: this.formDate.mobile,
        email: this.formDate.email
      });
      const data = res.data;
      const {meta: {status, msg}} = data;
      if (status === 200) {
        // 修改成功
        // 提示
        this.$message.success(msg);
        // 隐藏对话框
        this.EditdialogFormVisible = false;
        // 重新加载数据
        this.loadData();
        // 清空文本框
        // for (let key in this.formDate) {
        //   this.formDate[key] = '';
        // }
      } else {
        this.$message.error(msg);
      }
    },
    // 添加用户和编辑用户时清空文本框的操作
    handleClosed () {
      for (let key in this.formDate) {
        this.formDate[key] = '';
      }
    },
    // 点击按钮  显示对话框并显示列表
    async handlesetShowRoles (user) {
      // 记录当前用户的id
      this.currentUserId = user.id;
      // 弹出对话框
      this.setRoleDialogVisible = true;
      // 发送请求
      const res = await this.$http.get('roles');
      this.currentUserName = user.username;
      this.roles = res.data.data;
      // 根据用户id查询用户对象，角色id
      const res1 = await this.$http.get(`users/${user.id}`);
      this.currentRoleId = res1.data.data.rid;
    },
    // 点击确认按钮触发的事件
    async setRole(id) {
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRoleId
      });
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        // 成功
        // 关闭对话框
        this.setRoleDialogVisible = false;
        // 提示
        this.$message.success(msg);
        // 重置数据
        this.currentUserName = '';
        this.currentUserId = -1;
        this.currentRoleId = -1;
      } else {
        // 失败
        this.$message.error(msg);
      }
    }
  }
};
