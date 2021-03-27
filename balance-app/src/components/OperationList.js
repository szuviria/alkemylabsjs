import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Operation from './Operation'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import Togglable from './Togglable'
import Select from 'react-select'

const useStyles = makeStyles({
  operations: {
    display: 'flex',
    justifyContent: 'center'
  },
  operationsMin: {
    display: 'block'
  },
  select: {
    maxWidth: 250
  },
  noOperations: {
    fontSize: 20,
    margin: 30,
    color: '#c2c2c2' 
  }
})

const OperationList = () => {
  const matches = useMediaQuery('(min-width:600px)')
  const user = useSelector(state => state.user)
  const operations = useSelector(state => state.operations)
  const styles = useStyles()
  const [selectedOption, setSelectOption] = useState({ value: 'all', label: 'all' })

    
  const operationsOfUser = operations
        .filter(op => String(op.user.id) === user.id)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    
  const filteredOperations = operationsOfUser
        .filter(op => {
          if(selectedOption.value !== 'all') {
            return op.category === selectedOption.value
          }
            return op
        })    
      

  const allCategories = operationsOfUser
        .map(op => op.category)
        .reduce((categories, category) => {
          const inArray = categories.find(c => c === category)
            if(!inArray){
              return categories.concat(category)
            }
              return categories
        }, [])
        .map(category => ({ value: category, label: category })).concat({ value: 'all', label: 'all' })

  const entryOperations = filteredOperations.filter(op => op.type === 'entry')
  const egressOperations = filteredOperations.filter(op => op.type === 'egress')


  return(
    <div>
      <h2>Operations</h2>
      <div>
        <Select
          className={styles.select}
          defaultValue={selectedOption}
          onChange={setSelectOption}
          options={allCategories}
        />
      </div>
      <div className={matches ? styles.operations : styles.operationsMin}>
        {operationsOfUser.length === 0 && <div className={styles.noOperations}>Enter an operation</div> } 
         <div> 
           {entryOperations.length > 0 && <h3>Entries</h3>} 
            { matches 
              ?
                entryOperations.map(operation => 
                  <Operation key={operation.id} operation={operation} full/>
                )
              : 
              entryOperations.length > 0 &&
                <Togglable buttonLabelShow='Show' buttonLabelHide='Hide'>
                    <div>
                      { entryOperations.map(operation => 
                      <Operation key={operation.id} operation={operation} full/>
                      )}
                    </div>
                </Togglable>  
            }  
          </div> 
          <div>  
           {egressOperations.length > 0 && <h3>Egresses</h3>}
            { matches 
              ? 
              egressOperations.map(operation => 
                <Operation key={operation.id} operation={operation} full/>
              )
              : 
              egressOperations.length > 0 &&
                <Togglable buttonLabelShow='Show' buttonLabelHide='Hide'>
                    <div>
                      { egressOperations.map(operation => 
                      <Operation key={operation.id} operation={operation} full/>
                      )}
                    </div>
                </Togglable>  
            } 
          </div>
        </div>
      </div>
    )
  }

  export default OperationList