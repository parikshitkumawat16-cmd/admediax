// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Navigation functionality
  initNavigation()

  // Animated counters
  animateCounters()

  // Particles animation
  initParticles()

  // Smooth scrolling
  initSmoothScrolling()

  // Scroll animations
  initScrollAnimations()
})

// Navigation
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
}

// Animated Counters with Smooth Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const duration = 2000; // Animation duration in ms
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Ease-out function for smooth deceleration
          const easeOutQuad = t => t * (2 - t);
          const current = Math.floor(easeOutQuad(progress) * target);
          
          counter.textContent = current.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        
        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });
  
  counters.forEach(counter => observer.observe(counter));
}

// Particles Animation
function initParticles() {
  const particlesContainer = document.getElementById("particles")
  if (!particlesContainer) return

  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 136, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `
    particlesContainer.appendChild(particle)
  }

  // Add CSS animation for particles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `
  document.head.appendChild(style)
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Scroll Animations
function initScrollAnimations() {
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  })

  // Add animation styles to elements
  const elementsToAnimate = document.querySelectorAll(".blog-card, .stat-item, .client-logo")
  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    animateOnScroll.observe(el)
  })
}

// Utility function for smooth animations
function animateElement(element, animation, duration = 1000) {
  element.style.animation = `${animation} ${duration}ms ease forwards`
}

// Client carousel auto-scroll (if needed)
function initClientCarousel() {
  const carousel = document.querySelector(".clients-carousel")
  if (!carousel) return

  let scrollAmount = 0
  const scrollStep = 1
  const scrollInterval = 30

  setInterval(() => {
    scrollAmount += scrollStep
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0
    }
    carousel.scrollLeft = scrollAmount
  }, scrollInterval)
}
