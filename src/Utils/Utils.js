import axios from 'axios'
// LOCAL
export const BASE_URL = "http://localhost:8080";
export const BASE_API = "http://localhost:8080/api/v1";
export const BASE_LOCAL = "http://localhost:3000";

// SERVER
// export const BASE_URL = "http://kmapi.gestionah.com";
// export const BASE_API = "http://kmapi.gestionah.com/api/v1";
// export const BASE_LOCAL = "http://kmadmin.gestionah.com";

export const AxiosConfig = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
}