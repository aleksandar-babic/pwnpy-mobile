import * as _ from 'lodash';
import authService from '../../api-services/auth.service';
import store from 'Store';

const state = {
  activeUser: null,
  authToken: null
};

const getters = {
  activeUser: (state) => state.activeUser,
  isLogged: (state) => !_.isEmpty(state.activeUser),
  authToken: (state) => state.authToken
};

const mutations = {
  deauth(state) {
    localStorage.clear();
    state.activeUser = null;
  },
  setActiveUser(state, activeUser) {
    state.activeUser = activeUser;
  },
  auth(state, activeUser) {
    state.activeUser = activeUser;
  },
  setAuthToken(state, authToken) {
    state.authToken = authToken;
  }
};


export {
  state,
  getters,
  mutations
};
