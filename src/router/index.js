import { createRouter, createWebHistory } from 'vue-router';
   import Registration from '../components/Registration.vue';
   import Login from '../components/Login.vue';
   import UserList from '../components/UserList.vue';
   import Main from '../components/Main.vue';
   import Start from '../components/Start.vue';

   const routes = [
     { path: '/start', component: Start},
     { path: '/', component: Start},
     { path: '/register', component: Registration },
     { path: '/login', component: Login },
     { path: '/UserList', component: UserList },
     { path: '/main', component: Main }
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes
   });

   export default router;
