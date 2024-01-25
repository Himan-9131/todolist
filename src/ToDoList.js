import React, { useState } from 'react'

export const ToDoList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('low');

    const taskChange = (event) => {
        // Passing the input values
        setNewTask(event.target.value);
    };

    const priorityChange = (event) => {
        // Passing the input values
        setPriority(event.target.value);
    };

    const addTask = () => {
        // Prevent the empty task submission
        if(newTask === '') {
            alert('Task field should not be empty.');
            return;
        }
    
        const newItem = {
            task: newTask,
            priority: priority,
        };

        setTasks((prevTasks) => [...prevTasks, newItem]);
        setNewTask('');
        setPriority('low');
    };

    const deleteTask = (priority, index) => {
        
        const priorityTask = tasks.filter((task) => task.priority === priority);
        const originalIndex = tasks.indexOf(priorityTask[index]);

        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== originalIndex));
    };

    return (
        <div className='container my-5'>
            <div className='mx-auto p-5'>
                <h1>Priority To-Do List</h1>
                <div className='input-group mb-4'>
                    <input type="text" class="form-control" placeholder="Add a new task" value={newTask} onChange={taskChange}/>
                    <select className="form-select" value={priority} onChange={priorityChange}>
                        <option value="low">Low Priority</option>
                        <option value="mid">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <button className="btn btn-primary" type="button" onClick={addTask}>Add</button>
                </div>
                <div className='d-flex gap-3'>
                 {['low', 'mid', 'high'].map((priorityLevel) => (
                    <div key={priorityLevel}>
                        <h5>{priorityLevel === 'low' ? 'Low' : priorityLevel === 'mid' ? 'Medium' : 'High'} Priority</h5>
                        <ul className='list-group'>
                          {
                          tasks.filter((task) => task.priority === priorityLevel)
                          .map((task, index) => (
                            <li key={index} className='list-group-item d-flex'>
                               <p className='d-inline'>{task.task}</p>
                               <button className='btn btn-danger d-inline ms-5' onClick={() => deleteTask(priorityLevel, index)}>Delete</button>
                            </li>
                          ))}
                        </ul>
                    </div>
                 ))}
                </div>
            </div>
        </div>
    )
}
