import AuthService from '../services/auth.service'

export const auth = {
  namespaced: true,
  state: {
    accessToken: false,
    user: []
  },
  actions: {
    login({ commit }: any, user: any) {
      return AuthService.login(user).then(
        (user: any) => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        (error: any) => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }: any) {
      AuthService.logout();
      commit('updateToken', null);
    },
    register({ commit }: any, user: any) {
      return AuthService.register(user).then(
        (response: any) => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        (error: any) => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    checkToken({ commit }: any) {{
      commit('updateToken', localStorage.getItem('accessToken'));
    }},
  },
  mutations: {
    loginSuccess(state: any, user: any) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state: any) {
      state.status.loggedIn = false;
    },
    registerFailure(state: any) {
      state.status.loggedIn = false;
    },
    updateToken(state: any, payload: string) {
      state.accessToken = payload;
    }
  }
};