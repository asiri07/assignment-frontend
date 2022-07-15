import axios from 'axios';
import * as Constants from './constants';

var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");

        // debugger;
        if (accessToken) {
            if (config.method !== 'OPTIONS') {
                config.headers['Content-Type'] = 'application/json';
                config.headers['Authorization'] = `${accessToken}`;
                config.headers['Cache-Control'] = `no-cache`;
                return config;
            }
        } else {
            // if (new Date(expireTime) < new Date()) {
            //     axios({
            //         method: 'post',
            //         url: `${Constants.API_URL}/users/token`,
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         data: {
            //             "token": refreshToken
            //         }
            //     }).then((response) => {
            //         accessToken = response.data.accessToken;
            //         localStorage.setItem('accessToken', accessToken);
            //       //  localStorage.setItem('expireTime', response.data.expireTime);
            //         config.headers['Content-Type'] = 'application/json';
            //         config.headers['Authorization'] = `bearer ${accessToken}`;
            //         config.headers['Cache-Control'] = `no-cache`;
            //         return config;
            //     }).catch((error) => {
            //         console.log(error);
            //     });
            // }
        }
    },
    error => {
        Promise.reject(error)
    });

axiosInstance.interceptors.response.use((response) => {
    return response
}, function (error) {
    return Promise.reject(error);
});
export default axiosInstance;