import Axios from 'axios';
import store from 'Store';

const ENDPOINTS = {
  LOGIN: '/user/login',
  REGISTER: '/user/signup',
  EDIT: '/user',
  CHANGE_PW: '/user/change-pw',
  ME: '/user'
};

const AUTH_HEADER = 'Authorization';

const setLocalStorageAuthData = (data) => {
  if (data.token) {
    localStorage.setItem('access_token', data.token || null);
  }

  if (data.user && data.user.id) {
    localStorage.setItem('user_id', data.user ? data.user.id : null);
  }
  localStorage.setItem('user', JSON.stringify(data.user));
};

const setAuthHeader = (unset = false) => {
  if (unset) {
    delete Axios.defaults.headers[AUTH_HEADER];
    return;
  }

  Axios.defaults.headers.authorization = 'Bearer ' + localStorage.getItem('access_token');
};


export default {
  async login(data) {
    try {
      const response = await Axios.post(ENDPOINTS.LOGIN, data);

      setLocalStorageAuthData(response.data);
      setAuthHeader();
      store.commit('auth', response.data.user);
      store.commit('setAuthToken', response.data.token);

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async edit(data) {
    try {
      const response = await Axios.put(ENDPOINTS.EDIT, data);

      setLocalStorageAuthData({
        user: response.data
      });
      store.commit('auth', response.data);

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async register(data) {
    try {
      const response = await Axios.post(ENDPOINTS.REGISTER, data);

      setLocalStorageAuthData(response.data);
      setAuthHeader();
      store.commit('auth', response.data.user);
      store.commit('setAuthToken', response.data.access_token);

      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }

  },
  initStoreAuth() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const authToken = JSON.stringify(localStorage.getItem('access_token'));

    if (userData) {
      setAuthHeader();
      store.commit('auth', userData);
      store.commit('setAuthToken', authToken);
    }

    return setAuthHeader(true);
  },
  async logout() {
    setLocalStorageAuthData({
      access_token: null,
      user: null
    });
    setAuthHeader(true);
    store.commit('deauth');
  },
  async changePassword(data) {
    return Axios.put(ENDPOINTS.CHANGE_PW, data);
  },
  async me() {
    return Axios.get(ENDPOINTS.ME);
  }
}
