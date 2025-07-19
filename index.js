// index.js
document.addEventListener("DOMContentLoaded", function () {
  // Логіка для перемикання мов
  const switchButtons = document.querySelectorAll(".js-switch-button");
  const elementsToTranslate = document.querySelectorAll("[data-en][data-ua]");
  const searchInput = document.querySelector(".search-box__input"); // Отримуємо searchInput тут

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

  // Логіка для скролінгу
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const aboutSection = document.querySelector("#about-us-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Отримуємо всі секції, в яких будемо шукати (для підсвічування)
  const searchableSections = document.querySelectorAll(
    ".study-abroad-section, .about-us-section, .about-section__info-columns, .faq-section, .contact-details-section"
  );

  // *** Виклик функції ініціалізації підсвічування з highlight.js ***
  // Перевіряємо, чи функція `initHighlighting` існує, перш ніж викликати її.
  // Це забезпечує, що highlight.js вже завантажився.
  if (typeof initHighlighting === "function") {
    initHighlighting(searchInput, searchableSections);
  } else {
    console.error(
      "Function initHighlighting not found. Make sure highlight.js is loaded correctly."
    );
  }

  // CUSTOM SEARCHABLE SELECT DROPDOWNS //
  document.querySelectorAll(".custom-select-wrapper").forEach((wrapper) => {
    const input = wrapper.querySelector(".custom-select-input");
    const dropdown = wrapper.querySelector(".custom-select-dropdown");
    const optionsContainer = dropdown;
    let options = Array.from(
      optionsContainer.querySelectorAll(".custom-select-option")
    );
    const arrow = wrapper.querySelector(".select-arrow");
    const addButton = wrapper.querySelector(".custom-select-add-button");

    const positionDropdown = () => {
      const inputRect = input.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();

      dropdown.style.top = `${inputRect.height + 5}px`;
      dropdown.style.left = `0`;
      dropdown.style.width = `${input.offsetWidth}px`;

      const dropdownRightEdge = wrapperRect.left + dropdown.offsetWidth;
      if (dropdownRightEdge > window.innerWidth - 20) {
        dropdown.style.left = `${inputRect.width - dropdown.offsetWidth}px`;
      }
    };

    const filterOptions = () => {
      const searchTerm = input.value.toLowerCase();
      let hasVisibleOptions = false;
      options.forEach((option) => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          option.style.display = "block";
          hasVisibleOptions = true;
        } else {
          option.style.display = "none";
        }
      });

      if (!hasVisibleOptions && input.value !== "") {
        dropdown.classList.remove("active");
        wrapper.classList.remove("active");
      } else {
        dropdown.classList.add("active");
        wrapper.classList.add("active");
        positionDropdown();
      }
    };
    const closeDropdown = () => {
      dropdown.classList.remove("active");
      wrapper.classList.remove("active");
      options.forEach((opt) => (opt.style.display = "block"));
    };

    // OPEN/CLOSE LOGIC //
    input.addEventListener("mousedown", (event) => {
      if (wrapper.classList.contains("active")) {
        closeDropdown();
      } else {
        input.focus();
        filterOptions();
      }
      event.stopPropagation();
    });

    input.addEventListener("focus", () => {
      if (!wrapper.classList.contains("active") && input.value === "") {
        filterOptions();
      }
    });

    input.addEventListener("input", filterOptions);

    options.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        input.value = option.textContent.trim();
        closeDropdown();
      });
    });

    if (addButton) {
      addButton.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target)) {
        closeDropdown();
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

    let scrollTimer;
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
        closeDropdown();
      }
    });
  });

  // COUNTRY SEARCH AND CHECKBOX FILTER //
  const countrySearchInput = document.querySelector(
    ".country-search-box__input"
  );
  const checkboxes = document.querySelectorAll(
    ".checkbox-group .container-checkbox"
  );

  if (countrySearchInput) {
    countrySearchInput.addEventListener("input", () => {
      const query = countrySearchInput.value.trim().toLowerCase(); // Виправлено country.SearchInput на countrySearchInput

      checkboxes.forEach((checkbox) => {
        const labelEl = checkbox.querySelector(".country-label");
        const en = labelEl
          ? labelEl.getAttribute("data-en")?.toLowerCase() || ""
          : "";
        const ua = labelEl
          ? labelEl.getAttribute("data-ua")?.toLowerCase() || ""
          : "";

        if (en.includes(query) || ua.includes(query)) {
          checkbox.style.display = "inline-flex";
          applyFadeIn(checkbox);
        } else {
          checkbox.style.display = "none";
        }
      });
    });
  }

  function applyFadeIn(el) {
    el.classList.remove("fade-in");
    void el.offsetWidth;
    el.classList.add("fade-in");
  }

  const addInvitingUniButton = document.getElementById(
    "add-inviting-uni-button"
  );
  const newInvitingUniFields = document.getElementById(
    "new-inviting-uni-fields"
  );

  if (addInvitingUniButton && newInvitingUniFields) {
    addInvitingUniButton.addEventListener("click", () => {
      newInvitingUniFields.style.display =
        newInvitingUniFields.style.display === "none" ? "block" : "none";

      if (newInvitingUniFields.style.display === "block") {
        newInvitingUniFields
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));
        const newRegionFields = document.getElementById("new-region-fields");
        if (newRegionFields) newRegionFields.style.display = "none";
      }
    });
  }

  const addHomeUniButton = document.getElementById("add-home-uni-button");
  const newHomeUniFields = document.getElementById("new-home-uni-fields");

  if (addHomeUniButton && newHomeUniFields) {
    addHomeUniButton.addEventListener("click", () => {
      newHomeUniFields.style.display =
        newHomeUniFields.style.display === "none" ? "block" : "none";
      if (newHomeUniFields.style.display === "block") {
        newHomeUniFields
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));
        const newHomeUniRegionFields = document.getElementById(
          "new-home-uni-region-fields"
        );
        if (newHomeUniRegionFields)
          newHomeUniRegionFields.style.display = "none";
      }
    });
  }
  const addRegionButton = document.getElementById("add-region-button");
  const newRegionFields = document.getElementById("new-region-fields");

  if (addRegionButton && newRegionFields) {
    addRegionButton.addEventListener("click", (event) => {
      event.stopPropagation();
      newRegionFields.style.display =
        newRegionFields.style.display === "none" ? "block" : "none";
      if (newRegionFields.style.display === "block") {
        newRegionFields
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));
      }
    });
  }

  const addHomeUniRegionButton = document.getElementById(
    "add-home-uni-region-button"
  );
  const newHomeUniRegionFields = document.getElementById(
    "new-home-uni-region-fields"
  );

  if (addHomeUniRegionButton && newHomeUniRegionFields) {
    addHomeUniRegionButton.addEventListener("click", (event) => {
      event.stopPropagation();
      newHomeUniRegionFields.style.display =
        newHomeUniRegionFields.style.display === "none" ? "block" : "none";
      if (newHomeUniRegionFields.style.display === "block") {
        newHomeUniRegionFields
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));
      }
    });
  }

  const addCountryButton = document.getElementById("add-country-button");
  if (addCountryButton) {
    addCountryButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(
        'Кнопка "Додати країну" для нового регіону запрошуючого університету натиснута'
      );
    });
  }

  const addHomeUniCountryButton = document.getElementById(
    "add-home-uni-country-button"
  );
  if (addHomeUniCountryButton) {
    addHomeUniCountryButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(
        'Кнопка "Додати країну" для нового регіону домашнього університету натиснута!'
      );
    });
  }

  // --- SUBMIT LOGIC FOR "ADD A NEW UNI" BUTTONS ---

  // Для "Add a new uni" (Inviting Uni)
  const addNewInvitingUniSubmitButton =
    document.getElementById("add-new-uni-button");
  if (addNewInvitingUniSubmitButton) {
    addNewInvitingUniSubmitButton.addEventListener("click", () => {
      const newUniNameInput = newInvitingUniFields.querySelector(
        'input[placeholder="Name:"]'
      );
      const newUniShortNameInput = newInvitingUniFields.querySelector(
        'input[placeholder="Short Name:"]'
      );
      const newUniSlugInput = newInvitingUniFields.querySelector(
        'input[placeholder="Slug:"]'
      );
      const newUniRegionInput = newInvitingUniFields.querySelector(
        'input[placeholder="Region:"]'
      );
      const newUniCountryInput = newInvitingUniFields.querySelector(
        '#new-region-fields input[placeholder="Country:"]'
      );
      const newUniUrlInput = newInvitingUniFields.querySelector(
        'input[placeholder="URL:"]'
      );
      const newUniContactInput = newInvitingUniFields.querySelector(
        'input[placeholder="Contact:"]'
      );

      if (!newUniNameInput.value.trim() || !newUniSlugInput.value.trim()) {
        alert(
          'Будь ласка, заповніть поля "Name" та "Slug" для нового запрошуючого університету.'
        );
        return;
      }

      const newUniData = {
        name: newUniNameInput.value.trim(),
        shortName: newUniShortNameInput.value.trim(),
        slug: newUniSlugInput.value.trim(),
        region: newUniRegionInput.value.trim(),
        country: newUniCountryInput ? newUniCountryInput.value.trim() : "",
        url: newUniUrlInput.value.trim(),
        contact: newUniContactInput.value.trim(),
      };

      console.log("Відправка нового запрошуючого університету:", newUniData);

      alert("Дані збережено.");
      newInvitingUniFields
        .querySelectorAll("input")
        .forEach((input) => (input.value = ""));
      newInvitingUniFields.style.display = "none";
      const newRegionFieldsForInviting =
        document.getElementById("new-region-fields");
      if (newRegionFieldsForInviting)
        newRegionFieldsForInviting.style.display = "none";
    });
  }

  // Для "Add a new home uni"
  const addNewHomeUniSubmitButton = document.getElementById(
    "add-new-home-uni-button"
  );
  if (addNewHomeUniSubmitButton) {
    addNewHomeUniSubmitButton.addEventListener("click", () => {
      const newHomeUniNameInput = newHomeUniFields.querySelector(
        'input[placeholder="Name:"]'
      );
      const newHomeUniShortNameInput = newHomeUniFields.querySelector(
        'input[placeholder="Short Name:"]'
      );
      const newHomeUniSlugInput = newHomeUniFields.querySelector(
        'input[placeholder="Slug:"]'
      );
      const newHomeUniRegionInput = newHomeUniFields.querySelector(
        'input[placeholder="Region:"]'
      );
      const newHomeUniCountryInput = newHomeUniFields.querySelector(
        '#new-home-uni-region-fields input[placeholder="Country:"]'
      );
      const newHomeUniUrlInput = newHomeUniFields.querySelector(
        'input[placeholder="URL:"]'
      );
      const newHomeUniContactInput = newHomeUniFields.querySelector(
        'input[placeholder="Contact:"]'
      );

      if (
        !newHomeUniNameInput.value.trim() ||
        !newHomeUniSlugInput.value.trim()
      ) {
        alert(
          'Будь ласка, заповніть поля "Name" та "Slug" для нового домашнього університету.'
        );
        return;
      }

      const newHomeUniData = {
        name: newHomeUniNameInput.value.trim(),
        shortName: newHomeUniShortNameInput.value.trim(),
        slug: newHomeUniSlugInput.value.trim(),
        region: newHomeUniRegionInput.value.trim(),
        country: newHomeUniCountryInput
          ? newHomeUniCountryInput.value.trim()
          : "",
        url: newHomeUniUrlInput.value.trim(),
        contact: newHomeUniContactInput.value.trim(),
      };

      console.log("Відправка нового домашнього університету:", newHomeUniData);

      alert("Дані збережено.");
      newHomeUniFields
        .querySelectorAll("input")
        .forEach((input) => (input.value = ""));
      newHomeUniFields.style.display = "none";
      const newHomeUniRegionFieldsForHome = document.getElementById(
        "new-home-uni-region-fields"
      );
      if (newHomeUniRegionFieldsForHome)
        newHomeUniRegionFieldsForHome.style.display = "none";
    });
  }

  document
    .querySelectorAll(".form-field-and-description .form-section__add-button")
    .forEach((button) => {
      if (
        button.id === "add-region-button" ||
        button.id === "add-country-button" ||
        button.id === "add-home-uni-region-button" ||
        button.id === "add-home-uni-country-button"
      ) {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      }
    });
  document
    .querySelectorAll(".custom-select-wrapper .form-section__add-button")
    .forEach((button) => {
      const parentWrapper = button.closest(".custom-select-wrapper");

      if (
        parentWrapper &&
        button.id &&
        (button.id.includes("add-region-button") ||
          button.id.includes("add-country-button"))
      ) {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      }
    });

  // --- ЛОГІКА ВІДПРАВКИ ОСНОВНОЇ ФОРМИ "ADD PROGRAM" ---
  const addProgramForm = document.getElementById("addProgramForm");

  if (addProgramForm) {
    addProgramForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Запобігаємо стандартній відправці форми

      // Перевіряємо валідність форми за допомогою вбудованої HTML5 валідації
      if (!this.checkValidity()) {
        console.log("Form is not valid. Please fill in all required fields.");
        return; // Зупиняємо виконання, якщо форма невалідна
      }

      // Збір даних форми (якщо ви плануєте їх відправляти на сервер)
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      console.log("Form data collected:", data); // Для перевірки в консолі

      // Тут має бути ваш реальний AJAX-запит для відправки даних на сервер.
      // Приклад (закоментований, розкоментуйте та налаштуйте для реального бекенду):
      // fetch('/api/add-program', { // Замініть на реальний URL вашого API
      //     method: 'POST',
      //     body: JSON.stringify(data), // Або formData без JSON.stringify, якщо API очікує multipart/form-data
      //     headers: {
      //         'Content-Type': 'application/json' // Змініть, якщо відправляєте formData
      //     }
      // })
      // .then(response => {
      //     if (!response.ok) {
      //         throw new Error('Network response was not ok ' + response.statusText);
      //     }
      //     return response.json(); // Або response.text()
      // })
      // .then(result => {
      //     console.log('Server response:', result);
      //     // Після успішної відповіді від сервера:
      //     window.location.href = 'confirmation.html'; // Перенаправлення на сторінку підтвердження
      // })
      // .catch(error => {
      //     console.error('Error submitting form:', error);
      //     alert('An error occurred during submission. Please try again.');
      // });

      // ДЛЯ ДЕМОНСТРАЦІЇ (без реального бекенду), одразу перенаправляємо після затримки:
      setTimeout(() => {
        window.location.href = "confirmation.html"; // Перенаправлення на сторінку підтвердження
      }, 500); // Невелика затримка для імітації мережевого запиту
    });
  }
});

// !!! ВАЖЛИВО: Переконайтеся, що всі input у вашій формі мають атрибут 'name'
// щоб FormData правильно збирав їх значення. Наприклад:
// <input type="text" placeholder="Name:" required name="programName" />
// <input type="text" placeholder="Slug:" required name="programSlug" />
// і так далі для ВСІХ полів, які ви хочете відправити.
