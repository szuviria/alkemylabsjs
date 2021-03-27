import React, {useState} from 'react'
import signupService from '../services/user'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { setNotification} from '../reducers/notificationReducer'

const useStyles = makeStyles({
  container: {
    marginTop: 30
  },
  button: {
    margin: 20
  }
})

const SignForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const dispatch = useDispatch()

  const styles = useStyles()


  const handleSignUp = async (e) => {
    e.preventDefault()
    if(password1 !== '' && password2 !== '') {
      if (password1 === password2) {
        try {
          await signupService.signup({
            username: username,
            email: email,
            password: password1
          })
          setUsername('')
          setEmail('')
          setPassword1('')
          setPassword2('')
          dispatch(setNotification(`The user ${username} has been created`, 'info'))
          setTimeout(() => {
            dispatch(setNotification())
          }, 3000)
        } catch (exception) {
          dispatch(setNotification('The username or email already exist', 'error'))
          setTimeout(() => {
            dispatch(setNotification())
          }, 3000)
        }
      } else {
        dispatch(setNotification(`Confirm password`, 'warning'))
        setTimeout(() => {
          dispatch(setNotification())
        }, 3000)
      }
    } else {
      dispatch(setNotification(`Enter password`, 'warning'))
      setTimeout(() => {
        dispatch(setNotification())
      }, 3000)
    }

    setPassword1('')
    setPassword2('')
  }

    return (
      <div className={styles.container}>
        <h2>Create Account</h2>
        <form 
            onSubmit={handleSignUp}
        >
          <div>
          <TextField
            label='Username' 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          </div>
          <div>
            <TextField
              label='Email' 
              type="email"
              value={email}
              name="Email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div>
            <TextField
              label='password' 
              type="password"
              value={password1}
              name="Password"
              onChange={({ target }) => setPassword1(target.value)}
            />
          </div>
          <div>
            <TextField
              label='Confirm password' 
              type="password"
              value={password2}
              name="Password"
              onChange={({ target }) => setPassword2(target.value)}
            />
          </div>
          <Button className={styles.button} color='primary' variant='contained' type="submit">Sign Up</Button>
        </form>
      </div>
    )
}

export default SignForm