import { createApp } from 'vue';
import { VueSignalR } from "@dreamonkey/vue-signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Main from './components/Main.vue';
import Start from './components/Start.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';

const connection = new HubConnectionBuilder().withUrl("/hub").build();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/main', component: Main },
    { path: '/start', component: Start},
    { path: '/login', component: Login},
    { path: '/register', component: Registration}
  ]
});

const app = createApp(App);

app.use(VueSignalR, {
  connection: connection,
  autoOffInsideComponentScope: false,
  failFn() {
    //ignore
  },
});

app.use(router);

app.mount("#app");
