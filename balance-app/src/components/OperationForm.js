import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newOperation } from '../reducers/operationReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
  container: {
    border: '1px solid #e1e1e1',
  },
  type: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: '15px'
  }
})


const OperationForm = ({toggleVisibility}) => {
  const [newConcept, setNewConcept] = useState('')
  const [newType, setNewType] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const dispatch = useDispatch()
  const styles = useStyles()


  const addOperation = (e) => {
    e.preventDefault()
    toggleVisibility.current.toggleVisibility()
    try {
      dispatch(newOperation({
        concept: newConcept,
        type: newType,
        amount: newAmount,
        category: newCategory.toLowerCase()
      }))
      dispatch(setNotification(`A new Operation: ${newConcept} added`, 'success'))
      setTimeout(() => {
        dispatch(setNotification())
      }, 3000)
      } catch (error) {
      dispatch(setNotification('error', 'error'))
      setTimeout(() => {
          dispatch(setNotification())
      }, 3000)
      }
      setNewConcept('')
      setNewAmount('')
      setNewCategory('')
  }


  return (
    <div className={styles.container}>
      <form onSubmit={addOperation}>
        <div>
          <TextField
            label='Concept' 
            value={newConcept}
            onChange={({ target }) => setNewConcept(target.value)}  
          />
        </div>
        <div>
          <TextField
            label='Amount'
            type='number' 
            value={newAmount}
            onChange={({ target }) => setNewAmount(target.value)}
          />
        </div>
        <div>        
          <FormControl component='fieldset' >
            <RadioGroup className={styles.type} aria-label='Type' name='type' value={newType} onChange={({ target }) => setNewType(target.value)}>
              <FormControlLabel 
                value='egress' 
                control={<Radio />} 
                label='Egress'
                labelPlacement="bottom"
              />
              <FormControlLabel 
                value='entry' 
                control={<Radio color='primary'/>} 
                label='Entry'
                labelPlacement="bottom" 
              />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
          <TextField
            label='Category' 
            value={newCategory}
            onChange={({ target }) => setNewCategory(target.value)}  
          />
        </div>
        <Button className={styles.button} color='primary' variant='contained' type='submit'>Create</Button>
      </form>
    </div>
    )
}

export default OperationForm