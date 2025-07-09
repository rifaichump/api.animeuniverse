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
s