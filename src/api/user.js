
import axios from "./axios";

// 登录
export const login = (data) => {
    return axios.post('/user/login', data);
}

// 注册
export const register = (data) => {
    return axios.post('/user/register', data);
}

// 修改用户信息
export const edit = (data) => {
    return axios.post('/user/edit', data);
}

// 上传头像
export const upload = (data) => {
    return axios.post('/user/uploadAvatar', data);
}
