import axios from "axios";
const http = axios.create({
    baseURL: "http://localhost:3000/api"   
})

http.interceptors.request.use(function(config) {
    const authObject = JSON.parse(localStorage.getItem('vuex'));
    config.headers.Authorization = authObject ? `Bearer ${authObject.loggedUser.token}` : 'UNVALID TOKEN';
    return config;
});

export default http;