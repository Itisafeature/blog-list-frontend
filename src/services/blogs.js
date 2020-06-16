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

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

const updateLikes = async blog => {
  const config = {
    headers: { Authorization: token },
  };
  blog.likes++;
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

export default { getAll, createBlog, setToken, updateLikes, deleteBlog };
