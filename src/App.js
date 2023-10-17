import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // Add filter state

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Filter tasks based on the filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'active') {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="app">
      <header className="header">
        <h1>To Do List By Daniel</h1>
      </header>

      <main className="main">
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>

        {/* Style the filter buttons */}
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <span>{task.text}</span>
              <div className="task-actions">
                <button onClick={() => handleCompleteTask(index)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleRemoveTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
