document.addEventListener('DOMContentLoaded', function() {

    // Data Produk (Simulasi dari API)
    const produkData = [
        {
            id: 1,
            nama: "Financial Statement Creation Service",
            harga: 500000,
            detail: "Comprehensive financial statement creation service, including balance sheets, income statements, and cash flow statements, tailored to your business needs.",
            gambar: "path/ke/gambar1.jpg",
            tersedia: true
        },
        {
            id: 2,
            nama: "Graphic Design Service",
            harga: 300000,
            detail: "Professional graphic design services for logos, brochures, posters, and social media content. Enhance your brand's visual identity.",
            gambar: "path/ke/gambar2.jpg",
            tersedia: true
        },
        {
            id: 3,
            nama: "Business Data Analysis Service",
            harga: 400000,
            detail: "In-depth business data analysis services using Excel, SPSS, and other tools to provide actionable insights for your business.",
            gambar: "path/ke/gambar3.jpg",
            tersedia: false // Contoh produk tidak tersedia
        }
    ];

    // --- Fungsi untuk Merender Produk ---
    const produkContainer = document.getElementById('produk-container');

    function renderProduk() {
        produkContainer.innerHTML = ''; // Bersihkan container
        produkData.forEach(produk => {

            // Buat elemen produk
            const produkEl = document.createElement('div');
            produkEl.classList.add('produk');
            produkEl.dataset.id = produk.id;

            const gambarEl = document.createElement('img');
            gambarEl.src = produk.gambar;
            gambarEl.alt = `${produk.nama} Image`; // Alt text yang baik
            gambarEl.loading = "lazy"; // Lazy loading
            produkEl.appendChild(gambarEl);

            const namaEl = document.createElement('h3');
            namaEl.textContent = produk.nama;
            produkEl.appendChild(namaEl);

            const hargaEl = document.createElement('p');
            hargaEl.classList.add('harga');
            hargaEl.textContent = formatRupiah(produk.harga);
            produkEl.appendChild(hargaEl);

              // Tombol "Lihat Detail" / "Stok Habis"
            const button = document.createElement('button');
            button.classList.add('cta-button');
            if (produk.tersedia) {
                button.textContent = 'View Details';
                button.addEventListener('click', () => tampilkanDetailProduk(produk.id));
            } else {
                button.textContent = 'Out of Stock';
                button.disabled = true; // Disable tombol
            }
            produkEl.appendChild(button);

            produkContainer.appendChild(produkEl);
        });
         adjustProductTitleFontSize();
    }


    // --- Modal Detail Produk ---
    const modalProduk = document.getElementById('modal-produk');
    const closeModalProduk = document.getElementById('close-modal-produk');
    const modalNamaProduk = document.getElementById('modal-nama-produk');
    const modalGambarProduk = document.getElementById('modal-gambar-produk');
    const modalDetailProduk = document.getElementById('modal-detail-produk');
    const modalHargaProduk = document.getElementById('modal-harga-produk');
    const pesanSekarangBtn = document.getElementById('pesan-sekarang');

    function tampilkanDetailProduk(produkId) {
        const produk = produkData.find(p => p.id === produkId);
        if (!produk) return;

        modalNamaProduk.textContent = produk.nama;
        modalGambarProduk.src = produk.gambar;
        modalGambarProduk.alt = `${produk.nama} Image`;
        modalDetailProduk.textContent = produk.detail;
        modalHargaProduk.textContent = formatRupiah(produk.harga);

        // Event listener untuk tombol "Order Now"
        pesanSekarangBtn.onclick = () => {
          tampilkanFormulirPemesanan(produk.id);
          modalProduk.style.display = 'none'; // Sembunyikan modal detail
        };

        modalProduk.style.display = 'block';
    }

    closeModalProduk.onclick = () => {
        modalProduk.style.display = 'none';
    };

    // --- Formulir Pemesanan ---
    const formulirPemesanan = document.getElementById('formulir-pemesanan');
    const tutupFormulir = document.getElementById('tutup-formulir');
    const namaProdukPesanan = document.getElementById('nama-produk-pesanan');
    const formPemesanan = document.getElementById('form-pemesanan');
    const lanjutPembayaranBtn = document.getElementById('lanjut-pembayaran');

    let produkIdTerpilih = null; // Menyimpan ID produk yang dipesan


    function tampilkanFormulirPemesanan(produkId) {
      produkIdTerpilih = produkId;
      const produk = produkData.find(p => p.id === produkId);
      if(produk) {
        namaProdukPesanan.textContent = produk.nama; // Set nama produk di form
      }
      formulirPemesanan.style.display = 'block';
    }

      tutupFormulir.onclick = () => {
        formulirPemesanan.style.display = 'none';
          resetFormulir();
    };

    // --- Validasi Formulir (Real-time) ---
    const namaInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const errorNama = document.getElementById('error-nama');
    const errorEmail = document.getElementById('error-email');

    function validateName() {
        if (namaInput.value.trim() === '') {
            errorNama.textContent = 'Name is required.';
            return false;
        }
        errorNama.textContent = ''; // Hapus pesan error
        return true;
    }

     function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            errorEmail.textContent = 'Email is required.';
            return false;
        }
        // Validasi format email (lebih baik dari sebelumnya)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorEmail.textContent = 'Invalid email format.';
            return false;
        }
        errorEmail.textContent = '';
        return true;
    }

    // Event listener untuk validasi real-time
    namaInput.addEventListener('input', validateName);
    namaInput.addEventListener('blur', validateName); // Cek juga saat blur
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);


    // --- Modal Pembayaran ---
    const modalPembayaran = document.getElementById('modal-pembayaran');
    const tutupModalPembayaran = document.getElementById('tutup-modal-pembayaran');
    const detailPembayaran = document.getElementById('detail-pembayaran');
    const totalPembayaran = document.getElementById('total-pembayaran');
    const bayarSekarangBtn = document.getElementById('bayar-sekarang');
    const konfirmasiTransfer = document.getElementById('konfirmasi-transfer');
    const konfirmasiSudahTransferBtn = document.getElementById('konfirmasi-sudah-transfer');

    lanjutPembayaranBtn.addEventListener('click', () => {

      if (!validateName() || !validateEmail()) {
        // Jangan tampilkan modal jika ada error
        return;
      }
        const produk = produkData.find(p => p.id === produkIdTerpilih);
        if(!produk) return;

        const jumlah = parseInt(document.getElementById('jumlah').value, 10);
        const total = produk.harga * jumlah;

      // Tampilkan modal pembayaran
      modalPembayaran.style.display = 'block';
      formulirPemesanan.style.display = 'none'; // Sembunyikan formulir
      totalPembayaran.textContent = `Total Payment: ${formatRupiah(total)}`;
    });

      tutupModalPembayaran.onclick = () => {
        modalPembayaran.style.display = 'none';
    };

    // --- Event Listener untuk Metode Pembayaran ---
    const metodePembayaranRadios = document.querySelectorAll('input[name="metode-pembayaran"]');

    metodePembayaranRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            tampilkanDetailPembayaran(this.value);
        });
    });

      function tampilkanDetailPembayaran(metode) {
        const produk = produkData.find(p => p.id === produkIdTerpilih);
        if (!produk) return;

        const jumlah = parseInt(document.getElementById('jumlah').value, 10);
        const total = produk.harga * jumlah;

        let detailHTML = '';
        if (metode === 'transfer') {
            detailHTML = `
                <p>Please transfer the total amount of <strong>${formatRupiah(total)}</strong> to the following account:</p>
                <p><strong>Bank:</strong> BSI</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>Account Name:</strong> Muhammad Trinanda</p>
            `;
              konfirmasiTransfer.style.display = 'block';
              konfirmasiSudahTransferBtn.style.display = 'inline-block'; // Tampilkan tombol
        } else if (metode === 'qris') {
            detailHTML = `
                <p>Please scan the QRIS code below to pay <strong>${formatRupiah(total)}</strong>:</p>
                <img src="path/ke/qris.png" alt="QRIS Code" width="200">
            `;
             konfirmasiTransfer.style.display = 'none';
              konfirmasiSudahTransferBtn.style.display = 'none';
        }
        detailPembayaran.innerHTML = detailHTML;
    }

        // Event listener untuk tombol "Bayar Sekarang"
    bayarSekarangBtn.addEventListener('click', function() {
        const metodeTerpilih = document.querySelector('input[name="metode-pembayaran"]:checked').value;

        if (metodeTerpilih === 'transfer') {
            // Buka WhatsApp dengan data yang sudah diisi (termasuk format pesan)
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const telepon = document.getElementById('telepon').value;
            const alamat = document.getElementById('alamat').value;
            const jumlah = document.getElementById('jumlah').value;
            const catatan = document.getElementById('catatan').value;
            const produk = produkData.find(p => p.id === produkIdTerpilih);
            const total = produk.harga * jumlah;


            const pesan = `Order Confirmation\n\nName: ${nama}\nEmail: ${email}\nPhone: ${telepon}\nAddress: ${alamat}\nProduct: ${produk.nama}\nQuantity: ${jumlah}\nTotal: ${formatRupiah(total)}\nNotes: ${catatan}\n\nPlease send proof of transfer.`;
            const encodedPesan = encodeURIComponent(pesan);
            window.open(`https://wa.me/6282294092939?text=${encodedPesan}`);
        } else {
           alert("QRIS integration will be available soon!");
        }
    });

     // Event listener untuk tombol "Saya Sudah Transfer"
    konfirmasiSudahTransferBtn.addEventListener('click', function() {
        modalPembayaran.style.display = 'none';
        alert('Thank you for your order! We will process it soon.');
        resetFormulir(); // Reset formulir setelah konfirmasi
    });


     // --- Fungsi Reset Formulir ---
    function resetFormulir() {
      formPemesanan.reset();
      // Hapus pesan error
      errorNama.textContent = '';
      errorEmail.textContent = '';
       // Reset juga input tersembunyi jika ada
    }

     // --- Fungsi Utilitas (Format Rupiah) ---
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    }
    // --- Hamburger Menu ---
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      const navLinksContainer = document.querySelector('.nav-links');
      const hamburgerIcon = document.querySelector('.hamburger-menu i');

    hamburgerMenu.addEventListener('click', function() {
        navLinksContainer.classList.toggle('show');
        if (navLinksContainer.classList.contains('show')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-xmark');
        } else {
            hamburgerIcon.classList.remove('fa-xmark');
            hamburgerIcon.classList.add('fa-bars');
        }
    });
      function adjustProductTitleFontSize() {
        const productTitles = document.querySelectorAll('.produk h3');
        const maxWidth = 250;

        productTitles.forEach(title => {
            const containerWidth = title.parentElement.offsetWidth;
            let fontSize = 1.25;

            if(containerWidth < maxWidth) {
              const scale = containerWidth / maxWidth;
              fontSize = Math.max(1, fontSize * scale)
            }
             title.style.fontSize = `${fontSize}rem`;

            // Reset white-space jika sudah pernah diubah.
            title.style.whiteSpace = 'normal';
            if(title.scrollHeight > title.clientHeight) {
                title.style.whiteSpace = 'nowrap';
            }
        })
      }

      // --- Panggil fungsi-fungsi yang diperlukan ---
    renderProduk(); // Panggil saat halaman dimuat


    // --- Event Listener untuk menutup modal (klik di luar modal) ---
    window.addEventListener('click', function(event) {
        if (event.target === modalProduk) {
            modalProduk.style.display = 'none';
        }
        if (event.target === formulirPemesanan) {
            formulirPemesanan.style.display = 'none';
              resetFormulir();
        }
        if (event.target === modalPembayaran) {
            modalPembayaran.style.display = 'none';
        }
    });

     function throttledAdjustProductTitleFontSize() {
        let ticking = false;

        return function() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    adjustProductTitleFontSize();
                    ticking = false;
                });
                ticking = true;
            }
        };
    }
    const optimizedAdjustProductTitleFontSize = throttledAdjustProductTitleFontSize();
     window.addEventListener('resize', optimizedAdjustProductTitleFontSize);

});