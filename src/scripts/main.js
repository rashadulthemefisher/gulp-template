(function () {
  "use strict";
  // toggle mobile nav
 const navToggleBtn = document.getElementById("nav-toggle-btn");
  const navMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  navToggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("hidden");

    if (isOpen) {
      navMenu.classList.remove("hidden");
      hamburgerIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
      navToggleBtn.setAttribute("aria-expanded", "true");
    } else {
      navMenu.classList.add("hidden");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
      navToggleBtn.setAttribute("aria-expanded", "false");
    }
  });


  // Theme switcher
  // ----------------------------------------
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
    },
  });

   // Scan Animation start
  const scanBar = document.getElementById('scan-bar');
  let position = 60;

  function animateScan() {
    position -= 0.1;

    // Reset when fully above
    if (position < 15) {
      position = 60;
    }

    scanBar.style.top = `${position}%`;
    requestAnimationFrame(animateScan);
  }

  animateScan();
  // Scan Animation end
  function animateCount(element, start, end, duration, suffix = '') {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  // Function to initialize counting for all numbers
  function initCountAnimations() {
    // Select all elements containing numbers to animate
    const numberElements = document.querySelectorAll(`
      .text-yellow-400, /* For 59%, 75%, 76% */
      .text-2xl, /* For 100% */
      .text-[28px], /* For 63%, 24%, 13% */
      .text-4xl /* For 400% */
    `);

    // Intersection Observer to trigger animation when in view
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.textContent;
          const match = text.match(/^(\d+)(%?)$/); // Match numbers and optional % suffix
          if (match) {
            const number = parseInt(match[1]);
            const suffix = match[2] || '';
            animateCount(element, 0, number, 2000, suffix); // 2000ms = 2 seconds
            observer.unobserve(element); // Stop observing after animation
          }
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of element is visible

    // Observe each number element
    numberElements.forEach(element => observer.observe(element));
  }

  // Run when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initCountAnimations);
  // countup started
      document.addEventListener("DOMContentLoaded", () => {
      const counters = document.querySelectorAll('.counter');
      const speed = 50; // Lower = faster

      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const current = +counter.innerText;
          const increment = Math.ceil(target / speed);

          if (current < target) {
            counter.innerText = current + increment;
            setTimeout(updateCount, 30); // Animation speed
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });
    });
  // countup ended

//-------------------industries-----------------------------
//..................
const container = document.getElementById("cardContainer");
const cards = document.querySelectorAll("[data-card]");

// Width classes
const normalWidth = "w-[260px]";
const activeWidth = "w-[435px]";

// Initial setup: all cards small, first one active
cards.forEach((c, i) => {
  c.classList.add(normalWidth);
  if (i === 0) {
    c.classList.replace(normalWidth, activeWidth);
    c.classList.add("active-card");
  }
});

// Hover logic
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Remove active from all
    cards.forEach((c) => {
      c.classList.remove(activeWidth, "active-card");
      c.classList.add(normalWidth);
    });

    // Set hovered card as active
    card.classList.remove(normalWidth);
    card.classList.add(activeWidth, "active-card");
  });
});
// FAQ
document.querySelectorAll(".faq-item").forEach((item) => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    // Close all other open items
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("open");
      }
    });

    // Toggle current item
    item.classList.toggle("open");
  });
});

//---------
 const arrowBtn = document.getElementById('arrowBtn');
  const tagButtons = document.getElementById('tagButtons');

  // Show on hover in
  arrowBtn.addEventListener('mouseenter', () => {
    tagButtons.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    tagButtons.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
  });

  // Hide on leave of parent wrapper
  arrowBtn.parentElement.addEventListener('mouseleave', () => {
    tagButtons.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    tagButtons.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
  });
//-----

//............
  // Accordion
  // ----------------------------------------
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });
// ber

  // Modal
  // ----------------------------------------
  const openModalButtons = document.querySelectorAll("[data-modal-open]");
  const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  function openModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.nextElementSibling;
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      closeModal(modal);
    });
  });
})();
