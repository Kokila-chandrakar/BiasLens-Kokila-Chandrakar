/**
 * BiasLens Back to Top Button
 * A reusable, optimized floating button component for smooth scrolling
 * Features: Performance-optimized scroll listener, responsive design, smooth transitions
 */

class BackToTopButton {
  constructor(options = {}) {
    this.config = {
      scrollThreshold: options.scrollThreshold || 300, // Show button after 300px scroll
      animationDuration: options.animationDuration || 800, // Smooth scroll duration in ms
      buttonId: options.buttonId || "back-to-top-btn",
      containerId: options.containerId || "back-to-top-container",
      easing: options.easing || "easeInOutQuad",
    };

    this.isVisible = false;
    this.isScrolling = false;
    this.rafId = null;

    this.init();
  }

  /**
   * Initialize the button component
   */
  init() {
    this.createButton();
    this.attachEventListeners();
  }

  /**
   * Create and inject the Back to Top button into the DOM
   */
  createButton() {
    // Create container
    const container = document.createElement("div");
    container.id = this.config.containerId;
    container.innerHTML = `
            <button id="${this.config.buttonId}" 
                    class="back-to-top-btn" 
                    aria-label="Back to Top"
                    title="Back to Top">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
        `;

    document.body.appendChild(container);
    this.button = document.getElementById(this.config.buttonId);
  }

  /**
   * Attach event listeners with performance optimizations
   */
  attachEventListeners() {
    // Optimized scroll listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateButtonVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Click handler for smooth scroll
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.scrollToTop();
    });

    // Scroll event listener with RAF throttling
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Keyboard accessibility - Enter/Space to activate
    this.button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.scrollToTop();
      }
    });

    // Handle resize for responsive behavior
    window.addEventListener("resize", () => this.updateButtonVisibility(), {
      passive: true,
    });

    // Store cleanup function
    this._cleanup = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => this.updateButtonVisibility());
      if (this.button) {
        this.button.removeEventListener("click", () => this.scrollToTop());
        this.button.removeEventListener("keydown", () => this.scrollToTop());
      }
    };

    // Initial check
    this.updateButtonVisibility();
  }

  /**
   * Update button visibility based on scroll position
   */
  updateButtonVisibility() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    const shouldBeVisible = scrollPos > this.config.scrollThreshold;

    if (shouldBeVisible && !this.isVisible) {
      this.show();
    } else if (!shouldBeVisible && this.isVisible) {
      this.hide();
    }
  }

  /**
   * Show the button with smooth transition
   */
  show() {
    this.isVisible = true;
    this.button.classList.add("visible");
  }

  /**
   * Hide the button with smooth transition
   */
  hide() {
    this.isVisible = false;
    this.button.classList.remove("visible");
  }

  /**
   * Smooth scroll to top using easing function
   */
  scrollToTop() {
    if (this.isScrolling) return;

    this.isScrolling = true;
    const startTime = performance.now();
    const startPos = window.scrollY || document.documentElement.scrollTop;

    const easeFunction = this.getEasingFunction(this.config.easing);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.config.animationDuration, 1);

      const ease = easeFunction(progress);
      const newPos = startPos * (1 - ease);

      window.scrollTo(0, newPos);

      if (progress < 1) {
        this.rafId = requestAnimationFrame(animate);
      } else {
        this.isScrolling = false;
        window.scrollTo(0, 0); // Ensure we're exactly at the top
      }
    };

    this.rafId = requestAnimationFrame(animate);
  }

  /**
   * Get easing function for smooth animation
   */
  getEasingFunction(easing) {
    const easingFunctions = {
      linear: (t) => t,
      easeInQuad: (t) => t * t,
      easeOutQuad: (t) => t * (2 - t),
      easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      easeInCubic: (t) => t * t * t,
      easeOutCubic: (t) => --t * t * t + 1,
      easeInOutCubic: (t) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 2)) * (2 * (t - 2)) + 1,
      easeInOutQuart: (t) =>
        t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    };

    return easingFunctions[easing] || easingFunctions.easeInOutQuad;
  }

  /**
   * Cleanup: Remove event listeners and button element
   */
  destroy() {
    if (this._cleanup) {
      this._cleanup();
    }

    const container = document.getElementById(this.config.containerId);
    if (container) {
      container.remove();
    }

    this.button = null;
    this.isVisible = false;
  }

  /**
   * Update configuration at runtime
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.backToTopButton = new BackToTopButton();
  });
} else {
  window.backToTopButton = new BackToTopButton();
}
