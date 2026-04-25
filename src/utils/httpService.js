import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_BASE_URL;


const API = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 60000
});

API.interceptors.request.use(
  (config) => {
    try {
      const token = Cookies.get('Authorization');
      const lang = Cookies.get('lang');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      // config.headers['locale'] = 1;
    } catch (error) {
      console.error('Error setting headers:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




API.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response.data;
  },
  async (error) => {
    const { response } = error;

    if (error?.response?.status === 403 || error?.response?.status === 401) {
      const Authorization = Cookies.get('Authorization');
      // toast.error('Login expired, redirecting...');
      // if (Authorization) {
      //   Cookies.remove('Authorization');
      //   Cookies.remove('Authorization', { domain: '.merisehat.pk' });
      // }
      setTimeout(() => {
        // window.location.href = "/";
      }, 5000);
    }

    if (response?.message === 'Network Error') {
      // toast.error(response?.data?.message);
    }

    const apiResponse = response ? response.data : Promise.reject(error);

    return apiResponse;
  }
);

export default API;
