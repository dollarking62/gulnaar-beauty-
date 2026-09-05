/**
 * GULNAAR ATELIER — Core Application Engine
 * Mobile Navigation, Smooth Scrolling, Luxury Booking Form Validation & States
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initSmoothScroll();
  initBookingForm();
});

/**
 * 01. Full-Screen Mobile Navigation Overlay
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.menu-toggle-btn');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-footer a');

  if (!toggleBtn || !overlay) return;

  function toggleMenu() {
    const isOpen = overlay.classList.contains('active');
    if (isOpen) {
      overlay.classList.remove('active');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      overlay.classList.add('active');
      toggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 02. Smooth Anchor Navigation with Fixed Header Offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const headerOffset = 76;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * 03. Frontend-Only Luxury Appointment Booking Form
 */
function initBookingForm() {
  const form = document.getElementById('appointmentForm');
  const successCard = document.getElementById('bookingSuccessCard');
  const submitBtn = document.getElementById('btnSubmitBooking');
  const resetBtn = document.getElementById('btnResetBooking');

  if (!form) return;

  // Set minimum date to tomorrow
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  function validateField(input, condition, errorMsgId) {
    const errorEl = document.getElementById(errorMsgId);
    if (!condition) {
      input.classList.add('error');
      if (errorEl) errorEl.classList.add('visible');
      return false;
    } else {
      input.classList.remove('error');
      if (errorEl) errorEl.classList.remove('visible');
      return true;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('bookingName');
    const phoneInput = document.getElementById('bookingPhone');
    const emailInput = document.getElementById('bookingEmail');
    const serviceInput = document.getElementById('bookingService');
    const dateInput = document.getElementById('bookingDate');
    const timeInput = document.getElementById('bookingTime');

    // Validation rules
    const isNameValid = validateField(
      nameInput,
      nameInput.value.trim().length >= 2,
      'errBookingName'
    );

    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    const isPhoneValid = validateField(
      phoneInput,
      phoneDigits.length >= 10,
      'errBookingPhone'
    );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = validateField(
      emailInput,
      emailRegex.test(emailInput.value.trim()),
      'errBookingEmail'
    );

    const isServiceValid = validateField(
      serviceInput,
      serviceInput.value !== '',
      'errBookingService'
    );

    const isDateValid = validateField(
      dateInput,
      dateInput.value !== '',
      'errBookingDate'
    );

    const isTimeValid = validateField(
      timeInput,
      timeInput.value !== '',
      'errBookingTime'
    );

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isServiceValid || !isDateValid || !isTimeValid) {
      return;
    }

    // Trigger Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span style="display:inline-block; width:14px; height:14px; border:2px solid #fff; border-top-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite; margin-right:8px;"></span>
      Securing Private Appointment...
    `;
    submitBtn.disabled = true;

    // Simulate luxury concierge scheduling latency
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Populate Success Summary
      const refCode = `GLN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const confRef = document.getElementById('confRefCode');
      const confName = document.getElementById('confClientName');
      const confService = document.getElementById('confChosenService');
      const confDateTime = document.getElementById('confChosenDateTime');

      if (confRef) confRef.textContent = refCode;
      if (confName) confName.textContent = nameInput.value.trim();
      if (confService) confService.textContent = serviceInput.value;
      if (confDateTime) confDateTime.textContent = `${dateInput.value} at ${timeInput.value}`;

      // Transition to success card
      form.style.display = 'none';
      if (successCard) {
        successCard.classList.add('active');
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1100);
  });

  // Reset Booking Form action
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successCard) successCard.classList.remove('active');
    });
  }
}
