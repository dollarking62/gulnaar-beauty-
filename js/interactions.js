/**
 * GULNAAR ATELIER — Interactions Engine
 * Draggable Slider, Hair Swatches, Beauty Quiz, Filters, Canvas Map, Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider();
  initTransformationTabs();
  initHairColorSelector();
  initBeautyQuiz();
  initFilterTabs();
  initPortfolioLightbox();
  initJournalModal();
  initAttributionModal();
  initStudioMapCanvas();
});

/**
 * 01. Draggable Before/After Comparison Slider
 */
let isDraggingSlider = false;

function initBeforeAfterSlider() {
  const container = document.querySelector('.comparison-container');
  const afterWrapper = document.querySelector('.comparison-image-after');
  const afterImg = document.querySelector('.comparison-image-after img');
  const handle = document.querySelector('.comparison-handle');
  if (!container || !afterWrapper || !handle) return;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    afterWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;

    // keep after image size aligned with container width
    if (afterImg) {
      afterImg.style.width = `${rect.width}px`;
    }
  }

  // Window resize sync for image width
  window.addEventListener('resize', () => {
    const rect = container.getBoundingClientRect();
    if (afterImg) afterImg.style.width = `${rect.width}px`;
  });

  // Mouse events
  handle.addEventListener('mousedown', (e) => {
    isDraggingSlider = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDraggingSlider = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingSlider) return;
    updateSliderPosition(e.clientX);
  });

  // Touch events for mobile / tablet
  handle.addEventListener('touchstart', (e) => {
    isDraggingSlider = true;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDraggingSlider = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDraggingSlider || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Initial alignment
  setTimeout(() => {
    const rect = container.getBoundingClientRect();
    if (afterImg) afterImg.style.width = `${rect.width}px`;
  }, 100);
}

/**
 * 02. Transformation Category Switcher Tabs
 */
function initTransformationTabs() {
  const tabButtons = document.querySelectorAll('[data-transform-category]');
  const beforeImg = document.querySelector('.comparison-image-before-img');
  const afterImg = document.querySelector('.comparison-image-after-img');
  const titleEl = document.querySelector('.transformation-title');
  const descEl = document.querySelector('.transformation-desc');

  if (!tabButtons.length || !beforeImg || !afterImg) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const catKey = btn.getAttribute('data-transform-category');
      const data = IMAGE_REGISTRY.transformations[catKey];
      if (!data) return;

      // Smooth fade
      beforeImg.style.opacity = '0';
      afterImg.style.opacity = '0';

      setTimeout(() => {
        beforeImg.src = data.before;
        afterImg.src = data.after;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        beforeImg.style.opacity = '1';
        afterImg.style.opacity = '1';
      }, 200);
    });
  });
}

/**
 * 03. Hair Color Swatch Selector
 */
function initHairColorSelector() {
  const swatchButtons = document.querySelectorAll('.hair-swatch-item');
  const previewImg = document.querySelector('.hair-preview-img');
  const nameEl = document.querySelector('.hair-color-name');
  const toneEl = document.querySelector('.hair-color-tone');
  const maintEl = document.querySelector('.hair-color-maint');
  const descEl = document.querySelector('.hair-color-desc');
  const explorerBox = document.querySelector('.hair-color-explorer');

  if (!swatchButtons.length || !previewImg) return;

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorKey = btn.getAttribute('data-color-key');
      const colorData = IMAGE_REGISTRY.hairColors[colorKey];
      if (!colorData) return;

      // Update image and text with smooth animation
      previewImg.style.opacity = '0';
      previewImg.style.transform = 'scale(0.98)';

      setTimeout(() => {
        previewImg.src = colorData.url;
        if (nameEl) nameEl.textContent = colorData.name;
        if (toneEl) toneEl.textContent = colorData.tone;
        if (maintEl) maintEl.textContent = colorData.maintenance;
        if (descEl) descEl.textContent = colorData.desc;

        if (explorerBox) {
          explorerBox.style.setProperty('--current-swatch-color', colorData.shadeHex);
        }

        previewImg.style.opacity = '1';
        previewImg.style.transform = 'scale(1)';
      }, 220);
    });
  });
}

/**
 * 04. Interactive 3-Factor Beauty Recommendation Quiz
 */
function initBeautyQuiz() {
  const quizState = {
    occasion: 'wedding',
    makeupStyle: 'glam',
    hairPreference: 'curls'
  };

  const occasionButtons = document.querySelectorAll('[data-quiz-occasion]');
  const styleButtons = document.querySelectorAll('[data-quiz-style]');
  const hairButtons = document.querySelectorAll('[data-quiz-hair]');

  const resultTitle = document.querySelector('.quiz-suggested-title');
  const resultDesc = document.querySelector('.quiz-suggested-desc');
  const resultImg = document.querySelector('.quiz-suggested-img');
  const resultPackage = document.querySelector('.quiz-suggested-package');
  const resultDuration = document.querySelector('.quiz-suggested-duration');
  const bookBtn = document.querySelector('.btn-quiz-book');

  function updateRecommendation() {
    let title = "Bespoke Royal Heritage Bridal Look";
    let desc = "Luminous porcelain base with antique kohl wings, velvet crimson lips, and sculpted traditional bridal coiffure.";
    let img = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80";
    let pkg = "Bridal Signature Couture";
    let duration = "4.5 Hours";
    let prefillService = "Bridal Makeup";

    if (quizState.occasion === 'wedding') {
      if (quizState.makeupStyle === 'natural') {
        title = "The Ethereal Pastel Wedding Look";
        desc = "Glass-skin hydration, soft rosewood cheeks, feathered brows, and low scented gajra bun.";
        img = "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80";
        pkg = "Pastel Bridal Harmony";
        duration = "4 Hours";
      } else {
        title = "Royal Heritage Bridal Majesty";
        desc = "High-definition long-wear bridal base, classic gold shimmer lids, deep berry stain, and royal matha patti setting.";
        img = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80";
        pkg = "Royal Bridal Transformation";
        duration = "Full Day Ceremony";
      }
    } else if (quizState.occasion === 'party' || quizState.occasion === 'photoshoot') {
      title = "Editorial Starlight Cocktail Glam";
      desc = "Smoky bronze lids, sculpted high-gloss cheekbones, and cascading textured waves.";
      img = "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80";
      pkg = "Celebration Look";
      duration = "2.5 Hours";
      prefillService = "Party Makeup";
    } else if (quizState.occasion === 'festive') {
      title = "Radiant Heritage Festival Glow";
      desc = "Warm honeyed undertones, traditional kajal definition, micro-bindi styling, and voluminous soft curls.";
      img = "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80";
      pkg = "Festive Radiance Ritual";
      duration = "2 Hours";
      prefillService = "Festive Makeup";
    } else {
      title = "Effortless Dewy Everyday Glow";
      desc = "Fresh tinted hydrator, brushed brows, tinted lip oil, and smooth glossy blow-dry.";
      img = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80";
      pkg = "Everyday Refresh";
      duration = "90 Minutes";
      prefillService = "Face Clean-Up";
    }

    if (resultTitle) resultTitle.textContent = title;
    if (resultDesc) resultDesc.textContent = desc;
    if (resultImg) resultImg.src = img;
    if (resultPackage) resultPackage.textContent = pkg;
    if (resultDuration) resultDuration.textContent = duration;

    // Attach prefill action
    if (bookBtn) {
      bookBtn.onclick = () => {
        const serviceSelect = document.getElementById('bookingService');
        const occasionSelect = document.getElementById('bookingOccasion');
        if (serviceSelect) serviceSelect.value = prefillService;
        if (occasionSelect) occasionSelect.value = quizState.occasion;

        const bookingSection = document.getElementById('appointment');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
  }

  // Attach button listeners
  occasionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      occasionButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizState.occasion = btn.getAttribute('data-quiz-occasion');
      updateRecommendation();
    });
  });

  styleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      styleButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizState.makeupStyle = btn.getAttribute('data-quiz-style');
      updateRecommendation();
    });
  });

  hairButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      hairButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizState.hairPreference = btn.getAttribute('data-quiz-hair');
      updateRecommendation();
    });
  });

  updateRecommendation();
}

/**
 * 05. Generic Filter Tabs (Makeup looks, Portfolio items, Occasions)
 */
function initFilterTabs() {
  const filterBars = document.querySelectorAll('.filter-tab-bar');

  filterBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.filter-tab-btn');
    const targetGridId = bar.getAttribute('data-target-grid');
    const targetGrid = document.getElementById(targetGridId);
    if (!targetGrid) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        const items = targetGrid.querySelectorAll('[data-category]');

        items.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCat === filterValue || itemCat.includes(filterValue)) {
            item.style.display = '';
            item.style.animation = 'fadeInModal 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
}

/**
 * 06. Portfolio Lightbox Modal
 */
function initPortfolioLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCredit = document.getElementById('lightboxCredit');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!modal || !modalImg || !portfolioItems.length) return;

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || 'Haute Coiffure & Beauty';
      const credit = item.getAttribute('data-credit') || 'Verified Real-World Photography';

      modalImg.src = img.src;
      modalTitle.textContent = title;
      modalCredit.textContent = credit;
      modal.classList.add('active');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/**
 * 07. Beauty Journal Article Modal
 */
const JOURNAL_ARTICLES = {
  1: {
    title: "The 30-Day Skin Preparation Calendar for Indian Brides",
    category: "Bridal Skincare",
    readingTime: "5 Min Read",
    body: `
      <p class="mb-4">Achieving a lit-from-within bridal luminosity begins weeks before the first sweep of foundation. For Indian wedding ceremonies involving intense haldi, mehndi, and multiple lighting shifts, cellular skin hydration is paramount.</p>
      <h4 class="font-serif text-gold text-xl my-3">Week 1–2: Deep Barrier Fortification</h4>
      <p class="mb-4">Transition into gentle enzyme cleansers and barrier-repairing ceramides. Avoid abrasive physical scrubs. Our aesthetician Dr. Shweta Rao recommends incorporating hyaluronic layering mist before sealers to lock moisture against air-conditioned mandaps.</p>
      <h4 class="font-serif text-gold text-xl my-3">Week 3: De-Tanning & Saffron Infusions</h4>
      <p class="mb-4">Gentle botanical fruit peels eliminate uneven hyperpigmentation around the mouth and forehead without creating photo-sensitivity. Drink warm golden saffron milk infused with crushed almonds for internal radiance.</p>
      <h4 class="font-serif text-gold text-xl my-3">Final 72 Hours: Calming & Cryo-Prep</h4>
      <p class="mb-4">The final step is chilled rose quartz contouring, pure 24K gold serum infusion, and zero new active chemicals. Ensure 8 hours of uninterrupted rest so your wedding morning base glides seamlessly.</p>
    `
  },
  2: {
    title: "Choosing the Perfect Hair Color for Warm Indian Undertones",
    category: "Color Artistry",
    readingTime: "4 Min Read",
    body: `
      <p class="mb-4">Indian hair is naturally rich in eumelanin, offering incredible depth and resilience. When introducing dimensional color, the secret lies in balancing the underlying red and orange pigments.</p>
      <h4 class="font-serif text-gold text-xl my-3">Golden Olive vs. Cool Wheat Complexions</h4>
      <p class="mb-4">For golden and warm olive skin tones, sun-kissed caramel melts, honeyed hazelnut, and warm chocolate provide an instant radiance lift without washing out your facial features.</p>
      <h4 class="font-serif text-gold text-xl my-3">The Power of Velvet Burgundy Noir</h4>
      <p class="mb-4">Velvet burgundy introduces dramatic jewel tones that catch natural sunlight while remaining seamlessly professional and subtle indoors. It pairs exquisitely with traditional red and green silk sarees.</p>
    `
  },
  3: {
    title: "Day Wedding vs. Evening Reception: Makeup Transition Secrets",
    category: "Masterclass",
    readingTime: "6 Min Read",
    body: `
      <p class="mb-4">Many Indian celebrations require transitioning seamlessly from a bright, outdoor morning Anand Karaj or Phera ceremony to a glamorous, starlight evening reception.</p>
      <h4 class="font-serif text-gold text-xl my-3">Mastering Daylight Luminescence</h4>
      <p class="mb-4">Daylight demands breathable, skin-like micro-coverage with soft peach or rosewood stains. Harsh black kohl can appear heavy in high noon sun; instead, opt for smudged espresso liner and sheer golden lid reflections.</p>
      <h4 class="font-serif text-gold text-xl my-3">The Evening Metamorphosis</h4>
      <p class="mb-4">As tungsten and ballroom chandeliers turn on, our lead artist Tarunika Varma deepens the crease with smoky bronze velvet, intensifies the lash line, and layers a high-pigment berry glaze to reflect evening candlelight.</p>
    `
  }
};

function initJournalModal() {
  const modal = document.getElementById('journalModal');
  const titleEl = document.getElementById('journalModalTitle');
  const catEl = document.getElementById('journalModalCat');
  const bodyEl = document.getElementById('journalModalBody');
  const closeBtn = document.getElementById('closeJournalBtn');
  const cards = document.querySelectorAll('[data-journal-id]');

  if (!modal || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-journal-id');
      const article = JOURNAL_ARTICLES[id];
      if (!article) return;

      titleEl.textContent = article.title;
      catEl.textContent = `${article.category} • ${article.readingTime}`;
      bodyEl.innerHTML = article.body;
      modal.classList.add('active');
    });
  });

  function closeJournal() {
    modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeJournal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeJournal();
  });
}

/**
 * 08. Image Attribution Modal
 */
function initAttributionModal() {
  const modal = document.getElementById('attributionModal');
  const triggerBtn = document.getElementById('openAttributionsBtn');
  const closeBtn = document.getElementById('closeAttributionBtn');
  const listContainer = document.getElementById('attributionList');

  if (!modal || !triggerBtn || !listContainer) return;

  const attributions = getAttributionList();
  listContainer.innerHTML = attributions.map(item => `
    <div style="padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <div style="font-weight: 600; color: var(--color-gold-warm); font-size: 0.95rem;">${item.title}</div>
      <div style="font-size: 0.8rem; color: var(--color-taupe-light); margin-top: 4px;">
        Photographer: <span style="color: #fff;">${item.photographer}</span> | Source: <span style="color: #fff;">${item.source}</span>
      </div>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.72rem; color: var(--color-dusty-rose-light); text-decoration: underline; margin-top: 4px; display: inline-block;">
        View Verified Web Source ↗
      </a>
    </div>
  `).join('');

  triggerBtn.addEventListener('click', () => modal.classList.add('active'));

  function closeAttributions() {
    modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeAttributions);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAttributions();
  });
}

/**
 * 09. Interactive Dark-Themed Canvas Map for Bangalore Location
 */
function initStudioMapCanvas() {
  const canvas = document.getElementById('studioMapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    drawMap();
  }

  function drawMap() {
    const w = canvas.width;
    const h = canvas.height;

    // Background espresso luxury tone
    ctx.fillStyle = "#14080F";
    ctx.fillRect(0, 0, w, h);

    // Subtle grid gridlines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Curving golden avenue: Lavelle Road & Vittal Mallya
    ctx.strokeStyle = "rgba(212, 175, 55, 0.28)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.2);
    ctx.bezierCurveTo(w * 0.4, h * 0.35, w * 0.5, h * 0.7, w * 0.85, h * 0.85);
    ctx.stroke();

    // Cross arterial: Richmond Road
    ctx.strokeStyle = "rgba(212, 175, 55, 0.18)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.8);
    ctx.lineTo(w * 0.8, h * 0.25);
    ctx.stroke();

    // Lush green landmark representation (Cubbon Park)
    ctx.fillStyle = "rgba(46, 125, 50, 0.12)";
    ctx.beginPath();
    ctx.arc(w * 0.28, h * 0.3, 70, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "10px Manrope";
    ctx.fillText("Cubbon Park Enclave", w * 0.22, h * 0.3);
    ctx.fillText("UB City Luxury Mall", w * 0.65, h * 0.35);

    // Studio Location Center Point
    const studioX = w * 0.52;
    const studioY = h * 0.55;

    // Glowing pulsating outer aura
    const gradient = ctx.createRadialGradient(studioX, studioY, 5, studioX, studioY, 36);
    gradient.addColorStop(0, "rgba(212, 175, 55, 0.6)");
    gradient.addColorStop(1, "rgba(74, 14, 28, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(studioX, studioY, 36, 0, Math.PI * 2);
    ctx.fill();

    // Golden Pin Marker
    ctx.fillStyle = "#D4AF37";
    ctx.beginPath();
    ctx.arc(studioX, studioY, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#380712";
    ctx.beginPath();
    ctx.arc(studioX, studioY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Marker Tag
    ctx.fillStyle = "#FFFDF9";
    ctx.font = "bold 12px Cormorant Garamond";
    ctx.fillText("GULNAAR ATELIER", studioX + 16, studioY + 4);
    ctx.fillStyle = "rgba(212, 175, 55, 0.8)";
    ctx.font = "9px Manrope";
    ctx.fillText("Heritage Crescent, Lavelle Rd", studioX + 16, studioY + 18);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}
