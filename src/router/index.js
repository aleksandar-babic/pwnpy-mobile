import Vue from 'vue';
import store from 'Store';
import Router from 'vue-router';
import Profile from 'Components/profile.component';
import Login from 'Components/auth/login.component'
import Register from 'Components/auth/register.component'
import PlaygroundBase from 'Components/playground/base.component'

Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/profile'
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
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
  if (!store.getters.isLogged && (to.path !== '/login' && to.path !== '/register')) {
    return next('/login');
  }

  if (store.getters.isLogged && (to.path === '/login' || to.path === '/register')) {
    return next('/profile');
  }

  next();
})

export default router;
