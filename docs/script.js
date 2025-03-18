// script.js

// --- Smooth Scrolling ---
function smoothScrollToAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href'); // Ambil ID target (misal: '#about')
            const targetElement = document.querySelector(targetId); // Dapatkan elemen target

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Hamburger Menu ---
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Animasi Saat Scroll (Heading) ---
function animateHeadings() {
    const headings = document.querySelectorAll('#about h2, #skills h2, #projects h2, #contact h2');
    const windowHeight = window.innerHeight;

    headings.forEach(heading => {
        const headingTop = heading.getBoundingClientRect().top;

        if (headingTop < windowHeight * 0.8) { // Muncul saat 80% heading terlihat
            heading.classList.add('animate-heading');
        }
    });
}

// --- Animasi Saat Scroll (Skill Items) ---
function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    const windowHeight = window.innerHeight;

    skills.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;

        if (skillTop < windowHeight * 0.8) { // Muncul saat 80% skill terlihat
            skill.classList.add('animate-skill');
        }
    });
}

// --- Fungsi Penyesuaian Ukuran Font Skill Title ---
function adjustSkillTitleFontSize() {
    const skills = document.querySelectorAll('.skill');

    skills.forEach(skill => {
        const h3 = skill.querySelector('h3'); // Ambil elemen h3
        if (!h3) return; // Jika tidak ada h3 (seharusnya tidak terjadi, tapi untuk jaga-jaga)

        let containerWidth = skill.offsetWidth; // Lebar container (.skill)
        let titleWidth = h3.offsetWidth; // Lebar judul (h3)
        let currentFontSize = parseFloat(window.getComputedStyle(h3).fontSize); // Ukuran font saat ini
        const minFontSize = 10; // Ukuran font minimal
        let counter = 0;

        // Loop selama lebar judul > lebar container, ukuran font > minimal, dan counter < 50
        while (titleWidth > containerWidth && currentFontSize > minFontSize && counter < 50) {
            currentFontSize -= 0.5; // Kurangi ukuran font
            h3.style.fontSize = currentFontSize + 'px'; // Terapkan ukuran font baru
            titleWidth = h3.offsetWidth; // Hitung ulang lebar judul (karena font berubah)
            containerWidth = skill.offsetWidth;
            counter++; // Increment counter
        }
        if(counter >= 50){
            console.warn("Loop adjust font reach the limit", h3)
        }
    });
}

// --- Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    smoothScrollToAnchor();
    animateHeadings();
    animateSkills();
    adjustSkillTitleFontSize();


     // --- Event Listener tambahan ---
    // Panggil fungsi-fungsi animasi saat scroll
    window.addEventListener('scroll', () => {
        animateHeadings();
        animateSkills();
    });
});

// Panggil adjustSkillTitleFontSize() saat window di-resize dan load
window.addEventListener('resize', adjustSkillTitleFontSize);
window.addEventListener('load', adjustSkillTitleFontSize);