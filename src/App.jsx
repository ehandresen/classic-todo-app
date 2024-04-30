import { useState } from 'react';
import './App.css';
import todoService from './services/todoService';
import { useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({});

  console.log('todo count:', todos.length);

  useEffect(() => {
    console.log('useEffect');
    todoService
      .getAll()
      .then((response) => {
        console.log('promise resolved');
        return response.json();
      })
      .then((json) => setTodos(json));
  }, []);

  // new todo input
  function handleNewTodo(event) {
    const newObject = {
      text: event.target.value,
      completed: Math.random() < 0.5, // 50/50 true of false
    };

    console.log(newObject);
    setNewTodo(newObject);
  }

  // add button
  function handleAdd() {
    todoService.create(newTodo);

    setTodos([...todos, newTodo]);
  }

  return (
    <>
      {/* GET */}
      <h2>GET all todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      {/* POST/CREATE */}
      <h2>CREATE todo</h2>
      <label htmlFor="addTodo">Add task:</label>
      <input onChange={handleNewTodo} type="text" id="addTodo" />
      <button onClick={handleAdd}>Add</button>
      <p>{newTodo.text}</p>
    </>
  );
};

export default App;
