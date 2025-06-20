document.addEventListener("DOMContentLoaded", function () {
  const switchButtons = document.querySelectorAll(".js-switch-button");
  const elementsToTranslate = document.querySelectorAll("[data-en][data-ua]");
  const searchInput = document.querySelector(".search-box__input");

  // Функція перемикання мови
  function switchLanguage(lang) {
    elementsToTranslate.forEach((el) => {
      const translation = el.getAttribute(`data-${lang}`);
      // Якщо елемент може містити HTML, використай innerHTML, інакше textContent
      if (el.tagName === 'H2' || el.tagName === 'P' || el.classList.contains('about-us__title')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    });

    if (searchInput) {
      searchInput.placeholder = searchInput.getAttribute(`data-${lang}`);
    }

    // Зберігаємо мову в localStorage
    localStorage.setItem("lang", lang);

    // Активуємо кнопку для вибраної мови
    switchButtons.forEach((btn) => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Отримуємо мову з localStorage або ставимо за замовчуванням 'en'
  const savedLang = localStorage.getItem("lang") || "en";
  switchLanguage(savedLang);

  // Встановлюємо слухачі на кнопки перемикання мови
  switchButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      switchLanguage(selectedLang);
    });
  });

  // Прокрутка вниз при натисканні на стрілку
  document.querySelector(".scroll-indicator").addEventListener("click", function () {
    document.querySelector("#about-us-section").scrollIntoView({ behavior: "smooth" });
  });
});
