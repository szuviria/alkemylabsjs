import { useRef } from 'react'
import Togglable from '../components/Togglable'
import OperationForm from '../components/OperationForm'
import OperationList from '../components/OperationList'


const Operations = () => {
  const operationFormRef = useRef()

  return (
    <div>
      <div>
        <Togglable buttonLabelShow='New Operation' ref={operationFormRef}>
          <OperationForm toggleVisibility={operationFormRef}/>
        </Togglable>  
      </div>
      <div>
        <OperationList />
      </div>
    </div>
    )
}

export default Operations