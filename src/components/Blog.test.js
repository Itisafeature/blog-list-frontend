import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
    };

    component = render(<Blog blog={blog} />);
  });

  test('renders the blog title and author on page load', () => {
    expect(component.container).toHaveTextContent('First class tests');
    expect(component.container).toHaveTextContent('Robert C. Martin');
    expect(component.container).not.toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    );
    expect(component.container).not.toHaveTextContent('10');
  });

  test('after clicking details button url and like are shown', () => {
    const button = component.container.querySelector('.toggleDetails');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    );
    expect(component.container).toHaveTextContent(10);
  });

  test('event handler for the like button is called as many times a button is clicked', () => {
    const mockFn = jest.fn();
    // const button = component.container.querySelector('.toggleDetails');
    // fireEvent.click(button);
    const component = render(
      <button className="likesButton" onClick={mockFn}></button>
    );
    const likesButton = component.container.querySelector('.likesButton');
    fireEvent.click(likesButton);
    fireEvent.click(likesButton);
    expect(mockFn.mock.calls).toHaveLength(2);
  });
});
