var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  note: String,
  due_date : Date,
  priority : Number
});

module.exports = mongoose.model('Todo', TodoSchema);