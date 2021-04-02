import axios from 'axios'
const baseUrl = '/api/operations'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
  
}

const update = async modifiedObject => {
  const response = await axios.put(`${baseUrl}/${modifiedObject.id}`, modifiedObject)
  return response.data
}

const deleteOperation = async operationId => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${operationId}`, config)
}

const operationServices = { 
    getAll, 
    create,
    update,
    deleteOperation, 
    setToken 
  }

export default operationServices