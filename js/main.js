// Emibob Atelier — small interactions

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      toggle.classList.toggle("active");
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggle.classList.remove("active");
      });
    });
  }

  // Copy prompt buttons
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-prompt");
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("copied");

        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 1800);
      } catch (err) {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);

        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy Prompt";
          btn.classList.remove("copied");
        }, 1800);
      }
    });
  });

  // Very light particle dots (pure CSS-like, tiny performance impact)
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

    // Inject keyframes once
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
