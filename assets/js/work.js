// Portfolio Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const portfolioCards = document.querySelectorAll(".portfolio-card")
  const modal = document.getElementById("projectModal")
  const modalClose = document.querySelector(".modal-close")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const modalLink = document.getElementById("modalLink")

  // Project data
  const projectData = {
    ecommerce: {
      title: "E-commerce Platform",
      description:
        "A complete digital transformation for a luxury fashion brand featuring custom shopping experience, advanced filtering, personalized recommendations, and seamless checkout process. The platform increased conversion rates by 150% and customer satisfaction by 200%.",
      image: "/luxury-ecommerce-interface.png",
      link: "https://example-ecommerce.com",
    },
    fintech: {
      title: "FinTech Mobile App",
      description:
        "Revolutionary banking app with AI-powered financial insights, budget tracking, investment recommendations, and seamless money transfers. The app has over 100,000 active users and 4.8-star rating on app stores.",
      image: "/fintech-mobile-dashboard.png",
      link: "https://example-fintech.com",
    },
    healthcare: {
      title: "Healthcare Management Platform",
      description:
        "Comprehensive patient management system with telemedicine capabilities, appointment scheduling, medical records management, and real-time analytics. Improved patient care efficiency by 300%.",
      image: "/healthcare-management-dashboard.png",
      link: "https://example-healthcare.com",
    },
    startup: {
      title: "Tech Startup Landing Page",
      description:
        "High-converting landing page for a SaaS startup with integrated marketing automation, A/B testing capabilities, and advanced analytics. Achieved 45% conversion rate and generated $2M in funding.",
      image: "/tech-startup-landing-page.png",
      link: "https://example-startup.com",
    },
    restaurant: {
      title: "Restaurant Booking App",
      description:
        "Complete dining experience app with table reservations, menu browsing, online ordering, loyalty program integration, and real-time availability. Increased restaurant bookings by 250%.",
      image: "/restaurant-booking-app-interface.png",
      link: "https://example-restaurant.com",
    },
    education: {
      title: "Online Learning Platform",
      description:
        "Interactive e-learning platform with video streaming, progress tracking, certification system, and collaborative tools. Serves over 50,000 students with 95% completion rate.",
      image: "/online-learning-platform.png",
      link: "https://example-education.com",
    },
  }

  // Add click event to portfolio cards
  portfolioCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectKey = this.getAttribute("data-project")
      const project = projectData[projectKey]

      if (project) {
        modalImage.src = project.image
        modalImage.alt = project.title
        modalTitle.textContent = project.title
        modalDescription.textContent = project.description
        modalLink.href = project.link

        modal.style.display = "block"
        document.body.style.overflow = "hidden"
      }
    })
  })

  // Close modal functionality
  modalClose.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe portfolio cards and video cards
  const animatedElements = document.querySelectorAll(".portfolio-card, .video-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
