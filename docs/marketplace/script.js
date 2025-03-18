document.addEventListener('DOMContentLoaded', function() {

    // Data Produk (Simulasi dari API - Produk Digital)
    const produkData = [
        {
            id: 1,
            nama: "Financial Statement Creation Service",
            harga: 500000,
            detail: "Comprehensive financial statement creation service, including balance sheets, income statements, and cash flow statements, tailored to your business needs.",
            gambar: "path/ke/gambar1.jpg"
        },
        {
            id: 2,
            nama: "Graphic Design Service",
            harga: 300000,
            detail: "Professional graphic design services for logos, brochures, posters, and social media content. Enhance your brand's visual identity.",
            gambar: "path/ke/gambar2.jpg"
        },
        {
            id: 3,
            nama: "Business Data Analysis Service",
            harga: 400000,
            detail: "In-depth business data analysis services using Excel, SPSS, and other tools to provide actionable insights for your business.",
            gambar: "path/ke/gambar3.jpg"
        },
        { // Produk Baru
            id: 4,
            nama: "Website Development Service",
            harga: 1000000,
            detail: "Custom website development service using HTML, CSS, and JavaScript.  Create a stunning and functional online presence for your business.",
            gambar: "path/ke/gambar4.jpg"
        }
    ];

    // --- Fungsi untuk Merender Produk ---
    const produkContainer = document.getElementById('produk-container');

    function renderProduk() {
        produkContainer.innerHTML = ''; // Bersihkan container
        produkData.forEach(produk => {
            const produkEl = document.createElement('div');
            produkEl.classList.add('produk');
            produkEl.dataset.id = produk.id;

            const gambarEl = document.createElement('img');
            gambarEl.src = produk.gambar;
            gambarEl.alt = `${produk.nama} Image`;
            gambarEl.loading = "lazy";
            produkEl.appendChild(gambarEl);

            const namaEl = document.createElement('h3');
            namaEl.textContent = produk.nama;
            produkEl.appendChild(namaEl);

            const hargaEl = document.createElement('p');
            hargaEl.classList.add('harga');
            hargaEl.textContent = formatRupiah(produk.harga);
            produkEl.appendChild(hargaEl);

            const detailEl = document.createElement('p'); // Tambahkan detail
            detailEl.textContent = produk.detail;
            produkEl.appendChild(detailEl);


            const button = document.createElement('button');
            button.classList.add('cta-button');
            button.textContent = 'Get Now';
            button.addEventListener('click', () => tampilkanDetailProduk(produk.id));
            produkEl.appendChild(button);

            produkContainer.appendChild(produkEl);
        });
        adjustProductTitleFontSize(); // Panggil setelah render
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

        pesanSekarangBtn.onclick = () => {
            tampilkanFormulirPemesanan(produk.id);
            modalProduk.style.display = 'none';
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

    let produkIdTerpilih = null;

    function tampilkanFormulirPemesanan(produkId) {
        produkIdTerpilih = produkId;
        const produk = produkData.find(p => p.id === produkId);
        if (produk) {
            namaProdukPesanan.textContent = produk.nama;
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
        errorNama.textContent = '';
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            errorEmail.textContent = 'Email is required.';
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorEmail.textContent = 'Invalid email format.';
            return false;
        }
        errorEmail.textContent = '';
        return true;
    }

    namaInput.addEventListener('input', validateName);
    namaInput.addEventListener('blur', validateName);
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);


    // --- Modal Pembayaran (Midtrans - Simulasi) ---
    const modalPembayaran = document.getElementById('modal-pembayaran');
    const tutupModalPembayaran = document.getElementById('tutup-modal-pembayaran');
    const totalPembayaran = document.getElementById('total-pembayaran'); // Element total
    const bayarSekarangBtn = document.getElementById('bayar-sekarang');


    lanjutPembayaranBtn.addEventListener('click', () => {
        if (!validateName() || !validateEmail()) {
            return;
        }

        const produk = produkData.find(p => p.id === produkIdTerpilih);
        if (!produk) return;

        // Hitung total (karena produk digital, asumsikan jumlah = 1)
        const total = produk.harga;

        modalPembayaran.style.display = 'block';
        formulirPemesanan.style.display = 'none';
        totalPembayaran.textContent = `Total: ${formatRupiah(total)}`; // Tampilkan total
    });

    tutupModalPembayaran.onclick = () => {
        modalPembayaran.style.display = 'none';
    };

    bayarSekarangBtn.addEventListener('click', () => {
      // SIMULASI integrasi Midtrans (ganti dengan kode asli dari Midtrans)
      alert('Redirecting to Midtrans for payment...');
      // Di sini Anda akan memanggil fungsi/API Midtrans untuk mendapatkan snap token,
      // lalu menampilkan popup/redirect ke halaman pembayaran Midtrans.

        modalPembayaran.style.display = 'none';
        resetFormulir();

    });

    // --- Fungsi Reset Formulir ---
    function resetFormulir() {
        formPemesanan.reset();
        errorNama.textContent = '';
        errorEmail.textContent = '';
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
    renderProduk();

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