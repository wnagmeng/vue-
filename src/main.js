// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {Cell, CellGroup, Tabbar,TabbarItem,Stepper,PullRefresh,Tab,Tabs,Button,Row,Col,Swipe,SwipeItem,Lazyload,List,Field,NavBar} from "vant"

Vue.use(Button).use(Cell).use(CellGroup).use(TabbarItem).use(Tabbar).use(Stepper).use(PullRefresh).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field).use(Tab).use(Tabs)
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
