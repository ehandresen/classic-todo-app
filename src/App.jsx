import { useState } from 'react';
import './App.css';
import todoService from './services/todoService';
import { useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);

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

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default App;
