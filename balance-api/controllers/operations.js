const jwt = require('jsonwebtoken')
const operationsRouter = require('express').Router()
const Operation = require('../models/operation')
const User = require('../models/user')

operationsRouter.get('/', async (request, response) => {
  const operations = await Operation
    .find({}).populate('user', { username: 1, id: 1 })

  response.json(operations)
})


operationsRouter.post('/', async (request, response, next) => {
  const body = request.body
   
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const operation = new Operation({
    concept: body.concept,
    amount: body.amount,
    category: body.category,
    date: new Date(),
    type: body.type,
    user: user._id
  })

  const savedOperation = await operation.save()
  const savedFormatedOperation = await Operation.findById(savedOperation.id).populate('user')
  user.operations = user.operations.concat(savedOperation._id)
  await user.save()

  response.json(savedFormatedOperation)
})

operationsRouter.delete('/:id', async (request, response, next) => {
  const id = String(request.params.id)
  const operation = await Operation.findById(id)
  console.log(operation)
    
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  response.status(204).end()
    
  if(!operation) {
    return response.status(400).json({ error: 'blog not exist in the server' })
  } else if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
    
  if(operation.user.toString() === decodedToken.id) {
    await Operation.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: 'token invalid' })
    }
})

operationsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const operation = {
    concept: body.concept,
    amount: body.amount,
    type: body.type,
    category: body.category
  } 

  const updatedOperation = await Operation.findByIdAndUpdate(request.params.id, operation, { new: true })
  const savedFormatedOperation = await Operation.findById(updatedOperation.id).populate('user')

    
  response.json(savedFormatedOperation)        
})

module.exports = operationsRouter