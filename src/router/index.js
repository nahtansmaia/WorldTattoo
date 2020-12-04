import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      icon: 'Home', title: 'Home'},
  },
  {
    path: '/Contact',
    name: 'Contact',
    meta: {icon: 'Contact', title: 'Contact'},
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {icon: 'Login', title: 'Login'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Main',
    name: 'Main',
    meta: {icon: 'Main', title: 'Main'},
    component: () => import('../views/Main.vue')
  },
  {
    path:'/Profile',
    name:'Profile',
    meta:{icon: 'Main', title: 'Profile'},
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path:'/About',
    name:'About',
    meta:{icon: 'About', title: 'About'},
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  }
]
/*
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - World Tattoo`
  
  if (!window.uid && to.name != 'Main') {
    next({ name: 'Home' })
  } else {
    next()
  }
})*/

const router = new VueRouter({
  routes
})

export default router
