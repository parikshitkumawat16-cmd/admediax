// Import EmailJS library
const emailjs = require("emailjs-com")

// EmailJS Configuration
;(() => {
  emailjs.init("YOUR_PUBLIC_KEY") // Replace with your EmailJS public key
})()

// Contact Form Handler
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
  }

  // Send email using EmailJS
  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text)
        showNotification("Message sent successfully! We'll get back to you soon.", "success")
        document.getElementById("contact-form").reset()
      },
      (error) => {
        console.log("FAILED...", error)
        showNotification("Failed to send message. Please try again.", "error")
      },
    )
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
})

// Notification function
function showNotification(message, type) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        ${type === "success" ? "background: #00ff88;" : "background: #ff4444;"}
    `

  document.body.appendChild(notification)

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Add CSS animations for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`
document.head.appendChild(style)
