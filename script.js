// Tambah ini kat baris pertama sekali
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = "1";
});
// 🌙 DARK MODE (DEFAULT DARK + MEMORI)
const toggle = document.getElementById("theme-toggle");

// 1. Set Dark Mode sebagai default kalau user baru pertama kali datang
if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "dark");
}

// 2. Apply tema berdasarkan memori (supaya page lain pun ikut)
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (toggle) toggle.textContent = "☀️";
} else {
  document.body.classList.remove("dark");
  if (toggle) toggle.textContent = "🌙";
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      toggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggle.textContent = "🌙";
    }
  });
}


// ☰ HAMBURGER MENU
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  if (navMenu && overlay) {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

if (overlay) {
  overlay.addEventListener("click", toggleMenu);
}

// Tutup menu bila link diklik (Penting untuk mobile)
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  });
});


// 🔥 ACTIVE NAV ON SCROLL
const sections = document.querySelectorAll(".section");

if (sections.length > 0) {
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      // Guna includes untuk check href link dengan ID section sekarang
      if (current && link.getAttribute("href").includes("#" + current)) {
        link.classList.add("active");
      }
    });
  });
}
let currentIndex = 0;
const allImages = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Fungsi untuk tunjuk gambar mengikut index
function showImage(index) {
  if (index >= allImages.length) currentIndex = 0;
  else if (index < 0) currentIndex = allImages.length - 1;
  else currentIndex = index;

  lightboxImg.src = allImages[currentIndex].src;
}

// Buka Lightbox bila gambar diklik
allImages.forEach((image, index) => {
  image.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    showImage(index);
  });
});

// Klik Butang Kanan
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Supaya tak tertutup lightbox
  showImage(currentIndex + 1);
});

// Klik Butang Kiri
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
});

// Tutup Lightbox
closeBtn.onclick = () => lightbox.style.display = 'none';

lightbox.onclick = (e) => {
  if (e.target === lightbox || e.target === closeBtn) {
    lightbox.style.display = 'none';
  }
};

// Sokongan Keyboard (Kiri/Kanan/Esc)
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "Escape") lightbox.style.display = 'none';
  }
});
// ==========================================
// SCROLL SPY UNTUK PROJECT CARD (EXPAND EFFECT)
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

const projectObserverOptions = {
  root: null,
  threshold: 0.6, // 60% card nampak baru dia expand
  rootMargin: "-10% 0px -10% 0px" // Fokus kat area tengah skrin
};

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active-scroll');
    } else {
      entry.target.classList.remove('active-scroll');
    }
  });
}, projectObserverOptions);

projectCards.forEach(card => {
  projectObserver.observe(card);
});
