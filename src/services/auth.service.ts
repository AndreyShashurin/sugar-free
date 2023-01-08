
import axios from 'axios'
import md5 from 'js-md5'
//import cryptoAES from '@/utils/cryptoAES'

const API_URL = 'http://80.249.150.220/auth/';
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*'
}
class AuthService {
  login(user: any) {
    return axios.post(API_URL + 'login', {
      email: user.email,
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
    return axios.post(API_URL + 'signup/', {
      username: user.username,
      email: user.email,
      password: md5(user.password)
    }, {headers});
  }
}

export default new AuthService();