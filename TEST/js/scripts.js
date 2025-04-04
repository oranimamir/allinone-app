
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function addTask() {
  const input = document.getElementById('taskInput');
  const isUrgent = document.getElementById('urgentCheckbox').checked;
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.textContent = input.value + (isUrgent ? ' 🔥' : '');
  taskList.appendChild(li);
  input.value = '';
  document.getElementById('urgentCheckbox').checked = false;
}

function loadFile(event) {
  const preview = document.getElementById('preview');
  preview.src = URL.createObjectURL(event.target.files[0]);
}

setInterval(() => {
  const container = document.getElementById('clockContainer');
  const now = new Date();
  container.textContent = 'Local Time: ' + now.toLocaleTimeString();
}, 1000);
