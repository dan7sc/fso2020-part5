import React from 'react'

const LoginForm = ({
  username,
  password,
  handleUsernameInput,
  handlePasswordInput,
  handleSubmit
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameInput}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordInput}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
