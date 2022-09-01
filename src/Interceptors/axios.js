import axios from 'axios';
import {BASE_API,BASE_URL} from '../Utils/Utils';

axios.defaults.baseURL = BASE_API;

let refresh = false;

axios.interceptors.response.use(response => response,async error => {
    console.log(error,'Intercept');
    if(error.response.status == 403){
        let token = localStorage.getItem('refresh');
        
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;

        const response = axios.get(BASE_URL+"/refreshToken").then((res)=>{
            console.log(res);
            if(res.status == 200 && !refresh){
    
                refresh = true;
    
                let token = res.data.accessToken;
    
                localStorage.setItem('token',token);
    
                axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
    
                setTimeout(() => {
                    console.log("Return on Timeout");
                    return axios(error.config);                
                }, 2000);
            }
        }).catch((err)=>{
            console.log(err);
            return err;
        });
    }

    setTimeout(() => {
        console.log("Retun Error");
        return error;
    }, 1000);
});