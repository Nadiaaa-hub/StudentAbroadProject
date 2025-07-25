// export function initCustomSelects() {
//   document.querySelectorAll(".custom-select-wrapper").forEach((wrapper) => {
//     const input = wrapper.querySelector(".custom-select-input");
//     const dropdown = wrapper.querySelector(".custom-select-dropdown");
//     const optionsContainer = dropdown;
//     let options = Array.from(
//       optionsContainer.querySelectorAll(".custom-select-option")
//     );
//     const arrow = wrapper.querySelector(".select-arrow");
//     const addButton = wrapper.querySelector(".custom-select-add-button");

//     const positionDropdown = () => {
//       const inputRect = input.getBoundingClientRect();
//       dropdown.style.top = `${inputRect.height + 5}px`;
//       dropdown.style.left = `0`;
//       dropdown.style.width = `${input.offsetWidth}px`;

//       const dropdownRightEdge = inputRect.left + dropdown.offsetWidth;
//       if (dropdownRightEdge > window.innerWidth - 20) {
//         dropdown.style.left = `${inputRect.width - dropdown.offsetWidth}px`;
//       }
//     };

//     const filterOptions = () => {
//       const searchTerm = input.value.toLowerCase();
//       let hasVisibleOptions = false;

//       options.forEach((option) => {
//         const text = option.textContent.toLowerCase();
//         if (text.includes(searchTerm)) {
//           option.style.display = "block";
//           hasVisibleOptions = true;
//         } else {
//           option.style.display = "none";
//         }
//       });

//       if (!hasVisibleOptions && input.value !== "") {
//         dropdown.classList.remove("active");
//         wrapper.classList.remove("active");
//       } else {
//         dropdown.classList.add("active");
//         wrapper.classList.add("active");
//         positionDropdown();
//       }
//     };

//     const closeDropdown = () => {
//       dropdown.classList.remove("active");
//       wrapper.classList.remove("active");
//       options.forEach((opt) => (opt.style.display = "block"));
//     };

//     // OPEN/CLOSE LOGIC //
//     input.addEventListener("mousedown", (event) => {
//       if (wrapper.classList.contains("active")) {
//         closeDropdown();
//       } else {
//         input.focus();
//         filterOptions();
//       }
//       event.stopPropagation();
//     });

//     input.addEventListener("focus", () => {
//       if (!wrapper.classList.contains("active") && input.value === "") {
//         filterOptions();
//       }
//     });

//     input.addEventListener("input", filterOptions);

//     options.forEach((option) => {
//       option.addEventListener("click", (event) => {
//         event.stopPropagation();
//         input.value = option.textContent.trim();
//         closeDropdown();
//       });
//     });

//     if (addButton) {
//       addButton.addEventListener("click", (event) => {
//         event.stopPropagation();
//       });
//     }

//     document.addEventListener("click", (event) => {
//       if (!wrapper.contains(event.target)) {
//         closeDropdown();
//       }
//     });

//     let resizeTimer;
//     addEventListener("resize", () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(() => {
//         if (dropdown.classList.contains("active")) {
//           positionDropdown();
//         }
//       }, 100);
//     });

//     let scrollTimer;
//     addEventListener("scroll", () => {
//       clearTimeout(scrollTimer);
//       scrollTimer = setTimeout(() => {
//         if (dropdown.classList.contains("active")) {
//           positionDropdown();
//         }
//       }, 50);
//     });

//     input.addEventListener("keydown", (event) => {
//       if (event.key === "Escape") {
//         closeDropdown();
//       }
//     });
//   })};

 export function initCustomSelects() {
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
      dropdown.style.top = `${inputRect.height + 5}px`;
      dropdown.style.left = `0`;
      dropdown.style.width = `${input.offsetWidth}px`;

      const dropdownRightEdge = inputRect.left + dropdown.offsetWidth;
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

    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    });
  })};