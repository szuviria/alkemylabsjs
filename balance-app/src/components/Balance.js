import React from 'react'
import { useSelector } from 'react-redux'
import Operation from './Operation'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  balance: {
    border: '2px solid #e1e1e1',
    backgroundColor: '#f5f5f5',
    padding: 5,
    margin: 10
  },
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  },
  noOperations: {
    fontSize: 20,
    margin: 30,
    color: '#c2c2c2' 
  }
})

const Balance = () => {
    const user = useSelector(state => state.user)
    const operations = useSelector(state => state.operations)
    const styles = useStyles()

    const operationsOfUser = operations
          .filter(op => String(op.user.id) === user.id)
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

    const lastOperationsOfUser = operationsOfUser.reduce((acc, op, i) => {
      if ( i < 10 ) {
        return acc.concat(op)
      }
      return acc
    }, [])


    const balance = operationsOfUser.reduce((acc, op) => {
      if (op.type === 'egress') {
        return acc - op.amount
      } else if (op.type === 'entry') {
        return acc + op.amount
      }
      return acc
    }, 0)
    
    
    return(
      <div>
        <div className={styles.balance}> 
          <h2>Balance</h2>
          <h2 className={balance < 0 ? styles.red : styles.green}>$ {balance}</h2>
        </div>
        <h2>Last Operations</h2>
          {operationsOfUser.length === 0 
          ? <div className={styles.noOperations}>Enter an operation</div>
          : lastOperationsOfUser.map(operation => 
            <Operation key={operation.id} operation={operation}/>
          )}
      </div>
    )
  }

  export default Balance