import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const TodoList = (props) => {
  const { handleDelete, todoList } = props;

  return (
    <>
      <div className="todo-list">
        {todoList.map((todo) => {
          return (
            <div className="todo-item" key={todo.id}>
              <div>{todo.name}</div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;
