import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from "uuid";

function App() {
  const saveTodo = JSON.parse(window.localStorage.getItem('todoList') || "[]");
  const [todoTasks, setTodoTasks] = useState(saveTodo);

  const todoNameRef = useRef();

  const handleAdd = ()=> {
    //タスクを追加する
    const addTask = todoNameRef.current.value;
    //空のタスクを消す（バグ修正）
    if (addTask === "") return;

    setTodoTasks((previosTodos) => {
      return [...previosTodos, { id: uuidv4(), name: addTask, completed: false }];
      //↑オブジェクトをpreviosTodosに追加する
      todoNameRef.current.value = null;
    });
  };


  useEffect(()=>{
    window.localStorage.setItem('todoList', JSON.stringify(todoTasks));
  },[todoTasks]);




  const toggle = (id)=> {
    const newTodos = [...todoTasks];
    const todoind = newTodos.find((todoind)=> todoind.id === id);
    todoind.completed = !todoind.completed;
    setTodoTasks(newTodos);
  };

  const handleClear = () => {
    const newClearTodos = todoTasks.filter((todoind) => !todoind.completed);
    setTodoTasks(newClearTodos);
  };

  const handleAllClear = ()=> {
    const allClear = localStorage.clear();
    setTodoTasks(allClear);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todoTasks} toggleTodo={toggle} />
      <div className='containerlist'>
        <input type="text" ref={todoNameRef} className="task" />
        <div className='button'>
          <button onClick={handleAdd}>追加</button>
          <button onClick={handleClear}>削除</button>
        </div>
      </div>
      <div className='total'>残りのタスク: {todoTasks.filter((todoind) => !todoind.completed).length}</div>
      <div  className='clearBtn'>
        <button onClick={handleAllClear}>All Clear</button>
      </div>
    </div>
  );
}

export default App;
