// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueCordova from 'vue-cordova';
import VeeValidate from 'vee-validate';
import Axios from 'axios';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueSweetalert2 from 'vue-sweetalert2';
import store from './store';
import authService from 'Api/auth.service';
import Loader from 'Components/shared/loader.shared.component'

import {
  LOCALES
} from './i18n';

import {
  API_BASE_URL
} from './constants';

Vue.config.productionTip = false;

Vue.use(VueCordova);
Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.use(VueI18n);
Vue.use(VueSweetalert2);

Axios.defaults.baseURL = API_BASE_URL;
Axios.defaults.headers.Accept = 'application/json';

// Shared components
Vue.component('loader', Loader);

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  const cordovaScript = document.createElement('script');
  cordovaScript.setAttribute('type', 'text/javascript');
  cordovaScript.setAttribute('src', 'cordova.js');
  document.body.appendChild(cordovaScript);
}

const i18n = new VueI18n({
  locale: 'en',
  messages: LOCALES,
})

authService.initStoreAuth();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
});
