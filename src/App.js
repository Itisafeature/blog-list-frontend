import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [isErr, setIsError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      const user = JSON.parse(window.localStorage.getItem('loggedInUser'));
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      blogService.setToken(loggedInUser.token);
      setUser(loggedInUser);
    } catch (err) {
      console.log('here');
      setIsError(true);
      setNotification('Invalid login credentials');
      setTimeout(() => setNotification(null) && setIsError(null), 5000);
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = async event => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    setUsername('');
    setPassword('');
  };

  const handleNewBlog = async event => {
    event.preventDefault();
    const body = { title, author, url };
    try {
      const blog = await blogService.createBlog(body);
      setBlogs(blogs.concat(blog));
      setIsError(false);
      setNotification('Created Blog!');
      setTimeout(() => setNotification(null), 5000);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (err) {
      console.log(err);
    }
  };

  if (user === null) {
    return (
      <>
        {notification && <Notification isErr={isErr} text={notification} />}
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <h4>{user.username} is logged in!</h4>
      {user && <button onClick={handleLogout}>Logout</button>}
      {notification && <Notification isErr={isErr} text={notification} />}
      <h4>Create New Blog</h4>
      <BlogForm
        handleNewBlog={handleNewBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
