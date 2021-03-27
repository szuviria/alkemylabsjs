import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUsername, setPassword } from '../reducers/loginReducer'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import operationServices from '../services/operations'
import { useHistory, useLocation } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    marginTop: 30
  },
  button: {
    margin: 20
  }
})

const LoginForm = ({ user }) => {
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const styles = useStyles()
    
  useEffect(() =>{
    if(user) {
      history.replace('/')
    }
  }, [history, user])

    const { from } = location.state || { from: { pathname: '/' } }
    
    const handleLogin = async (e) => {
      e.preventDefault()
    
      try {
        const user = await loginService.login({
          username: login.username,
          password: login.password
        })
    
        window.localStorage.setItem(
          'loggedBalanceappUser', JSON.stringify(user)
        )
        dispatch(setUser(user))
        operationServices.setToken(user.token)
        history.replace(from)
        dispatch(setNotification(`Welcome ${user.username}`, 'info'))
        setTimeout(() => {
          dispatch(setNotification())
        }, 3000)
        dispatch(setUsername(''))
        dispatch(setPassword(''))
      } catch (error) {
          dispatch(setNotification('Wrong Username or Password', 'error'))
          setTimeout(() => {
            dispatch(setNotification())
          }, 3000)
        }
    }

 return (
    <div className={styles.container}>
      <h2>Login to Balance-App</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='username' 
            type="text"
            value={login.username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          <TextField
            label='password' 
            type="password"
            value={login.password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}  
          />
        </div>
        <div>
          <Button className={styles.button} color='primary' variant="contained" type="submit">login</Button>
        </div>
      </form>
    </div>
  )
 }

 export default LoginForm