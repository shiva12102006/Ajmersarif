 
 
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    // Toggle icon
    if (mobileMenu.classList.contains("active")) {
        menuToggle.innerHTML = "✖"; // Cross icon
    } else {
        menuToggle.innerHTML = "☰"; // Menu icon
    }

});


/* ACTIVE NAVIGATION */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});
 
 document.querySelectorAll('.as-faq-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const currentItem = button.parentElement;
            const panel = button.nextElementSibling;
            const icon = button.querySelector('.as-faq-toggle-icon');
            
            // Check if item is already active
            const isActive = currentItem.classList.contains('as-faq-active');
            
            // Close all other opened panels (Optional, gives single open accordian effect)
            document.querySelectorAll('.as-faq-item').forEach(item => {
                item.classList.remove('as-faq-active');
                item.querySelector('.as-faq-panel').style.maxHeight = null;
                item.querySelector('.as-faq-toggle-icon').textContent = '+';
            });

            // Toggle current item
            if (!isActive) {
                currentItem.classList.add('as-faq-active');
                panel.style.maxHeight = panel.scrollHeight + "px";
                icon.textContent = '−'; // Changes plus to minus
            }
        });
    });

/* =========================
CONTACT FORM SUBMISSION
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const formMessage = document.getElementById("formMessage");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const serviceName = document.getElementById("serviceName").value.trim();

    // Validation
    if (name.length < 3) {
      formMessage.className = "form-message error";
      formMessage.textContent = "Please enter a valid name.";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.className = "form-message error";
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }

    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(mobile)) {
      formMessage.className = "form-message error";
      formMessage.textContent = "Please enter a valid 10 digit mobile number.";
      return;
    }

    if (serviceName === "") {
      formMessage.className = "form-message error";
      formMessage.textContent = "Please select a service.";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    formMessage.textContent = "";

    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxbeq5Zx8AazNcgsXtkYLdpl4NCdW8vgfv90AQYy3C5ZoZpoitMN4M2vQnyv2t2tMPLlA/exec";

      const formPayload = new URLSearchParams();
      formPayload.append("name", name);
      formPayload.append("email", email);
      formPayload.append("mobile", mobile);
      formPayload.append("serviceName", serviceName);
      formPayload.append("timestamp", new Date().toLocaleString());

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: formPayload
      });

      formMessage.className = "form-message success";
      formMessage.textContent = "Thank you! Your request has been submitted successfully.";

      contactForm.reset();

      setTimeout(() => {
        window.location.href = "thankyou.html";
      }, 2000);

    } catch (error) {
      formMessage.className = "form-message error";
      formMessage.textContent = "Error submitting form. Please try again.";
    } finally {
      submitBtn.textContent = "Submit Request";
      submitBtn.disabled = false;
    }
  });
}

const galleryImages = document.querySelectorAll('.gallery-item img');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const closeBtn = document.querySelector('.close-lightbox');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let currentIndex = 0;

// Open Image
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        showImage();
        lightbox.classList.add('active');
    });
});

function showImage() {
    lightboxImg.src = galleryImages[currentIndex].src;
}

// Next Image
nextBtn.addEventListener('click', () => {
    currentIndex++;
    if(currentIndex >= galleryImages.length){
        currentIndex = 0;
    }
    showImage();
});

// Previous Image
prevBtn.addEventListener('click', () => {
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = galleryImages.length - 1;
    }
    showImage();
});

// Close
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Click Outside Close
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
        lightbox.classList.remove('active');
    }
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('active')) return;

    if(e.key === 'ArrowRight'){
        nextBtn.click();
    }

    if(e.key === 'ArrowLeft'){
        prevBtn.click();
    }

    if(e.key === 'Escape'){
        lightbox.classList.remove('active');
    }
});

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});