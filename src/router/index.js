import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Monitor from '../views/Monitor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: Monitor
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
