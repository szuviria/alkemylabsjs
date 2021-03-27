import operationServices from '../services/operations'

const operationReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_OPERATION':
            return action.data
        case 'NEW_OPERATION':
            return [...state, action.data]
        case 'DELETE_OPERATION':
            const id = action.data.id
            return state.filter(b => b.id !== id)
        case 'EDIT_OPERATION':
            const operationId = action.data.id
            // const editedOperation = state.find(op => op.id === operationId)
             const editedOperation = action.data    
             return state.map(op => 
                 op.id !== operationId ? op : editedOperation)
        default:
            return state
    }
}

export const initializeOperations = () => {
    return async dispatch => {
        const operations = await operationServices.getAll()
        dispatch({
            type: 'INIT_OPERATION',
            data: operations
        })
    }
}

export const newOperation = (operation) => {
    return async dispatch => {
        const returnedOperation = await operationServices.create(operation)
        dispatch({
            type: 'NEW_OPERATION',
            data: returnedOperation
        })

    }
}

export const delOperation = (operation) => {
    return async dispatch => {
        try{
        await operationServices.deleteOperation(operation.id)
        dispatch({
            type: 'DELETE_OPERATION',
            data: operation
        })
        } catch (exception) {
            window.alert('No authorized to delete this operation')
        }
    }
}

export const editOperation = (operation) => {
    return async dispatch => {
        const returnedOperation = await operationServices.update(operation)
        dispatch({
            type: 'EDIT_OPERATION',
            data: returnedOperation
        })
    }
}

export default operationReducer