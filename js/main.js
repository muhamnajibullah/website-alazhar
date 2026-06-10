/**
 * Mengatur buka tutup menu utama pada layar kecil.
 * Function ini menjaga status aria-expanded agar menu tetap mudah diakses.
 */
function initializeMobileNavigation() {
    const navigation = document.querySelector('.main-nav');
    const toggleButton = document.querySelector('.nav-toggle');

    if (!navigation || !toggleButton) {
        return;
    }

    toggleButton.addEventListener('click', function () {
        const isOpen = navigation.classList.toggle('is-open');
        toggleButton.setAttribute('aria-expanded', String(isOpen));
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
 * Mengatur carousel Program Pendidikan agar bisa digeser dengan tombol maupun scroll horizontal.
 * Function ini juga memperbarui warna timeline berdasarkan slide program yang paling dekat dengan viewport.
 */
function initializeProgramCarousel() {
    const programSection = document.querySelector('.program-section');
    const track = document.querySelector('[data-program-track]');
    const progressBar = document.querySelector('[data-program-progress]');
    const previousButton = document.querySelector('[data-program-prev]');
    const nextButton = document.querySelector('[data-program-next]');

    if (!programSection || !track || !progressBar || !previousButton || !nextButton) {
        return;
    }

    const slides = Array.from(track.querySelectorAll('.program-slide'));
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;

    /**
     * Mengambil index slide yang paling dekat dengan posisi scroll saat ini.
     * @returns {number} Index slide aktif.
     */
    function getActiveSlideIndex() {
        const slideDistances = slides.map(function (slide) {
            return Math.abs(slide.offsetLeft - track.scrollLeft);
        });
        return slideDistances.indexOf(Math.min.apply(null, slideDistances));
    }

    /**
     * Memperbarui tema warna dan status tombol berdasarkan slide aktif.
     */
    function updateProgramState() {
        const activeIndex = Math.min(Math.max(getActiveSlideIndex(), 0), slides.length - 1);
        const activeSlide = slides[activeIndex];
        const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 1);
        const scrollProgress = Math.min(Math.max(track.scrollLeft / maxScrollLeft, 0), 1);

        programSection.dataset.activeTheme = activeSlide.dataset.theme || 'tk';
        previousButton.disabled = activeIndex === 0;
        nextButton.disabled = activeIndex === slides.length - 1;
        progressBar.style.setProperty('--program-scroll-progress', scrollProgress.toFixed(4));
    }

    /**
     * Menggeser carousel satu slide ke kiri atau kanan.
     * @param {number} direction Arah pergeseran, -1 untuk kiri dan 1 untuk kanan.
     */
    function scrollProgram(direction) {
        const activeIndex = getActiveSlideIndex();
        const targetIndex = Math.min(Math.max(activeIndex + direction, 0), slides.length - 1);
        slides[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    /**
     * Memulai mode drag horizontal pada track carousel.
     * @param {PointerEvent} event Event pointer dari mouse atau touch.
     */
    function startDrag(event) {
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

        event.preventDefault();
        track.scrollLeft = dragStartScrollLeft - (event.clientX - dragStartX);
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
        track.releasePointerCapture(event.pointerId);
        slides[getActiveSlideIndex()].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    previousButton.addEventListener('click', function () {
        scrollProgram(-1);
    });

    nextButton.addEventListener('click', function () {
        scrollProgram(1);
    });

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
