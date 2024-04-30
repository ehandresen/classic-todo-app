import { useState } from 'react';
import './App.css';
import todoService from './services/todoService';
import { useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({});
  const [id, setId] = useState(0);

  console.log('todo count:', todos.length);

  // Get all todos from database (json-server)
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

  // ID
  function handleId(event) {
    const idInput = parseInt(event.target.value);
    setId(idInput);
  }

  // DELETE
  function handleDelete() {
    todoService.deleteTodo(id).then(() => {
      console.log('Successfully deleted todo with id:', id);

      const updatedTodos = todos.filter((todo) => todo.id !== id);

      setTodos(updatedTodos);
    });
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
      <br />

      {/* POST/CREATE */}
      <h2>CREATE todo</h2>
      <label htmlFor="addTodo">Add task:</label>
      <input onChange={handleNewTodo} type="text" id="addTodo" />
      <button onClick={handleAdd}>Add</button>
      <p>{newTodo.text}</p>
      <br />

      {/* UPDATE  */}
      <h2>DELETE todo</h2>
      <label htmlFor="delete">Id:</label>
      <input onChange={handleId} type="text" id="delete" />
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default App;
