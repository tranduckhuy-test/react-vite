import axios from './axios.customize';

const USER_URL = '/user';
const USER_REGISTER_URL = 'user/register';
const FILE_UPLOAD_URL = '/file/upload';
const LOGIN_URL = '/auth/login';
const LOGOUT_URL = '/auth/logout';
const ACCOUNT_URL = '/auth/account';

const getAllUsersAPI = (current, pageSize) => {
  let url = `${USER_URL}?current=${current}&pageSize=${pageSize}`;
  return axios.get(url);
};

const createUserAPI = (fullName, email, password, phone) => {
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post(USER_URL, data);
};

const updateUserAPI = (id, fullName, phone, avatar) => {
  const data = {
    _id: id,
    fullName: fullName,
    phone: phone,
    avatar: avatar,
  };

  return axios.put(USER_URL, data);
};

const deleteUserAPI = (id) => {
  return axios.delete(`${USER_URL}/${id}`);
};

const uploadImageAPI = (file, folder) => {
  const config = {
    headers: {
      'upload-type': folder,
      'Content-Type': 'multipart/form-data',
    },
  };

  const formData = new FormData();
  formData.append('fileImg', file);

  return axios.post(FILE_UPLOAD_URL, formData, config);
};

const registerUserAPI = (fullName, email, password, phone) => {
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post(USER_REGISTER_URL, data);
};

const loginAPI = (email, password) => {
  const data = {
    username: email,
    password: password,
    delay: 1000,
  };

  return axios.post(LOGIN_URL, data);
};

const logoutAPI = () => {
  return axios.post(LOGOUT_URL);
};

const getAccountAPI = () => {
  return axios.get(ACCOUNT_URL);
};

export {
  getAllUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  uploadImageAPI,
  registerUserAPI,
  loginAPI,
  logoutAPI,
  getAccountAPI,
};
