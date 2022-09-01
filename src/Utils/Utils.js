import axios from 'axios'

export const BASE_URL = "http://localhost:8080";
export const BASE_API = "http://localhost:8080/api/v1";
export const BASE_LOCAL = "http://localhost:3000";

export const AxiosConfig = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
}