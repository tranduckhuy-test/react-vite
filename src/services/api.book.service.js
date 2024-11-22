import axios from './axios.customize';

const BOOK_URL = '/book';

const getAllBooksAPI = async (current, pageSize) => {
  let url = `${BOOK_URL}?current=${current}&pageSize=${pageSize}`;
  return axios.get(url);
};

const createBookAPI = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category,
) => {
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };

  return axios.post(BOOK_URL, data);
};

const updateBookAPI = (
  id,
  mainText,
  author,
  price,
  quantity,
  category,
  thumbnail,
) => {
  const data = {
    _id: id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };

  return axios.put(BOOK_URL, data);
};

const deleteBookAPI = (id) => {
  return axios.delete(`${BOOK_URL}/${id}`);
};

export { getAllBooksAPI, createBookAPI, updateBookAPI, deleteBookAPI };
