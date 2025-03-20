document.addEventListener('DOMContentLoaded', function() {
    // --- Inisialisasi ldBar (BUKAN di dalam window.onload) ---
    var loader = new ldBar("#my-loader");
    loader.set(0); // Mulai dari 0
    
    // --- Update loader secara bertahap ---
    var progress = 0;
    var interval = setInterval(function() {
        if (progress < 100) {
            progress += 1;
            loader.set(progress);
        } else {
            clearInterval(interval);
        }
    }, 50); // Update setiap 50ms

     // --- Sembunyikan loader dan kartun HANYA JIKA window TELAH LOAD ---
    window.addEventListener('load', function() {
        const loaderContainer = document.getElementById('loader-container');
          if (loaderContainer) {
              loaderContainer.style.display = 'none';
          }
    });

    //  (Smooth Scrolling, Hamburger Menu, Animasi Teks Hero, dll.)
    // --- Smooth Scrolling ---
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith("#")) { // Cek apakah ini anchor link
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else {
                // Untuk link eksternal (bukan anchor), ganti halaman
                window.location.href = targetId;
            }

            // Sembunyikan menu setelah klik di mobile
            if (window.innerWidth <= 768) {
              navLinksContainer.classList.remove('show');
              hamburgerIcon.classList.remove('fa-xmark');
              hamburgerIcon.classList.add('fa-bars');
            }
        });
    });

    // --- Hamburger Menu ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.hamburger-menu i');


    hamburgerMenu.addEventListener('click', function() {
        navLinksContainer.classList.toggle('show');
        // Ganti ikon hamburger
        if (navLinksContainer.classList.contains('show')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-xmark');
        } else {
            hamburgerIcon.classList.remove('fa-xmark');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // --- Animasi Teks Hero ---
    const animatedText = document.querySelector('.animated-text');
    animatedText.style.opacity = 1; // Langsung tampilkan

    // --- Animasi Scroll (Heading dan Skill) ---
    function animateOnScroll() {
      const headings = document.querySelectorAll('.animate-heading'); // Semua heading
      const skills = document.querySelectorAll('.skill');          // Semua skill

      animateElements(headings);
      animateElements(skills, 'animate-skill');  // Tambahkan class khusus skill
  }

  function animateElements(elements, animateClass = '') {
      elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (elementTop < windowHeight * 0.8) {
              if(animateClass) {
                  element.classList.add(animateClass);
              }
              element.classList.add('animate-heading');
              element.classList.remove('animate-out'); // Hapus kelas animate-out

          } else {
              if (animateClass){
                element.classList.remove(animateClass);
              }

              element.classList.remove('animate-heading');
              element.classList.add('animate-out');     // Tambahkan kelas animate-out
          }
      });
    }



    animateOnScroll(); // Panggil sekali saat load
    window.addEventListener('scroll', animateOnScroll);


    // --- Penyesuaian Ukuran Font Judul Skill ---
    function adjustSkillTitleFontSize() {
        const skillTitles = document.querySelectorAll('.skill h3');
        const maxWidth = 250; // Lebar maksimum container skill

        skillTitles.forEach(title => {
            const containerWidth = title.parentElement.offsetWidth;
            let fontSize = 1.75; // Ukuran font awal

            if (containerWidth < maxWidth) {
                const scale = containerWidth / maxWidth;
                fontSize = Math.max(1.2, fontSize * scale);
            }
            title.style.fontSize = `${fontSize}rem`;

            // Reset white-space jika sudah pernah diubah.
            title.style.whiteSpace = 'normal';
            if(title.scrollHeight > title.clientHeight) {
                title.style.whiteSpace = 'nowrap';
            }
        });
    }
      //gunakan requestAnimationFrame
      function throttledAdjustSkillTitleFontSize() {
        let ticking = false;

        return function() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    adjustSkillTitleFontSize();
                    ticking = false;
                });
                ticking = true;
            }
        };
    }
    const optimizedAdjustSkillTitleFontSize = throttledAdjustSkillTitleFontSize();


    optimizedAdjustSkillTitleFontSize(); // Panggil sekali saat load
    window.addEventListener('resize', optimizedAdjustSkillTitleFontSize);

});