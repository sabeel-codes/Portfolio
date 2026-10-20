// Initialize EmailJS
emailjs.init({
  publicKey: "KoF8e9vlgg28VUmX3",
});

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

// Open and close the mobile menu
menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("show");

  menuToggle.classList.toggle("active", isOpen);

  menuToggle.setAttribute("aria-expanded", isOpen);

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

// Close the menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  let currentSection = null;

  sections.forEach(function (section) {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section;
    }
  });

  if (currentSection === null) {
    return;
  }

  navItems.forEach(function (link) {
    const isActive = link.getAttribute("href") === `#${currentSection.id}`;

    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", updateActiveNav, {
  passive: true,
});

window.addEventListener("resize", updateActiveNav);

window.addEventListener("load", updateActiveNav);



/* =====================================
   CONTACT FORM
===================================== */

const contactForm = document.querySelector("#contactForm");
const contactSubmit = document.querySelector("#contactSubmit");
const formNote = document.querySelector("#formNote");

if (contactForm && contactSubmit && formNote) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const originalButtonHTML = contactSubmit.innerHTML;

    contactSubmit.disabled = true;
    contactSubmit.textContent = "Sending...";
    formNote.textContent = "Sending your message...";

    try {

      await emailjs.sendForm(
        "service_ao372aj",
        "contact_form",
        contactForm
      );

      formNote.textContent =
        "Message sent successfully! Thank you for reaching out.";

      contactForm.reset();

    } catch (error) {

      console.error("EmailJS error:", error);

      formNote.textContent =
        "Message could not be sent. Please try again.";

    } finally {

      contactSubmit.disabled = false;
      contactSubmit.innerHTML = originalButtonHTML;

    }

  });

}
