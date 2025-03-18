// script.js (Marketplace)

// --- (Kode data produk, renderProduk, dll. - SEBELUM hamburger menu) ---
// Data Produk - DIISI FIKTIF
const produkData = [
    {
        id: 1,
        nama: "Ebook Premium: Rahasia Sukses Bisnis Online",
        deskripsiSingkat: "Panduan lengkap langkah demi langkah membangun bisnis online yang menguntungkan dari nol.",
        harga: 250000,
        gambar: "https://via.placeholder.com/150", // Ganti dengan URL gambar yang sesuai
        detail: `
            <p>Ebook ini membahas tuntas strategi, taktik, dan tools yang Anda butuhkan untuk meraih kesuksesan di dunia bisnis online:</p>
            <ul>
                <li>Riset pasar dan penentuan niche yang profitable</li>
                <li>Membuat website/toko online profesional</li>
                <li>Strategi pemasaran digital (SEO, social media, email marketing, dll.)</li>
                <li>Manajemen keuangan bisnis</li>
                <li>Studi kasus dan contoh sukses</li>
            </ul>
            <p>Dapatkan bonus template website, checklist, dan akses ke grup diskusi eksklusif!</p>
        `,
    },
    {
        id: 2,
        nama: "Paket Desain Grafis Lengkap untuk Media Sosial",
        deskripsiSingkat: "Template siap pakai untuk branding media sosial yang profesional dan menarik.",
        harga: 125000,
        gambar: "https://via.placeholder.com/150",  // Ganti dengan URL gambar yang sesuai
        detail: `
            <p>Tingkatkan engagement dan konversi di media sosial Anda dengan paket desain grafis ini:</p>
            <ul>
                <li>100+ template postingan Instagram (feed & story)</li>
                <li>50+ template postingan Facebook</li>
                <li>20+ template header/banner (YouTube, Twitter, LinkedIn, dll.)</li>
                <li>Panduan penggunaan dan tips branding</li>
                <li>Bonus ikon dan elemen grafis</li>
            </ul>
             <p>Semua template mudah diedit menggunakan Canva (gratis) atau software desain grafis lainnya.</p>
        `,
    },
    {
        id: 3,
        nama: 'Webinar Eksklusif: Data Analysis for Business Growth',
        deskripsiSingkat: 'Pelajari cara menganalisis data bisnis untuk pengambilan keputusan yang lebih baik.',
        harga: 350000,
        gambar: 'https://via.placeholder.com/150', // Ganti dengan URL gambar yang sesuai
        detail: `
            <p>Dalam webinar ini, Anda akan mendapatkan:</p>
            <ul>
                <li>Pemahaman mendalam tentang konsep dan teknik analisis data</li>
                <li>Hands-on experience menggunakan tools analisis data populer (Excel, Tableau)</li>
                <li>Studi kasus nyata penerapan data analysis di berbagai industri</li>
                <li>Sesi tanya jawab dengan pakar data</li>
                <li>Rekaman webinar dan materi presentasi</li>
            </ul>
            <p>Webinar ini cocok untuk pemilik bisnis, manajer, analis, dan siapa saja yang ingin meningkatkan skill data analysis.</p>
        `
    }
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
            <img src="${produk.gambar}" alt="Gambar <span class="math-inline">\{produk\.nama\}"\>
<div class\="produk\-info"\>
<h2\></span>{produk.nama}</h2>
                <p class="deskripsi-singkat">${produk.deskripsiSingkat}</p>
                <p class="harga">Rp <span class="math-inline">\{produk\.harga\.toLocaleString\('id\-ID'\)\}</p\>
<button class\="tombol\-detail" data\-id\="</span>{produk.id}">Lihat Detail</button>
                <div class="detail-produk">
                    <span class="math-inline">\{produk\.detail\}
<a class\="link\-form" href\="\#form\-pemesanan" data\-id\="</span>{produk.id}">Pesan Sekarang</a>
                </div>
                <button data-id="${produk.id}">Beli Sekarang</button>
            </div>
        `;
        daftarProdukDiv.appendChild(produkDiv);
    });

    // Tambahkan event listener SETELAH elemen-elemen dibuat
    addEventListeners();
}

// Fungsi untuk menambah event listener ke tombol dan link
function addEventListeners() {
    // Tombol Lihat Detail
    document.querySelectorAll('.tombol-detail').forEach(button => {
        button.addEventListener('click', function() {
            toggleDetail(this); // 'this' mengacu pada tombol yang diklik
        });
    });

    // Tombol Beli Sekarang dan Link Pesan Sekarang
    document.querySelectorAll('.produk button:not(.tombol-detail), .link-form').forEach(button => {
        button.addEventListener('click', function() {
            const produkId = parseInt(this.dataset.id);
            const produk = produkData.find(p => p.id === produkId);
            if (produk) {
                pesanProduk(produk.nama, produk.harga);
                document.getElementById('form-pemesanan').style.display = 'block';
                document.getElementById('form-pemesanan').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Fungsi Toggle Detail yang Ditingkatkan
function toggleDetail(button) {
        const detailProduk = button.nextElementSibling;
        detailProduk.style.display = detailProduk.style.display === 'none' ? 'block' : 'none';
        button.textContent = detailProduk.style.display === 'none' ? 'Lihat Detail' : 'Sembunyikan Detail';

}

// Fungsi Pesan Produk
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

// Buka modal
tombolLanjutPembayaran.addEventListener('click', () => {
    //validasi form
    if(!document.getElementById('nama').value || !document.getElementById('email').value){
        alert("Silahkan Isi Nama dan Email Terlebih Dahulu");
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

// Fungsi untuk menampilkan instruksi pembayaran (di dalam modal)
function tampilkanInstruksiPembayaranModal(metode) {
    const instruksiDiv = document.getElementById("modalInstruksiPembayaran");
    instruksiDiv.innerHTML = ""; //kosongkan dulu
    instruksiDiv.style.display = "block";

    if(metode === "transfer"){
        instruksiDiv.innerHTML = `
        <div class="payment-instructions">
            <div class="bank-transfer-info">
                <p>Silakan transfer sejumlah <strong>Rp ${hargaYgDipesan.toLocaleString('id-ID')}</strong> ke rekening berikut:</p>
                <div class="bank-details">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="Logo BCA" class="bank-logo">
                    <div class="account-details">
                        <p>Bank: <strong>BCA (Bank Central Asia)</strong></p>
                        <p>Nomor Rekening: <strong>123-456-7890</strong></p>
                        <p>Atas Nama: <strong>Nama Anda</strong></p>
                    </div>
                </div>

               <div class="bank-details">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Logo Mandiri" class="bank-logo">
                    <div class="account-details">
                        <p>Bank: <strong>Mandiri</strong></p>
                        <p>Nomor Rekening: <strong>987-654-3210</strong></p>
                        <p>Atas Nama: <strong>Nama Anda</strong></p>
                    </div>
               </div>
            </div>
             <p class = "important-note"><strong>Penting:</strong></p>
            <p>Setelah melakukan transfer, mohon segera konfirmasi pembayaran Anda dengan mengirimkan bukti transfer (foto/screenshot) melalui WhatsApp ke nomor <strong>0812-3456-7890</strong> atau email ke <strong>pembayaran@example.com</strong>. Sertakan juga <strong>nama lengkap</strong> dan <strong>nama produk</strong> yang Anda pesan.</p>
        </div>
        `;


    } else if (metode === "midtrans" || metode === "xendit"){
          instruksiDiv.innerHTML = `<p>Anda akan diarahkan ke halaman pembayaran ${metode} setelah menekan tombol "Bayar".</p>`;
    } else {
        instruksiDiv.style.display = "none";
    }
}

// Event listener untuk tombol "Bayar" di dalam modal
tombolBayarModal.addEventListener("click", function(){
    const metode = document.getElementById("modalMetodePembayaran").value;
    if (metode === "midtrans" || metode === "xendit") {
         alert("Integrasi Midtrans/Xendit memerlukan backend dan konfigurasi yang kompleks.  Ini di luar cakupan contoh ini.");
    } else if(metode === "transfer"){
        //untuk metode transfer, kirimkan data ke whatsapp
        const nama = document.getElementById("nama").value;
        const email = document.getElementById("email").value;
        const produk =  produkYgDipesan;
        const harga = "Rp " +  hargaYgDipesan.toLocaleString('id-ID');
        const catatan = document.getElementById("catatan").value;

        let pesanWA = `Halo, saya ingin memesan produk digital:\n\nNama: ${nama}\nEmail: ${email}\nProduk: ${produk}\nHarga: ${harga}\nCatatan: ${catatan}\n\nMetode Pembayaran: Transfer Bank`;
        pesanWA = encodeURIComponent(pesanWA);

        const nomorWA = "628xxxxxxxxxx"; // Ganti dengan nomor WhatsApp Anda!
        window.open(`https://wa.me/${nomorWA}?text=${pesanWA}`, '_blank');
    } else{
        alert("Silahkan Pilih Metode Pembayaran")
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