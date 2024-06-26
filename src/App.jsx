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
    const idInput = event.target.value;
    setId(idInput);
  }

  // UPDATE
  function handleUpdate() {
    const updatedTodo = {
      id: id,
      text: newTodo.text,
      completed: newTodo.completed,
    };

    todoService.update(updatedTodo, id).then(() =>
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return {
              ...todo,
              text: updatedTodo.text,
            };
          } else {
            return todo;
          }
        });
      })
    );
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
          <li key={todo.id}>
            ID: {todo.id}
            <br />
            Text: {todo.text}
            <br />
            Completed: {todo.completed ? 'True' : 'False'}
          </li>
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

      {/* UPDATE */}
      <h2>UPDATE todo</h2>
      <label htmlFor="id">ID:</label>
      <input onChange={handleId} type="text" id="id" />
      <br />

      <label htmlFor="text">Text:</label>
      <input onChange={handleNewTodo} type="text" id="text" />

      <button onClick={handleUpdate}>Update</button>

      {/* UPDATE  */}
      <h2>DELETE todo</h2>
      <label htmlFor="delete">Id:</label>
      <input onChange={handleId} type="text" id="delete" />
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default App;
