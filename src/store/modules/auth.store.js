import {
  isEmpty
} from 'lodash';
import authService from 'Api/auth.service';
import store from 'Store';
import {
  LEVEL_BOUNDARIES
} from '@/constants';

const state = {
  activeUser: null,
  authToken: null
};

const getters = {
  activeUser: (state) => state.activeUser,
  isLogged: (state) => !_.isEmpty(state.activeUser),
  authToken: (state) => state.authToken,
  userLevel: (state) => {
    const currentExperience = state.activeUser.experience;
    switch (true) {
      case (currentExperience < LEVEL_BOUNDARIES[0]):
        return 1;
      case (currentExperience < LEVEL_BOUNDARIES[1]):
        return 2;
      case (currentExperience < LEVEL_BOUNDARIES[2]):
        return 3;
      default:
        return 4;
    }
  },
  userLevelBoundary: (state, getters) => {
    const userLevel = getters.userLevel;
    switch (userLevel) {
      case 1:
        return LEVEL_BOUNDARIES[0];
      case 2:
        return LEVEL_BOUNDARIES[1];
      case 3:
        return LEVEL_BOUNDARIES[2];
      default:
        return LEVEL_BOUNDARIES[2];
    }
  },
  previousLevelBoundary: (state, getters) => LEVEL_BOUNDARIES[getters.userLevel - 2] || 0
};

const mutations = {
  deauth(state) {
    console.log('deauth!');
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
