import axios from './axios.customize';

const USER_URL = '/user';
const FILE_UPLOAD_URL = '/file/upload';

const getAllUsersAPI = () => {
  return axios.get(USER_URL);
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

const uploadAvatarAPI = (file, folder) => {
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

export {
  getAllUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  uploadAvatarAPI,
};
