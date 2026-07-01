// ============================================
// MOBILE NAV TOGGLE — HAMBURGER ONLY
// Menu only opens when hamburger is explicitly clicked.
// No automatic swipe-to-open gestures.
// ============================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    function closeNavMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function toggleNavMenu(e) {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        
        /* Prevent body scroll while menu is open */
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    /* Hamburger button is the ONLY trigger */
    navToggle.addEventListener('click', toggleNavMenu);

    /* Close menu when a link is tapped (not on swipe) */
    navMenu.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', closeNavMenu);
    });

    /* Close menu when tapping outside of it */
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeNavMenu();
        }
    });

    /* Close on resize back to desktop */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeNavMenu();
    });
}

// ============================================
// SCROLL-REVEAL ANIMATIONS — INTERSECTION OBSERVER
// Elements with .reveal or .reveal-group fade in
// and slide up as they enter the viewport.
// ============================================

(function initScrollReveal() {
    /* Only set up observer if the browser supports it */
    if (!('IntersectionObserver' in window)) {
        /* Fallback: immediately show all reveals on older browsers */
        document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observerOptions = {
        root: null,           /* viewport */
        rootMargin: '0px 0px -80px 0px',  /* trigger 80px before element exits bottom */
        threshold: 0.1        /* at least 10% visible */
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                /* Element is in viewport — make it visible */
                entry.target.classList.add('visible');
                /* Stop observing this element (animation only triggers once) */
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    /* Observe all reveal elements on the page */
    document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
        revealObserver.observe(el);
    });
})();

// =========================
// SLIDER DATA
// =========================

const slides = [
    {
        image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
        title: "Elegant Wedding Experiences",
        description: "Creating memorable wedding moments with timeless elegance."
    },
    {
        image: "https://images.unsplash.com/photo-1544078751-58fed2b84d57?auto=format&fit=crop&w=1200&q=80",
        title: "Luxury Event Styling",
        description: "Beautiful decor and styling tailored for modern celebrations."
    },
    {
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
        title: "Professional Coordination",
        description: "Carefully planned events executed with precision and care."
    },
    {
        image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=1200&q=80",
        title: "Memories That Last Forever",
        description: "Turning wedding visions into unforgettable experiences."
    }
];

const valueSection = document.querySelector(".value-section");
const slideTitle = document.getElementById("slide-title");
const slideDescription = document.getElementById("slide-description");
const dots = document.querySelectorAll(".dot");

if (valueSection && slideTitle && slideDescription) {
    let valueSlideIndex = 0;
    let valueSlideInterval;

    function changeSlide(index){
        valueSlideIndex = parseInt(index);
        valueSection.style.backgroundImage = `url('${slides[valueSlideIndex].image}')`;
        slideTitle.textContent = slides[valueSlideIndex].title;
        slideDescription.textContent = slides[valueSlideIndex].description;
        dots.forEach(dot => dot.classList.remove("active"));
        if(dots[valueSlideIndex]) dots[valueSlideIndex].classList.add("active");
    }

    function startValueAutoSlide() {
        valueSlideInterval = setInterval(() => {
            let nextIndex = valueSlideIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            changeSlide(nextIndex);
        }, 5000);
    }

    function resetValueAutoSlide() {
        clearInterval(valueSlideInterval);
        startValueAutoSlide();
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            changeSlide(dot.dataset.slide);
            resetValueAutoSlide();
        });
    });

    // Start initial auto slide
    startValueAutoSlide();
}

// =========================
// TESTIMONIAL DATA
// =========================

const testimonials = [
    {
        initials: "SJ",
        name: "Sarah Johnson",
        text: "The team created an unforgettable wedding experience that exceeded every expectation we had.",
        stars: "★★★★★"
    },
    {
        initials: "MA",
        name: "Michael & Anne",
        text: "Everything was beautifully organized and professionally handled from beginning to end.",
        stars: "★★★★★"
    },
    {
        initials: "GW",
        name: "Grace Wanjiku",
        text: "The decor, coordination, and attention to detail made our wedding feel truly magical.",
        stars: "★★★★★"
    },
    {
        initials: "DK",
        name: "David Kimani",
        text: "Our guests still talk about how elegant and seamless the entire event felt.",
        stars: "★★★★★"
    }
];

const testimonialCard = document.querySelector(".testimonial-card");
const testimonialAvatar = document.getElementById("testimonial-avatar");
const testimonialName = document.getElementById("testimonial-name");
const testimonialText = document.getElementById("testimonial-text");
const testimonialStars = document.getElementById("testimonial-stars");

if (testimonialCard) {
    let testimonialIndex = 0;

    function updateTestimonial(){
        testimonialCard.style.opacity = 0;
        setTimeout(() => {
            testimonialIndex++;
            if(testimonialIndex >= testimonials.length){
                testimonialIndex = 0;
            }
            if(testimonialAvatar) testimonialAvatar.textContent = testimonials[testimonialIndex].initials;
            testimonialName.textContent = testimonials[testimonialIndex].name;
            testimonialText.textContent = testimonials[testimonialIndex].text;
            testimonialStars.textContent = testimonials[testimonialIndex].stars;
            testimonialCard.style.opacity = 1;
        }, 500);
    }

    setInterval(updateTestimonial, 5000);
}

// ============================================
// IMAGE CAROUSEL
// ============================================

const track = document.getElementById('carousel-track');
if (track) {
    const prevBtn   = document.getElementById('carousel-prev');
    const nextBtn   = document.getElementById('carousel-next');
    const cards     = Array.from(track.querySelectorAll('.carousel-card'));
    let currentIndex = cards.length > 2 ? 2 : 0;
    const positionClasses = ['position-left-2', 'position-left-1', 'position-center', 'position-right-1', 'position-right-2'];

    function updateCarousel() {
      const totalCards = cards.length;
      cards.forEach((card, i) => {
        card.classList.remove('position-center', 'position-left-1', 'position-left-2', 'position-right-1', 'position-right-2', 'position-hidden');
        let offset = i - currentIndex;
        if (offset > totalCards / 2) offset -= totalCards;
        else if (offset < -totalCards / 2) offset += totalCards;

        if (offset >= -2 && offset <= 2) {
          card.classList.add(positionClasses[offset + 2]);
        } else {
          card.classList.add('position-hidden');
        }
      });
    }

    if(prevBtn) prevBtn.addEventListener('click', function () {
      if (currentIndex === 0) currentIndex = cards.length - 1;
      else currentIndex--;
      updateCarousel();
    });

    if(nextBtn) nextBtn.addEventListener('click', function () {
      if (currentIndex === cards.length - 1) currentIndex = 0;
      else currentIndex++;
      updateCarousel();
    });

    cards.forEach((card, index) => {
      card.addEventListener('click', function () {
        currentIndex = index;
        updateCarousel();
      });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50; 
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && nextBtn) nextBtn.click();
        else if (prevBtn) prevBtn.click();
      }
    }
    updateCarousel();
}

// ============================================
// FEATURED WEDDING STORIES CAROUSEL
// ============================================

const smallTrack = document.getElementById('stories-small-track');
if (smallTrack) {
    const smallCards     = Array.from(smallTrack.querySelectorAll('.stories-small-card'));
    const featuredIframe = document.getElementById('featured-iframe');
    const storiesPrev    = document.getElementById('stories-prev');
    const storiesNext    = document.getElementById('stories-next');
    let storiesStartIndex = 0;
    const VISIBLE_COUNT = 3;
    const CARD_WIDTH = 117;
    const CARD_GAP   = 10;

    function updateStoriesTrack() {
      const scrollAmount = storiesStartIndex * (CARD_WIDTH + CARD_GAP);
      smallTrack.scrollLeft = scrollAmount;
    }

    function swapToFeatured(card) {
      const videoId = card.getAttribute('data-video-id');
      if (featuredIframe) {
          featuredIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
      }
    }

    smallCards.forEach(function(card) {
      const overlay = card.querySelector('.stories-small-card__overlay');
      if (overlay) {
          overlay.addEventListener('click', function() {
            swapToFeatured(card);
          });
      }
    });

    if(storiesPrev) storiesPrev.addEventListener('click', function() {
      if (storiesStartIndex > 0) {
        storiesStartIndex--;
        updateStoriesTrack();
      }
    });

    if(storiesNext) storiesNext.addEventListener('click', function() {
      if (storiesStartIndex < smallCards.length - VISIBLE_COUNT) {
        storiesStartIndex++;
        updateStoriesTrack();
      }
    });

    smallTrack.style.overflowX = 'scroll';
    smallTrack.style.scrollbarWidth = 'none';    
    smallTrack.style.msOverflowStyle = 'none';   

    const styleTag = document.createElement('style');
    styleTag.textContent = '.stories-small-track::-webkit-scrollbar { display: none; }';
    document.head.appendChild(styleTag);

    updateStoriesTrack();
}

// ============================================
// CONTACT FORM — EmailJS Integration
// ============================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('u0XDWOWKdXwPO1l_7');
  }

  const submitBtn    = document.getElementById('submit-btn');
  const formSuccess  = document.getElementById('form-success');
  const formError    = document.getElementById('form-error');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(formSuccess) formSuccess.style.display = 'none';
    if(formError) formError.style.display   = 'none';
    if(submitBtn) {
        submitBtn.disabled     = true;
        submitBtn.textContent  = 'Sending...';
    }

    if (typeof emailjs !== 'undefined') {
        emailjs.sendForm('service_y179vul', 'template_1fshw3w', contactForm)
        .then(function() {
          if(formSuccess) formSuccess.style.display = 'block';
          contactForm.reset();
          if(submitBtn){
              submitBtn.disabled    = false;
              submitBtn.textContent = 'Send Message';
          }
        })
        .catch(function(error) {
          if(formError) formError.style.display = 'block';
          console.error('EmailJS error:', error);
          if(submitBtn){
              submitBtn.disabled    = false;
              submitBtn.textContent = 'Send Message';
          }
        });
    }
  });
}

// ============================================
// CUSTOM CURSOR & MICRO-INTERACTIONS
// ============================================

// Create cursor elements
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorOutline);

// Move cursor
window.addEventListener('mousemove', function(e) {
  const posX = e.clientX;
  const posY = e.clientY;
  
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 300, fill: "forwards" });
});

// Add hover effect to interactive elements
const interactives = document.querySelectorAll('a, button, .service-card, .gallery-image, .dot');

interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.classList.add('cursor-hover');
    cursorDot.classList.add('cursor-hover');
  });
  
  el.addEventListener('mouseleave', () => {
    cursorOutline.classList.remove('cursor-hover');
    cursorDot.classList.remove('cursor-hover');
  });
});

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Select all sections except the hero and navbar, and add animate-on-scroll
const sectionsToAnimate = document.querySelectorAll('section:not(.gallery-hero):not(.hero-section)');
sectionsToAnimate.forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});
// ============================================
// FLOATING ACTION BUTTONS — WhatsApp + Scroll to Top
// Injected once on every page that loads this script.
// ============================================

(function () {
    const wrapper = document.createElement('div');
    wrapper.className = 'float-actions';

    wrapper.innerHTML = `
        <a class="float-btn float-btn--whatsapp" href="https://wa.me/254117665899" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
            <svg viewBox="0 0 32 32" fill="white"><path d="M16.04 4C9.6 4 4.36 9.2 4.36 15.6c0 2.1.56 4.06 1.54 5.76L4 28l6.84-1.8a11.7 11.7 0 0 0 5.2 1.23h.01c6.43 0 11.67-5.2 11.67-11.6C27.72 9.2 22.48 4 16.04 4zm0 21.2h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-4.06 1.07 1.08-3.96-.23-.4a9.55 9.55 0 0 1-1.46-5.16c0-5.3 4.33-9.6 9.94-9.6 2.66 0 5.15 1.03 7.03 2.9a9.5 9.5 0 0 1 2.91 6.7c0 5.3-4.33 9.6-9.95 9.6zm5.45-7.2c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.1 4.5.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
        </a>
        <button class="float-btn float-btn--top" id="scroll-to-top" aria-label="Back to top">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>
        </button>
    `;

    document.body.appendChild(wrapper);

    const topBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            topBtn.classList.add('is-visible');
        } else {
            topBtn.classList.remove('is-visible');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ============================================
// HERO SVG ILLUSTRATION — TAP TO SPARKLE
// Mobile-only decorative interaction: tapping the
// hero background spawns a little burst of sparkles
// at the touch point. Uses passive event listeners
// to avoid blocking browser scroll performance.
// ============================================

const heroIllustration = document.getElementById('hero-bg-illustration');

if (heroIllustration) {
    function spawnSparkles(x, y) {
        const count = 5;
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'hbi-sparkle';

            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
            const distance = 14 + Math.random() * 18;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            sparkle.style.left = `${x + offsetX}px`;
            sparkle.style.top = `${y + offsetY}px`;
            sparkle.style.animationDelay = `${i * 0.04}s`;

            heroIllustration.appendChild(sparkle);

            sparkle.addEventListener('animationend', () => sparkle.remove());
            // Safety cleanup in case animationend doesn't fire
            setTimeout(() => sparkle.remove(), 1200);
        }
    }

    function handleHeroTap(e) {
        const rect = heroIllustration.getBoundingClientRect();
        const point = e.changedTouches ? e.changedTouches[0] : e;
        const x = point.clientX - rect.left;
        const y = point.clientY - rect.top;
        spawnSparkles(x, y);
    }

    /* Click for desktop */
    heroIllustration.addEventListener('click', handleHeroTap);
    
    /* Touch for mobile — passive: true lets browser optimize scroll perf */
    heroIllustration.addEventListener('touchstart', handleHeroTap, { passive: true });
}
