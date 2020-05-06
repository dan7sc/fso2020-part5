import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
  if (type && message)
    return <div className={type}>{message}</div>
  else
    return null
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification
