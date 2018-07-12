<template>
    <el-container class="container">
        <el-header class="header">
            <!-- 栅格系统 -->
            <el-row>
                <el-col :span="4">
                    <img src="/static/logo.png" alt="">
                </el-col>
                <el-col :span="19" class="text">
                    <h2>电商管理后台系统</h2>
                </el-col>
                <el-col :span="1" class="loginout">
                    <a href="#" @click="hanleLoginout">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px" class="sidebar">
                <!-- :router="true"允许使用 vue-router 的模式 -->
                <el-menu
                    :router="true"
                    :unique-opened="true"
                    class="menu">
                    <el-submenu
                        v-for="item in list"
                        :key="item.id"
                        :index="item.id +''">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item
                                v-for="item1 in item.children"
                                :key="item1.id"
                                :index="'/' + item1.path">
                                 <i class="el-icon-menu"></i>
                                {{item1.authName}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-aside>
           <!-- 主题 -->
            <el-main class="main">
             <!-- 给匹配路由的组件站位 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      list: []
    };
  },
  created() {
    this.loadData();
  },
  // 判断是否登录
  //   beforeCreate() {
  //     // 获取sessionStrage中的token  ，并判断token是否存在
  //     const token = sessionStorage.getItem('token');
  //     if (!token) {
  //       // 如果不存在token则返回登录页面
  //       this.$router.push({name: 'login'});
  //       // 提示
  //       this.$message.warning('请先登录');
  //     }
  //   },
  methods: {
    //   加载左侧菜单的列表
    async loadData() {
      const { data: resData } = await this.$http.get('menus');
      const { data, meta: { status, msg } } = resData;
      if (status === 200) {
        this.list = data;
      } else {
        this.$message.error(msg);
      }
    },
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
    background-color: #b3c0d1;
    padding:0;
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
.container .sidebar{
    height: 100%;
    background-color: #d3dce6;
}
.sidebar .menu{
    height:100%;
}
.container .el-menu{
    border-right:none;
}
.main{
    background-color: #e9eef3;
}

</style>
