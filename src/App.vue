<template>
  <div id="app">
    <!-- 一个组件只有一个根节点 -->
    <!-- 匹配路由的组件占位 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
  #app{
    height:100%;
  }
</style>
