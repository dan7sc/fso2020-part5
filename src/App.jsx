import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState([]) // [type: ['error', 'success'], message]
  const [notificationVisible, setNotificationVisible] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = { username, password }
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
    } catch(e) {
      setNotification(['error', 'wrong username or password'])
      setNotificationVisible(true)
    }

    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setVisible(false)
  }

  const addBlog = async (newObject) => {
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )

    await blogService.setToken(token)

    try {
      const blog = await blogService.create(newObject)
      setBlogs(blogs.concat(blog))
      setNotification(['success', `a new blog ${blog.title} by ${blog.author} added`])
      setNotificationVisible(true)
    } catch(e)  {
      setNotification(['error', 'fail to add a new blog'])
      setNotificationVisible(true)
    }
  }

  const showNotification = () => {
    setTimeout(() => {
      setNotificationVisible(false)
      setNotification([])
    }, 3000)

    return <Notification type={notification[0]} message={notification[1]} />
  }

  const blogForm = () => {
    return (
      <div>
        <BlogForm createBlog={addBlog} />
        <button type='cancel' onClick={toggleVisibility}>cancel</button>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        {
          notificationVisible ? showNotification() : ''
        }
        <LoginForm
          username={username}
          password={password}
          handleUsernameInput={handleUsernameInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const toggleButton = () => {
    return <button onClick={toggleVisibility}>new blog</button>
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {
          notificationVisible ? showNotification() : ''
        }
        <span>{user.name} logged in </span>
        <button onClick={handleLogout}>logout</button>
        <br /><br />
        {
          visible
            ? blogForm()
            : toggleButton()
        }
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
