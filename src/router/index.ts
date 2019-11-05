import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/model',
  name: 'home',
  component: Home
},
{
  path: '/about',
  name: 'about',
  component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
},
{
  path: '/',
  name: 'main',
  component: () => import( /* webpackChunkName: "about" */ '../views/Main.vue')
}
]

const router = new VueRouter({
  routes
})

export default router