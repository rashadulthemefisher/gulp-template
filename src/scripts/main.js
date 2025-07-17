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

//team cards
  document.addEventListener("DOMContentLoaded", function () {
    const homeSection = document.getElementById('home-page');
    if (!homeSection) return; // Only limit cards on home page

    const cards = homeSection.querySelectorAll(".team-card");
    const maxVisible = 4;

    cards.forEach((card, index) => {
      if (index >= maxVisible) {
        card.style.display = "none";
      }
    });
  });

// Blog cards
document.addEventListener("DOMContentLoaded", function () {
  // CASE 1: blog-page (just 3 cards, no button)
  const blogPage = document.getElementById("blog-page");
  if (blogPage) {
    const cards = blogPage.querySelectorAll(".blog-card");
    const maxShow = 3;

    cards.forEach((card, index) => {
      card.style.display = index < maxShow ? "block" : "none";
    });

    // Hide Load More if present accidentally
    const wrapper = document.getElementById("blog-load-more-wrapper");
    if (wrapper) wrapper.style.display = "none";

    return; // Exit here, don’t run rest
  }

  // CASE 2: blog-section (6 initial, load more if >6)
  const blogSection = document.getElementById("blog-section");
  if (blogSection) {
    const cards = blogSection.querySelectorAll(".blog-card");
    const loadMoreWrapper = document.getElementById("blog-load-more-wrapper");
    const loadMoreBtn = document.getElementById("blog-load-more-btn");
    const maxInitial = 6;

    // If cards ≤ 6, show all & hide button
    if (cards.length <= maxInitial) {
      loadMoreWrapper.style.display = "none";
    } else {
      // Show only initial cards
      cards.forEach((card, index) => {
        card.style.display = index < maxInitial ? "block" : "none";
      });

      // Show hidden cards on button click
      loadMoreBtn.addEventListener("click", () => {
        cards.forEach((card) => (card.style.display = "block"));
        loadMoreWrapper.style.display = "none";
      });
    }
  }
});




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
  // document.addEventListener('DOMContentLoaded', initCountAnimations);
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
const cards = document.querySelectorAll("[data-card]");

// Individual expanded widths (in flex form)
const expandedFlexes = [
  "md:flex-[0_0_400px]",   // Card 1
  "md:flex-[0_0_353.4px]", // Card 2
  "md:flex-[0_0_359.4px]", // Card 3
  "md:flex-[0_0_353.58px]" // Card 4
];

const defaultFlex = "md:flex-[1_1_285px]";
const expandedHeight = "md:h-[620px]";
const defaultHeight = "md:h-[620px]";

cards.forEach((card, index) => {
  // Initial active card
  if (index === 0) {
    card.classList.add(expandedFlexes[0], expandedHeight);
    card.classList.remove(defaultFlex);
  }

  card.addEventListener("mouseenter", () => {
    if (window.innerWidth >= 768) {
      cards.forEach((c, i) => {
        c.classList.remove(...expandedFlexes);
        c.classList.remove("active");
        c.classList.add(defaultFlex, defaultHeight);
      });

      card.classList.remove(defaultFlex);
      card.classList.add(expandedFlexes[index], "active", expandedHeight);
    }
  });

  card.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      cards.forEach((c) => {
        c.classList.remove("h-[353px]");
        c.classList.add("h-[285px]");
      });
      card.classList.remove("h-[285px]");
      card.classList.add("h-[353px]");
    }
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
})();
