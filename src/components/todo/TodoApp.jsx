import reactLogo from '../../assets/react.svg';
import { useState } from 'react';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import './style.css';

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);

  const handleAdd = (name) => {
    const newTodo = {
      id: randomId(),
      name: name,
    };

    setTodoList([...todoList, newTodo]);
  };

  const handleDelete = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const randomId = () => {
    return Math.floor(Math.random() * 100000);
  };

  return (
    <div>
      <h1 className="header">Todo List</h1>

      <AddTodo handleAdd={handleAdd} />
      {todoList.length > 0 ? (
        <TodoList handleDelete={handleDelete} todoList={todoList} />
      ) : (
        <div className="logo-wrap">
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
