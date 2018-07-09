<template>
<!-- 一个组件只有一个根节点 -->
<!-- 此处使用的布局框架是element-ui -->
    <div class="login-wrap">
        <!-- top顶端对齐 -->
        <!-- :model="formData"绑定表单 -->
        <el-form
        label-position="top"
        label-width="80px"
        :model="formData"
        class="login-form">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <!-- v-model="formData.username" -->
                <el-input v-model="formData.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <!-- v-model="formData.password" -->
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
        <el-button @click="hanleLogin" type="primary" class="login-button">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 点击登录按钮 触发事件
    hanleLogin() {
      this.$http
        .post('login', this.formData)
        .then((res) => {
          const data = res.data;
          // 测试的话一定要将后台服务器打开
          //   注意数据格式
          const {meta: {status, msg}} = data;
          //   console.log(data);
          if (status === 200) {
            //   登录成功
            // 获取token
            const token = data.data.token;
            // 记录token sessionStorage
            sessionStorage.setItem('token', token);
            // console.log(token);
            // 提示
            this.$message.success(msg);
          } else {
            //   登录失败 $message.error是element-ui提供的方法
            this.$message.error(msg);
          }
        });
    }
  }
};
</script>

<style>
    /* login-wrap的父级是#app */
    .login-wrap{
        background-color: #324152;
        height: 100%;
        /* 伸缩布局 水平垂直居中 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrap .login-form{
        background-color: #fff;
        width: 400px;
        padding: 30px;
        border-radius: 5px;
    }
    .login-wrap .login-button{
        width: 100%;
    }
</style>
