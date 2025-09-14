export function initCustomSelects() {
  try {
    // --- Scroll indicator ---
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", (e) => {
        e.preventDefault();
        const aboutSection = document.querySelector("#about-us-section");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    // --- Highlight active menu link ---
    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll(
      ".header__menu a, .footer__menu a"
    );
    menuLinks.forEach((link) => {
      try {
        const href = link.getAttribute("href");
        if (!href) return;
        const linkPage = href.split("/").pop();
        if (linkPage === currentPage) link.classList.add("active");
      } catch (err) {
        console.warn("menu link check failed", err);
      }
    });

    // --- Smooth anchor scroll ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (ev) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // --- Touch hover for buttons ---
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("touchstart", () => btn.classList.add("hover"), {
        passive: true,
      });
      btn.addEventListener("touchend", () => btn.classList.remove("hover"), {
        passive: true,
      });
    });

    // --- Scroll to top from footer ---
    const toTopBtn = document.querySelector(".footer__scroll-indicator");
    if (toTopBtn) {
      toTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });

        const header = document.querySelector("header");
        if (header) {
          try {
            header.setAttribute("tabindex", "-1");
            header.focus({ preventScroll: true });
            setTimeout(() => header.removeAttribute("tabindex"), 1000);
          } catch {
            try {
              header.focus();
              header.removeAttribute("tabindex");
            } catch (_) {}
          }
        }
      });
    }
  } catch (err) {
    console.error("initScrollIndicator error:", err);
  }

  // --- Custom select logic ---
  document.querySelectorAll(".custom-select-wrapper").forEach((wrapper) => {
    const mainInput = wrapper.querySelector(".custom-select-input");
    const dropdown = wrapper.querySelector(".custom-select-dropdown");
    const arrow = wrapper.querySelector(".select-arrow");

    if (!mainInput || !dropdown) return;

    const row = wrapper.closest(".form-field-and-description");

    const addButton =
      wrapper.querySelector(
        ".custom-select-add-button, .form-section__add-button"
      ) ||
      row?.querySelector(
        ".custom-select-add-button, .form-section__add-button"
      ) ||
      null;

    const newForm =
      wrapper.querySelector(".new-item-form") ||
      row?.querySelector(".new-item-form") ||
      null;
    const newFormInput = newForm?.querySelector("input, textarea") || null;

    let options = Array.from(
      dropdown.querySelectorAll(".custom-select-option")
    );

    // --- Add search input if missing ---
    let searchInput = dropdown.querySelector(".custom-select-search-input");
    if (!searchInput) {
      const searchDiv = document.createElement("div");
      searchDiv.className = "custom-select-search";

      searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "Search...";
      searchInput.className = "custom-select-search-input";

      const searchIcon = document.createElement("img");
      searchIcon.src = "./project/img/search.svg";
      searchIcon.alt = "Search";
      searchIcon.className = "custom-select-search-icon";

      searchDiv.appendChild(searchInput);
      searchDiv.appendChild(searchIcon);
      dropdown.prepend(searchDiv);
    }

    // --- Position helpers ---
    const positionDropdown = () => {
      if (dropdown.classList.contains("active")) return;

      const rect = mainInput.getBoundingClientRect();
      dropdown.style.width = `${rect.width}px`;
      dropdown.style.top = `${mainInput.offsetHeight + 8}px`;
      dropdown.style.left = `0px`;
    };

    const positionNewForm = () => {
      if (!newForm) return;
      const parentRect = row
        ? row.getBoundingClientRect()
        : wrapper.getBoundingClientRect();
      const formWidth = newForm.offsetWidth || 320;
      const leftPx = Math.round((parentRect.width - formWidth) / 2);
      const topPx = Math.round(mainInput.offsetHeight + 8);

      newForm.style.position = "absolute";
      newForm.style.left = `${leftPx}px`;
      newForm.style.top = `${topPx}px`;
      newForm.style.transform = "none";
      newForm.style.zIndex = 150;
      if (!newForm.style.width) newForm.style.width = "320px";
    };

    const filterOptions = (term = "") => {
      const searchTerm = (term || "").toLowerCase();
      options.forEach((opt) => {
        opt.style.display = opt.textContent.toLowerCase().includes(searchTerm)
          ? "block"
          : "none";
      });
      dropdown.classList.add("active");
      wrapper.classList.add("active");
      positionDropdown();
    };

    const closeDropdown = () => {
      dropdown.classList.remove("active");
      wrapper.classList.remove("active");
      if (searchInput) searchInput.value = "";
      options.forEach((opt) => (opt.style.display = "block"));
    };

    const toggleNewForm = (show) => {
      if (!newForm) return;
      if (show) {
        newForm.classList.add("active");
        positionNewForm();
        newFormInput?.focus();
      } else {
        newForm.classList.remove("active");
      }
    };

    mainInput.addEventListener("click", (e) => {
      e.stopPropagation();
      if (wrapper.classList.contains("active")) closeDropdown();
      else {
        dropdown.classList.add("active");
        wrapper.classList.add("active");

        if (
          !dropdown.style.width &&
          !dropdown.style.top &&
          !dropdown.style.left
        ) {
          positionDropdown();
        }

        searchInput?.focus();
      }
    });

    mainInput.addEventListener("input", () => filterOptions(mainInput.value));
    searchInput.addEventListener("input", () =>
      filterOptions(searchInput.value)
    );

    arrow?.addEventListener("click", (e) => {
      e.stopPropagation();
      mainInput.click();
    });

    dropdown.addEventListener("click", (e) => {
      const option = e.target.closest(".custom-select-option");
      if (option) {
        mainInput.value = option.textContent.trim();
        closeDropdown();
      }
    });

    if (addButton) {
      addButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDropdown();
        toggleNewForm(true);
      });
    }

    if (newFormInput) {
      newFormInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const value = newFormInput.value.trim();
          if (value) {
            mainInput.value = value;
            const newOpt = document.createElement("div");
            newOpt.className = "custom-select-option";
            newOpt.textContent = value;
            dropdown.appendChild(newOpt);
            options.push(newOpt);
            toggleNewForm(false);
            newFormInput.value = "";
          }
        }
      });
    }

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target) && !(row && row.contains(e.target))) {
        closeDropdown();
        toggleNewForm(false);
      }
    });

    window.addEventListener("resize", () => {
      if (dropdown.classList.contains("active")) positionDropdown();
      if (newForm && newForm.classList.contains("active")) positionNewForm();
    });

    mainInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdown();
    });

    searchInput.addEventListener("click", (e) => e.stopPropagation());
  });
}
