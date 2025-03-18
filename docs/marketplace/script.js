// script.js (Marketplace)

// Data Produk - DIISI FIKTIF, dalam Bahasa Inggris
const produkData = [
    {
        id: 1,
        nama: "Premium Ebook: The Secrets to Online Business Success",
        deskripsiSingkat: "A comprehensive step-by-step guide to building a profitable online business from scratch.",
        harga: 250000,
        gambar: "https://via.placeholder.com/150", // GANTI dengan URL gambar
        detail: `
            <p>This ebook covers all the strategies, tactics, and tools you need to achieve success in the online business world:</p>
            <ul>
                <li>Market research and identifying a profitable niche</li>
                <li>Creating a professional website/online store</li>
                <li>Digital marketing strategies (SEO, social media, email marketing, etc.)</li>
                <li>Business financial management</li>
                <li>Case studies and success examples</li>
            </ul>
            <p>Get bonus website templates, checklists, and access to an exclusive discussion group!</p>
        `,
    },
    {
        id: 2,
        nama: "Complete Graphic Design Package for Social Media",
        deskripsiSingkat: "Ready-to-use templates for professional and engaging social media branding.",
        harga: 125000,
        gambar: "https://via.placeholder.com/150",  // GANTI dengan URL gambar
        detail: `
            <p>Increase engagement and conversions on your social media with this graphic design package:</p>
            <ul>
                <li>100+ Instagram post templates (feed & story)</li>
                <li>50+ Facebook post templates</li>
                <li>20+ header/banner templates (YouTube, Twitter, LinkedIn, etc.)</li>
                <li>Usage guide and branding tips</li>
                <li>Bonus icons and graphic elements</li>
            </ul>
             <p>All templates are easily editable using Canva (free) or other graphic design software.</p>
        `,
    },
    {
        id: 3,
        nama: 'Exclusive Webinar: Data Analysis for Business Growth',
        deskripsiSingkat: 'Learn how to analyze business data for better decision-making.',
        harga: 350000,
        gambar: 'https://via.placeholder.com/150', // GANTI dengan URL gambar
        detail: `
            <p>In this webinar, you will get:</p>
            <ul>
                <li>In-depth understanding of data analysis concepts and techniques</li>
                <li>Hands-on experience using popular data analysis tools (Excel, Tableau)</li>
                <li>Real-world case studies of data analysis applications in various industries</li>
                <li>Q&A session with a data expert</li>
                <li>Webinar recording and presentation materials</li>
            </ul>
            <p>This webinar is suitable for business owners, managers, analysts, and anyone who wants to improve their data analysis skills.</p>
        `
    },
    {
        id: 4,
        nama: "WordPress Website Creation Course",
        deskripsiSingkat: "Learn how to create a professional website with WordPress, even with no coding experience.",
        harga: 180000,
        gambar: "https://via.placeholder.com/150", // GANTI URL
        detail: `
            <p>This course will teach you everything you need to know to build a stunning and functional website using WordPress:</p>
            <ul>
                <li>Installing and setting up WordPress</li>
                <li>Choosing the right theme and plugins</li>
                <li>Creating pages and posts</li>
                <li>Customizing the design of your website</li>
                <li>Adding essential features (contact forms, galleries, etc.)</li>
                <li>SEO basics for WordPress</li>
            </ul>
            <p>Perfect for beginners and anyone who wants to create a website without coding.</p>
        `,
    },
];


// Variabel Global
let produkYgDipesan = "";
let hargaYgDipesan = 0;

// --- FUNGSI UNTUK MERENDER PRODUK KE HTML ---
function renderProduk() {
    const daftarProdukDiv = document.getElementById('daftar-produk');
    daftarProdukDiv.innerHTML = ''; // Kosongkan

    produkData.forEach(produk => {
        const produkDiv = document.createElement('div');
        produkDiv.classList.add('produk');
        produkDiv.innerHTML = `
            <img src="${produk.gambar}" alt="Image ${produk.nama}">
            <div class="produk-info">
                <h2>${produk.nama}</h2>
                <p class="deskripsiSingkat">${produk.deskripsiSingkat}</p>
                <p class="harga">Rp ${produk.harga.toLocaleString('id-ID')}</p>
                <button class="tombol-detail cta-button" data-id="${produk.id}">View Detail</button>
                <div class="detail-produk">
                    ${produk.detail}
                    <a class="link-form cta-button" href="#form-pemesanan" data-id="${produk.id}">Order Now</a>
                </div>
                <button class="cta-button" data-id="${produk.id}">Buy Now</button>
            </div>
        `;
        daftarProdukDiv.appendChild(produkDiv);
    });

    addEventListeners();  // Panggil setelah render
    resetTombolBeli(); // Panggil di sini!
}

// --- FUNGSI UNTUK MENAMBAHKAN EVENT LISTENERS ---
function addEventListeners() {
    // Tombol "View Detail"
    document.querySelectorAll('.tombol-detail').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleDetail(this);
        });
    });

    // Tombol "Buy Now" dan "Order Now"
  document.querySelectorAll('.produk button:not(.tombol-detail), .link-form').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        const produkId = parseInt(this.dataset.id);
        const produk = produkData.find(p => p.id === produkId);

        if (produk) {
            pesanProduk(produk.nama, produk.harga);
            document.getElementById('form-pemesanan').style.display = 'block';
            document.getElementById('daftar-produk').style.display = 'none';
            document.getElementById('form-pemesanan').scrollIntoView({ behavior: 'smooth' });

            // Sembunyikan tombol "Buy Now" dan "Order Now" pada produk yang dipilih
             sembunyikanTombolBeli(this);


        }
    });
});
}
//---FUNGSI UNTUK MENANGANI PENAMPILAN TOMBOL "BUY NOW" dan "ORDER NOW"---
function sembunyikanTombolBeli(clickedButton) {
  const produkDiv = clickedButton.closest('.produk');
    if (produkDiv) {
      const buttons = produkDiv.querySelectorAll('button:not(.tombol-detail), a.link-form');
        buttons.forEach(btn => {
          if (btn !== clickedButton) {
            btn.style.display = 'none';
        }
      });
    }
}

function resetTombolBeli() {
  document.querySelectorAll('.produk button, .produk a.link-form').forEach(button => {
        button.style.display = ''; // Kosongkan style.display (kembalikan ke default)
    });
}

// --- FUNGSI-FUNGSI LAINNYA ---

function toggleDetail(button) {
    const detailProduk = button.closest('.produk-info').querySelector('.detail-produk'); // Lebih spesifik
    if (detailProduk) { // Cek apakah detailProduk ada
        detailProduk.style.display = detailProduk.style.display === 'none' ? 'block' : 'none';
        button.textContent = detailProduk.style.display === 'none' ? 'View Detail' : 'Hide Detail';
    }
}

function pesanProduk(namaProduk, hargaProduk) {
    document.getElementById('produk').value = namaProduk;
    document.getElementById('harga').value = "Rp " + hargaProduk.toLocaleString('id-ID');
    produkYgDipesan = namaProduk;
    hargaYgDipesan = hargaProduk;
}

// --- MODAL ---
const modal = document.getElementById('modalPembayaran');
const tombolLanjutPembayaran = document.getElementById('tombolLanjutPembayaran');
const tombolTutupModal = document.querySelector('.close-button');
const tombolBayarModal = document.getElementById("tombolBayarModal");
const tombolKembali = document.getElementById('tombolKembali');

tombolLanjutPembayaran.addEventListener('click', () => {
    if (!document.getElementById('nama').value || !document.getElementById('email').value) {
        alert("Please fill in your name and email first.");
        return;
    }
    document.getElementById('modalProduk').textContent = produkYgDipesan;
    document.getElementById('modalHarga').textContent = "Rp " + hargaYgDipesan.toLocaleString('id-ID');
    modal.style.display = 'block';
    document.getElementById('form-pemesanan').style.display = 'none';
});

tombolTutupModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// --- Event listener untuk tombol Kembali ---
tombolKembali.addEventListener('click', () => {
    document.getElementById('form-pemesanan').style.display = 'none'; // Sembunyikan formulir
    renderProduk(); //Panggil fungsi Render ulang produk
    document.getElementById('daftar-produk').scrollIntoView({ behavior: 'smooth' });
});

function tampilkanInstruksiPembayaranModal(metode) {
    const instruksiDiv = document.getElementById("modalInstruksiPembayaran");
    instruksiDiv.innerHTML = ""; //kosongkan dulu
    instruksiDiv.style.display = "block";

    if(metode === "transfer"){
        instruksiDiv.innerHTML = `
        <div class="payment-instructions">
            <div class="bank-transfer-info">
                <p>Please transfer the amount of <strong>Rp ${hargaYgDipesan.toLocaleString('id-ID')}</strong> to the following account:</p>
                <div class="bank-details">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="Logo BCA" class="bank-logo">
                    <div class="account-details">
                        <p>Bank: <strong>BCA (Bank Central Asia)</strong></p>
                        <p>Account Number: <strong>123-456-7890</strong></p>
                        <p>Account Name: <strong>Your Name</strong></p>
                    </div>
                </div>

               <div class="bank-details">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Logo Mandiri" class="bank-logo">
                    <div class="account-details">
                        <p>Bank: <strong>Mandiri</strong></p>
                        <p>Account Number: <strong>987-654-3210</strong></p>
                        <p>Account Name: <strong>Your Name</strong></p>
                    </div>
               </div>
            </div>
             <p class = "important-note"><strong>Important:</strong></p>
            <p>After making the transfer, please confirm your payment by sending proof of transfer (photo/screenshot) via WhatsApp to <strong>0812-3456-7890</strong> or email to <strong>pembayaran@example.com</strong>. Also include your <strong>full name</strong> and the <strong>product name</strong> you ordered.</p>
        </div>
        `;


    } else if (metode === "midtrans" || metode === "xendit"){
          instruksiDiv.innerHTML = `<p>You will be redirected to the ${metode} payment page after clicking the "Pay" button.</p>`;
    } else {
        instruksiDiv.style.display = "none";
    }
}

tombolBayarModal.addEventListener("click", function() {
    const metode = document.getElementById("modalMetodePembayaran").value;
    if (metode === "midtrans" || metode === "xendit") {
        alert("Midtrans/Xendit integration requires backend and complex configuration.  This is beyond the scope of this example.");
    } else if (metode === "transfer") {
        const nama = document.getElementById("nama").value;
        const email = document.getElementById("email").value;
        const produk = produkYgDipesan;
        const harga = "Rp " + hargaYgDipesan.toLocaleString('id-ID');
        const catatan = document.getElementById("catatan").value;

        let pesanWA = `Hello, I would like to order a digital product:\n\nName: ${nama}\nEmail: ${email}\nProduct: ${produk}\nPrice: ${harga}\nNotes: ${catatan}\n\nPayment Method: Bank Transfer`;
        pesanWA = encodeURIComponent(pesanWA);

        const nomorWA = "628xxxxxxxxxx"; // GANTI DENGAN NOMOR WHATSAPP ANDA!
        window.open(`https://wa.me/${nomorWA}?text=${pesanWA}`, '_blank');
    } else {
        alert("Please select a payment method.");
    }
});

// --- Hamburger Menu ---
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Penyesuaian Ukuran Font Judul Produk (Opsional) ---
function adjustProductTitleFontSize() {
    const products = document.querySelectorAll('.produk');
    products.forEach(product => {
        const h2 = product.querySelector('h2');
        if (!h2) return;

        let containerWidth = product.querySelector('.produk-info').offsetWidth;
        let titleWidth = h2.offsetWidth;
        let currentFontSize = parseFloat(window.getComputedStyle(h2).fontSize);
        const minFontSize = 10;
        let counter = 0;

        while (titleWidth > containerWidth && currentFontSize > minFontSize && counter < 50) {
            currentFontSize -= 0.5;
            h2.style.fontSize = currentFontSize + 'px';
            titleWidth = h2.offsetWidth; // Update
            containerWidth = product.querySelector('.produk-info').offsetWidth; // Update
            counter++;
        }
        if(counter >= 50){
            console.warn("Loop adjust font reach the limit", h2)
        }
    });
}


// --- PANGGIL FUNGSI-FUNGSI AWAL ---
document.addEventListener('DOMContentLoaded', () => {
    renderProduk();
    adjustProductTitleFontSize();
});

// --- EVENT LISTENER TAMBAHAN (Opsional) ---
window.addEventListener('resize', adjustProductTitleFontSize);
window.addEventListener('load', adjustProductTitleFontSize);