// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 50,
});

// Initialize Hero Swiper
const heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Initialize Testimonials Swiper
const testimonialsSwiper = new Swiper(".testimonials-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Initialize GLightbox
const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true,
});

// Mobile Menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

function openMenu() {
  hamburger.classList.add("active");
  mobileMenu.classList.add("open");
  menuOverlay.classList.remove("invisible", "opacity-0");
  menuOverlay.classList.add("opacity-100");
  document.body.style.overflow = "hidden";
}

function closeMenuFunc() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
  menuOverlay.classList.add("invisible", "opacity-0");
  menuOverlay.classList.remove("opacity-100");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFunc);
menuOverlay.addEventListener("click", closeMenuFunc);
mobileNavLinks.forEach((link) => link.addEventListener("click", closeMenuFunc));

// Header Scroll Effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("glass-white", "shadow-lg");
  } else {
    header.classList.remove("glass-white", "shadow-lg");
  }
});

// Scroll Progress Bar
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  scrollProgress.style.width = progress + "%";
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Counter Animation
const counters = document.querySelectorAll(".counter");
const animateCounter = (counter) => {
  const target = parseInt(counter.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      counter.textContent = Math.floor(current) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target + "+";
    }
  };

  updateCounter();
};

// Intersection Observer for Counters
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("animated");
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach((counter) => counterObserver.observe(counter));

// Active Navigation Link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value.trim();

  // Simple WhatsApp message
  let whatsappMessage = `Hi, I'm ${name} \n\n Phone: ${phone}\n\n Subject: ${subject} \n\n Message: ${message}`;

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/918287678088?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
});

// Only allow numbers in phone field
document.getElementById("phone").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, "");
});

// FAQ Accordion Toggle
function toggleFaq(button) {
  const faqItem = button.closest(".faq-item");
  const answer = faqItem.querySelector(".faq-answer");
  const icon = button.querySelector(".faq-icon i");

  // Close all other FAQs
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.querySelector(".faq-answer").classList.add("hidden");
      item
        .querySelector(".faq-icon")
        .classList.remove("rotate-45", "bg-gold-500");
      item.querySelector(".faq-icon").classList.add("bg-navy-600");
      item.querySelector(".faq-icon i").classList.remove("fa-times");
      item.querySelector(".faq-icon i").classList.add("fa-plus");
      item.classList.remove("border-navy-300");
      item.classList.add("border-gray-100");
    }
  });

  // Toggle current FAQ
  if (answer.classList.contains("hidden")) {
    answer.classList.remove("hidden");
    faqItem
      .querySelector(".faq-icon")
      .classList.add("rotate-45", "bg-gold-500");
    faqItem.querySelector(".faq-icon").classList.remove("bg-navy-600");
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-times");
    faqItem.classList.add("border-navy-300");
    faqItem.classList.remove("border-gray-100");
  } else {
    answer.classList.add("hidden");
    faqItem
      .querySelector(".faq-icon")
      .classList.remove("rotate-45", "bg-gold-500");
    faqItem.querySelector(".faq-icon").classList.add("bg-navy-600");
    icon.classList.add("fa-plus");
    icon.classList.remove("fa-times");
    faqItem.classList.remove("border-navy-300");
    faqItem.classList.add("border-gray-100");
  }
}
