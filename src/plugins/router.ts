import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import auth0 from '@/guards/auth0';
import Dashboard from '@/views/dashboard/index.vue';
import OrderBook from '@/views/dashboard/order-book.vue';
import OrderBooks from '@/views/dashboard/order-books.vue';
import Landing from '@/views/landing.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'index',
    component: Landing,
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: auth0,
  },

  {
    path: '/dashboard/order-books/:id',
    name: 'order-book',
    component: OrderBook,
    beforeEnter: auth0,
  },

  {
    path: '/dashboard/order-books',
    name: 'order-books',
    component: OrderBooks,
    beforeEnter: auth0,
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
