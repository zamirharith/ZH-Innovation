const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const imageModal = document.getElementById("imageModal");
const imageModalPreview = document.getElementById("imageModalPreview");

function openImageModal(src, alt) {
  if (!imageModal || !imageModalPreview) return;
  imageModalPreview.src = src;
  imageModalPreview.alt = alt || "Image preview";
  imageModal.hidden = false;
  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeImageModal() {
  if (!imageModal) return;
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-modal-image]").forEach(trigger => {
  trigger.addEventListener("click", () => {
    openImageModal(trigger.dataset.modalImage, trigger.dataset.modalAlt);
  });
});

document.querySelectorAll("[data-close-dashboard]").forEach(control => {
  control.addEventListener("click", closeImageModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && imageModal?.classList.contains("open")) {
    closeImageModal();
  }
});

const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
let counted = false;

function reveal() {
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 90) {
      el.classList.add("active");
    }
  });

  if (!counted && counters.length && counters[0].getBoundingClientRect().top < window.innerHeight) {
    counted = true;
    counters.forEach(counter => {
      const target = Number(counter.dataset.count);
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const timer = setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          clearInterval(timer);
        }
        counter.textContent = counter.dataset.count === "98" ? value + "%" : String(value).padStart(2, "0");
      }, 24);
    });
  }
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
