import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
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
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={handlePasswordChange}
            />
          </div>
          <button type='submit'>login</button>
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
