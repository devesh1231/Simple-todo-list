const express = require("express");
const { allTodos, addTodo, updateTodo, deleteTodo } = require("./controller");
const router = express.Router();
router.route("/allTodos").get(allTodos);
router.route("/addTodo").post(addTodo);
router.route("/deleteTodo/:title").delete(deleteTodo);
router.route("/updateTodo").put(updateTodo);
module.exports = router;
