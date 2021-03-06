import './style.css';
import Tasks from '../modules/TasksList.js';

const taskList = new Tasks();
taskList.initialize();

const addTask = () => {
  const input = document.getElementById('add');
  input.value = '';
  input.onchange = ((e) => {
    e.preventDefault();
    const description = e.target.value;
    taskList.newTask(description);
    e.target.value = '';
  });
};
addTask();