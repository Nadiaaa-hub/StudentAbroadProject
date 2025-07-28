export function initCountryFilter() {
  const countrySearchInput = document.querySelector(
    ".country-search-box__input"
  );
  const checkboxes = document.querySelectorAll(
    ".checkbox-group .container-checkbox"
  );

  if (countrySearchInput) {
    countrySearchInput.addEventListener("input", () => {
      const query = countrySearchInput.value.trim().toLowerCase();
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
}
