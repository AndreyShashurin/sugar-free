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
    props: { isLogin: false}
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('accessToken');
    console.log(isLoggedIn)
  if (!!isLoggedIn) {
    next('/signup');
  } else {
    next()
  }
})*/

export default router
