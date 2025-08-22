export function burgerMenu() {
  const burgerBtn = document.querySelector(".header__burger");
  const burgerIcon = burgerBtn.querySelector("use");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".menu-btn-close");
  const overlay = document.querySelector(".overlay");

  if (burgerBtn && mobileMenu && closeBtn && overlay && burgerIcon) {
    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
      overlay.classList.add("active");

      // Заміна іконки на "close"
      burgerIcon.setAttribute(
        "xlink:href",
        "./project/img/icon-close-burger.svg#icon"
      );
      burgerBtn.style.transform = "rotate(90deg)";
      setTimeout(() => (burgerBtn.style.transform = "rotate(0deg)"), 300);
    });

    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("active");

      // Заміна іконки на "burger"
      burgerBtn.style.transform = "rotate(-90deg)";
      setTimeout(() => {
        burgerIcon.setAttribute(
          "xlink:href",
          "./project/img/burger-menu.svg#icon"
        );
        burgerBtn.style.transform = "rotate(0deg)";
      }, 300);
    };

    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
  }
}
