import Vue from 'vue';
import Router from 'vue-router';
// 导入登录组件
import Login from '@/views/login';
// 导入首页组件
import Home from '@/views/home';
// 导入用户列表组件
import Users from '@/views/users/users';
// 导入权限列表组件
import Right from '@/views/rights/right';
// 导入角色列表组件
import Role from '@/views/rights/role';
import { Message } from 'element-ui';
import Categogy from '@/views/goods/category';

Vue.use(Router);

const router = new Router({
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
      component: Home,
      // 子路由，将来子路由的切换 是在Home组件中完成的
      // 子路由使用之前，home组件已经创建完毕
      children: [
        // 用户列表
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        // 权限列表
        {
          name: 'right',
          path: '/rights',
          component: Right
        },
        // 角色列表路由配置
        {
          name: 'role',
          path: '/roles',
          component: Role
        },
        {
          name: 'category',
          path: '/categories',
          component: Categogy
        }
      ]
    }
  ]
});
// 路由的前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  // 判断当前访问的路由是否是login，如果是login直接next
  if (to.name === 'login') {
    next();
  } else {
    // 判断有没有token
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 跳转到登录页面
      router.push({ name: 'login' });
      // 提示
      Message.warning('请先登录');
      return;
    }
    next();
  }
});

export default router;
