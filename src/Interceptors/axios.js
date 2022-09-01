import axios from 'axios';
import {BASE_API,BASE_LOCAL,BASE_URL} from '../Utils/Utils';

let refresh = false;

// Set base url API
axios.defaults.baseURL = BASE_API;

// Request Interceptors
axios.interceptors.request.use(
    config => {
        // The default token is the access token
        let token = localStorage.getItem("token");
        // When the refresh token endpoint is call , send the refresh token 
        if(config.url == (BASE_URL+"/refreshToken")){
            token = localStorage.getItem("refresh");
        }

      if (token) {
        // Set the Authorization token in the Header
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    }
);

// Response Interceptors
axios.interceptors.response.use(
    response => {
      return response
    },
    function (error) {

        // If the response response is Unauthorize
        if(error.response.status === 401){
            console.warn(error,"INTERCEPTOR RESPONSE");

            // let token = localStorage.getItem('refresh');
            // axios.defaults.headers.common['Authorization'] = 'Bearer '+token;

            // Get another Access Token
            axios.get(BASE_URL+"/refreshToken").then((res)=>{
                console.log(res,'ACCEESS TOKEN');
                if(res.status == 200 && !refresh){
        
                    refresh = true;
        
                    let token = res.data.accessToken;
        
                    localStorage.setItem('token',token);
        
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        
                }
            }).catch((err)=>{
                // If request fail , Get Refresh Token Faillure 
                // if(err.status == 403){
                    document.location.href = BASE_LOCAL+'/login';
                // }
                console.log(err);
                return err;
            });
        }
    }
);