document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById('menuBtn');
  const menuDropdown = document.getElementById('menuDropdown');

  menuBtn.addEventListener('click', () => {
    menuDropdown.classList.toggle('hidden');
  });

  window.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
      menuDropdown.classList.add('hidden');
    }
  });

  // ----- Gambar Slider dengan Judul -----
  const sliderContainer = document.getElementById('sliderContainer');

  // Gambar + Judul
  const gambarList = [
    { url: './images/gambar1.jpeg', title: 'Pertemuan Awal' },
    { url: './images/gambar2.jpeg', title: 'Diskusi Hebat' },
    { url: './images/gambar3.jpeg', title: 'Komunitas Berkembang' },
    { url: './images/gambar4.jpeg', title: 'Event Seru' },
    { url: './images/gambar5.jpeg', title: 'Kenangan Terbaik' },
  ];

  gambarList.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = "flex flex-col w-[85vw] sm:w-[300px] flex-shrink-0 snap-center";

    const imageCard = document.createElement('div');
    imageCard.className = "aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-md ring-1 ring-gray-800 hover:ring-purple-500 transition-all duration-300";

    const img = document.createElement('img');
    img.src = item.url;
    img.className = "w-full h-full object-cover";

    imageCard.appendChild(img);

    const caption = document.createElement('p');
    caption.textContent = item.title;
    caption.className = "mt-2 text-center text-sm text-gray-300";

    wrapper.appendChild(imageCard);
    wrapper.appendChild(caption);
    sliderContainer.appendChild(wrapper);
  });
});

const statusBox = document.getElementById("mcStatus");

async function fetchMCStatsStatus() {
  try {
    const response = await fetch(`https://api.mcstatus.io/v2/status/bedrock/AnimeUnicraft.aternos.me:12698`);
    const data = await response.json();

    const online = data?.online;
    const playersOnline = data?.players?.online ?? 0;
    const playersMax = data?.players?.max ?? "??";
    const version = data?.version?.name ?? "Tidak diketahui";
    const description = cleanMotd(data?.motd?.clean ?? "Tidak ada deskripsi.");

    if (!online) {
      statusBox.innerHTML = `
        <p><span class="font-semibold text-red-400">Status:</span> 🔴 Offline</p>
        <p>Server tidak aktif saat ini.</p>
      `;
      return;
    }

    statusBox.innerHTML = `
      <p><span class="font-semibold text-green-400">Status:</span> 🟢 Online</p>
      <p><span class="font-semibold text-blue-400">Pemain:</span> ${playersOnline} / ${playersMax}</p>
      <p><span class="font-semibold text-yellow-400">Versi:</span> ${version}</p>
      <p><span class="font-semibold text-purple-400">Deskripsi:</span> ${description}</p>
    `;
  } catch (err) {
    statusBox.innerHTML = `<p class="text-red-400">Gagal mengambil data dari mcstats.io</p>`;
    console.error(err);
  }
};
setInterval(fetchMCStatsStatus, 1000);

function cleanMotd(input) {
  return input.replace(/\n\S*/,'');
}