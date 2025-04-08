function switchTab(id) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

document.getElementById("fileInput")?.addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("preview").src = e.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});
