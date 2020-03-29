import Vue from 'vue';
import VueRouter from 'vue-router';
import JoinGame from '@/views/JoinGame.vue';
import Dashboard from '@/views/Dashboard.vue';
import { hasAccess } from '@/persistence/access';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'JoinGame',
    component: JoinGame,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
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

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!hasAccess();

  if (!isPublic && !loggedIn) {
    return next({
      path: '/',
      // query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/dashboard');
  }

  return next();
});

export default router;
