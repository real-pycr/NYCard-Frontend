import { createRouter, createWebHistory } from 'vue-router'
import { useGetInfo } from '../composable/api/useGetInfo'
import KeyView from '../views/KeyView.vue'
import TextView from '../views/TextView.vue'
import CardView from '../views/CardView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import WriteView from '../views/WriteView.vue'
import CardListView from '../views/CardListView.vue'
import TestView from '../views/TestView.vue'

import { isLoading } from '../store'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/',
      name: 'key',
      component: KeyView
    },
    {
      path: '/:key',
      name: 'text',
      component: TextView
    },
    {
      path: '/card',
      redirect: { name: 'key' }
    },
    {
      path: '/card/:key',
      name: 'card',
      component: CardView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/write',
      name: 'write',
      component: WriteView
    },
    {
      path: '/cardlist',
      name: 'cardlist',
      component: CardListView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from) => {
  if(to.name !== 'card') isLoading.value = true;
  if (to.name === 'card' && (from.name !== 'text' && from.name !== 'write' && from.name !== 'cardlist')) {
    return `/${to.params.key}`;
  }
  // console.log(from)
  
  // if(to.name === 'login' || to.name === 'register') {
  //   useGetInfo().then((res: any) => {
  //     if (res.success) {
  //       return '/write'
  //     }
  //     console.log('123')
  //   }).catch((err) => {
  //     console.error(err)
  //   });
  // }
  return true;
});

router.afterEach(() => {
  isLoading.value = false;
});

export default router
