import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Index from '@/views/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/login', name: 'login', component: Login }
  ]
})

export default router
