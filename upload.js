document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const fileName = document.getElementById("fileName");
  const password = document.getElementById("password");
  const fileInput = document.getElementById("fileInput");
  const loadingText = document.getElementById("loadingText");
  const submitBtn = document.getElementById("submitBtn");
  const folderInput = document.getElementById("folderPath");


  const githubToken = "ghp_1234567890contohtoken";
  const githubUsername = "contohuser";
  const githubRepo = "contoh-repo";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
      alert("Harap pilih file gambar terlebih dahulu.");
      return;
    }

    // Tampilkan "Mengunggah..." & disable tombol
    loadingText.textContent = "Mengunggah...";
    loadingText.classList.remove("hidden");
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1]; // Ambil hanya base64-nya tanpa prefix data:image/...

      const folderPath = folderInput.value.trim();
      const safeFolder = folderPath.endsWith("/") ? folderPath : folderPath + "/";
      const filePath = `${safeFolder}${fileName.value}`;

      // URL ke GitHub
      const apiURL = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;


      const payload = {
        message: `Upload ${file.name}`,
        content: base64,
      };

      fetch(apiURL, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${githubToken}`,
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          if (data.content) {
            loadingText.textContent = "Selesai ✅";
          } else {
            throw new Error(data.message || "Gagal mengunggah.");
          }

          form.reset();
          submitBtn.disabled = false;
          submitBtn.classList.remove("opacity-50", "cursor-not-allowed");

          setTimeout(() => {
            loadingText.classList.add("hidden");
            loadingText.textContent = "Mengunggah...";
          }, 1000);
        })
        .catch(err => {
          loadingText.textContent = "Gagal ❌";
          console.error("Gagal upload:", err);
          submitBtn.disabled = false;
          submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
        });
    };

    reader.readAsDataURL(file);
  });
});
