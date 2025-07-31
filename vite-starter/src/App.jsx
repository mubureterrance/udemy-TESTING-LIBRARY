import "./App.css";
import { useState, useEffect } from "react";
import ToDoList from "./components/toDoList/ToDoList";
import mockData from "./components/mockData";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then((Response.json()));
      setTodos(result.slice(0, 5));
    }
  }, []);

  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {<ToDoList todos={mockData} />}
    </div>
  );
}

export default App;
