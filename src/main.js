// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 导入element-ui
import UI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入index.css
import '@/assets/css/index.css';
// 导入axios插件
import myAxios from '@/plugins/axios';
// 导入格式化日期
import moment from 'moment';
// 全局过滤器 格式化日期
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString);
});

// 注册插件
Vue.use(myAxios);

// 注册插件
Vue.use(UI);

Vue.config.productionTip = false;

// 下面注释的这行不要删除  否则会报错
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
