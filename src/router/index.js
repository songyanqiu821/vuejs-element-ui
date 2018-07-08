import Vue from 'vue';
import Router from 'vue-router';
// 导入登录组件
import Login from '@/views/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      // 配置登录路由规则
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      // 测试首页也是/login
      name: 'home',
      path: '/',
      redirect: {name: 'login'}
    }
  ]
});
