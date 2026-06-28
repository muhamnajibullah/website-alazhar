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
            '<a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>',
            '<a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>',
            '</div>',
        ].join('');
        menu.appendChild(footer);
    }

    let closeTimer = null;

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
        if (!navigation.classList.contains('is-open')) {
            return;
        }

        toggleButton.setAttribute('aria-expanded', 'false');
        closeDropdowns();

        if (window.innerWidth <= 768) {
            navigation.classList.add('is-closing');
            document.body.classList.add('mobile-nav-closing');
            window.clearTimeout(closeTimer);
            closeTimer = window.setTimeout(function () {
                navigation.classList.remove('is-open', 'is-closing');
                document.body.classList.remove('mobile-nav-open', 'mobile-nav-closing');
            }, 460);
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
        navigation.classList.remove('is-closing');
        document.body.classList.remove('mobile-nav-closing');
        navigation.classList.add('is-open');
        document.body.classList.add('mobile-nav-open');
        toggleButton.setAttribute('aria-expanded', 'true');
    });

    document.addEventListener('click', function (event) {
        if (navigation.classList.contains('is-open') && !navigation.contains(event.target)) {
            closeMobileNavigation();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
            closeMobileNavigation();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMobileNavigation();
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
