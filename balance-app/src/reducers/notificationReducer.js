const initialState = {
    message: null,
    severity: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTI':
            return action.data
        case 'CLEAN_NOTIFICACION':
            return action.data 
        default:
            return state
    }
}

export const setNotification = (message, severity) => {
    return async dispatch => {
        const notification = message || severity
            ? { message, severity }
            : { message: null, severity: null}
        dispatch({
            type: 'SET_NOTI',
            data: notification
        })
    }
}


export default notificationReducer