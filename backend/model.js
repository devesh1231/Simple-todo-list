const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Title"],
    maxlength: 30,
    unique: true
  },
  completed: {
    type: Boolean,
    deafult: false,
  },
}
);
module.exports = mongoose.model("todoList", todoListSchema);
