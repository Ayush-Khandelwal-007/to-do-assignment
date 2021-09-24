import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://gorest.co.in',
    timeout: 25000,
});

export default axiosInstance;
