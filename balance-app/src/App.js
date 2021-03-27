import './App.css';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import operationServices from './services/operations'
import { setUser } from './reducers/userReducer'
import { initializeOperations } from './reducers/operationReducer'
import { setNotification} from './reducers/notificationReducer'
import PrivateRoute from './components/PrivateRoute'
import Notification from './components/Notification'
import Login from './views/Login'
import Signup from './views/Signup'
import Home from './views/Home'
import Operations from './views/Operations'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { Button, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Logo from './images/image-balance.jpg'

const useStyles = makeStyles({
  logo: {
    marginTop: 15,
    width: '30vh'
  },
})

const App = () => {
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const styles = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeOperations())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBalanceappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      operationServices.setToken(user.token)    
    }
  }, [dispatch])
  

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBalanceappUser')
    dispatch(setNotification(`Good Bye ${user.username}`, 'info'))
    dispatch(setUser(null))
    setTimeout(() => {
      dispatch(setNotification())
    }, 3000)
  }

  
  return (
    <div>
      <Router>
        <AppBar position='static'>
          { user === null
          ?
            <Toolbar>
              <Button color='inherit' component={Link} to='/login'>
                Log In
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Sign Up
              </Button>
            </Toolbar>
          : 
            <Toolbar>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
              <Button color='inherit' component={Link} to='/operations'>
                Operations
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Log out
              </Button>
            </Toolbar>
          }
          <Notification message={notification.message} severity={notification.severity}/>
        </AppBar>
       
        <Container align='center'>
          <div>
           <img className={styles.logo} src={Logo} alt='Logo'/>  
          </div> 
          <Switch>
              <Route path='/login'>
                <Login user={user} />
              </Route>
              <Route path='/signup'>
                <Signup />
              </Route>
              <PrivateRoute path='/operations' user={user}>
                <Operations />
              </PrivateRoute>
              <PrivateRoute path='/' user={user}>
                <Home />
              </PrivateRoute>        
          </Switch>
        </Container> 
      </Router>
    </div>  
  )
}

export default App;
