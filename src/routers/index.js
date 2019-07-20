import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Index from '@/views/index'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    { path: '/login', name: 'login', component: Login },
    { path: '*', name: '404', component: NotFound }
  ]
})

export default router
