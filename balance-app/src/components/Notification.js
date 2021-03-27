import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ message, severity }) => {

  if(message === null) {
    return null
  }

  return (
    <Alert severity={severity}>
      {message}
    </Alert>
  )
}

export default Notification