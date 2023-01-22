import AuthService from '../services/auth.service'
import { UserCreateResult } from "../models/interfaces";

export const auth = {
  namespaced: true,
  state: {
    accessToken: false,
    user: {
      name: 'Андрей',
      roleId: 1,
    },
    loggedIn: false
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
          commit('registerSuccess', response);
          return Promise.resolve(response);
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
      state.loggedIn = true;
      state.user = user;
    },
    loginFailure(state: any) {
      state.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state: any, result: any) {
      state.loggedIn = true;
      localStorage.setItem('accessToken', result.id)
    },
    registerFailure(state: any) {
      state.loggedIn = false;
    },
    updateToken(state: any, payload: string) {
      state.accessToken = payload;
    }
  }
};