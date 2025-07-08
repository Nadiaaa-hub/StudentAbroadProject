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

  // ===== CUSTOM SELECT DROPDOWN =====
  const customSelectWrappers = document.querySelectorAll(".custom-select-wrapper");
  // const formSection = document.querySelector(".form-section"); // Можливо, не знадобиться, залежить від вашої структури
  // const container = document.querySelector(".container"); // Можливо, не знадобиться

  customSelectWrappers.forEach((wrapper) => {
    const input = wrapper.querySelector(".custom-select-input");
    const dropdown = wrapper.querySelector(".custom-select-dropdown");
    const addButton = wrapper.querySelector(".custom-select-add-button");
    const arrow = wrapper.querySelector(".select-arrow");
    const options = dropdown.querySelectorAll(".custom-select-option");

    // Забезпечимо, що custom-select-wrapper має position: relative,
    // щоб dropdown позиціонувався відносно нього
    wrapper.style.position = 'relative';

    const positionDropdown = () => {
      const inputRect = input.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect(); // Отримуємо позицію обгортки

      // Обчислюємо `top` відносно інпуту, з невеликим відступом, якщо потрібно
      // `inputRect.height` або `input.offsetHeight` - висота інпуту
      // `inputRect.top` - позиція інпуту відносно viewport
      // `window.scrollY` - наскільки прокручена сторінка

      // Щоб dropdown був під інпутом:
      // top = висота інпуту + невеликий відступ (наприклад, 10px)
      dropdown.style.top = `${input.offsetHeight + 10}px`; // 10px відступ від низу інпуту

      // Щоб dropdown був правіше на 200px від лівого краю інпуту
      // left = 200px (відносно батьківського елемента з position: relative)
      dropdown.style.left = `200px`;

      // Встановлюємо ширину 450px
      dropdown.style.width = `450px`;

      // Опціонально: перевірка на вихід за межі вікна (для правої сторони)
      // Це може бути корисно, якщо 200px зміщення + 450px ширина виходять за екран
      const dropdownRightEdge = wrapperRect.left + 200 + 450; // Лівий край обгортки + зміщення + ширина
      if (dropdownRightEdge > window.innerWidth) {
        // Якщо виходить, переміщуємо його так, щоб він вмістився
        // Можна або зсунути ліворуч, або зменшити ширину
        // Варіант: відступ від правого краю вікна
        dropdown.style.left = `${window.innerWidth - wrapperRect.left - 450 - 20}px`; // 20px відступ від правого краю вікна
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
        dropdown.classList.remove("active"); // Зникає після вибору
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

    // Слухач на скрол тепер більш важливий, оскільки dropdown позиціонується абсолютно
    // і повинен перераховувати свою позицію, якщо батьківський елемент прокручується
    // (наприклад, якщо форма знаходиться в прокручуваному контейнері)
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