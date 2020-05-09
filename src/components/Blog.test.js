import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog component', () => {
  test('renders blog\'s title and author but not its url or number of likes', () => {
    const blog = {
      title: 'Testing react with jest',
      author: 'Dan Jest',
      url: 'http://www.bloglistapp.com',
      likes: 3
    }

    const component = render(
      <Blog
        blog={blog}
        user={{}}
        handleAddLike={() => {}}
        handleRemoveBlog={() => {}}
      />
    )

    const displayedItems = component.container.querySelector('.displayed-items')

    expect(displayedItems).toHaveStyle('display: block')
    expect(displayedItems).toHaveTextContent(blog.title)
    expect(displayedItems).toHaveTextContent(blog.author)
    expect(displayedItems).not.toHaveTextContent(blog.url)
    expect(displayedItems).not.toHaveTextContent(`likes ${blog.likes}`)
  })
})
