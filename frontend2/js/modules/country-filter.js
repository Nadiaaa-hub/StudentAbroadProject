// Функція для ініціалізації пагінації та пошуку країн
export function initCountryFilter() {
  const countrySearchInput = document.getElementById('countrySearchInput');
  const countryFilterContainer = document.getElementById('countryFilter');

  // Чекаємо, поки вбудований скрипт завантажить країни
  setTimeout(() => {
    // Перевіряємо, чи є елементи для роботи
    if (countrySearchInput && countryFilterContainer) {
      // Створюємо кнопки навігації
      createNavigationButtons();

      // Ініціалізуємо пагінацію для контейнера з країнами
      const filterState = initGroupPagination(countryFilterContainer);

      // Додаємо обробник події для пошуку по країнам
      countrySearchInput.addEventListener("input", () => {
        const query = countrySearchInput.value.trim().toLowerCase();
        filterCountryCheckboxes(query, countryFilterContainer, filterState);
      });

      // Обробник для очищення поля пошуку (кнопкою "х")
      countrySearchInput.addEventListener('search', () => {
        if (countrySearchInput.value === '') {
          filterCountryCheckboxes('', countryFilterContainer, filterState);
        }
      });
    }
  }, 500); // Даємо час вбудованому скрипту завантажити країни

  function filterCountryCheckboxes(query, group, state) {
    const checkboxes = group.querySelectorAll(".container-checkbox");
    const visibleItems = [];

    checkboxes.forEach((checkbox) => {
      const labelEl = checkbox.querySelector(".country-label");
      const en = labelEl ? labelEl.getAttribute("data-en")?.toLowerCase() || "" : "";
      const ua = labelEl ? labelEl.getAttribute("data-ua")?.toLowerCase() || "" : "";
      const isVisible = query === "" || en.includes(query) || ua.includes(query);

      if (isVisible) {
        visibleItems.push(checkbox);
      }
    });

    // Оновлюємо стан
    state.visibleItems = visibleItems;
    state.searchTotalPages = Math.ceil(visibleItems.length / state.itemsPerPage);

    // Оновлюємо навігацію
    const navContainer = document.querySelector(`.pagination-nav[data-nav-id="${state.navId}"]`);

    if (navContainer) {
      if (query === "") {
        // Якщо пошук пустий - повертаємо звичайну пагінацію
        navContainer.style.display = 'flex';
        state.isSearchMode = false;
        state.currentPage = Math.min(state.currentPage, state.totalPages - 1);
        showPage(group, state.currentPage, state.itemsPerPage);
        updateNavigationButtons(navContainer, state.currentPage, state.totalPages);
      } else {
        // Якщо є пошуковий запит - пагінація результатів пошуку
        navContainer.style.display = visibleItems.length > state.itemsPerPage ? 'flex' : 'none';
        state.isSearchMode = true;
        state.searchCurrentPage = 0;

        if (visibleItems.length > 0) {
          showSearchResults(group, visibleItems, 0, state.itemsPerPage);
          updateNavigationButtons(navContainer, 0, state.searchTotalPages);
        } else {
          // Якщо немає результатів - ховаємо всі елементи
          checkboxes.forEach(checkbox => {
            checkbox.style.display = "none";
          });
        }
      }
    }
  }

  function initGroupPagination(group) {
    const checkboxes = group.querySelectorAll(".container-checkbox");
    // Якщо чекбоксів немає (ще не завантажені), повертаємо пустий стан
    if (checkboxes.length === 0) {
      return {
        currentPage: 0,
        totalPages: 0,
        itemsPerPage: 12,
        navId: 'no-nav',
        isSearchMode: false,
        searchCurrentPage: 0,
        searchTotalPages: 0,
        visibleItems: []
      };
    }

    const itemsPerPage = 12;
    const totalPages = Math.ceil(checkboxes.length / itemsPerPage);
    const navId = `nav-${Math.random().toString(36).substr(2, 9)}`;

    group.setAttribute('data-nav-id', navId);

    const state = {
      currentPage: 0,
      totalPages,
      itemsPerPage,
      navId,
      isSearchMode: false,
      searchCurrentPage: 0,
      searchTotalPages: 0,
      visibleItems: Array.from(checkboxes)
    };

    // Додаємо навігацію для цієї групи
    addNavigationForGroup(group, state);

    // Показуємо першу сторінку
    showPage(group, 0, itemsPerPage);

    return state;
  }

  function addNavigationForGroup(group, state) {
    // Перевіряємо, чи не існує вже навігація для цієї групи
    if (document.querySelector(`.pagination-nav[data-nav-id="${state.navId}"]`)) {
      return;
    }

    const navContainer = document.createElement('div');
    navContainer.className = 'pagination-nav';
    navContainer.setAttribute('data-nav-id', state.navId);
    navContainer.innerHTML = `
      <button class="nav-arrow prev-arrow" disabled>←</button>
      <span class="page-info">1/${state.totalPages}</span>
      <button class="nav-arrow next-arrow">→</button>
    `;

    group.parentNode.insertBefore(navContainer, group.nextSibling);

    const prevBtn = navContainer.querySelector('.prev-arrow');
    const nextBtn = navContainer.querySelector('.next-arrow');
    const pageInfo = navContainer.querySelector('.page-info');

    state.navElements = { prevBtn, nextBtn, pageInfo, navContainer };

    prevBtn.addEventListener('click', () => {
      if (state.isSearchMode) {
        if (state.searchCurrentPage > 0) {
          state.searchCurrentPage--;
          showSearchResults(group, state.visibleItems, state.searchCurrentPage, state.itemsPerPage);
          updateNavigationButtons(navContainer, state.searchCurrentPage, state.searchTotalPages);
        }
      } else {
        if (state.currentPage > 0) {
          state.currentPage--;
          showPage(group, state.currentPage, state.itemsPerPage);
          updateNavigationButtons(navContainer, state.currentPage, state.totalPages);
        }
      }
    });

    nextBtn.addEventListener('click', () => {
      if (state.isSearchMode) {
        if (state.searchCurrentPage < state.searchTotalPages - 1) {
          state.searchCurrentPage++;
          showSearchResults(group, state.visibleItems, state.searchCurrentPage, state.itemsPerPage);
          updateNavigationButtons(navContainer, state.searchCurrentPage, state.searchTotalPages);
        }
      } else {
        if (state.currentPage < state.totalPages - 1) {
          state.currentPage++;
          showPage(group, state.currentPage, state.itemsPerPage);
          updateNavigationButtons(navContainer, state.currentPage, state.totalPages);
        }
      }
    });
  }

  function updateNavigationButtons(navContainer, currentPage, totalPages) {
    const prevBtn = navContainer.querySelector('.prev-arrow');
    const nextBtn = navContainer.querySelector('.next-arrow');
    const pageInfo = navContainer.querySelector('.page-info');

    pageInfo.textContent = `${currentPage + 1}/${totalPages}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
  }

  function showPage(group, page, itemsPerPage) {
    const checkboxes = group.querySelectorAll(".container-checkbox");
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    checkboxes.forEach((checkbox, index) => {
      if (index >= start && index < end) {
        checkbox.style.display = "inline-flex";
        applyFadeIn(checkbox);
      } else {
        checkbox.style.display = "none";
      }
    });
  }

  function showSearchResults(group, visibleItems, page, itemsPerPage) {
    const allCheckboxes = group.querySelectorAll(".container-checkbox");
    allCheckboxes.forEach(checkbox => {
      checkbox.style.display = "none";
    });

    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    visibleItems.slice(start, end).forEach(checkbox => {
      checkbox.style.display = "inline-flex";
      applyFadeIn(checkbox);
    });
  }

  function createNavigationButtons() {
    // Перевіряємо, чи стилі вже додані
    if (document.getElementById('pagination-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'pagination-styles';
    style.textContent = `
      .pagination-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin: 15px 0;
      }
      
      .nav-arrow {
        background: none;
        border: 1px solid #ccc;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 14px;
      }
      
      .nav-arrow:hover:not(:disabled) {
        background-color: #f0f0f0;
      }
      
      .nav-arrow:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .page-info {
        font-size: 14px;
        color: #666;
      }
    `;
    document.head.appendChild(style);
  }

  function applyFadeIn(el) {
    el.classList.remove("fade-in");
    void el.offsetWidth;
    el.classList.add("fade-in");
  }
}