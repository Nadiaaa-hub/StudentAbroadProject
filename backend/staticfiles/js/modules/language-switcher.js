export function initLanguageSwitcher() {
  const switchButtons = document.querySelectorAll(".js-switch-button");
  const elementsToTranslate = document.querySelectorAll("[data-en][data-ua]");
  const searchInput = document.querySelector(".search-box__input");

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
}
