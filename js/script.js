const quotes = [
  "It’s not about being the best. It’s about being better than you were yesterday.",
  "One bug at a time, one step closer to perfection.",
  "Tiny progress is still progress.",
  "You got this, even the stars started small.",
  "Be kind to yourself. You’re learning.",
  "Don’t be afraid to fail, be afraid to never try.",
  "Strong mind, soft heart, steady hands.",
  "Every step forward, no matter how small, matters.",
  "Keep shining softly, your light’s enough.",
  "Hey, don’t rush. You’re growing beautifully."
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('motivation').textContent = `"${randomQuote}"`;

const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskList = document.getElementById('taskList');
const deleteAllBtn = document.getElementById('deleteAllBtn');

addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', () => taskList.innerHTML = '');

function addTask() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert('Please fill in both fields!');
    return;
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td class="status">Pending</td>
    <td>
      <input type="checkbox" class="checkTask">
      <button class="deleteBtn">Delete</button>
    </td>
  `;

  const checkbox = row.querySelector('.checkTask');
  const statusCell = row.querySelector('.status');

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      statusCell.textContent = 'Done';
      row.style.textDecoration = 'line-through';
      row.style.opacity = '0.6';
    } else {
      statusCell.textContent = 'Pending';
      row.style.textDecoration = 'none';
      row.style.opacity = '1';
    }
  });

  row.querySelector('.deleteBtn').addEventListener('click', () => row.remove());
  taskList.appendChild(row);

  taskInput.value = '';
  dateInput.value = '';
}
