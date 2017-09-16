// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // 引入vue文件直接写名字会在node_modules下找
import App from './App' // 自己定义的文件，写相对路径，不然会在node_modules文件夹下找
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App } // 使用组件前必须注册
})

