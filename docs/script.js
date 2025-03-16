// script.js

// Jalankan kode ini setelah seluruh DOM (struktur HTML) selesai dimuat.
document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling ---

    // Fungsi untuk menambahkan perilaku smooth scrolling ke tautan anchor.
    function smoothScrollToAnchor() {
        // Pilih semua elemen 'a' (link) yang atribut 'href'-nya diawali dengan '#'.
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            // Tambahkan event listener 'click' ke setiap tautan.
            anchor.addEventListener('click', function(e) {
                // Cegah perilaku default link (lompat langsung ke anchor).
                e.preventDefault();

                // Ambil elemen target berdasarkan nilai href tautan.
                const targetElement = document.querySelector(this.getAttribute('href'));

                // Jika elemen target ditemukan, scroll ke elemen tersebut dengan animasi.
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' // Ini yang membuat scrolling menjadi halus.
                    });
                }
            });
        });
    }

    // Panggil fungsi smoothScrollToAnchor untuk mengaktifkan smooth scrolling.
    smoothScrollToAnchor();


    // --- Hamburger Menu ---

    // Pilih elemen hamburger menu dan daftar tautan navigasi.
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Tambahkan event listener 'click' ke hamburger menu.
    hamburgerMenu.addEventListener('click', function() {
        // Toggle (tambahkan/hapus) class 'active' pada daftar tautan.
        // Class 'active' ini digunakan oleh CSS untuk menampilkan/menyembunyikan menu.
        navLinks.classList.toggle('active');
    });


    // --- Animasi Saat Scroll (Heading) ---

    // Pilih semua elemen h2 yang berada di dalam section yang relevan.
    const headings = document.querySelectorAll('#about h2, #skills h2, #projects h2, #contact h2');

    // Fungsi untuk menganimasikan heading.
    function animateHeadings() {
        headings.forEach(heading => {
            // Ambil posisi top heading relatif terhadap viewport.
            const headingTop = heading.getBoundingClientRect().top;
            // Ambil tinggi window.
            const windowHeight = window.innerHeight;

            // Jika posisi top heading kurang dari 80% tinggi window, tambahkan class 'animate-heading'.
            if (headingTop < windowHeight * 0.8) {
                heading.classList.add('animate-heading');
            }
        });
    }

    // Panggil animateHeadings saat halaman pertama kali dimuat.
    animateHeadings();
    // Panggil animateHeadings setiap kali pengguna scroll.
    window.addEventListener('scroll', animateHeadings);


   // --- Animasi Saat Scroll (Skill Items) ---
    const skills = document.querySelectorAll('.skill');

    function animateSkills() {
        skills.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (skillTop < windowHeight * 0.8) {
                // Tambahkan class untuk memicu animasi
                skill.classList.add('animate-skill');
            } else {
                // Hapus class untuk me-reset animasi (opsional, tapi bagus untuk konsistensi)
                skill.classList.remove('animate-skill');
            }
        });
    }

    animateSkills(); // Panggil saat load
    window.addEventListener('scroll', animateSkills);

    // --- Fungsi untuk menyesuaikan ukuran font h3 ---
    function adjustSkillTitleFontSize() {
        const skills = document.querySelectorAll('.skill');

        skills.forEach(skill => {
            const h3 = skill.querySelector('h3');

            if (!h3) {
                console.warn("Tidak ada elemen h3 di dalam .skill:", skill);
                return;
            }

            let containerWidth = skill.offsetWidth;
            let titleWidth = h3.offsetWidth;
            let currentFontSize = parseFloat(window.getComputedStyle(h3).fontSize);
            const minFontSize = 10;
            let counter = 0;

            // Selama judul lebih lebar dari container, font di atas min, dan belum mencapai batas iterasi:
            while (titleWidth > containerWidth && currentFontSize > minFontSize && counter < 50) {
                currentFontSize -= 0.5;
                h3.style.fontSize = currentFontSize + 'px';

                // Update lebar setelah perubahan ukuran font (PENTING)
                titleWidth = h3.offsetWidth;
                containerWidth = skill.offsetWidth;
                counter++;
            }
            if (counter >= 50) {
                console.warn("Loop penyesuaian font mencapai batas iterasi:", h3); // Log yang lebih deskriptif
            }
        });
    }

    // --- Panggil fungsi penyesuaian font ---
    // 1. Saat DOMContentLoaded (halaman selesai dimuat).
    adjustSkillTitleFontSize();

    // 2. Saat ukuran window berubah (resize).
    window.addEventListener('resize', adjustSkillTitleFontSize);

    // 3. Saat window selesai dimuat (load).
    window.addEventListener('load', adjustSkillTitleFontSize);
});
