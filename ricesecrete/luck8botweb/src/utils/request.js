import axios from 'axios';
//测试地址https://luck8.messrocts.com
const service = axios.create({
    // baseURL: '/lottery',
    baseURL: 'https://luck8.messrocts.com/lottery',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

service.interceptors.request.use(
   
);

service.interceptors.response.use(
    (response) => {
        if(response.data.code == 0){
            return response.data;
        }else{
            return Promise.reject('API Error');
        }
    },
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);


export default service;