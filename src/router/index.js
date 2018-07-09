import Vue from 'vue';
import Router from 'vue-router';
// 导入登录组件
import Login from '@/views/login';
// 导入首页组件
import Home from '@/views/home';

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
      // 配置首页路由规则
      name: 'home',
      path: '/',
      component: Home
    }
  ]
});
