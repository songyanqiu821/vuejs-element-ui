// 为了后期方便 自己写的插件
import axios from 'axios';
var myAxios = {};
myAxios.install = function(Vue) {
  // 创建一个axios实例
  var instance = axios.create({
    baseURL: 'http://192.168.129.53:8888/api/private/v1/'
  });
  Vue.prototype.$http = instance;
};
export default myAxios;
