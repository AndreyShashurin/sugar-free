import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import store from '@/store'; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: checkAuth
  },
  {
    path: '/signup',
    name: 'signup',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
function checkAuth(to: any, from: any, next: any) {
  const isLoggedIn = localStorage.getItem('accessToken');
  store.dispatch('auth/checkToken')
   if (!!isLoggedIn) {
    next();
   } else { 
    next("/signup");
  }
}

export default router
