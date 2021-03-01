import axios from "axios";
const http = axios.create({
    baseURL: "http://localhost:3000/api"   
})

http.interceptors.request.use(function(config) {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : 'UNVALID TOKEN';
    return config;
});

export default http;