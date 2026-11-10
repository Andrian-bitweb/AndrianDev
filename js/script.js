/**
 * ==============================================================================
 * PORTOFOLIO PRIBADI - ANDRIAN
 * Tugas Ujian Tengah Semester (UTS) - Pemrograman Web
 * File: js/script.js
 * Deskripsi: Skrip JavaScript Vanilla untuk interaktivitas website (Dark Mode,
 *            Filter Proyek, Modal, Animasi Scroll, Form Feedback, dll).
 * ==============================================================================
 */

// Menunggu hingga seluruh konten dokumen HTML dimuat sempurna
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. PENGATURAN TEMA (LIGHT MODE & DARK MODE DENGAN LOCALSTORAGE)
  // ----------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');

  // Cek apakah user pernah menyimpan preferensi tema di browser
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    showToast(`Mode tema diubah ke: ${newTheme.toUpperCase()}`);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️'; // Ikon matahari untuk beralih ke terang
      themeToggleBtn.setAttribute('title', 'Beralih ke Tema Terang');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙'; // Ikon bulan untuk beralih ke gelap
      themeToggleBtn.setAttribute('title', 'Beralih ke Tema Gelap');
    }
  }

  // ----------------------------------------------------------------------------
  // 2. NAVIGASI MOBILE (HAMBURGER MENU)
  // ----------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Tutup menu otomatis jika link diklik (di layar HP)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 3. EFEK KETIK TEKS HERO (TYPEWRITER EFFECT)
  // ----------------------------------------------------------------------------
  const typingTextElement = document.getElementById('typing-role');
  const roles = [
    'Mahasiswa Teknik Informatika 🎓',
    'Frontend Web Developer 💻',
    'UI/UX Design Enthusiast 🎨',
    'Peserta Ujian Tengah Semester (UTS) ⭐'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const delayBetweenWords = 1800;

  function typeEffect() {
    if (!typingTextElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let timeoutSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      timeoutSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      timeoutSpeed = 400;
    }

    setTimeout(typeEffect, timeoutSpeed);
  }

  typeEffect();

  // ----------------------------------------------------------------------------
  // 4. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHT
  // ----------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Tambah shadow saat scroll
    if (scrollY > 60) {
      header.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }

    // Sorot link navigasi yang aktif sesuai bagian layar saat ini
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });

  // Tombol kembali ke atas
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 5. FILTER KATEGORI PROYEK
  // ----------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ----------------------------------------------------------------------------
  // 6. POPUP MODAL DETAIL PROYEK
  // ----------------------------------------------------------------------------
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLink = document.getElementById('modal-link');
  const detailButtons = document.querySelectorAll('.btn-view-detail');

  // Database sederhana untuk data detail proyek
  const projectsData = {
    'proyek-1': {
      title: 'Sistem Informasi Akademik & Portal Nilai Mahasiswa',
      category: 'Web App & Database',
      desc: 'Aplikasi berbasis web untuk memudahkan mahasiswa melihat jadwal kuliah, mengisi KRS, mengecek transkrip nilai, dan presensi kuliah secara online.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'MySQL', 'Responsive Design'],
      link: '#',
      github: 'https://github.com/andrian'
    },
    'proyek-2': {
      title: 'E-Commerce ShopEasy - Toko Online Mahasiswa',
      category: 'Frontend Web',
      desc: 'Platform toko online modern dan responsif dengan fitur keranjang belanja interaktif, kalkulator diskon, pencarian produk cepat, serta layout katalog.',
      tech: ['HTML5 Semantik', 'CSS Flexbox/Grid', 'JavaScript ES6', 'Local Storage'],
      link: '#',
      github: 'https://github.com/andrian'
    },
    'proyek-3': {
      title: 'UI/UX Redesign CampusHub Mobile App',
      category: 'UI/UX Design',
      desc: 'Riset dan perancangan antarmuka pengguna aplikasi mobile kampus dengan pendekatan user-centered design, mempermudah mahasiswa dalam navigasi jadwal dan presensi.',
      tech: ['Figma', 'Prototyping', 'User Research', 'Design System'],
      link: '#',
      github: 'https://github.com/andrian'
    },
    'proyek-4': {
      title: 'Dashboard Monitoring Nilai & Tugas UTS Mahasiswa',
      category: 'Tugas Kuliah',
      desc: 'Proyek khusus yang dirancang untuk mengorganisasi tenggat waktu pengumpulan tugas kuliah, rekapitulasi poin nilai UTS, dan pengingat jadwal ujian.',
      tech: ['Vanilla JS', 'DOM Manipulation', 'CSS Variables', 'Clean Code'],
      link: '#',
      github: 'https://github.com/andrian'
    }
  };

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectsData[projectId];

      if (data && modal) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDesc.textContent = data.desc;

        // Render tech tags
        modalTech.innerHTML = '';
        data.tech.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tech-badge';
          span.textContent = t;
          modalTech.appendChild(span);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat modal buka
      }
    });
  });

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  // ----------------------------------------------------------------------------
  // 7. FORMULIR KONTAK (INTERAKTIF DENGAN VALIDASI & TOAST NOTIFIKASI)
  // ----------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subjek = document.getElementById('form-subject').value.trim();
      const pesan = document.getElementById('form-message').value.trim();

      if (!nama || !email || !pesan) {
        showToast('⚠️ Mohon lengkapi semua bidang yang wajib diisi!', 'warning');
        return;
      }

      // Validasi format email sederhana
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('⚠️ Masukkan alamat email yang valid!', 'warning');
        return;
      }

      // Simulasi berhasil mengirim pesan
      showToast(`✅ Terima kasih ${nama}! Pesan Anda untuk tugas UTS telah terkirim.`, 'success');
      contactForm.reset();
    });
  }

  // ----------------------------------------------------------------------------
  // 8. SIMULASI DOWNLOAD CV
  // ----------------------------------------------------------------------------
  const btnDownloadCv = document.getElementById('btn-download-cv');
  if (btnDownloadCv) {
    btnDownloadCv.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('📄 Mengunduh Curriculum Vitae Andrian (Format PDF)...', 'success');
      setTimeout(() => {
        window.print(); // Membuka jendela print preview browser yang bisa disimpan sebagai PDF
      }, 1000);
    });
  }

  // (Bagian animasi bar keahlian disederhanakan karena tampilan keahlian diubah menjadi format paragraf simpel)

  // ----------------------------------------------------------------------------
  // 10. HELPER FUNCTION: TOAST NOTIFIKASI
  // ----------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `<span>${message}</span>`;

    toastContainer.appendChild(toast);

    // Hilangkan toast setelah 4 detik
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3800);
  }

  // Set tahun otomatis di footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  console.log('Portofolio UTS Andrian berhasil dimuat. Siap dinilai! 🎓🚀');
});
