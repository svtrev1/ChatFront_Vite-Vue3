import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Main from './components/Main.vue';
import Start from './components/Start.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/main', component: Main },
    { path: '/start', component: Start},
    { path: '/login', component: Login},
    { path: '/register', component: Registration}
  ]
});

createApp(App).use(router).mount('#app');

