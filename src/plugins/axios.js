// 为了后期方便 自己写的插件
import axios from 'axios';
var myAxios = {};
myAxios.install = function(Vue) {
  // 创建一个axios实例
  var instance = axios.create({
    baseURL: 'http://192.168.199.176:8888/api/private/v1/'
  });
  Vue.prototype.$http = instance;
  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么  config 中有header
    console.log(config);
    // console.log('拦截器', config);
    // console.log(config.headers);
    // console.log(config.url);
    // 判断当前请求的地址是否是login
    if (config.url.toLowerCase() !== 'login') {
      const token = sessionStorage.getItem('token');
      // 如果请求的地址不是login，设置token
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
};
export default myAxios;
