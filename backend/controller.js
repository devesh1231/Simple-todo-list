const Todo = require("./model");

exports.allTodos = async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.json(todoList);
  } catch (error) {
    console.log(error.message);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    let todo = await Todo.findOne({ title });
    if (todo) {
      res.json("Task Already Exist");
    }
    todo = await Todo.create({
      title,
    });
    res.json("Todo Added Successfully");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const title= req.params.title;
    await Todo.findOneAndDelete({title});
    res.json("Task Deleted Successfully");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.findOne({ title });
    let done = todo.completed ? false : true;
    const updatedData = {
      completed: done,
    };
    const updated = await Todo.findOneAndUpdate({ title }, updatedData, {
      new: true,
    });
    await updated.save();
    res.json("Task Updated Successfully");
  } catch (error) {
    console.log(error.message);
  }
};
