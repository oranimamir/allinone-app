// 🔁 TAB SWITCHING
function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => (tab.style.display = "none"));
  const target = document.getElementById(tabId);
  if (target) target.style.display = "block";
}

// ⏰ WORLD CLOCKS
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

// 🖊️ SIGNATURE DRAG FEATURE
const signature = document.getElementById("signaturePad");
let offsetX, offsetY, isDragging = false;

signature?.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  signature.style.cursor = "grabbing";
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  if (signature) signature.style.cursor = "grab";
});
document.addEventListener("mousemove", (e) => {
  if (isDragging && signature) {
    signature.style.position = "absolute";
    signature.style.left = (e.pageX - offsetX) + "px";
    signature.style.top = (e.pageY - offsetY) + "px";
  }
});

// 📄 PDF PREVIEW (simplified placeholder)
const pdfInput = document.getElementById("pdfUpload");
const preview = document.getElementById("pdfPreview");

pdfInput?.addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type === "application/pdf") {
    preview.innerHTML = `<p>✅ PDF "${file.name}" uploaded. (Preview coming soon)</p>`;
  } else {
    preview.innerHTML = `<p>❌ Unsupported file type. Please upload a PDF.</p>`;
  }
});
