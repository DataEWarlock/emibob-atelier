// Emibob Atelier — interactions + lightbox

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      toggle.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggle.classList.remove("active");
      });
    });
  }

  // ========== LIGHTBOX ==========
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const zoomInBtn = document.getElementById("zoomIn");
  const zoomOutBtn = document.getElementById("zoomOut");
  const zoomResetBtn = document.getElementById("zoomReset");
  const zoomLevelEl = document.getElementById("zoomLevel");
  const imageWrap = document.getElementById("lightboxImageWrap");

  let currentScale = 1;
  const minScale = 0.5;
  const maxScale = 4;
  const scaleStep = 0.25;

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || "";
    lightboxCaption.textContent = caption || "";
    currentScale = 1;
    updateZoom();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightboxImg.src = "";
      currentScale = 1;
    }, 250);
  }

  function updateZoom() {
    lightboxImg.style.transform = `scale(${currentScale})`;
    zoomLevelEl.textContent = Math.round(currentScale * 100) + "%";
  }

  function zoomIn() {
    if (currentScale < maxScale) {
      currentScale = Math.min(maxScale, currentScale + scaleStep);
      updateZoom();
    }
  }

  function zoomOut() {
    if (currentScale > minScale) {
      currentScale = Math.max(minScale, currentScale - scaleStep);
      updateZoom();
    }
  }

  function zoomReset() {
    currentScale = 1;
    updateZoom();
    imageWrap.scrollTop = 0;
    imageWrap.scrollLeft = 0;
  }

  // Open on gallery image click
  document.querySelectorAll(".gallery-img img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = img.closest(".gallery-card");
      const title = card ? card.querySelector("h3")?.textContent : img.alt;
      openLightbox(img.src, title);
    });
  });

  // Close handlers
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "+" || e.key === "=") zoomIn();
    if (e.key === "-") zoomOut();
    if (e.key === "0") zoomReset();
  });

  // Zoom buttons
  zoomInBtn.addEventListener("click", zoomIn);
  zoomOutBtn.addEventListener("click", zoomOut);
  zoomResetBtn.addEventListener("click", zoomReset);

  // Mouse wheel zoom
  imageWrap.addEventListener("wheel", (e) => {
    if (!lightbox.classList.contains("open")) return;
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }, { passive: false });

  // Simple drag to pan when zoomed
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  imageWrap.addEventListener("mousedown", (e) => {
    if (currentScale <= 1) return;
    isDragging = true;
    startX = e.pageX - imageWrap.offsetLeft;
    startY = e.pageY - imageWrap.offsetTop;
    scrollLeft = imageWrap.scrollLeft;
    scrollTop = imageWrap.scrollTop;
  });

  imageWrap.addEventListener("mouseleave", () => { isDragging = false; });
  imageWrap.addEventListener("mouseup", () => { isDragging = false; });

  imageWrap.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - imageWrap.offsetLeft;
    const y = e.pageY - imageWrap.offsetTop;
    const walkX = (x - startX) * 1.2;
    const walkY = (y - startY) * 1.2;
    imageWrap.scrollLeft = scrollLeft - walkX;
    imageWrap.scrollTop = scrollTop - walkY;
  });

  // ========== PARTICLES ==========
  const container = document.getElementById("particles");
  if (container) {
    const count = 28;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.35 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 12 + 10}s linear infinite;
        animation-delay: -${Math.random() * 10}s;
      `;
      container.appendChild(dot);
    }

    if (!document.getElementById("particle-style")) {
      const style = document.createElement("style");
      style.id = "particle-style";
      style.textContent = `
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? 20 : -20}px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }
});
