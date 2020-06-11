import React from 'react';

const BlogForm = ({
  handleNewBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => (
  <form onSubmit={handleNewBlog}>
    <div>
      title
      <input
        type="text"
        name="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author
      <input
        type="text"
        name="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url
      <input
        type="text"
        name="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">Create Blog</button>
  </form>
);

export default BlogForm;
