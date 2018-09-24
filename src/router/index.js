import Vue from 'vue';
import store from 'Store';
import Router from 'vue-router';
import Profile from 'Components/profile.component';
import Login from 'Components/auth/login.component'
import Register from 'Components/auth/register.component'
import PlaygroundBase from 'Components/playground/base.component'
import LearnBase from 'Components/learn/base.component'
import QuizComponent from 'Components/learn/quiz/quiz.component'
import SettingsComponent from 'Components/settings/base.component'

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
    },
    {
      path: '/learn',
      name: 'learn',
      component: LearnBase
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizComponent,
      props: true
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsComponent
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
