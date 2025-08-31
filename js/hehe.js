document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navMenu = document.getElementById("navMenu")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
    })
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  // Course navigation buttons
  const courseNavBtns = document.querySelectorAll(".nav-btn")
  courseNavBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      courseNavBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // Here you could add logic to change course content
      console.log("Course navigation clicked")
    })
  })

  // Testimonial dots functionality
  const testimonialDots = document.querySelectorAll(".dot")
  const testimonialCards = document.querySelectorAll(".testimonial-card")

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      testimonialDots.forEach((d) => d.classList.remove("active"))
      this.classList.add("active")

      // Simple testimonial switching logic
      testimonialCards.forEach((card, cardIndex) => {
        if (cardIndex === index) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Play button functionality
  const playButtons = document.querySelectorAll(".play-button")
  playButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // In a real implementation, this would open a video modal
      alert("Video would play here! This is a demo.")
    })
  })

  // Form validation and submission
  const registrationForm = document.getElementById("registrationForm")
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const formFields = this.querySelectorAll("input[required], select[required]")
      let isValid = true

      // Basic validation
      formFields.forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = "#ff4444"
          isValid = false
        } else {
          field.style.borderColor = ""
        }
      })

      // Email validation
      const emailField = this.querySelector('input[type="email"]')
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailField.value)) {
          emailField.style.borderColor = "#ff4444"
          isValid = false
        }
      }

      if (isValid) {
        // Show success message
        alert("Registration submitted successfully! We will contact you soon.")
        this.reset()
      } else {
        alert("Please fill in all required fields correctly.")
      }
    })
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletterForm")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (emailInput.value && emailRegex.test(emailInput.value)) {
        alert("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      } else {
        alert("Please enter a valid email address.")
      }
    })
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".course-card, .topic-card, .testimonial-card, .article-card, .stat-item, .skill-item",
  )

  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Header scroll effect
  let lastScrollTop = 0
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
    }

    lastScrollTop = scrollTop
  })

  // Topic card interactions
  const topicCards = document.querySelectorAll(".topic-card")
  topicCards.forEach((card) => {
    card.addEventListener("click", function () {
      const topicName = this.querySelector(".topic-name").textContent
      console.log(Topic clicked: ${topicName})
      // In a real implementation, this would navigate to topic page
    })
  })

  // Course card interactions
  const courseCards = document.querySelectorAll(".course-card")
  courseCards.forEach((card) => {
    card.addEventListener("click", function () {
      const courseTitle = this.querySelector(".course-title").textContent
      console.log(Course clicked: ${courseTitle})
      // In a real implementation, this would navigate to course page
    })
  })

  // Article card interactions
  const articleCards = document.querySelectorAll(".article-card")
  articleCards.forEach((card) => {
    const readMoreBtn = card.querySelector(".read-more-btn")
    if (readMoreBtn) {
      readMoreBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const articleTitle = card.querySelector(".article-title").textContent
        console.log(Read more clicked: ${articleTitle})
        // In a real implementation, this would navigate to article page
      })
    }
  })

  // CTA button interactions
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-outline, .hero-cta, .apply-btn, .get-started-btn")
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (!this.closest("form")) {
        e.preventDefault()
        console.log("CTA button clicked:", this.textContent)
        // In a real implementation, these would navigate to appropriate pages
      }
    })
  })

  // Search functionality (basic)
  const searchContainer = document.querySelector(".search-container")
  if (searchContainer) {
    searchContainer.addEventListener("click", () => {
      const searchTerm = prompt("What would you like to search for?")
      if (searchTerm) {
        console.log("Search term:", searchTerm)
        // In a real implementation, this would perform actual search
        alert(Searching for: ${searchTerm})
      }
    })
  }

  // Cart functionality (basic)
  const cartContainer = document.querySelector(".cart-container")
  if (cartContainer) {
    cartContainer.addEventListener("click", () => {
      console.log("Cart clicked")
      // In a real implementation, this would open cart modal
      alert("Cart is empty. Add some courses!")
    })
  }

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key to close mobile menu
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    }
  })

  // Form field focus effects
  const formFields = document.querySelectorAll("input, select, textarea")
  formFields.forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    field.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ff4444"
      } else {
        this.style.borderColor = ""
      }
    })
  })

  // Lazy loading for images (basic implementation)
  const images = document.querySelectorAll('img[src*="placeholder.svg"]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // In a real implementation, you would load the actual image here
        img.style.opacity = "1"
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    img.style.opacity = "0.8"
    img.style.transition = "opacity 0.3s ease"
    imageObserver.observe(img)
  })

  console.log("Vidyasetu website initialized successfully!")
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = (target) => {
    const targetPosition = target.offsetTop
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 1000
    let start = null

    function animation(currentTime) {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Override smooth scroll for older browsers
  window.smoothScrollTo = smoothScrollPolyfill
}
