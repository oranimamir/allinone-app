// === TAB SWITCHING ===
function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
  const target = document.getElementById(tabId);
  if (target) target.style.display = "block";
}

// === CLOCKS ===
function updateClocks() {
  const cet = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/Paris" });
  const il = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Jerusalem" });
  const us1 = new Date().toLocaleTimeString("en-US", { timeZone: "America/Chicago" });
  const us2 = new Date().toLocaleTimeString("en-US", { timeZone: "America/Detroit" });

  document.getElementById("clockCET").textContent = cet;
  document.getElementById("clockIL").textContent = il;
  document.getElementById("clockUS1").textContent = us1;
  document.getElementById("clockUS2").textContent = us2;
}
setInterval(updateClocks, 1000);
updateClocks();

// === TASKS ===
let taskList = [];

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const isUrgent = document.getElementById("urgentCheck").checked;
  if (!text) return;

  const task = { text, urgent: isUrgent };
  taskList.push(task);
  renderTasks();
  document.getElementById("taskInput").value = "";
  document.getElementById("urgentCheck").checked = false;
}

function renderTasks() {
  const allList = document.getElementById("taskList");
  const urgentList = document.getElementById("urgentOnlyList");
  const dashboardList = document.getElementById("urgentTaskList");

  allList.innerHTML = "";
  urgentList.innerHTML = "";
  dashboardList.innerHTML = "";

  taskList.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.urgent ? "⚠️ " : ""}${task.text}`;
    allList.appendChild(li);

    if (task.urgent) {
      const urgentLi = document.createElement("li");
      urgentLi.textContent = "⚠️ " + task.text;
      urgentList.appendChild(urgentLi);

      const dashLi = document.createElement("li");
      dashLi.textContent = "⚠️ " + task.text;
      dashboardList.appendChild(dashLi);
    }
  });
}

// === SCROLL TO SECTION (SIDEBAR CATEGORIES) ===
function scrollToSection(id) {
  alert(`Category clicked: ${id} — section scroll feature can be added to real tasks.`);
}

// === PDF PREVIEW + SIGNATURE ===
let signature = document.getElementById("signaturePad");
let offsetX = 0, offsetY = 0, isDragging = false;

signature?.addEventListener("mousedown", function (e) {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  signature.style.cursor = "grabbing";
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  if (signature) signature.style.cursor = "grab";
});
document.addEventListener("mousemove", function (e) {
  if (isDragging && signature) {
    signature.style.left = (e.pageX - offsetX) + "px";
    signature.style.top = (e.pageY - offsetY) + "px";
  }
});

document.getElementById("pdfUpload")?.addEventListener("change", async function () {
  const file = this.files[0];
  if (!file || file.type !== "application/pdf") return;

  const reader = new FileReader();
  reader.onload = function () {
    const typedarray = new Uint8Array(this.result);
    pdfjsLib.getDocument({ data: typedarray }).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const canvas = document.getElementById("pdfCanvas");
        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: context, viewport });
      });
    });
  };
  reader.readAsArrayBuffer(file);
});

// === DASHBOARD DATA REFRESH ===
function refreshWeather() {
  document.getElementById("weather").textContent = "🌦 Brasschaat 17°C, Cloudy (mock)";
}
function refreshNews() {
  document.getElementById("news").textContent = "📰 Belgium: Coalition talks continue. (mock)";
}
function refreshCurrency() {
  document.getElementById("currencyRates").innerHTML = `
    <li>EUR/USD: 1.0952</li>
    <li>EUR/NIS: 4.1227</li>
    <li>USD/NIS: 3.7625</li>
  `;
}
