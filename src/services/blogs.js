import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = newToken => (token = `bearer ${newToken}`);

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const createBlog = async body => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, body, config);
  return response.data;
};

export default { getAll, createBlog, setToken };
