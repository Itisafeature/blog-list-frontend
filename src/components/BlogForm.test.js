import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const handleNewBlog = jest.fn();

  const component = render(<BlogForm handleNewBlog={handleNewBlog} />);

  const title = component.container.querySelector('.title');
  const author = component.container.querySelector('.author');
  const url = component.container.querySelector('.url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' },
  });
  fireEvent.change(author, {
    target: { value: 'Test Author' },
  });
  fireEvent.change(url, {
    target: { value: 'http://www.test.com' },
  });
  fireEvent.submit(form);

  expect(handleNewBlog.mock.calls).toHaveLength(1);
  expect(handleNewBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  );
  expect(handleNewBlog.mock.calls[0][0].author).toBe('Test Author');
  expect(handleNewBlog.mock.calls[0][0].url).toBe('http://www.test.com');
});
