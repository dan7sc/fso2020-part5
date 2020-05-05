import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title, author, url
    }
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )

    await blogService.setToken(token)
    const blog = await blogService.create(newBlog)

    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleInput = (event, setFunction) => {
    setFunction(event.target.value)
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={(event) => handleInput(event, setUsername)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={(event) => handleInput(event, setPassword)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            title:
            <input
              type='text'
              value={title}
              name='Title'
              onChange={(event) => handleInput(event, setTitle)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              name='Author'
              onChange={(event) => handleInput(event, setAuthor)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              name='Url'
              onChange={(event) => handleInput(event, setUrl)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <span>{user.name} logged in </span>
        <button onClick={handleLogout}>logout</button>
        <br /><br />
        {blogForm()}
        {
          blogs.map(
            blog =>
              <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    )
  }

  return (
    <div>
      {user ? blogList() : loginForm()}
    </div>
  )
}

export default App
