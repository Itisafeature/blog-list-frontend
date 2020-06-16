import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async (event, blog) => {
    event.preventDefault();
    try {
      const updatedBlog = await blogService.updateLikes(blog);
      const index = blogs.findIndex(blog => blog.id === updatedBlog.id);
      blogs[index] = { ...updatedBlog };
      setBlogs([...blogs]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (event, blog) => {
    event.preventDefault();
    if (window.confirm('Do you want to delete this post?')) {
      try {
        await blogService.deleteBlog(blog);
        const index = blogs.findIndex(curr => curr.id === blog.id);
        blogs.splice(index);
        setBlogs([...blogs]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <h4>
        {blog.title} {blog.author}
      </h4>
      <button
        className="toggleDetails"
        onClick={() => setDetailsVisible(!detailsVisible)}
      >
        {detailsVisible ? 'Remove Details' : 'Show Details'}
      </button>
      {detailsVisible && (
        <>
          <p>{blog.url}</p>
          likes<p className="likes">{blog.likes}</p>
          <button
            className="likesButton"
            onClick={event => handleLike(event, blog)}
          >
            Like
          </button>
        </>
      )}
      {blog.user && (
        <button onClick={event => handleDelete(event, blog)}>
          Delete Post
        </button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
};

export default Blog;
