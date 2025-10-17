/// Simulated Database
let tasksDb = [];

/// DOM Elements
const addBtn = document.getElementById('add-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const filterBtn = document.getElementById('filter-btn');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('todo-input');
const taskDate = document.getElementById('todo-date');

/// Event Listeners
addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', deleteAllTasks);
filterBtn.addEventListener('click', filterTasks);

/// Add Task
function addTask() {
  const taskValue = taskInput.value.trim();
  const dateValue = taskDate.value.trim();

  if (!validateInput(taskValue, dateValue)) return;

  const newTask = {
    task: taskValue,
    date: dateValue,
    status: 'Pending'
  };

  tasksDb.push(newTask);
  renderTasks();

  taskInput.value = '';
  taskDate.value = '';
}

/// Render Task List
function renderTasks(filteredTasks = tasksDb) {
  // Clear the table first
  taskList.innerHTML = '';

  // Show message if no task found
  if (!filteredTasks || filteredTasks.length === 0) {
    taskList.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-4 italic text-gray-500">
          No task found
        </td>
      </tr>`;
    return;
  }

  // Otherwise, show all tasks
  filteredTasks.forEach((taskObj, index) => {
    const row = document.createElement('tr');
    row.className = "border-b border-[#334155] hover:bg-[#334155] transition";

    row.innerHTML = `
      <td class="p-3">${taskObj.task}</td>
      <td class="p-3">${taskObj.date}</td>
      <td class="p-3">${taskObj.status}</td>
      <td class="p-3 flex gap-2">
        <button onclick="editTask(${index})" class="text-white px-3 py-1 rounded-lg text-xs font-semibold">Edit</button>
        <button onclick="deleteTask(${index})" class="text-white px-3 py-1 rounded-lg text-xs font-semibold">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

/// Edit Task
function editTask(index) {
  const current = tasksDb[index];
  const newTask = prompt("Edit your task:", current.task);
  const newDate = prompt("Edit the due date (YYYY-MM-DD):", current.date);

  if (newTask === null || newDate === null) return;

  let newStatus = prompt(
    `Edit status:\n1. Pending\n2. Completed\n\nCurrent: ${current.status}`,
    current.status === "Pending" ? "1" : "2"
  );

  if (newStatus === null) return;

  // Convert numeric input to text status
  if (newStatus === "1") newStatus = "Pending";
  else if (newStatus === "2") newStatus = "Completed";
  else {
    alert("Invalid input. Please enter 1 or 2.");
    return;
  }

  if (validateInput(newTask, newDate)) {
    tasksDb[index].task = newTask;
    tasksDb[index].date = newDate;
    tasksDb[index].status = newStatus;
    renderTasks();
  }
}

/// Delete Single Task
function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasksDb.splice(index, 1);
    renderTasks();
  }
}

/// Delete All Tasks
function deleteAllTasks() {
  if (confirm('Delete all tasks?')) {
    tasksDb = [];
    renderTasks();
  }
}

/// Filter Tasks
function filterTasks() {
  const keyword = prompt("Enter task keyword (leave blank to skip):", "").trim().toLowerCase();
  const dateFilter = prompt("Enter date (YYYY-MM-DD) (leave blank to skip):", "").trim();
  const statusFilter = prompt("Filter by status:\n1. All\n2. Pending\n3. Completed", "1");

  let filtered = tasksDb;

  // Filter by keyword
  if (keyword) {
    filtered = filtered.filter(task => task.task.toLowerCase().includes(keyword));
  }

  // Filter by date
  if (dateFilter) {
    filtered = filtered.filter(task => task.date === dateFilter);
  }

  // Filter by status
  if (statusFilter === "2") {
    filtered = filtered.filter(task => task.status === "Pending");
  } else if (statusFilter === "3") {
    filtered = filtered.filter(task => task.status === "Completed");
  }

  renderTasks(filtered);
}

/// Validate Input
function validateInput(task, date) {
  if (task === '' || date === '') {
    alert('Please enter both task and due date.');
    return false;
  }
  return true;
}

/// Sort Feature
const sortBtn = document.getElementById('sort-btn');
let isAscTask = true;
let isAscDate = true;

sortBtn.addEventListener('click', () => {
  if (tasksDb.length === 0) {
    alert("No tasks to sort!");
    return;
  }

  const sortChoice = prompt(
    "Sort by:\n1. Task (A-Z / Z-A)\n2. Due Date (Ascending / Descending)",
    "1"
  );

  if (sortChoice === null) return;

  if (sortChoice === "1") {
    // Sort by Task (alphabetically)
    tasksDb.sort((a, b) => {
      if (a.task.toLowerCase() < b.task.toLowerCase()) return isAscTask ? -1 : 1;
      if (a.task.toLowerCase() > b.task.toLowerCase()) return isAscTask ? 1 : -1;
      return 0;
    });
    isAscTask = !isAscTask; // toggle order
    alert(`Sorted by Task (${isAscTask ? "A-Z" : "Z-A"})`);
  } 
  else if (sortChoice === "2") {
    // Sort by Due Date
    tasksDb.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return isAscDate ? dateA - dateB : dateB - dateA;
    });
    isAscDate = !isAscDate; // toggle order
    alert(`Sorted by Date (${isAscDate ? "Ascending" : "Descending"})`);
  } 
  else {
    alert("Invalid option! Please enter 1 or 2.");
    return;
  }

  renderTasks();
});


/// Render on Page Load
document.addEventListener('DOMContentLoaded', () => {
  renderTasks(); 
});
