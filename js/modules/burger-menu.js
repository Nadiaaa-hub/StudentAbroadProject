export function burgerMenu() {
  const burger = document.querySelector(".header__burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-menu__btn-close");
  const overlay = document.querySelector(".overlay");

  if (!burger || !mobileMenu || !closeBtn || !overlay) {
    console.error("One or more menu elements are missing.");
    return;
  }

  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  burger.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      if (mobileMenu.classList.contains("active")) {
        toggleMenu();
      }
    }
  });
}
