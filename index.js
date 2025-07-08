document.addEventListener("DOMContentLoaded", function () {
  const switchButtons = document.querySelectorAll(".js-switch-button");
  const elementsToTranslate = document.querySelectorAll("[data-en][data-ua]");
  const searchInput = document.querySelector(".search-box__input");
  const inputs = document.querySelectorAll(".input-with-optional-button");

  function switchLanguage(lang) {
    elementsToTranslate.forEach((el) => {
      const translation = el.getAttribute(`data-${lang}`);
      if (!translation) return;

      if (
        el.tagName === "H2" ||
        el.tagName === "P" ||
        el.classList.contains("about-us__title")
      ) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    });

    if (searchInput) {
      const placeholderText = searchInput.getAttribute(`data-${lang}`);
      if (placeholderText) {
        searchInput.placeholder = placeholderText;
      }
    }

    localStorage.setItem("lang", lang);

    switchButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  const savedLang = localStorage.getItem("lang") || "en";
  switchLanguage(savedLang);

  switchButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      switchLanguage(selectedLang);
    });
  });

  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const aboutSection = document.querySelector("#about-us-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  inputs.forEach((wrapper) => {
    const select = wrapper.querySelector("select");
    const arrow = wrapper.querySelector(".select-arrow");

    if (select && arrow) {
      select.addEventListener("focus", () => {
        wrapper.classList.add("select-open");
      });

      select.addEventListener("blur", () => {
        wrapper.classList.remove("select-open");
      });

      select.addEventListener("mousedown", () => {
        wrapper.classList.add("select-open");
      });
    }
  });

  // CUSTOM SELECT DROPDOWN //
  const customSelectWrappers = document.querySelectorAll(".custom-select-wrapper");

  customSelectWrappers.forEach((wrapper) => {
    const input = wrapper.querySelector(".custom-select-input");
    const dropdown = wrapper.querySelector(".custom-select-dropdown");
    const addButton = wrapper.querySelector(".custom-select-add-button");
    const arrow = wrapper.querySelector(".select-arrow");
    const options = dropdown.querySelectorAll(".custom-select-option");

    wrapper.style.position = 'relative';

    const positionDropdown = () => {
      const inputRect = input.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect(); 

      dropdown.style.top = `${input.offsetHeight + 10}px`;

      dropdown.style.left = `200px`;

      dropdown.style.width = `450px`;

      const dropdownRightEdge = wrapperRect.left + 200 + 450; 
      if (dropdownRightEdge > window.innerWidth) {
       
        dropdown.style.left = `${window.innerWidth - wrapperRect.left - 450 - 20}px`; 
      }
    };

    const toggleDropdown = () => {
      dropdown.classList.toggle("active");
      input.classList.toggle("active");
      arrow.classList.toggle("active");

      if (dropdown.classList.contains("active")) {
        positionDropdown();
      }
    };

    input.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleDropdown();
    });

    addButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleDropdown();
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        input.value = option.textContent.trim();
        dropdown.classList.remove("active"); 
        input.classList.remove("active");
        arrow.classList.remove("active");
      });
    });

    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
        input.classList.remove("active");
        arrow.classList.remove("active");
      }
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (dropdown.classList.contains("active")) {
          positionDropdown();
        }
      }, 100);
    });

  
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (dropdown.classList.contains("active")) {
          positionDropdown();
        }
      }, 50);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dropdown.classList.remove("active");
        input.classList.remove("active");
        arrow.classList.remove("active");
      }
    });
  });
});