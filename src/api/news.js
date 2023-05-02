
import axios from "./axios";

// 请求列表

// axios.get请求含有params属性，会自动将接收过来的对象进行拼接作为参数，注意path必须为对象；
// 若不是对象类型时，也可以自己改变形式{ params: { path } }使其转变为对象类型
// axios会解析为?a=param1&b=param2
// export const getList = (param1, param2) => {
//     return axios.get('/news/pageList', { params: { a: param1, b: param2 } });
// }
// export const getList = (param1, param2) => {
//     return axios.get('/news/pageList', { params: { newsType: param1, page: param2 } });
// }

export const getList = (params) =>
    axios.get(`/news/pageList`, { params })
