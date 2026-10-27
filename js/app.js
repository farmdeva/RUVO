/**
 * RUVO MARINE — Interactive Engine
 * Handles dynamic content population, interactive product viewer,
 * hotspot annotations, header scroll transitions, and enquiry handling.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure config is loaded
  const config = window.RUVO_CONFIG || {};

  // 1. Initialize Brand & Dynamic Data
  initBrandData(config);

  // 2. Initialize Header & Mobile Navigation
  initHeaderNavigation();

  // 3. Initialize Interactive Product Viewer & Drag Interaction
  initProductViewer(config);

  // 4. Initialize Technical Specifications Grid
  initSpecificationsGrid(config);

  // 5. Initialize Enquiry Form & WhatsApp Handler
  initEnquiryForm(config);

  // 6. Initialize Scroll Reveal Animations
  initScrollAnimations();

  // 7. Initialize Fullscreen Image Modal
  initImageModal();
});

/* --------------------------------------------------------------------------
   1. Brand & Config Population
   -------------------------------------------------------------------------- */
function initBrandData(config) {
  if (!config.brand) return;

  // Populate brand names throughout page
  document.querySelectorAll("[data-bind='brand-name']").forEach(el => {
    el.textContent = config.brand.name;
  });

  document.querySelectorAll("[data-bind='brand-tagline']").forEach(el => {
    el.textContent = config.brand.tagline;
  });

  document.querySelectorAll("[data-bind='brand-subtagline']").forEach(el => {
    el.textContent = config.brand.subTagline;
  });

  // Populate contact links
  if (config.contact) {
    document.querySelectorAll("[data-bind='contact-email']").forEach(el => {
      el.textContent = config.contact.email;
      if (el.tagName === "A") el.href = `mailto:${config.contact.email}`;
    });

    document.querySelectorAll("[data-bind='contact-phone']").forEach(el => {
      el.textContent = config.contact.displayPhone || config.contact.phone;
      if (el.tagName === "A") el.href = `tel:${config.contact.phone}`;
    });

    document.querySelectorAll("[data-bind='contact-location']").forEach(el => {
      el.textContent = config.contact.location;
    });

    // WhatsApp Direct Link
    const waBtn = document.getElementById("whatsapp-direct-link");
    if (waBtn && config.contact.whatsAppNumber) {
      const cleanNumber = config.contact.whatsAppNumber.replace(/[^0-9]/g, "");
      const msg = encodeURIComponent(config.contact.whatsAppDefaultMessage || "Hello RUVO Marine");
      waBtn.href = `https://wa.me/${cleanNumber}?text=${msg}`;
      waBtn.setAttribute("target", "_blank");
      waBtn.setAttribute("rel", "noopener noreferrer");
    }
  }
}

/* --------------------------------------------------------------------------
   2. Header & Mobile Navigation
   -------------------------------------------------------------------------- */
function initHeaderNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navDrawer = document.querySelector(".mobile-nav-drawer");
  const drawerBackdrop = document.querySelector(".mobile-drawer-backdrop");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  // Scroll Header Effect
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  if (menuToggle && navDrawer && drawerBackdrop) {
    const toggleDrawer = (open) => {
      const isOpen = open !== undefined ? open : !navDrawer.classList.contains("open");
      menuToggle.classList.toggle("active", isOpen);
      navDrawer.classList.toggle("open", isOpen);
      drawerBackdrop.classList.toggle("visible", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    menuToggle.addEventListener("click", () => toggleDrawer());
    drawerBackdrop.addEventListener("click", () => toggleDrawer(false));

    // Close drawer when link clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1080) {
          toggleDrawer(false);
        }
      });
    });
  }

  // Active section spy
  const sections = document.querySelectorAll("section[id]");
  const spyScroll = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(l => l.classList.add("active"));
      } else {
        document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(l => l.classList.remove("active"));
      }
    });
  };

  window.addEventListener("scroll", spyScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Interactive Product Viewer (Draggable & Hotspots)
   -------------------------------------------------------------------------- */
function initProductViewer(config) {
  const viewerStage = document.getElementById("viewer-stage");
  const viewerImg = document.getElementById("viewer-main-image");
  const angleBadge = document.getElementById("viewer-angle-badge");
  const hotspotsContainer = document.getElementById("viewer-hotspots-container");
  const angleSelector = document.getElementById("viewer-angle-selector");
  const zoomBtn = document.getElementById("btn-viewer-zoom");

  if (!viewerStage || !viewerImg || !config.viewerAngles || config.viewerAngles.length === 0) return;

  let currentAngleIndex = 0;
  const angles = config.viewerAngles;

  // Build Angle Buttons
  if (angleSelector) {
    angleSelector.innerHTML = "";
    angles.forEach((angle, idx) => {
      const btn = document.createElement("button");
      btn.className = `angle-btn ${idx === 0 ? "active" : ""}`;
      btn.textContent = angle.name;
      btn.setAttribute("aria-label", `Switch to ${angle.name}`);
      btn.addEventListener("click", () => {
        setViewerAngle(idx);
      });
      angleSelector.appendChild(btn);
    });
  }

  // Function to set viewer angle
  function setViewerAngle(index) {
    if (index < 0) index = angles.length - 1;
    if (index >= angles.length) index = 0;
    currentAngleIndex = index;

    const angle = angles[currentAngleIndex];

    // Fade transition
    viewerImg.style.opacity = "0.2";
    viewerImg.style.transform = "scale(0.97)";

    setTimeout(() => {
      viewerImg.src = angle.image;
      viewerImg.alt = `${config.brand.name} ${angle.name} View`;
      viewerImg.style.opacity = "1";
      viewerImg.style.transform = "scale(1)";

      if (angleBadge) {
        angleBadge.textContent = `${angle.name} — ${angle.tag}`;
      }

      // Update button active state
      if (angleSelector) {
        const buttons = angleSelector.querySelectorAll(".angle-btn");
        buttons.forEach((b, i) => b.classList.toggle("active", i === currentAngleIndex));
      }

      // Render Hotspots
      renderHotspots(angle.hotspots || []);
    }, 180);
  }

  // Render Hotspot Pins
  function renderHotspots(hotspots) {
    if (!hotspotsContainer) return;
    hotspotsContainer.innerHTML = "";

    hotspots.forEach(spot => {
      const pin = document.createElement("div");
      pin.className = "hotspot-pin";
      pin.style.top = spot.top;
      pin.style.left = spot.left;

      const tooltip = document.createElement("div");
      tooltip.className = "hotspot-card-tooltip";
      tooltip.innerHTML = `
        <h4>${spot.title}</h4>
        <p>${spot.desc}</p>
      `;

      pin.appendChild(tooltip);

      // Mobile click toggle
      pin.addEventListener("click", (e) => {
        e.stopPropagation();
        pin.classList.toggle("active");
      });

      hotspotsContainer.appendChild(pin);
    });
  }

  // Dragging to switch angles
  let isDragging = false;
  let startX = 0;
  let dragThreshold = 45; // pixels to switch angle

  viewerStage.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  viewerStage.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX > 0) {
        // Drag right -> previous angle
        setViewerAngle(currentAngleIndex - 1);
      } else {
        // Drag left -> next angle
        setViewerAngle(currentAngleIndex + 1);
      }
      startX = e.clientX;
    }
  });

  // Touch Swipe for Mobile
  viewerStage.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX;
    }
  }, { passive: true });

  viewerStage.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX > 0) {
        setViewerAngle(currentAngleIndex - 1);
      } else {
        setViewerAngle(currentAngleIndex + 1);
      }
      startX = e.touches[0].clientX;
    }
  }, { passive: true });

  viewerStage.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Zoom Button Trigger
  if (zoomBtn) {
    zoomBtn.addEventListener("click", () => {
      const activeAngle = angles[currentAngleIndex];
      openImageModal(activeAngle.image, `${activeAngle.name} — ${activeAngle.description || ""}`);
    });
  }

  // Initial load
  setViewerAngle(0);
}

/* --------------------------------------------------------------------------
   4. Technical Specifications Grid
   -------------------------------------------------------------------------- */
function initSpecificationsGrid(config) {
  const specsContainer = document.getElementById("specs-grid-container");
  const downloadBtn = document.getElementById("btn-download-specs");

  if (!specsContainer || !config.specifications) return;

  specsContainer.innerHTML = "";

  config.specifications.forEach(spec => {
    const cell = document.createElement("div");
    cell.className = `spec-cell ${spec.highlight ? "highlight" : ""}`;
    cell.innerHTML = `
      <div class="spec-top-row">
        <span class="spec-label">${spec.label}</span>
        <span class="spec-category-badge">${spec.category}</span>
      </div>
      <div class="spec-value">${spec.value}</div>
      <div class="spec-detail">${spec.detail}</div>
    `;
    specsContainer.appendChild(cell);
  });

  // Specification Sheet Modal / Print trigger
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      openSpecDossierModal(config);
    });
  }
}

/* --------------------------------------------------------------------------
   5. Enquiry Form & WhatsApp Handler
   -------------------------------------------------------------------------- */
function initEnquiryForm(config) {
  const form = document.getElementById("ruvo-enquiry-form");
  const statusNotice = document.getElementById("form-status-notice");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      type: formData.get("type"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString()
    };

    // Client-side validation
    if (!data.name || !data.email || !data.message) {
      showStatus("Please fill in all required fields.", "error");
      return;
    }

    // Configurable endpoint check
    const endpoint = config.form && config.form.endpoint ? config.form.endpoint : "";

    if (endpoint && endpoint !== "#") {
      // POST to configurable remote endpoint
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (res.ok) {
          handleSuccess(data);
        } else {
          showStatus("Unable to transmit enquiry. Please contact us directly via email or WhatsApp.", "error");
        }
      })
      .catch(() => {
        showStatus("Transmission error. Please try again or reach out via WhatsApp.", "error");
      });
    } else {
      // Local development / standby mode: store locally and show luxury confirmation
      try {
        const stored = JSON.parse(localStorage.getItem(config.form?.storageKey || "ruvo_inquiries") || "[]");
        stored.push(data);
        localStorage.setItem(config.form?.storageKey || "ruvo_inquiries", JSON.stringify(stored));
      } catch (err) {
        console.warn("Storage notice:", err);
      }

      handleSuccess(data);
    }
  });

  function handleSuccess(data) {
    form.reset();
    showConfirmationDialog(
      "Enquiry Received",
      `Thank you, ${data.name}. Our marine advisory team will review your requirements for the ${config.brand?.name || "RUVO"} watercraft and contact you shortly at ${data.email}.`
    );
  }

  function showStatus(msg, type) {
    if (!statusNotice) return;
    statusNotice.textContent = msg;
    statusNotice.className = `form-status-notice ${type}`;
    statusNotice.style.display = "block";
    setTimeout(() => {
      statusNotice.style.display = "none";
    }, 6000);
  }
}

/* --------------------------------------------------------------------------
   6. Scroll Reveal Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. Fullscreen Image Modal & Spec Dossier
   -------------------------------------------------------------------------- */
function initImageModal() {
  const modal = document.getElementById("image-zoom-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal());
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Attach to zoomable images
  document.querySelectorAll("[data-zoomable]").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      openImageModal(img.src, img.alt || "RUVO Marine Detail");
    });
  });
}

function openImageModal(imgSrc, caption) {
  const modal = document.getElementById("image-zoom-modal");
  const modalImg = document.getElementById("modal-target-img");
  const modalCaption = document.getElementById("modal-caption-text");

  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  if (modalCaption) modalCaption.textContent = caption;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("image-zoom-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function showConfirmationDialog(title, message) {
  let dialog = document.getElementById("confirmation-dialog");
  if (!dialog) {
    dialog = document.createElement("div");
    dialog.id = "confirmation-dialog";
    dialog.className = "image-zoom-modal active";
    dialog.innerHTML = `
      <div class="modal-dialog-card">
        <div class="dialog-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 class="dialog-title">${title}</h3>
        <p class="dialog-msg">${message}</p>
        <button class="btn-primary" id="btn-dialog-close" style="width: 100%; justify-content: center;">Close Window</button>
      </div>
    `;
    document.body.appendChild(dialog);
    document.getElementById("btn-dialog-close").addEventListener("click", () => {
      dialog.remove();
      document.body.style.overflow = "";
    });
  }
  document.body.style.overflow = "hidden";
}

function openSpecDossierModal(config) {
  let modal = document.getElementById("specs-dossier-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "specs-dossier-modal";
    modal.className = "image-zoom-modal active";
    
    let rowsHtml = config.specifications.map(s => `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 10px 0; font-size: 13px;">
        <span style="color: #94a3b8; font-family: var(--font-mono);">${s.label}</span>
        <strong style="color: #ffffff;">${s.value}</strong>
      </div>
    `).join("");

    modal.innerHTML = `
      <div class="modal-dialog-card" style="max-width: 640px; text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 16px; margin-bottom: 20px;">
          <h3 class="dialog-title" style="margin: 0; font-size: 22px;">${config.brand?.name || "RUVO"} — Technical Dossier</h3>
          <button id="btn-close-dossier" style="color: #94a3b8; font-size: 20px; line-height: 1;">&times;</button>
        </div>
        <p style="font-size: 13px; color: #94a3b8; margin-bottom: 20px;">Official manufacturer-stated engineering ratings.</p>
        <div style="max-height: 50vh; overflow-y: auto; padding-right: 10px; margin-bottom: 24px;">
          ${rowsHtml}
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button class="btn-secondary" onclick="window.print()">Print Dossier</button>
          <button class="btn-primary" id="btn-done-dossier">Dismiss</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeHandler = () => {
      modal.remove();
      document.body.style.overflow = "";
    };

    document.getElementById("btn-close-dossier").addEventListener("click", closeHandler);
    document.getElementById("btn-done-dossier").addEventListener("click", closeHandler);
  }
  document.body.style.overflow = "hidden";
}
