// script.js (Marketplace)

// Data Produk - DIISI FIKTIF, dalam Bahasa Inggris
// TAMBAHKAN 1 PRODUK LAGI
const produkData = [
    {
        id: 1,
        nama: "Premium Ebook: The Secrets to Online Business Success",
        deskripsiSingkat: "A comprehensive step-by-step guide to building a profitable online business from scratch.",
        harga: 250000,
        gambar: "https://via.placeholder.com/150", // Ganti dengan URL gambar yang sesuai
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
        gambar: "https://via.placeholder.com/150",  // Ganti dengan URL gambar yang sesuai
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
        gambar: 'https://via.placeholder.com/150', // Ganti dengan URL gambar yang sesuai
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
    // TAMBAHKAN PRODUK INI
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

// Fungsi untuk merender produk ke HTML
function renderProduk() {
    const daftarProdukDiv = document.getElementById('daftar-produk');
    daftarProdukDiv.innerHTML = ''; // Kosongkan dulu

    produkData.forEach(produk => {
        const produkDiv = document.createElement('div');
        produkDiv.classList.add('produk');
        produkDiv.innerHTML = `
            <img src="${produk.gambar}" alt="Image <span class="math-inline">\{produk\.nama\}"\>
<div class\="produk\-info"\>
<h2\></span>{produk.nama}</h2>
                <p class="deskripsiSingkat">${produk.deskripsiSingkat}</p>
                <p class="harga">Rp <span class="math-inline">\{produk\.harga\.toLocaleString\('id\-ID'\)\}</p\>
<button class\="tombol\-detail cta\-button" data\-id\="</span>{produk.id}">View Detail</button>
                <div class="detail-produk">
                    <span class="math-inline">\{produk\.detail\}
<a class\="link\-form cta\-button" href\="\#form\-pemesanan" data\-id\="</span>{produk.id}">Order Now</a>
                </div>
                <button class="cta-button" data-id="${produk.id}">Buy Now</button>
            </div>
        `; // Semua tombol sekarang punya class cta-button
        daftarProdukDiv.appendChild(produkDiv);
    });

    // Tambahkan event listener SETELAH elemen-elemen dibuat
    addEventListeners();
}

// Fungsi untuk menambah event listener ke tombol dan link
function addEventListeners() {
    // Tombol Lihat Detail / View Detail
    document.querySelectorAll('.tombol-detail').forEach(button => {
        button.addEventListener('click', function() {
            toggleDetail(this); // 'this' mengacu pada tombol yang diklik
        });
    });

    // Tombol Beli Sekarang dan Link Pesan Sekarang / Buy Now and Order Now
   document.querySelectorAll('.produk button:not(.tombol-detail), .link-form').forEach(button => {
    button.addEventListener('click', function() {
        const produkId = parseInt(this.dataset.id);
        const produk = produkData.find(p => p.id === produkId);
        if (produk) {
            pesanProduk(produk.nama, produk.harga);
            // Sembunyikan daftar produk, tampilkan formulir
            document.getElementById('form-pemesanan').style.display = 'block';
            document.getElementById('daftar-produk').style.display = 'none';
            document.getElementById('form-pemesanan').scrollIntoView({ behavior: 'smooth' });

            // Sembunyikan tombol "Buy Now" dan "Order Now"
            const buttons = this.closest('.produk').querySelectorAll('button, a.link-form');
            buttons.forEach(btn => {
              if (btn !== this && !btn.classList.contains('tombol-detail')) { // Jangan sembunyikan tombol detail
                btn.style.display = 'none';
              }
            });

        }
    });
});
}

// Fungsi Toggle Detail yang Ditingkatkan
function toggleDetail(button) {
        const detailProduk = button.nextElementSibling;
        detailProduk.style.display = detailProduk.style.display === 'none' ? 'block' : 'none';
        button.textContent = detailProduk.style.display === 'none' ? 'View Detail' : 'Hide Detail';

}

// Fungsi Pesan Produk
//(Tidak perlu diubah karena hanya mengisi value, datanya sudah dalam Bahasa Inggris)
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
// Tombol Kembali
const tombolKembali = document.getElementById('tombolKembali'); // Ambil elemen tombol Kembali

// Buka modal
tombolLanjutPembayaran.addEventListener('click', () => {
    //validasi form
    if(!document.getElementById('nama').value || !document.getElementById('email').value){
        alert("Please fill in your name and email first."); // Pesan error dalam Bahasa Inggris
        return;
    }
    // Isi data produk ke dalam modal
    document.getElementById('modalProduk').textContent = produkYgDipesan;
    document.getElementById('modalHarga').textContent = "Rp " + hargaYgDipesan.toLocaleString('id-ID');
    modal.style.display = 'block';
    document.getElementById('form-pemesanan').style.display = 'none';//sembunyikan form pemesanan
});

// Tutup modal (x)
tombolTutupModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Tutup modal (klik di luar)
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// --- Event listener untuk tombol Kembali ---
tombolKembali.addEventListener('click', () => {
    document.getElementById('form-pemesanan').style.display = 'none'; // Sembunyikan formulir
    renderProduk();
    document.getElementById('daftar-produk').scrollIntoView({ behavior: 'smooth' });

});

// Fungsi untuk menampilkan instruksi pembayaran (di dalam modal)
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

// Event listener untuk tombol "Bayar" di dalam modal
tombolBayarModal.addEventListener("click", function(){
    const metode = document.getElementById("modalMetodePembayaran").value;
    if (metode === "midtrans" || metode === "xendit") {
         alert("Midtrans/Xendit integration requires backend and complex configuration. This is beyond the scope of this example.");
    } else if(metode === "transfer"){
        //untuk metode transfer, kirimkan data ke whatsapp
        const nama = document.getElementById("nama").value;
        const email = document.getElementById("email").value;
        const produk =  produkYgDipesan;
        const harga = "Rp " +  hargaYgDipesan.toLocaleString('id-ID');
        const catatan = document.getElementById("catatan").value;

        let pesanWA = `Hello, I would like to order a digital product:\n\nName: ${nama}\nEmail: ${email}\nProduct: ${produk}\nPrice: ${harga}\nNotes: ${catatan}\n\nPayment Method: Bank Transfer`;
        pesanWA = encodeURIComponent(pesanWA);

        const nomorWA = "628xxxxxxxxxx"; // Ganti dengan nomor WhatsApp Anda!
        window.open(`https://wa.me/<span class="math-inline">\{nomorWA\}?text\=</span>{pesanWA}`, '_blank');
    } else{
        alert("Please select a payment method.") // Pesan error dalam Bahasa Inggris
    }
})



// --- Fungsi Penyesuaian Ukuran Font Judul Produk ---
function adjustProductTitleFontSize() {
    const products = document.querySelectorAll('.produk');

    products.forEach(product => {
        const h2 = product.querySelector('h2');
        if (!h2) return;

        let containerWidth = product.querySelector('.produk-info').offsetWidth;
        let titleWidth = h2.offsetWidth;
        let currentFontSize = parseFloat(window.getComputedStyle(h2).fontSize);
        const minFontSize = 10; // Batas bawah ukuran font
        let counter = 0;

        while (titleWidth > containerWidth && currentFontSize > minFontSize && counter < 50) {
            currentFontSize -= 0.5;
            h2.style.fontSize = currentFontSize + 'px';
            titleWidth = h2.offsetWidth; // Update setelah perubahan
            containerWidth = product.querySelector('.produk-info').offsetWidth; // Update
            counter++;
        }
         if(counter >= 50){
            console.warn("Loop adjust font reach the limit", h2)
        }
    });
}

// --- Hamburger Menu --- (versi yang disederhanakan)
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// --- (Akhir bagian Hamburger Menu) ---

// Jalankan renderProduk() dan adjustProductTitleFontSize() saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProduk();
    adjustProductTitleFontSize(); // Panggil setelah render produk
});

// Panggil adjustProductTitleFontSize() juga saat window di-resize dan load
window.addEventListener('resize', adjustProductTitleFontSize);
window.addEventListener('load', adjustProductTitleFontSize);

// --- FUNGSI UNTUK MENANGANI TOMBOL KEMBALI ---
tombolKembali.addEventListener('click', () => {
    document.getElementById('form-pemesanan').style.display = 'none'; // Sembunyikan formulir
    renderProduk(); // Panggil renderProduk() untuk menampilkan kembali produk
    document.getElementById('daftar-produk').scrollIntoView({ behavior: 'smooth' });
});