import axios from './axios.customize';

const USER_URL = '/user';

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

const updateUserAPI = (id, fullName, phone) => {
  const data = {
    _id: id,
    fullName: fullName,
    phone: phone,
  };

  return axios.put(USER_URL, data);
};

const deleteUserAPI = (id) => {
  return axios.delete(`${USER_URL}/${id}`);
};

export { getAllUsersAPI, createUserAPI, updateUserAPI, deleteUserAPI };
