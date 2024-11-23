import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    NProgress.start();
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
    NProgress.done();
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    if (response.data && response.data.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  },
);

export default instance;
