<template>
<!-- 一个组件只有一个根节点 -->
<!-- 此处使用的布局框架是element-ui -->
    <div class="login-wrap">
        <!-- top顶端对齐 -->
        <!-- :model="fromData"绑定表单 -->
        <el-form
        label-position="top"
        label-width="80px"
        class="login-form">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <!-- v-model="fromData.username" -->
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <!-- v-model="fromData.password" -->
                <el-input ></el-input>
            </el-form-item>
        <el-button type="primary" class="login-button">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {

    };
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
