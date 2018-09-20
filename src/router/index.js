import Vue from 'vue';
import store from 'Store';
import Router from 'vue-router';
import Main from 'Components/main.component';
import Login from 'Components/auth/login.component'
import Register from 'Components/auth/register.component'
import PlaygroundBase from 'Components/playground/base.component'

Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/playground',
      name: 'playground',
      component: PlaygroundBase
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.getters.isLogged && (to.path !== '/login' || to.path === '/register')) {
    next('/login');
  }
  next();
})

export default router;
