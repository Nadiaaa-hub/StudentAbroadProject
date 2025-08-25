import { initLanguageSwitcher } from "./modules/language-switcher.js";
import { initScrollIndicator } from "./modules/scroll-indicator.js";
import { initCustomSelects } from "./modules/custom-select.js";
import { initCountryFilter } from "./modules/country-filter.js";
import { initAddUniversity } from "./modules/add-university.js";
import { initSearchInput } from "./modules/search.js";
import { initFAQ } from "./modules/faq.js";
import { modalBtnClose } from "./modules/modal.js";
import { burgerMenu } from "./modules/burger-menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initScrollIndicator();

  const searchInput = document.querySelector(".search-box__input");
  const searchableSections = document.querySelectorAll(
    ".study-abroad-section, .about-us-section, .about-section__info-columns, .faq-section, .contact-details-section"
  );
  initCustomSelects();
  initCountryFilter();
  initAddUniversity();
  initSearchInput();
  modalBtnClose();
  burgerMenu();
  initFAQ();
});
