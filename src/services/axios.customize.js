import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
