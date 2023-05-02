import axios from 'axios';
import { ToastAndroid } from 'react-native';

axios.defaults.baseURL = 'http://8.142.171.141:8080/school-news';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // config.headers['Authorization'] = ''
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        console.log('axios-response.data.code:', response.data.code)
        if (response.data.code == 500) {
            ToastAndroid.showWithGravity(response.data.msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
        return response.data;
    },
    (error) => {
        if (error.response.status == '404') {
            ToastAndroid.showWithGravity('请求地址不存在', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
        return Promise.reject(error);
    }
);

export default axios;