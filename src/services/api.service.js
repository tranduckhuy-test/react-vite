import axios from './axios.customize';

const CREATE_USER_URL = '/user';

const createUserAPI = (fullName, email, password, phone) => {
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post(CREATE_USER_URL, data);
};

export { createUserAPI };
