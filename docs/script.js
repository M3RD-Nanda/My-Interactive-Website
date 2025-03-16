// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling ---

    // Fungsi untuk animasi smooth scrolling (polyfill sederhana)
    function smoothScrollTo(targetY, duration) {
        const startingY = window.pageYOffset; // Posisi scroll saat ini
        const diff = targetY - startingY;     // Selisih jarak
        let start;

        // Fungsi animasi (dijalankan setiap frame)
        function step(timestamp) {
            if (!start) start = timestamp;
            const time = timestamp - start; // Waktu yang berlalu
            const percent = Math.min(time / duration, 1); // Persentase animasi (0 - 1)

            // Animasi easing (easeInOutCubic - Anda bisa ganti dengan easing function lain)
            const easing = percent < 0.5
                ? 4 * percent * percent * percent
                : 1 - Math.pow(-2 * percent + 2, 3) / 2;

            window.scrollTo(0, startingY + diff * easing);

            if (time < duration) {
                window.requestAnimationFrame(step); // Lanjutkan animasi di frame berikutnya
            }
        }
        window.requestAnimationFrame(step); // Mulai animasi
    }
    //fungsi cek support smooth scroll
        function supportsSmoothScroll() {
            let supports = false;
            try {
                // Buat elemen div sementara untuk tes
                const div = document.createElement('div');
                div.scrollTo({
                top: 0,
                behavior: 'smooth'
                });
                supports = true; // Jika tidak ada error, berarti support
            } catch (err) {
                // Jika ada error, berarti tidak support
                supports = false;
            }
            return supports;
        }
    // Fungsi utama smooth scrolling (dengan fallback)
    function smoothScrollToAnchor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));

                if (targetElement) {
                    if (supportsSmoothScroll()) {
                        // Gunakan cara modern jika didukung
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        // Fallback ke animasi manual
                        const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset; //hitung manual
                        smoothScrollTo(targetY, 600); // Durasi animasi: 600ms (bisa disesuaikan)
                    }
                }
            });
        });
    }

    smoothScrollToAnchor();


     // --- Fungsi untuk mendapatkan posisi elemen relatif terhadap dokumen ---
    function getElementPosition(el) {
        let rect = el.getBoundingClientRect();
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    // --- Hamburger Menu (Tidak perlu diubah) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });


    // --- Animasi Saat Scroll (Heading) ---
    const headings = document.querySelectorAll('#about h2, #skills h2, #projects h2, #contact h2');

    function animateHeadings() {
        headings.forEach(heading => {
            const headingTop = getElementPosition(heading).top;
            const windowHeight = window.innerHeight;

            if (headingTop < windowHeight * 0.8) {
                heading.classList.add('animate-heading');
            } else {
                heading.classList.remove('animate-heading');
            }
        });
    }

    // --- Animasi Saat Scroll (Skill Items) ---
    const skills = document.querySelectorAll('.skill');

    function animateSkills() {
        skills.forEach(skill => {
            const skillTop = getElementPosition(skill).top;
            const windowHeight = window.innerHeight;

            if (skillTop < windowHeight * 0.8) {
                skill.classList.add('animate-skill');
            } else {
                skill.classList.remove('animate-skill');
            }
        });
    }

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

            while (titleWidth > containerWidth && currentFontSize > minFontSize && counter < 50) {
                currentFontSize -= 0.5;
                h3.style.fontSize = currentFontSize + 'px';
                titleWidth = h3.offsetWidth;
                containerWidth = skill.offsetWidth;
                counter++;
            }
            if (counter >= 50) {
                console.warn("Loop penyesuaian font mencapai batas iterasi:", h3);
            }
        });
    }

    // --- Panggil fungsi-fungsi ---
    animateHeadings();
    animateSkills();
    adjustSkillTitleFontSize();

    // --- Event Listener ---
    window.addEventListener('scroll', function() {
        animateHeadings();
        animateSkills();
    });
    window.addEventListener('resize', adjustSkillTitleFontSize);
    window.addEventListener('load', adjustSkillTitleFontSize);
});
