// navbar.js
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden"); // Show or hide the mobile menu
});

const text = "Minimalist•Modern•";
const circle = document.getElementById("circleText");
const degStep = 360 / text.length;

for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.innerText = text[i];
  span.className =
    "absolute left-1/2 top-1/2 text-white text-base font-bold text-lg font-sans ";
  span.style.transformOrigin = "0 0";
  span.style.transform = `rotate(${
    i * degStep
  }deg) translate(-85px) rotate(270deg)`;
  circle.appendChild(span);
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Scroll event to trigger counter when stats section is visible
document.addEventListener("scroll", function () {
  const counterSection = document.querySelector(".counter-section");
  if (counterSection && isInViewport(counterSection)) {
    startCounters();
  }
});

// Reviews Carousel
document.addEventListener("DOMContentLoaded", function () {
  const reviewsContainer = document.querySelector(".reviews-container");
  const dots = document.querySelectorAll(".dot");
  const slides = document.querySelectorAll(".review-slide");
  const prevButton = document.getElementById("prev-review");
  const nextButton = document.getElementById("next-review");
  let currentIndex = 0;
  const slideWidth = 100; // 100% width
  let autoSlideInterval;

  // Function to update the carousel position
  function updateCarousel() {
    // Move the container to show the current slide
    reviewsContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }%)`;

    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("dot-active");
        dot.style.backgroundColor = "#00ffff"; // Active dot color
      } else {
        dot.classList.remove("dot-active");
        dot.style.backgroundColor = "#9ca3af"; // Inactive dot color
      }
    });
  }

  // Function to go to the next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  // Function to go to the previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Start auto-sliding
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 5 seconds
  }

  // Stop auto-sliding (when user interacts)
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Click event for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
      stopAutoSlide();
      startAutoSlide(); // Restart auto slide after manual navigation
    });
  });

  // Click event for navigation buttons
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto slide after manual navigation
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto slide after manual navigation
    });
  }

  // Initialize the carousel
  updateCarousel();
  startAutoSlide();
});

// Footer input boxes color change on fill
document.addEventListener("DOMContentLoaded", function () {
  const footerInputs = document.querySelectorAll(
    "footer input[type='text'], footer input[type='email'], footer textarea"
  );

  footerInputs.forEach((input) => {
    // Initial check in case input is pre-filled
    toggleFilledClass(input);

    // Listen for input events
    input.addEventListener("input", () => {
      toggleFilledClass(input);
    });
  });

  function toggleFilledClass(element) {
    if (element.value.trim() !== "") {
      element.classList.add("filled-input");
    } else {
      element.classList.remove("filled-input");
    }
  }
});

// New code to handle contact form submission asynchronously with button state
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const sendButton = document.getElementById("sendButton");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission (page reload)

      // Disable send button and show loading text
      sendButton.disabled = true;
      const originalButtonText = sendButton.textContent;
      sendButton.textContent = "Sending...";

      // Prepare form data as JSON
      const formData = {
        name: contactForm.elements["name"].value,
        email: contactForm.elements["email"].value,
        comments: contactForm.elements["comments"].value,
      };

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Show success message
          successMessage.classList.remove("hidden");

          // Clear form inputs
          contactForm.reset();

          // Optionally hide the message after some time (e.g., 5 seconds)
          setTimeout(() => {
            successMessage.classList.add("hidden");
          }, 5000);
        } else {
          // Handle server errors
          alert("Failed to send message. Please try again later.");
        }
      } catch (error) {
        // Handle network errors
        alert(
          "An error occurred. Please check your internet connection and try again."
        );
      } finally {
        // Re-enable send button and restore original text
        sendButton.disabled = false;
        sendButton.textContent = originalButtonText;
      }
    });
  }
});
