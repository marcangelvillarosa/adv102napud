import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      if (editIndex !== null) {
        // Update existing todo
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, newTodo]);
      }
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const editTodo = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };

  const completeTodo = (index) => {
    const completedTodo = todos[index];
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setCompletedTodos([...completedTodos, completedTodo]);
  };

  return (
    <div id='body'>
      <div id='title'>
        <div id='todo'>
          <h1>TODO</h1>
        </div>
        <div id='creator'>
          <h2>Submitted by: Marc Angel Villarosa</h2>
        </div>
      </div>

      <div id='content'>
        <div id='input'>
          <input
            id='textbox'
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={addTodo}>{editIndex !== null ? 'UPDATE' : 'ADD'}</button>
        </div>


        <div id='list'>
          
          <div id='listcontent'>
            
            <Tab.Group>

              <Tab.List id='divni'>
                  <Tab id='todolist'>To-Do List</Tab>
                  <Tab id='completed'>Completed</Tab>
                </Tab.List>
                
              <Tab.Panels>
                <Tab.Panel>
                  <ul>
                    {todos.map((todo, index) => (
                      <li key={index}>
                        <div id='details'>{todo}</div>
                        <div id='buttons'>
                          <button id='edit' onClick={() => editTodo(index)}>Edit</button>
                          <button id='delete' onClick={() => deleteTodo(index)}>Delete</button>
                          <button id='complete' onClick={() => completeTodo(index)}>Complete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
                <Tab.Panel>
                  <ul>
                    {completedTodos.map((completedTodo, index) => (
                      <li key={index}>
                        <div id='details'>{completedTodo}</div>
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
