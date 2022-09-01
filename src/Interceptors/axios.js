import axios from 'axios';
import {BASE_API,BASE_LOCAL,BASE_URL} from '../Utils/Utils';

// axios.defaults.baseURL = BASE_API;

// Request Interceptors
// axios.interceptors.request.use(
//     config => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers['Authorization'] = 'Bearer ' + token
//       }
//       return config
//     }
// );

// Response Interceptors
axios.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
        console.warn(error,"INTERCEPTOR RESPONSE");
    }
);