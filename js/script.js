// Database simulation
let tasks = [];

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');

   if (validateInput(taskInput.value, taskDate.value)) {
       const newTask = {
          task: taskInput.value,
          date: taskDate.value,
       };
       // Simulate adding to database
       tasks.push(newTask);
       renderTasks();   
   }
}
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.task} - ${task.date}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function deleteallTask() {}
function editTask() {}
function validateInput() {}
function filterTasks() {}