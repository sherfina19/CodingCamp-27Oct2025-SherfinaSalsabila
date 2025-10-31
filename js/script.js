const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskList = document.getElementById('taskList');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// ambil data dari localStorage pas halaman dibuka
document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', clearAll);

function addTask() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert('Please fill in both fields!');
    return;
  }

  const newTask = { task, date, done: false };
  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();

  taskInput.value = '';
  dateInput.value = '';
}

function clearAll() {
  localStorage.removeItem('tasks');
  taskList.innerHTML = '';
}

function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';

  tasks.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.task}</td>
      <td>${item.date}</td>
      <td class="status">${item.done ? 'Done' : 'Pending'}</td>
      <td>
        <input type="checkbox" class="checkTask" ${item.done ? 'checked' : ''}>
        <button class="deleteBtn">Delete</button>
      </td>
    `;

    const checkbox = row.querySelector('.checkTask');
    const statusCell = row.querySelector('.status');

    checkbox.addEventListener('change', () => {
      item.done = checkbox.checked;
      statusCell.textContent = item.done ? 'Done' : 'Pending';
      saveTasks(tasks);
      styleRow(row, item.done);
    });

    const deleteBtn = row.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks();
    });

    styleRow(row, item.done);
    taskList.appendChild(row);
  });
}

function styleRow(row, done) {
  row.style.textDecoration = done ? 'line-through' : 'none';
  row.style.opacity = done ? '0.6' : '1';
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  renderTasks();
}
