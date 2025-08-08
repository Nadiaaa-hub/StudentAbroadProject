export function burgerMenu() {
  const burgerBtn = document.querySelector(".header__burger");
  const burgerIcon = burgerBtn.querySelector("use");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".menu-btn-close");
  const overlay = document.querySelector(".overlay");

  if (burgerBtn && mobileMenu && closeBtn && overlay) {
    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
      overlay.classList.add("active");

      // Анімація зміни іконки на "close"
      burgerIcon.setAttribute("href", "./project/img/icon-close-burger.svg");
      burgerBtn.style.transform = "rotate(90deg)";
      setTimeout(() => (burgerBtn.style.transform = "rotate(0deg)"), 300);
    });

    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("active");

      // Анімація зміни іконки на "burger"
      burgerBtn.style.transform = "rotate(-90deg)";
      setTimeout(() => {
        burgerIcon.setAttribute("href", "./project/img/burger-menu.svg");
        burgerBtn.style.transform = "rotate(0deg)";
      }, 300);
    };

    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
  }
}
