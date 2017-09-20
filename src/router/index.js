import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import Order from '@/pages/Order'
import Mine from '@/pages/Mine'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    }
  ]
})
