import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog component', () => {
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
      <Blog
        blog={blog}
        user={{}}
        handleAddLike={mockHandler}
        handleRemoveBlog={() => {}}
      />
    )
  })

  test('renders blog\'s title and author but not its url or number of likes', () => {
    const displayedItems = component.container.querySelector('.displayed-items')

    expect(displayedItems).not.toHaveStyle('display: none')
    expect(displayedItems).toHaveTextContent(blog.title)
    expect(displayedItems).toHaveTextContent(blog.author)
    expect(displayedItems).not.toHaveTextContent(blog.url)
    expect(displayedItems).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('renders url and number of likes when view\'s button is clicked', () => {
    const allItems = component.container.querySelector('.all-items')

    expect(allItems).toHaveStyle('display: none')

    const button =component.container.querySelector('.view-button')
    expect(button).toHaveTextContent('view')

    fireEvent.click(button)
    expect(button).toHaveTextContent('hide')

    expect(allItems).not.toHaveStyle('display: none')
    expect(allItems).toHaveTextContent(blog.title)
    expect(allItems).toHaveTextContent(blog.author)
    expect(allItems).toHaveTextContent(blog.url)
    expect(allItems).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('event handler is called twice when like\'s button is clicked twice', () => {
    const button = component.container.querySelector('.like-button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
