import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  user,
  handleAddLike,
  handleRemoveBlog
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonRemoveStyle = {
    background: 'lightBlue',
    border: '1px solid lightBlue'
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showRemoveButton = () => {
    return (
      <button
        style={buttonRemoveStyle}
        onClick={() => handleRemoveBlog(blog)}>
        remove
      </button>
    )
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => handleAddLike(blog)}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : 'unknown'}</div>
        {
          blog.user && blog.user.username === user.username
            ? showRemoveButton()
            : <div></div>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog
