import axios from 'axios';
import {BASE_API,BASE_URL} from '../Utils/Utils';

axios.defaults.baseURL = BASE_API;

// Request Interceptors
axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    // error => {
    //   Promise.reject(error)
    // }
);