const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const fadeItems = document.querySelectorAll(".fade-in");
const activePage = document.body.dataset.page;

function updateHeaderState() {
    if (!header || header.classList.contains("page-header")) {
        return;
    }

    header.classList.toggle("scrolled", window.scrollY > 50);
}

function revealOnScroll() {
    const trigger = window.innerHeight * 0.9;

    fadeItems.forEach((item) => {
        if (item.getBoundingClientRect().top < trigger) {
            item.classList.add("visible");
        }
    });
}

function setActiveNav() {
    document.querySelectorAll("[data-nav]").forEach((link) => {
        if (link.dataset.nav === activePage) {
            link.classList.add("active");
        }
    });
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

const phoneInput = document.getElementById("phoneNumber");

if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, "");
    });
}

const bookingForm = document.getElementById("bookingForm");
const successModal = document.getElementById("successModal");
const waRedirectLink = document.getElementById("waRedirectLink");
const closeModalButton = document.getElementById("closeModal");

function closeModal() {
    if (!successModal) {
        return;
    }

    successModal.classList.remove("active");
    successModal.setAttribute("aria-hidden", "true");
}

if (bookingForm && successModal && waRedirectLink) {
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const parentName = document.getElementById("parentName").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const childName = document.getElementById("childName").value.trim();
        const childAge = document.getElementById("childAge").value.trim();
        const concern = document.getElementById("concern").value.trim();
        const programInterest = document.getElementById("programInterest").value.trim();
        const message = document.getElementById("message").value.trim();
        const phone = "917028645898";

        const text =
            `*New Assessment Request - MovEability*%0A%0A` +
            `*Parent / Guardian:* ${encodeURIComponent(parentName)}%0A` +
            `*Phone Number:* ${encodeURIComponent(phoneNumber)}%0A` +
            `*Child's Name:* ${encodeURIComponent(childName)}%0A` +
            `*Child's Age:* ${encodeURIComponent(childAge)}%0A` +
            `*Primary Concern:* ${encodeURIComponent(concern || "Not shared")}%0A` +
            `*Program Interest:* ${encodeURIComponent(programInterest || "Not selected")}%0A` +
            `*Message:* ${encodeURIComponent(message || "Not shared")}`;

        const whatsappURL = `https://wa.me/${phone}?text=${text}`;
        waRedirectLink.href = whatsappURL;
        successModal.classList.add("active");
        successModal.setAttribute("aria-hidden", "false");

        window.setTimeout(() => {
            window.open(whatsappURL, "_blank", "noopener");
        }, 700);
    });
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
}

if (successModal) {
    successModal.addEventListener("click", (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });
}

window.addEventListener(
    "scroll",
    () => {
        updateHeaderState();
        revealOnScroll();
    },
    { passive: true }
);

setActiveNav();
updateHeaderState();
revealOnScroll();
