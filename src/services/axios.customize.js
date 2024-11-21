import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    if (
      typeof window !== 'undefined' &&
      window &&
      window.localStorage &&
      window.localStorage.getItem('access_token')
    ) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
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
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
