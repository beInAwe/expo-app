
import axios from "./axios";

// export const getDraft = () => {
//     return axios.get('/draft/pageList');
// }
export const getDraft = (params) => {
    console.log('draft-params', params);
    return axios.get('/draft/pageList', { params });
}

export const postDraft = (data) => {
    return axios.post('/draft/create', data);
}