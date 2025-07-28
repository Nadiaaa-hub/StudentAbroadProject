export function initSearchInput() {
  const searchInput = document.querySelector(".search-box__input");

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = searchInput.value.trim().toLowerCase();

      if (query) {
        const pages = [
          { name: "about us", url: "#about-us-section" },
          { name: "uni list", url: "uni-list.html" },
          { name: "program list", url: "program-list.html" },
          { name: "faq", url: "faq.html" },
        ];

        const found = pages.find((page) =>
          page.name.toLowerCase().includes(query)
        );

        if (found) {
          window.location.href = found.url;
        } else {
          alert("Нічого не знайдено");
        }
      }
    }
  });
}
