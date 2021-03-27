const initialState = {
    username: '',
    password: ''
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {...state, username: action.data}
        case 'SET_PASSWORD':
            return {...state, password:action.data}
        default:
            return state
    }
}

export const setUsername = (value) => {
    return async dispatch =>{
        dispatch({
            type: 'SET_USERNAME',
            data: value
        })
    }
}

export const setPassword = (value) => {
    return async dispatch => {
        dispatch({
            type: 'SET_PASSWORD',
            data: value
        })
    }
}

export default loginReducer