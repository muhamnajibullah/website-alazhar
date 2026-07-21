/**
 * Merender navbar utama dari satu sumber konfigurasi.
 * Semua halaman cukup menyediakan <nav class="main-nav"> dan isi menunya akan disamakan di sini.
 */
function initializeSharedNavigation() {
    const navigation = document.querySelector('.main-nav');

    if (!navigation) {
        return;
    }

    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const profilePages = ['profile.html', 'acara.html', 'about.html', 'vision.html', 'contact.html', 'sejarah-sekolah.html', 'detail-penghargaan.html', 'detail-event-quranic-camp.html'];
    const facilityPages = ['program.html', 'facility.html', 'kurikulum-modern.html', 'jakarta.html', 'detail-program-nac.html', 'detail-fasilitas-masjid.html'];
    const educationPages = ['program-tk.html', 'program-sd.html', 'program-smp.html', 'program-sma.html'];
    const isHome = currentPage === 'index.html' || currentPage === '';
    const isProfile = profilePages.includes(currentPage);
    const isFacility = facilityPages.includes(currentPage);
    const isEducation = educationPages.includes(currentPage);

    navigation.innerHTML = [
        '<a class="brand-logo" href="index.html" aria-label="Al-Azhar Kelapa Gading">',
        '<img src="assets/images/logo al azhar.webp" alt="Logo Al-Azhar Kelapa Gading">',
        '</a>',
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu">',
        '<span></span>',
        '<span></span>',
        '<span></span>',
        '<span class="screen-reader-only">Buka menu navigasi</span>',
        '</button>',
        '<ul class="nav-menu" id="primary-menu">',
        '<li><a' + (isHome ? ' class="is-active" aria-current="page"' : '') + ' href="index.html">Beranda</a></li>',
        '<li class="nav-dropdown">',
        '<button class="nav-dropdown-toggle' + (isProfile ? ' is-active' : '') + '" type="button" aria-expanded="false"' + (isProfile ? ' aria-current="page"' : '') + '>',
        'Profil <span class="chevron"></span>',
        '</button>',
        '<ul class="dropdown-menu profile-dropdown-menu">',
        /* Acara dan penghargaan memakai halaman serta status aktif yang terpisah. */
        '<li><a' + (currentPage === 'acara.html' ? ' class="is-active" aria-current="page"' : '') + ' href="acara.html">Acara</a></li>',
        '<li><a' + (currentPage === 'profile.html' ? ' class="is-active" aria-current="page"' : '') + ' href="profile.html">Penghargaan</a></li>',
        '<li><a' + (currentPage === 'about.html' ? ' class="is-active" aria-current="page"' : '') + ' href="about.html">Tentang Kami</a></li>',
        '<li><a' + (currentPage === 'vision.html' ? ' class="is-active" aria-current="page"' : '') + ' href="vision.html">Visi &amp; Misi Yayasan</a></li>',
        '<li><a' + (currentPage === 'contact.html' ? ' class="is-active" aria-current="page"' : '') + ' href="contact.html">Hubungi Kami</a></li>',
        '</ul>',
        '</li>',
        '<li class="nav-dropdown nav-dropdown-facility">',
        '<button class="nav-dropdown-toggle' + (isFacility ? ' is-active' : '') + '" type="button" aria-expanded="false"' + (isFacility ? ' aria-current="page"' : '') + '>',
        'Fasilitas <span class="chevron"></span>',
        '</button>',
        '<ul class="dropdown-menu facility-dropdown-menu">',
        '<li><a' + (currentPage === 'program.html' ? ' class="is-active" aria-current="page"' : '') + ' href="program.html">Program Kami</a></li>',
        '<li><a' + (currentPage === 'facility.html' ? ' class="is-active" aria-current="page"' : '') + ' href="facility.html">Fasilitas Sekolah</a></li>',
        '</ul>',
        '</li>',
        '<li class="nav-dropdown nav-dropdown-program">',
        '<button class="nav-dropdown-toggle' + (isEducation ? ' is-active' : '') + '" type="button" aria-expanded="false"' + (isEducation ? ' aria-current="page"' : '') + '>',
        'Program Pendidikan <span class="chevron"></span>',
        '</button>',
        '<ul class="dropdown-menu program-education-dropdown-menu">',
        '<li><a' + (currentPage === 'program-tk.html' ? ' class="is-active" aria-current="page"' : '') + ' href="program-tk.html">TK</a></li>',
        '<li><a' + (currentPage === 'program-sd.html' ? ' class="is-active" aria-current="page"' : '') + ' href="program-sd.html">SD</a></li>',
        '<li><a' + (currentPage === 'program-smp.html' ? ' class="is-active" aria-current="page"' : '') + ' href="program-smp.html">SMP</a></li>',
        '<li><a' + (currentPage === 'program-sma.html' ? ' class="is-active" aria-current="page"' : '') + ' href="program-sma.html">SMA</a></li>',
        '</ul>',
        '</li>',
        '<li><a class="join-link" href="https://wa.me/6281210300813">Gabung Alazka</a></li>',
        '</ul>'
    ].join('');
}

initializeSharedNavigation();

/**
 * Menambahkan pemilih bahasa yang sama pada seluruh halaman yang memiliki navbar.
 * Pilihan disimpan agar status IND atau ENG tetap konsisten saat berpindah halaman.
 */
function initializeSharedLanguageSelector() {
    const navigation = document.querySelector('.main-nav');

    if (!navigation) {
        return;
    }

    /* Selector lama di beberapa halaman dihapus untuk mencegah tombol bahasa ganda. */
    document.querySelectorAll('.profile-language, .contact-language, .site-language').forEach(function (selector) {
        selector.remove();
    });

    const selector = document.createElement('div');
    selector.className = 'site-language';
    selector.innerHTML = [
        '<button class="site-language-toggle" type="button" aria-expanded="false" aria-haspopup="true">',
        '<span class="language-flag language-flag-id" aria-hidden="true"></span>',
        '<strong>IND</strong>',
        '<i class="ri-arrow-down-s-line" aria-hidden="true"></i>',
        '<span class="screen-reader-only">Pilih bahasa</span>',
        '</button>',
        '<div class="site-language-menu" role="menu">',
        '<button type="button" role="menuitem" data-language="en">',
        '<span class="language-flag language-flag-gb" aria-hidden="true"></span>',
        '<strong>ENG</strong>',
        '</button>',
        '</div>'
    ].join('');
    /* Diletakkan di header agar mengikuti waktu dan animasi tampil navbar setelah opening screen. */
    (navigation.closest('header') || document.body).appendChild(selector);

    const toggle = selector.querySelector('.site-language-toggle');
    const option = selector.querySelector('[data-language]');
    let currentLanguage = 'id';

    try {
        currentLanguage = window.localStorage.getItem('alazka-language') === 'en' ? 'en' : 'id';
    } catch (error) {
        currentLanguage = 'id';
    }

    function renderLanguage() {
        const isEnglish = currentLanguage === 'en';
        const currentFlag = toggle.querySelector('.language-flag');
        const currentLabel = toggle.querySelector('strong');
        const optionFlag = option.querySelector('.language-flag');
        const optionLabel = option.querySelector('strong');

        currentFlag.className = 'language-flag ' + (isEnglish ? 'language-flag-gb' : 'language-flag-id');
        currentFlag.textContent = '';
        currentLabel.textContent = isEnglish ? 'ENG' : 'IND';
        option.dataset.language = isEnglish ? 'id' : 'en';
        optionFlag.className = 'language-flag ' + (isEnglish ? 'language-flag-id' : 'language-flag-gb');
        optionFlag.textContent = '';
        optionLabel.textContent = isEnglish ? 'IND' : 'ENG';
        document.documentElement.lang = currentLanguage;
        toggle.setAttribute('aria-label', 'Bahasa saat ini ' + (isEnglish ? 'English' : 'Indonesia'));
    }

    function closeLanguageMenu() {
        selector.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        const isOpen = selector.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    option.addEventListener('click', function () {
        currentLanguage = option.dataset.language === 'en' ? 'en' : 'id';

        try {
            window.localStorage.setItem('alazka-language', currentLanguage);
        } catch (error) {
            /* Selector tetap berfungsi pada browser yang membatasi localStorage. */
        }

        renderLanguage();
        closeLanguageMenu();
    });

    document.addEventListener('click', function (event) {
        if (!selector.contains(event.target)) {
            closeLanguageMenu();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeLanguageMenu();
        }
    });

    renderLanguage();
}

initializeSharedLanguageSelector();

/**
 * Menyamakan footer pada seluruh halaman dari satu sumber markup.
 * Struktur lama tetap menjadi fallback apabila JavaScript tidak tersedia.
 */
function initializeSharedFooter() {
    const footer = document.querySelector('.site-footer');

    if (!footer) {
        return;
    }

    /* Tautan dan informasi kontak mengikuti susunan footer pada rancangan terbaru. */
    footer.innerHTML = [
        '<div class="footer-container footer-container-unified">',
        '<section class="footer-brand" aria-labelledby="footer-brand-title">',
        '<div class="footer-logo-row">',
        '<img src="assets/images/logo al azhar.webp" alt="Logo Al-Azhar Kelapa Gading">',
        '<h2 id="footer-brand-title">Al Azhar <br>Kelapa Gading</h2>',
        '</div>',
        '<div class="footer-contact-list">',
        '<address><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>Jl. Raya Bulevar Timur, Kelurahan Pegangsaan Dua, Kecamatan Kelapa Gading, Kota Jakarta Utara, Daerah Khusus Ibukota Jakarta 14250</span></address>',
        '<a href="tel:+628119769799"><i class="fa-solid fa-phone" aria-hidden="true"></i><span>+62 811-9769-799.</span></a>',
        '<a href="mailto:info.jkt@alazka.sch.id"><i class="fa-solid fa-envelope" aria-hidden="true"></i><span>info.jkt@alazka.sch.id</span></a>',
        '</div>',
        '<ul class="social-links" aria-label="Media sosial">',
        '<li><a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>',
        '<li><a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin" aria-hidden="true"></i></a></li>',
        '<li><a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook" aria-hidden="true"></i></a></li>',
        '<li><a href="mailto:info.jkt@alazka.sch.id" aria-label="Email"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a></li>',
        '<li><a href="tel:+628119769799" aria-label="Telepon"><i class="fa-solid fa-phone" aria-hidden="true"></i></a></li>',
        '</ul>',
        '</section>',
        '<section class="footer-column" aria-labelledby="footer-registration-title">',
        '<h2 id="footer-registration-title">Pendaftaran</h2>',
        '<a href="https://wa.me/6281210300813">Penerimaan Siswa Baru</a>',
        '<a href="detail-program-nac.html">North Aquatic Center</a>',
        '</section>',
        '<section class="footer-column footer-quick-links" aria-labelledby="footer-quick-title">',
        '<h2 id="footer-quick-title">Akses Cepat</h2>',
        '<a href="index.html">Beranda</a>',
        '<a href="profile.html">Acara &amp; Penghargaan</a>',
        '<a href="about.html">Tentang Kami</a>',
        '<a href="vision.html">Visi &amp; Misi Yayasan</a>',
        '<a href="contact.html">Hubungi Kami</a>',
        '<a href="program.html">Program Kami</a>',
        '<a href="facility.html">Fasilitas Kami</a>',
        '<a href="index.html#program">Ekstrakurikuler &amp; Intrakurikuler</a>',
        '<a href="#">Kebijakan Privasi</a>',
        '</section>',
        '</div>'
    ].join('');
}

initializeSharedFooter();

/**
 * Mengatur buka tutup menu utama pada layar kecil.
 * Function ini menjaga status aria-expanded agar menu tetap mudah diakses.
 */
function initializeMobileNavigation() {
    const navigation = document.querySelector('.main-nav');
    const toggleButton = document.querySelector('.nav-toggle');
    const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));

    if (!navigation || !toggleButton) {
        return;
    }

    const brandLogo = navigation.querySelector('.brand-logo');
    const menu = navigation.querySelector('.nav-menu');

    if (brandLogo && menu && !menu.querySelector('.mobile-menu-brand')) {
        const brandImage = brandLogo.querySelector('img');
        const menuBrand = document.createElement('li');
        menuBrand.className = 'mobile-menu-brand';
        menuBrand.innerHTML = [
            brandImage ? '<img src="' + brandImage.getAttribute('src') + '" alt="">' : '',
            '<strong>Al Azhar Kelapa Gading</strong>',
            '<small>Iman, Ilmu, Amal</small>'
        ].join('');
        menu.insertBefore(menuBrand, menu.firstElementChild);
    }

    if (menu && !menu.querySelector('.mobile-menu-list')) {
        const listItem = document.createElement('li');
        const list = document.createElement('ul');
        listItem.className = 'mobile-menu-list';
        list.setAttribute('aria-label', 'Menu utama mobile');

        Array.from(menu.children).forEach(function (item) {
            if (!item.classList.contains('mobile-menu-brand') && !item.classList.contains('mobile-nav-footer')) {
                list.appendChild(item);
            }
        });

        listItem.appendChild(list);
        const footerItem = menu.querySelector('.mobile-nav-footer');
        menu.insertBefore(listItem, footerItem || null);
    }

    if (menu && !menu.querySelector('.mobile-nav-footer')) {
        const footer = document.createElement('li');
        footer.className = 'mobile-nav-footer';
        footer.innerHTML = [
            '<div class="mobile-nav-socials" aria-label="Media sosial">',
            '<a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>',
            '<a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin" aria-hidden="true"></i></a>',
            '<a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>',
            '<a href="mailto:info@alazka.sch.id" aria-label="Email"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>',
            '<a href="tel:+628119769799" aria-label="Telepon"><i class="fa-solid fa-phone" aria-hidden="true"></i></a>',
            '</div>',
        ].join('');
        menu.appendChild(footer);
    }

    let closeTimer = null;
    let lastFocusedElement = null;

    function updateToggleLabel(isOpen) {
        const label = toggleButton.querySelector('.screen-reader-only');
        toggleButton.setAttribute('aria-expanded', String(isOpen));

        if (label) {
            label.textContent = isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi';
        }
    }

    function closeDropdowns() {
        dropdowns.forEach(function (dropdown) {
            dropdown.classList.remove('is-open');
            const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function closeMobileNavigation() {
        if (!navigation.classList.contains('is-open') && !navigation.classList.contains('is-closing')) {
            return;
        }

        updateToggleLabel(false);
        closeDropdowns();

        if (window.innerWidth <= 768) {
            navigation.classList.add('is-closing');
            document.body.classList.add('mobile-nav-closing');
            window.clearTimeout(closeTimer);
            closeTimer = window.setTimeout(function () {
                navigation.classList.remove('is-open', 'is-closing');
                document.body.classList.remove('mobile-nav-open', 'mobile-nav-closing');
                if (lastFocusedElement && document.contains(lastFocusedElement)) {
                    lastFocusedElement.focus();
                }
            }, 260);
            return;
        }

        navigation.classList.remove('is-open', 'is-closing');
        document.body.classList.remove('mobile-nav-open', 'mobile-nav-closing');
    }

    toggleButton.addEventListener('click', function () {
        if (navigation.classList.contains('is-open') && !navigation.classList.contains('is-closing')) {
            closeMobileNavigation();
            return;
        }

        window.clearTimeout(closeTimer);
        lastFocusedElement = document.activeElement;
        closeDropdowns();
        navigation.classList.remove('is-closing');
        document.body.classList.remove('mobile-nav-closing');
        navigation.classList.add('is-open');
        document.body.classList.add('mobile-nav-open');
        updateToggleLabel(true);
    });

    /* Tautan menu menutup drawer, termasuk tautan hash yang tidak memuat ulang halaman. */
    if (menu) {
        menu.addEventListener('click', function (event) {
            if (event.target.closest('a') && window.innerWidth <= 768) {
                closeMobileNavigation();
            }
        });
    }

    document.addEventListener('click', function (event) {
        if (navigation.classList.contains('is-open') && !navigation.contains(event.target)) {
            closeMobileNavigation();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
            const openDropdown = dropdowns.find(function (dropdown) {
                return dropdown.classList.contains('is-open');
            });

            if (openDropdown) {
                const openToggle = openDropdown.querySelector('.nav-dropdown-toggle');
                closeDropdowns();
                if (openToggle) {
                    openToggle.focus();
                }
                return;
            }

            closeMobileNavigation();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            window.clearTimeout(closeTimer);
            closeDropdowns();
            navigation.classList.remove('is-open', 'is-closing');
            document.body.classList.remove('mobile-nav-open', 'mobile-nav-closing');
            updateToggleLabel(false);
        }
    });
}

initializeMobileNavigation();

/**
 * Mengatur dropdown pada menu navigasi Profile.
 * Dropdown dapat terbuka lewat hover/focus dari CSS dan lewat klik untuk layar sentuh.
 */
function initializeNavigationDropdowns() {
    const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));

    dropdowns.forEach(function (dropdown) {
        const toggleButton = dropdown.querySelector('.nav-dropdown-toggle');

        if (!toggleButton) {
            return;
        }

        toggleButton.addEventListener('click', function (event) {
            event.stopPropagation();
            const isOpen = dropdown.classList.toggle('is-open');
            toggleButton.setAttribute('aria-expanded', String(isOpen));

            dropdowns.forEach(function (otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('is-open');
                    const otherToggle = otherDropdown.querySelector('.nav-dropdown-toggle');
                    if (otherToggle) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    });

    document.addEventListener('click', function () {
        dropdowns.forEach(function (dropdown) {
            dropdown.classList.remove('is-open');
            const toggleButton = dropdown.querySelector('.nav-dropdown-toggle');
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

initializeNavigationDropdowns();

/**
 * Mengatur carousel Program Pendidikan agar tiap jenjang tampil sebagai satu slide penuh.
 * Function ini juga memperbarui warna dan progress timeline berdasarkan slide aktif.
 */
function initializeProgramCarousel() {
    const programSection = document.querySelector('.program-section');
    const track = document.querySelector('[data-program-track]');
    const progressBars = Array.from(document.querySelectorAll('[data-program-progress]'));
    const previousButton = document.querySelector('[data-program-prev]');
    const nextButton = document.querySelector('[data-program-next]');
    const pagination = document.querySelector('[data-program-pagination]');

    if (!programSection || !track) {
        return;
    }

    const slides = Array.from(track.querySelectorAll('.program-slide'));
    if (slides.length === 0) {
        return;
    }

    const progressWidths = [84, 88, 92, 100];
    const dots = pagination ? slides.map(function (_, index) {
        const dot = document.createElement('button');
        dot.className = 'program-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Buka program ke-' + (index + 1));
        dot.addEventListener('click', function () {
            scrollToProgramSlide(index);
        });
        pagination.appendChild(dot);
        return dot;
    }) : [];
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;

    progressBars.forEach(function (progressBar, index) {
        const progressStep = progressWidths[index] || 100;
        progressBar.parentElement.style.setProperty('--program-progress-width', progressStep.toFixed(2) + '%');
    });

    /**
     * Mengambil index slide yang paling dekat dengan posisi scroll saat ini.
     * @returns {number} Index slide aktif.
     */
    function getActiveSlideIndex() {
        const slideDistances = slides.map(function (slide) {
            return Math.abs((slide.offsetLeft - slides[0].offsetLeft) - track.scrollLeft);
        });
        return slideDistances.indexOf(Math.min.apply(null, slideDistances));
    }

    /**
     * Menggeser track ke slide tertentu dengan animasi halus yang stabil.
     * @param {number} index Index slide tujuan.
     */
    function scrollToProgramSlide(index) {
        const targetIndex = Math.min(Math.max(index, 0), slides.length - 1);

        track.scrollTo({
            left: slides[targetIndex].offsetLeft - slides[0].offsetLeft,
            behavior: 'smooth'
        });
    }

    /**
     * Memperbarui tema warna dan status tombol berdasarkan slide aktif.
     */
    function updateProgramState() {
        const activeIndex = Math.min(Math.max(getActiveSlideIndex(), 0), slides.length - 1);
        const activeSlide = slides[activeIndex];

        programSection.dataset.activeTheme = activeSlide.dataset.theme || 'tk';
        programSection.dataset.activeIndex = String(activeIndex);
        if (previousButton) {
            previousButton.disabled = activeIndex === 0;
        }
        if (nextButton) {
            nextButton.disabled = activeIndex === slides.length - 1;
        }
        dots.forEach(function (dot, index) {
            dot.classList.toggle('is-active', index === activeIndex);
            dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
        });
    }

    /**
     * Menggeser carousel satu slide ke kiri atau kanan.
     * @param {number} direction Arah pergeseran, -1 untuk kiri dan 1 untuk kanan.
     */
    function scrollProgram(direction) {
        const activeIndex = getActiveSlideIndex();
        const targetIndex = Math.min(Math.max(activeIndex + direction, 0), slides.length - 1);
        scrollToProgramSlide(targetIndex);
    }

    /**
     * Memulai mode drag horizontal pada track carousel.
     * @param {PointerEvent} event Event pointer dari mouse atau touch.
     */
    function startDrag(event) {
        if (event.target.closest('a, button')) {
            return;
        }

        if (event.pointerType !== 'mouse') {
            return;
        }

        isDragging = true;
        dragStartX = event.clientX;
        dragStartScrollLeft = track.scrollLeft;
        track.classList.add('is-dragging');
        track.setPointerCapture(event.pointerId);
    }

    /**
     * Menggeser track saat user melakukan drag.
     * @param {PointerEvent} event Event pointer dari mouse atau touch.
     */
    function dragProgram(event) {
        if (!isDragging) {
            return;
        }

        const deltaX = event.clientX - dragStartX;
        event.preventDefault();
        track.scrollLeft = dragStartScrollLeft - deltaX;
    }

    /**
     * Mengakhiri drag dan men-snap carousel ke slide terdekat.
     * @param {PointerEvent} event Event pointer dari mouse atau touch.
     */
    function endDrag(event) {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        track.classList.remove('is-dragging');
        if (track.hasPointerCapture(event.pointerId)) {
            track.releasePointerCapture(event.pointerId);
            scrollToProgramSlide(getActiveSlideIndex());
        }
    }

    if (previousButton) {
        previousButton.addEventListener('click', function () {
            scrollProgram(-1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function () {
            scrollProgram(1);
        });
    }

    track.addEventListener('scroll', function () {
        window.requestAnimationFrame(updateProgramState);
    });
    track.addEventListener('pointerdown', startDrag);
    track.addEventListener('pointermove', dragProgram);
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);

    window.addEventListener('resize', updateProgramState);
    updateProgramState();
}

initializeProgramCarousel();

/**
 * Mengaktifkan scroll horizontal yang halus dan bisa di-drag pada track konten.
 * Function ini dipakai untuk carousel penghargaan dan daftar event.
 */
function initializeSmoothScrollTracks() {
    const tracks = Array.from(document.querySelectorAll('.smooth-scroll-track'));

    tracks.forEach(function (track) {
        let isDragging = false;
        let dragStartX = 0;
        let dragStartScrollLeft = 0;

        /**
         * Memulai drag horizontal pada track.
         * @param {PointerEvent} event Event pointer mouse atau sentuhan.
         */
        function startDrag(event) {
            if (event.target.closest('a, button')) {
                return;
            }

            isDragging = true;
            dragStartX = event.clientX;
            dragStartScrollLeft = track.scrollLeft;
            track.classList.add('is-dragging');
            track.setPointerCapture(event.pointerId);
        }

        /**
         * Menggerakkan posisi scroll sesuai arah drag.
         * @param {PointerEvent} event Event pointer mouse atau sentuhan.
         */
        function dragTrack(event) {
            if (!isDragging) {
                return;
            }

            event.preventDefault();
            track.scrollLeft = dragStartScrollLeft - (event.clientX - dragStartX);
        }

        /**
         * Mengakhiri drag agar scroll kembali memakai behavior smooth.
         * @param {PointerEvent} event Event pointer mouse atau sentuhan.
         */
        function endDrag(event) {
            if (!isDragging) {
                return;
            }

            isDragging = false;
            track.classList.remove('is-dragging');
            track.releasePointerCapture(event.pointerId);
        }

        track.addEventListener('pointerdown', startDrag);
        track.addEventListener('pointermove', dragTrack);
        track.addEventListener('pointerup', endDrag);
        track.addEventListener('pointercancel', endDrag);
        track.addEventListener('pointerleave', endDrag);
    });

    document.querySelectorAll('[data-scroll-prev], [data-scroll-next]').forEach(function (button) {
        button.addEventListener('click', function () {
            const targetId = button.dataset.scrollPrev || button.dataset.scrollNext;
            const targetTrack = document.getElementById(targetId);
            const direction = button.dataset.scrollNext ? 1 : -1;

            if (!targetTrack) {
                return;
            }

            targetTrack.scrollBy({
                left: direction * Math.max(targetTrack.clientWidth * 0.72, 280),
                behavior: 'smooth'
            });
        });
    });
}

initializeSmoothScrollTracks();

/**
 * Menjaga indikator pagination tetap selaras dengan posisi scroll track.
 * Dot juga dapat diklik untuk lompat ke bagian track penghargaan yang sesuai.
 */
function initializeTrackPagination() {
    const paginations = Array.from(document.querySelectorAll('[data-track-pagination]'));

    paginations.forEach(function (pagination) {
        const track = document.getElementById(pagination.dataset.trackPagination);
        const dots = Array.from(pagination.querySelectorAll('button'));

        if (!track || dots.length === 0) {
            return;
        }

        function getScrollProgress() {
            const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 1);
            return Math.min(Math.max(track.scrollLeft / maxScrollLeft, 0), 1);
        }

        function updateActiveDot() {
            const activeIndex = Math.min(dots.length - 1, Math.round(getScrollProgress() * (dots.length - 1)));

            dots.forEach(function (dot, index) {
                const isActive = index === activeIndex;
                dot.classList.toggle('is-active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
                const targetProgress = dots.length === 1 ? 0 : index / (dots.length - 1);

                track.scrollTo({
                    left: maxScrollLeft * targetProgress,
                    behavior: 'smooth'
                });
            });
        });

        track.addEventListener('scroll', function () {
            window.requestAnimationFrame(updateActiveDot);
        });
        window.addEventListener('resize', updateActiveDot);
        updateActiveDot();
    });
}

initializeTrackPagination();

/**
 * Mengatur popup pendaftaran event.
 * Popup bisa dibuka dari tombol detail event, ditutup lewat tombol X, tombol Batal, backdrop, atau Escape.
 */
function initializeRegistrationModal() {
    const modal = document.getElementById('registration-modal');

    if (!modal) {
        return;
    }

    const openButtons = Array.from(document.querySelectorAll('[data-modal-open="registration-modal"]'));
    const closeButtons = Array.from(modal.querySelectorAll('[data-modal-close]'));
    const form = modal.querySelector('form');

    function openModal() {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const firstInput = modal.querySelector('input, select, button');
        if (firstInput) {
            firstInput.focus();
        }
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openButtons.forEach(function (button) {
        button.addEventListener('click', openModal);
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            closeModal();
        });
    }
}

initializeRegistrationModal();

/**
 * Mengatur modal pembelian tiket NAC beserta kalkulasi total pembayaran.
 */
function initializeNacTicketModal() {
    const modal = document.getElementById('nac-ticket-modal');

    if (!modal) {
        return;
    }

    const openButtons = Array.from(document.querySelectorAll('[data-nac-ticket-open]'));
    const closeButtons = Array.from(modal.querySelectorAll('[data-nac-ticket-close]'));
    const form = modal.querySelector('.nac-ticket-form');
    const ticketOptions = Array.from(modal.querySelectorAll('[data-ticket-price]'));
    const minusButton = modal.querySelector('[data-ticket-minus]');
    const plusButton = modal.querySelector('[data-ticket-plus]');
    const countOutput = modal.querySelector('[data-ticket-count]');
    const totalOutput = modal.querySelector('[data-ticket-total]');
    const dateField = modal.querySelector('.nac-date-field');
    const dateDisplay = modal.querySelector('[data-nac-date-display]');
    const dateValue = modal.querySelector('[data-nac-date-value]');
    const calendar = modal.querySelector('[data-nac-calendar]');
    const calendarMonth = modal.querySelector('[data-calendar-month]');
    const calendarDays = modal.querySelector('[data-calendar-days]');
    const calendarPrevious = modal.querySelector('[data-calendar-prev]');
    const calendarNext = modal.querySelector('[data-calendar-next]');
    let ticketCount = 1;
    let selectedDate = null;
    let calendarDate = new Date();
    calendarDate.setDate(1);

    function getSelectedPrice() {
        const selectedOption = ticketOptions.find(function (option) {
            return option.checked;
        });

        return selectedOption ? Number(selectedOption.dataset.ticketPrice) : 15000;
    }

    function formatCurrency(value) {
        return 'Rp ' + value.toLocaleString('id-ID');
    }

    function updateTotal() {
        if (countOutput) {
            countOutput.textContent = String(ticketCount);
        }

        if (totalOutput) {
            totalOutput.textContent = formatCurrency(getSelectedPrice() * ticketCount);
        }
    }

    function formatDateValue(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    function formatDateLabel(date) {
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    function renderCalendar() {
        if (!calendarMonth || !calendarDays) {
            return;
        }

        const month = calendarDate.getMonth();
        const year = calendarDate.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarMonth.textContent = calendarDate.toLocaleDateString('id-ID', {
            month: 'long',
            year: 'numeric'
        });
        calendarDays.innerHTML = '';

        for (let blankIndex = 0; blankIndex < firstDay; blankIndex += 1) {
            const spacer = document.createElement('span');
            spacer.className = 'is-muted';
            spacer.setAttribute('aria-hidden', 'true');
            calendarDays.appendChild(spacer);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            const date = new Date(year, month, day);
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = String(day);

            if (selectedDate && formatDateValue(selectedDate) === formatDateValue(date)) {
                button.classList.add('is-selected');
            }

            button.addEventListener('click', function () {
                selectedDate = date;
                if (dateDisplay) {
                    dateDisplay.value = formatDateLabel(date);
                }
                if (dateValue) {
                    dateValue.value = formatDateValue(date);
                }
                if (dateField) {
                    dateField.classList.remove('is-open');
                }
                renderCalendar();
            });

            calendarDays.appendChild(button);
        }
    }

    function openModal() {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        updateTotal();

        const firstInput = modal.querySelector('input, button');
        if (firstInput) {
            firstInput.focus();
        }
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openButtons.forEach(function (button) {
        button.addEventListener('click', openModal);
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', closeModal);
    });

    ticketOptions.forEach(function (option) {
        option.addEventListener('change', updateTotal);
    });

    if (minusButton) {
        minusButton.addEventListener('click', function () {
            ticketCount = Math.max(1, ticketCount - 1);
            updateTotal();
        });
    }

    if (plusButton) {
        plusButton.addEventListener('click', function () {
            ticketCount += 1;
            updateTotal();
        });
    }

    if (dateField && dateDisplay && calendar) {
        dateDisplay.addEventListener('click', function () {
            dateField.classList.toggle('is-open');
            calendar.setAttribute('aria-hidden', dateField.classList.contains('is-open') ? 'false' : 'true');
            renderCalendar();
        });

        calendar.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        document.addEventListener('click', function (event) {
            if (!dateField.contains(event.target)) {
                dateField.classList.remove('is-open');
                calendar.setAttribute('aria-hidden', 'true');
            }
        });
    }

    if (calendarPrevious) {
        calendarPrevious.addEventListener('click', function () {
            calendarDate.setMonth(calendarDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (calendarNext) {
        calendarNext.addEventListener('click', function () {
            calendarDate.setMonth(calendarDate.getMonth() + 1);
            renderCalendar();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            closeModal();
        });
    }

    updateTotal();
    renderCalendar();
}

initializeNacTicketModal();
