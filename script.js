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
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("nav-open");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            navLinks.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("nav-open");
        }
    });
}

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
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
        name: "Sarah Johnson",
        text: "The team created an unforgettable wedding experience that exceeded every expectation we had.",
        stars: "★★★★★"
    },
    {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
        name: "Michael & Anne",
        text: "Everything was beautifully organized and professionally handled from beginning to end.",
        stars: "★★★★★"
    },
    {
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
        name: "Grace Wanjiku",
        text: "The decor, coordination, and attention to detail made our wedding feel truly magical.",
        stars: "★★★★★"
    },
    {
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
        name: "David Kimani",
        text: "Our guests still talk about how elegant and seamless the entire event felt.",
        stars: "★★★★★"
    }
];

const testimonialCard = document.querySelector(".testimonial-card");
const testimonialImage = document.getElementById("testimonial-image");
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
            testimonialImage.src = testimonials[testimonialIndex].image;
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
