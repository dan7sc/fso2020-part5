import React from 'react'

const Notification = ({ type, message }) => {
  if (type && message)
    return <div className={type}>{message}</div>
  else
    return null
}

export default Notification
