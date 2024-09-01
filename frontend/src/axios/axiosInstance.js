import axios from 'axios';


export const baseUrl = 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL: `${baseUrl}`,
    timeout: 50000,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});
axiosInstance.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token');
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => Promise.reject(error),
);

export default axiosInstance;
