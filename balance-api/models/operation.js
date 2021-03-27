const mongoose = require('mongoose')


const operationSchema = new mongoose.Schema({
  concept: {
      type: String,
      required: true
  },
  amount: {
      type: Number,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  date: {
      type: Date,
      required: true
  },
  type: {
      type: String,
      required: true
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
  },
})

operationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Operation', operationSchema)
