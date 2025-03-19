document.addEventListener('DOMContentLoaded', function() {
    // Animasi ketik
    const typedTextSpan = document.getElementById('typed-text');
    const textToType = "In the meantime, you can follow me on social media.";
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            typedTextSpan.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50); // Kecepatan ketik (50ms per karakter)
        }
    }

    typeText(); // Mulai animasi

    // Animasi putar hourglass (pindahkan dari CSS)
     const hourglass = document.getElementById('hourglass');
     hourglass.classList.add('fa-spin');

});