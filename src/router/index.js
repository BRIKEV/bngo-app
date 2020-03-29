import Vue from 'vue';
import VueRouter from 'vue-router';
import JoinGame from '@/views/JoinGame.vue';
import Dashboard from '@/views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/join-game',
  },
  {
    path: '/join-game',
    name: 'JoinGame',
    component: JoinGame,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
