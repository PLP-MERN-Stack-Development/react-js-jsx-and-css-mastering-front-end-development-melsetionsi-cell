// pages/Tasks.jsx
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('All');
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filtered = tasks.filter(t =>
    filter === 'All' ? true : filter === 'Active' ? !t.done : t.done
  );

  return (
    <div>
      <h1 className="text-2xl mb-4">Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="New task"
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className="space-x-2 mb-4">
        {['All', 'Active', 'Completed'].map(f => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>
      <ul className="space-y-2">
        {filtered.map(task => (
          <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span className={task.done ? 'line-through' : ''}>{task.text}</span>
            <div className="space-x-2">
              <Button onClick={() => toggleTask(task.id)}>Toggle</Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
