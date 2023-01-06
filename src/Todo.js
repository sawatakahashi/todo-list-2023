import React from 'react';

const Todo = ({ todoind, toggleTodo }) => {

  const handleTodoClick = ()=> {
    toggleTodo(todoind.id);
  };

  return (
    <div>
        <label>
            <input type="checkbox" checked={todoind.completed} readOnly onChange={handleTodoClick} />
        </label>
        {todoind.name}
    </div>
  );
};

export default Todo;
