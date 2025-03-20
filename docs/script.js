document.addEventListener('DOMContentLoaded', function() {
    // --- Inisialisasi ldBar ---
    var loader = new ldBar("#my-loader");
       var currentValue = 0;
       var intervalId = setInterval(function() {
           currentValue += 1; // Tingkatkan nilai
           loader.set(currentValue); // Update progress bar

           if (currentValue >= 100) {
               clearInterval(intervalId); // Hentikan interval

               // --- Sembunyikan loader dan kartun setelah animasi selesai ---
               const loaderContainer = document.getElementById('loader-container');
               const cartoonWalk = document.getElementById('cartoon-walk');
               if (loaderContainer) {
                   loaderContainer.style.display = 'none';
               }
               if(cartoonWalk){
                   cartoonWalk.style.display = 'none';
               }
           }
       }, 10);


     // --- Smooth Scrolling ---
   const navLinks = document.querySelectorAll('.nav-links a');

   navLinks.forEach(link => {
       link.addEventListener('click', function(e) {
           const targetId = this.getAttribute('href');

           if (targetId.startsWith("#")) {
               e.preventDefault();
               const targetElement = document.querySelector(targetId);

               if (targetElement) {
                   targetElement.scrollIntoView({
                       behavior: 'smooth'
                   });
               }
           } else {
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
   animatedText.style.opacity = 1;

   // --- Animasi Scroll (Heading dan Skill) ---
   function animateOnScroll() {
     const headings = document.querySelectorAll('.animate-heading');
     const skills = document.querySelectorAll('.skill');

     animateElements(headings);
     animateElements(skills, 'animate-skill');
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
             element.classList.remove('animate-out');

         } else {
             if (animateClass){
               element.classList.remove(animateClass);
             }

             element.classList.remove('animate-heading');
             element.classList.add('animate-out');
         }
     });
   }

   animateOnScroll();
   window.addEventListener('scroll', animateOnScroll);

   // --- Penyesuaian Ukuran Font Judul Skill ---
   function adjustSkillTitleFontSize() {
       const skillTitles = document.querySelectorAll('.skill h3');
       const maxWidth = 250;

       skillTitles.forEach(title => {
           const containerWidth = title.parentElement.offsetWidth;
           let fontSize = 1.75;

           if (containerWidth < maxWidth) {
               const scale = containerWidth / maxWidth;
               fontSize = Math.max(1.2, fontSize * scale);
           }
           title.style.fontSize = `${fontSize}rem`;

           // Reset white-space
           title.style.whiteSpace = 'normal';
           if(title.scrollHeight > title.clientHeight) {
               title.style.whiteSpace = 'nowrap';
           }
       });
   }

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

   optimizedAdjustSkillTitleFontSize();
   window.addEventListener('resize', optimizedAdjustSkillTitleFontSize);
});