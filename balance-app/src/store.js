import { createStore, combineReducers, applyMiddleware } from 'redux'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import operationReducer from './reducers/operationReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    operations: operationReducer,
    login: loginReducer,
    user: userReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store