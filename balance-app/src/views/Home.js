import { useRef } from 'react'
import Togglable from '../components/Togglable'
import OperationForm from '../components/OperationForm'
import Balance from '../components/Balance'


const Home = () => {
  const operationFormRef = useRef()

  return (
    <div>
      <div>
        <Togglable buttonLabelShow='New Operation' ref={operationFormRef}>
          <OperationForm toggleVisibility={operationFormRef}/>
        </Togglable>  
      </div>
      <div>
        <Balance />
      </div>
    </div>
    )
}

export default Home