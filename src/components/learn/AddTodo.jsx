import { useState } from 'react';

const AddTodo = (props) => {
  const [todoInput, setTodoInput] = useState('');

  const { handleAdd } = props;

  const addNewTodo = () => {
    handleAdd(todoInput);
    setTodoInput('');
  };

  return (
    <div className="addWrap">
      <input
        type="text"
        className={'addTodoInput'}
        placeholder="Add a new todo"
        value={todoInput}
        onChange={(event) => setTodoInput(event.target.value)}
      />
      <button className={'addBtn'} onClick={() => addNewTodo()}>
        Add
      </button>
    </div>
  );
};

export default AddTodo;
