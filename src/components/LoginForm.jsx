import React from 'react'
import PropTypes from 'prop-types'

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
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameInput}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordInput}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameInput: PropTypes.func.isRequired,
  handlePasswordInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
