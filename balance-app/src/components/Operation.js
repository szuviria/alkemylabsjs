import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { editOperation } from '../reducers/operationReducer'
import { delOperation } from '../reducers/operationReducer'
import { setNotification } from '../reducers/notificationReducer'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  amount: {
    fontSize: 18,
  },
  entry: {
    color: 'green',
  },
  egress: {
    color: 'red'
  },
  button: {
    margin: '15px'
  }
})

const Operation = ({ operation, full }) => {
  const [detail, setDetail] = useState(false)
  const [editedConcept, setEditedConcept] = useState(operation.concept)
  const [editedAmount, setEditedAmount] = useState(operation.amount)
  const [editedCategory, setEditedCategory] = useState(operation.category)
  const date = new Date(operation.date)
  const dispatch = useDispatch()

  const styles = useStyles()

  const seeEdit = () => {
    setDetail(!detail)
    setEditedConcept(operation.concept)
    setEditedAmount(operation.amount)
    setEditedCategory(operation.category)
  }
   

  const handleEditOperation = async (e) =>{
    e.preventDefault()
    
    const editedOperation = {
      ...operation,
      concept: editedConcept,
      amount: editedAmount,
      category: editedCategory
    }
    try{
      dispatch(editOperation(editedOperation))
      dispatch(setNotification(`The operation ${editedConcept} has been edited`, 'success'))
      seeEdit()
      setTimeout(() => {
        dispatch(setNotification())
      }, 3000)
    } catch (error) {
      dispatch(setNotification('The operation could not be edited', 'error'))
      setTimeout(() => {
        dispatch(setNotification())
      }, 3000)
    }   
  }


  const handleDeleteOperation = async () => {
    if(window.confirm(`Remove operation ${operation.concept}?`)) {
      try{
        dispatch(delOperation(operation))
        dispatch(setNotification(`The operation ${operation.concept} has been removed`, 'success'))
        setTimeout(() => {
          dispatch(setNotification())
        }, 3000)
      } catch (error) {
        dispatch(setNotification('The operation could not be removed', 'error'))
        setTimeout(() => {
          dispatch(setNotification())
        }, 3000)
      }
    }
  }

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h6" >
          Concept: {operation.concept} 
        </Typography>
        <Typography color='textSecondary' gutterBottom>
          Category: {operation.category}
        </Typography>
        <Typography className={operation.type === 'entry' ? styles.entry : styles.egress} color='textSecondary' gutterBottom>
          Type: {operation.type}
        </Typography>
        <Typography color='textSecondary' gutterBottom>
          Date: {date.toLocaleString()}
        </Typography>
        
        <Typography className={styles.amount}  gutterBottom>
          Amount: ${operation.amount}
        </Typography>
      </CardContent>
      { full && (
      <div>
        <CardActions>   
          <Button color='secondary' onClick={handleDeleteOperation}>Remove</Button>
          <Button onClick={seeEdit}>{detail ? 'Cancel' : 'Edit'}</Button>
        </CardActions>
        <div style={{ display: detail ? '' : 'none' }}>
          <form 
            onSubmit={handleEditOperation}
          >
            <div> 
            <TextField
              label='Concept'
              type='text' 
              value={editedConcept}
              onChange={({ target })=> setEditedConcept(target.value)}  
            />
            </div>        
            <div>
            <TextField
              label='Amount'
              type='number' 
              value={editedAmount}
              onChange={({ target }) => setEditedAmount(target.value)}
            />
            </div>
            <div>
            <TextField
              label='Category'
              type='text' 
              value={editedCategory}
              onChange={({ target })=> setEditedCategory(target.value)}  
            />
            </div>  
            <Button className={styles.button} color='primary' variant='contained' type='submit'>Confirm</Button>
          </form>
        </div>
      </div>
      )}
    </Card>  
)}

export default Operation
