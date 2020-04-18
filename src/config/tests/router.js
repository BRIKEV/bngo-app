import VueRouter from 'vue-router';
import localVue from '@/config/tests';
import { routes } from '@/router';


localVue.use(VueRouter);

const router = new VueRouter({
  routes,
});

export default router;
