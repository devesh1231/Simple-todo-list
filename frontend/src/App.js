import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { HiOutlineEmojiSad } from "react-icons/hi";

function App() {
  const [originalData, setOriginalData] = useState();
  const [todoData, setTodoData] = useState();
  const [addTitle, setAddTitle] = useState("");
  const [filtered, setFiltered] = useState("all");
  const category = ["All", "Completed", "Incomplete"];

  const getData = async () => {
    const items = await axios.get(
      `https://todolist-yqqp.onrender.com/api/v1/allTodos`
    );
    if (items.data) {
      setOriginalData(items.data);
      setTodoData(items.data);
    }
  };
  const addTodo = async (title) => {
    if (title.length > 30) {
      alert("Maximum 80 characters are allowed.");
    } else {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://todolist-yqqp.onrender.com/api/v1/addTodo`,
        { title },
        config
      );
      alert(data);
      getData();
    }
  };
  const deleteTodo = async (title) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(
      `https://todolist-yqqp.onrender.com/api/v1/deleteTodo/${title}`,
      config
    );
    alert(data);
    getData();
  };
  const updateTodo = async (title) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `https://todolist-yqqp.onrender.com/api/v1/updateTodo`,
      { title },
      config
    );
    alert(data);
    getData();
  };
  const applyFilter = (e) => {
    setFiltered(e.target.value);
    submitHandle();
  };
  const submitHandle = () => {
    let filteredData = originalData;
    if (filtered == "Completed") {
      filteredData = filteredData.filter((item) => {
        if (item.completed) {
          return item;
        }
      });
      setTodoData(filteredData);
    } else if (filtered == "Incomplete") {
      filteredData = filteredData.filter((item) => {
        if (!item.completed) {
          return item;
        }
      });
      setTodoData(filteredData);
    } else if (filtered == "All") {
      setTodoData(originalData);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    submitHandle();
  }, [filtered, originalData]);

  return (
    <div className="App">
      <h3>To-Do List</h3>
      <div className="addTodo">
        <h4>Add a new task in the list</h4>
        <div className="todoHead">
          <form className="addTodoForm">
            <input
              placeholder="Enter the task here"
              type="text"
              onChange={(e) => setAddTitle(e.target.value)}
            />
            <button type="button" onClick={() => addTodo(addTitle)}>
              Submit
            </button>
          </form>
          <select
            placeholder="Search Category"
            bg="white"
            onChange={applyFilter}
            border="0px"
            outline="0px"
          >
            {category.map((c, id) => (
              <option value={c} key={id}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="todos">
        {todoData != "" ? (
          todoData &&
          todoData.map((item, id) => (
            <div className="todo" key={id}>
              <h3>{id + 1}.</h3>
              <div style={{ display: "flex" }}>
                <div
                  className={
                    item.completed ? "todoCompleted" : "todoIncompleted"
                  }
                >
                  <h4>{item.title}</h4>
                  <hr
                    style={{
                      backgroundColor: "#5C5C5C",
                      border: "none",
                      height: "1px",
                    }}
                  />

                  <div className="todoAction">
                    <button
                      className={item.completed ? "completed" : "incompleted"}
                      onClick={() => updateTodo(item.title)}
                    >
                      {!item.completed
                        ? "Mark as completed"
                        : "Mark as incomplete"}
                    </button>
                    <button
                      className={
                        item.completed ? "deleteCompleted" : "deleteIncompleted"
                      }
                      onClick={() => deleteTodo(item.title)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {item.completed ? (
                  <div
                    style={{
                      backgroundColor: "#7ab530",
                      height: "2vmax",
                      width: "2vmax",
                      borderRadius: "50%",
                      zIndex: "100",
                      marginLeft: "-1vmax",
                      marginTop: "2vmax",
                    }}
                  >
                    <BsCheck
                      size="2vmax"
                      style={{
                        color: "white",
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              padding: "2vmax 0vmax 0vmax 20vmax",
              alignItems: "center",
            }}
          >
            <HiOutlineEmojiSad
              style={{
                color: "gray",
                fontSize: "4vmax",
                marginRight: "1vmax",
              }}
            />
            <h1 style={{ color: "gray" }}>
              Sorry, there is no Task in the list.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
