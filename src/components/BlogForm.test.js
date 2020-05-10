import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('BlogForm component', () => {
  let component
  let blog
  let mockHandler

  beforeEach(() => {
    blog = {
      title: 'Testing react with jest',
      author: 'Dan Jest',
      url: 'http://www.bloglistapp.com',
      likes: 3
    }

    mockHandler = jest.fn()

    component = render(
      <BlogForm
        createBlog={mockHandler}
      />
    )
  })

  test('form calls the event handler with the rigth details', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: blog.title }
    })
    fireEvent.change(author, {
      target: { value: blog.author }
    })
    fireEvent.change(url, {
      target: { value: blog.url }
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
  })
})
