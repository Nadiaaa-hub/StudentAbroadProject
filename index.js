document.addEventListener("DOMContentLoaded", function () {
  const switchButtons = document.querySelectorAll(".js-switch-button");
  const elementsToTranslate = document.querySelectorAll("[data-en][data-ua]");
  const searchInput = document.querySelector(".search-box__input");

  function switchLanguage(lang) {
    elementsToTranslate.forEach((el) => {
      const translation = el.getAttribute(`data-${lang}`);
      if (el.tagName === 'H2' || el.tagName === 'P' || el.classList.contains('about-us__title')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    });

    if (searchInput) {
      searchInput.placeholder = searchInput.getAttribute(`data-${lang}`);
    }
   
    localStorage.setItem("lang", lang);

    switchButtons.forEach((btn) => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active"); 
      } else {
        btn.classList.remove("active"); 
      }
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

  document.querySelector(".scroll-indicator").addEventListener("click", function () {
    document.querySelector("#about-us-section").scrollIntoView({ behavior: "smooth" });
  });
});
