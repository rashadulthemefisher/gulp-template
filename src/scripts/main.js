(function () {
  "use strict";

  //  Preloader
  // ----------------------------------------
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.closest(".nav-item").classList.toggle("active");
    });
  });

  // Theme switcher
  // ----------------------------------------
  var darkMode = false;
  var themeSwitch = document.querySelectorAll("[data-theme-switcher]");
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    darkMode = true;
  }
  if (localStorage.getItem("theme") === "dark") {
    darkMode = true;
  } else if (localStorage.getItem("theme") === "light") {
    darkMode = false;
  }
  if (darkMode) {
    document.documentElement.classList.toggle("dark");
  }
  document.addEventListener("DOMContentLoaded", () => {
    [].forEach.call(themeSwitch, function (ts) {
      ts.checked = darkMode ? true : false;
      ts.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        localStorage.setItem(
          "theme",
          document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
        );
      });
    });
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

  // Tab
  // ----------------------------------------
  function setActiveTab(tabGroup, tabName) {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsContent = tabGroup.querySelector("[data-tab-content]");

    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`,
    );
    selectedTabPane.classList.add("active");
  }
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  tabGroups.forEach((tabGroup) => {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
    const activeTabName = tabsNavItem[0].getAttribute("data-tab");

    setActiveTab(tabGroup, activeTabName);

    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);
      });
    });
  });

  const tablist = document.querySelectorAll("[data-tab-nav] [data-tab]");
  function tabsHandler(event) {
    let index = Array.from(tablist).indexOf(this);
    let numbTabs = tablist.length;
    let nextId;
    if (numbTabs > 1) {
      if (event.key === "ArrowRight") {
        nextId = tablist[(index + 1) % numbTabs];
        if (index === numbTabs - 1) {
          nextId = tablist[0];
        }
        nextId.focus();
        nextId.click();
      }
      if (event.key === "ArrowLeft") {
        nextId = tablist[(index - 1 + numbTabs) % numbTabs];
        if (index === 0) {
          nextId = tablist[numbTabs - 1];
        }
        nextId.focus();
        nextId.click();
      }
    }
  }

  tablist.forEach(function (tab) {
    tab.addEventListener("keydown", tabsHandler);
  });


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
