import { createRouter, createWebHashHistory } from 'vue-router';
import GetStarted from '../views/GetStarted.vue';
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Overview from '../views/Overview.vue';

const routes = [
   {
      path: '/',
      name: 'GetStarted',
      component: GetStarted
   },
   {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
         title: 'Noteodo - Home'
      }
   },
   {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
         title: 'Noteodo - Login'
      }
   },
   {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
         title: 'Noteodo - Register'
      }
   },
   {
      path: '/overview',
      name: 'Overview',
      component: Overview,
      meta: {
         title: 'Noteodo - Overview'
      }
   }
];

const router = createRouter({
   history: createWebHashHistory(),
   routes
});

export default router;
