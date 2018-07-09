<template>
    <el-container class="container">
        <el-header class="header">
            <!-- 栅格系统 -->
            <el-row>
                <el-col :span="6">
                    <img src="/static/logo.png" alt="">
                </el-col>
                <el-col :span="17" class="text">
                    <h2>电商管理后台系统</h2>
                </el-col>
                <el-col :span="1" class="loginout">
                    <a href="#" @click="hanleLoginout">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px" class="sidebar">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    unique-opened>
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                 <i class="el-icon-menu"></i>
                                用户列表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                 <i class="el-icon-menu"></i>
                                角色列表
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                 <i class="el-icon-menu"></i>
                                权限列表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                     <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">
                                 <i class="el-icon-menu"></i>
                                商品列表
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                 <i class="el-icon-menu"></i>
                                分类参数
                            </el-menu-item>
                            <el-menu-item index="3-3">
                                 <i class="el-icon-menu"></i>
                                商品分类
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">
                                 <i class="el-icon-menu"></i>
                                订单列表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1">
                                 <i class="el-icon-menu"></i>
                                数据报表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-aside>
           <!-- 主题 -->
        </el-container>
    </el-container>
</template>
<script>
export default {
  // 判断是否登录
  beforeCreate() {
    // 获取sessionStrage中的token  ，并判断token是否存在
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 如果不存在token则返回登录页面
      this.$router.push({name: 'login'});
      // 提示
      this.$message.warning('请先登录');
    }
  },
  methods: {
    //   点击退出按钮触发事件
    hanleLoginout() {
      //   清除token和session
      sessionStorage.clear();
      // 提示
      this.$message.success('退出成功');
      // 跳转到登录页
      this.$router.push({name: 'login'});
    }
  }
};
</script>

<style>
.container{
    height: 100%;
}
.container .header{
    background-color:#b3c0d1;
    padding-left:0;
}
.header .text{
    line-height: 60px;
    text-align: center;
    color:ghostwhite;
}
.header .loginout{
    line-height: 60px;
    color:darkgoldenrod;
}
.container .el-menu{
    border-right:none;
}
.box-card{
    height: 100%;
}

</style>
