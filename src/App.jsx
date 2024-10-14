import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './components/learn/style.css';
import AddTodo from './components/learn/AddTodo';
import TodoList from './components/learn/TodoList';

const App = () => {
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
    <>
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
    </>
  );
};

export default App;
