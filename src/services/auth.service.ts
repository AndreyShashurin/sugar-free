
import axios from 'axios'
import md5 from 'js-md5'
//import cryptoAES from '@/utils/cryptoAES'

const API_URL = 'http://80.249.150.220/api/v1/';

class AuthService {
  login(user: any) {
    return axios.post(API_URL + 'signin', {
      username: user.username,
      password: user.password
    })
    .then((response: any) => {
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }

      return response.data;
    });
  }
  logout() {
    localStorage.removeItem('accessToken');
  }
  register(user: any) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: md5(user.password)
    });
  }
}

export default new AuthService();