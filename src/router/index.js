import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Show from '../views/Show.vue'

let isAuthenticated = localStorage.getItem('auth');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next){
      if(User.loggedIn()){
        next();
      }else{
        next('login');
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next){
      if(!User.loggedIn()){
        next();
      }else{
        next('/');
      }
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter(to, from, next){
      if(User.loggedIn()){
        next();
      }else{
        next('login');
      }
    }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    beforeEnter(to, from, next){
      if(User.loggedIn()){
        next();
      }else{
        next('login');
      }
    }
  },
  {
    path: '/show/:id',
    name: 'Show',
    component: Show,
    beforeEnter(to, from, next){
      if(User.loggedIn()){
        next();
      }else{
        next('login');
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
