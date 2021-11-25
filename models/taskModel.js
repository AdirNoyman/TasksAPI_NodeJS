const mongoose = require('mongoose');

// Schema is the db skeleton
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide a name'],
    trim: true,
    maxLength: [20, "name can't be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// 'Task' is the name we gave to our model
// The model is wrapper to the schema. It is the Class of the document (which is instance of the model)
module.exports = mongoose.model('Task', TaskSchema);
