// script.js (Marketplace)

// Data Produk
const produkData = [
    {
        id: 1,
        nama: "Ebook Panduan Lengkap JavaScript",
        deskripsiSingkat: "Pelajari JavaScript dari dasar hingga mahir dengan contoh proyek nyata.",
        harga: 150000,
        gambar: "https://via.placeholder.com/150",
        detail: `
            <p>Ebook ini mencakup semua yang Anda butuhkan untuk menjadi developer JavaScript handal:</p>
            <ul>
                <li>Dasar-dasar JavaScript (variabel, tipe data, operator, dll.)</li>
                <li>Struktur kontrol (percabangan, perulangan)</li>
                <li>Fungsi dan Objek</li>
                <li>DOM Manipulation</li>
                <li>Asynchronous JavaScript (Promises, Async/Await)</li>
                <li>...dan banyak lagi!</li>
            </ul>
        `,
    },
    {
        id: 2,
        nama: "Paket Template Website Responsif",
        deskripsiSingkat: "10 template website HTML & CSS siap pakai untuk berbagai keperluan.",
        harga: 75000,
        gambar: "https://via.placeholder.com/150",
        detail: `
            <p>Paket ini berisi template untuk:</p>
            <ul>
                <li>Landing Page</li>
                <li>Portfolio</li>
                <li>Blog</li>
                <li>Toko Online Sederhana</li>
                <li>...dan 6 template lainnya!</li>
            </ul>
            <p>Semua template sudah responsif (tampilan menyesuaikan di berbagai ukuran layar) dan mudah dikustomisasi.</p>
        `,
    },
    {
        id: 3,
        nama: 'Kursus Online: Desain Grafis untuk Pemula',
        deskripsiSingkat: 'Kuasai dasar-dasar desain grafis dan buat desain menarik dengan mudah.',
        harga: 200000,
        gambar: 'https://via.placeholder.com/150',
        detail: `
            <p>Dalam kursus ini, Anda akan belajar:</p>
            <ul>
                <li>Prinsip dasar desain (tipografi, warna, komposisi)</li>
                <li>Menggunakan software desain grafis (Adobe Photoshop & Illustrator)</li>
                <li>Membuat logo</li>
                <li>Mendesain postingan media sosial</li>
                <li>...dan banyak lagi!</li>
            </ul>
            <p>Kursus ini dilengkapi dengan video tutorial, studi kasus, dan latihan praktik.</p>
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

// Fungsi untuk menampilkan instruksi pembayaran (di dalam modal) - lanjutan
function tampilkanInstruksiPembayaranModal(metode) {
    const instruksiDiv = document.getElementById("modalInstruksiPembayaran");
    instruksiDiv.innerHTML = ""; //kosongkan dulu
    instruksiDiv.style.display = "block";

    if(metode === "transfer"){
        instruksiDiv.innerHTML = `
            <p>Silakan transfer sejumlah <strong>Rp ${hargaYgDipesan.toLocaleString('id-ID')}</strong> ke rekening berikut:</p>
            <ul>
                <li>Bank: [Nama Bank Anda]</li>
                <li>Nomor Rekening: [Nomor Rekening Anda]</li>
                <li>Atas Nama: [Nama Pemilik Rekening]</li>
            </ul>
            <p>Setelah transfer, mohon konfirmasi pembayaran dengan mengirimkan bukti transfer ke [Nomor WhatsApp/Email Anda].</p>
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


// Jalankan renderProduk() dan adjustProductTitleFontSize() saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProduk();
    adjustProductTitleFontSize(); // Panggil setelah render produk
});

// Panggil adjustProductTitleFontSize() juga saat window di-resize dan load
window.addEventListener('resize', adjustProductTitleFontSize);
window.addEventListener('load', adjustProductTitleFontSize);