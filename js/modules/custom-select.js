export function initCustomSelects() {
  document.querySelectorAll(".custom-select-wrapper").forEach((wrapper) => {
    const mainInput = wrapper.querySelector(".custom-select-input");
    const dropdown = wrapper.querySelector(".custom-select-dropdown");
    const arrow = wrapper.querySelector(".select-arrow");
    const addButton = wrapper.querySelector(".custom-select-add-button");

    if (!dropdown) {
      console.warn(
        "Custom select wrapper does not contain a dropdown:",
        wrapper
      );
      return;
    }

    let optionsContainer = dropdown.querySelector(
      ".custom-select-options-list"
    );
    if (!optionsContainer) {
      optionsContainer = dropdown;
    }

    let searchInput = dropdown.querySelector(".custom-select-search-input");
    if (!searchInput) {
      const searchDiv = document.createElement("div");
      searchDiv.classList.add("custom-select-search");

      searchInput = document.createElement("input");
      searchInput.setAttribute("type", "text");
      searchInput.setAttribute("placeholder", "Search...");
      searchInput.classList.add("custom-select-search-input");
      searchDiv.appendChild(searchInput);

      const searchIcon = document.createElement("img");
      searchIcon.setAttribute("src", "./project/img/search.svg");
      searchIcon.setAttribute("alt", "Search");
      searchDiv.appendChild(searchIcon);

      dropdown.prepend(searchDiv);
    }

    let options = Array.from(
      optionsContainer.querySelectorAll(".custom-select-option")
    );

    let newForm = wrapper.nextElementSibling;
    let newFormInput;
    if (newForm && newForm.classList.contains("new-item-form")) {
      newFormInput =
        newForm.querySelector("input") || newForm.querySelector("textarea");
    }

    const positionDropdown = () => {
      const inputRect = mainInput.getBoundingClientRect();
      dropdown.style.top = `${inputRect.height + 5}px`;
      dropdown.style.left = `0`;
      dropdown.style.width = `${mainInput.offsetWidth}px`;

      const dropdownRightEdge = inputRect.left + dropdown.offsetWidth;
      if (dropdownRightEdge > window.innerWidth - 20) {
        dropdown.style.left = `${inputRect.width - dropdown.offsetWidth}px`;
      }
    };

    const filterOptions = (term = "") => {
      const searchTerm = term.toLowerCase();
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

      if (!hasVisibleOptions && searchTerm !== "") {
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
      searchInput.value = "";
      options.forEach((opt) => (opt.style.display = "block"));
    };

    const toggleNewForm = (show) => {
      if (newForm) {
        if (show) {
          newForm.classList.add("active");
          if (newFormInput) {
            newFormInput.focus();
          }
        } else {
          newForm.classList.remove("active");
        }
      }
    };

    // OPEN/CLOSE LOGIC
    mainInput.addEventListener("click", (event) => {
      event.stopPropagation();
      const isActive = wrapper.classList.contains("active");
      if (isActive) {
        closeDropdown();
      } else {
        dropdown.classList.add("active");
        wrapper.classList.add("active");
        positionDropdown();
        searchInput.focus();
      }
    });

    mainInput.addEventListener("input", () => {
      filterOptions(mainInput.value);
    });

    searchInput.addEventListener("input", () => {
      filterOptions(searchInput.value);
    });

    // Add event listener to the arrow as well
    if (arrow) {
      arrow.addEventListener("click", (event) => {
        event.stopPropagation();
        mainInput.click();
      });
    }

    optionsContainer.addEventListener("click", (event) => {
      const selectedOption = event.target.closest(".custom-select-option");
      if (selectedOption) {
        mainInput.value = selectedOption.textContent.trim();
        closeDropdown();
      }
    });

    if (addButton) {
      addButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeDropdown();
        toggleNewForm(true);
      });
    }

    if (newFormInput) {
      newFormInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const savedValue = newFormInput.value.trim();
          if (savedValue) {
            console.log(`Saved value for ${wrapper.id}: ${savedValue}`);
            mainInput.value = savedValue;
            toggleNewForm(false);
            newFormInput.value = "";
          }
        }
      });
    }

    document.addEventListener("click", (event) => {
      if (
        !wrapper.contains(event.target) &&
        newForm &&
        !newForm.contains(event.target)
      ) {
        closeDropdown();
        toggleNewForm(false);
      }
    });

    let resizeTimer;
    addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (dropdown.classList.contains("active")) {
          positionDropdown();
        }
      }, 100);
    });

    let scrollTimer;
    addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (dropdown.classList.contains("active")) {
          positionDropdown();
        }
      }, 50);
    });

    mainInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    });

    searchInput.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
  }
