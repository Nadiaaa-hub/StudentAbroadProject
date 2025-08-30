// export function burgerMenu() {
//   const burgerBtn = document.querySelector(".header__burger");
//   const mobileMenu = document.querySelector(".mobile-menu");
//   const closeBtn = document.querySelector(".menu-btn-close");
//   const overlay = document.querySelector(".overlay");

//   // якщо бургер-кнопки нема — виходимо
//   if (!burgerBtn || !mobileMenu || !closeBtn || !overlay) return;

//   const burgerIcon = burgerBtn.querySelector("use");

//   burgerBtn.addEventListener("click", () => {
//     mobileMenu.classList.add("open");
//     overlay.classList.add("active");

//     // Заміна іконки на "close"
//     if (burgerIcon) {
//       burgerIcon.setAttribute("href", "./project/img/icon-close-burger.svg");
//     }

//     burgerBtn.style.transform = "rotate(90deg)";
//     setTimeout(() => (burgerBtn.style.transform = "rotate(0deg)"), 300);
//   });

//   const closeMenu = () => {
//     mobileMenu.classList.remove("open");
//     overlay.classList.remove("active");

//     // Заміна іконки назад на "burger"
//     burgerBtn.style.transform = "rotate(-90deg)";
//     setTimeout(() => {
//       if (burgerIcon) {
//         burgerIcon.setAttribute("href", "./project/img/burger-menu.svg#icon");
//       }
//       burgerBtn.style.transform = "rotate(0deg)";
//     }, 300);
//   };

//   closeBtn.addEventListener("click", closeMenu);
//   overlay.addEventListener("click", closeMenu);

//   // скидання при ресайзі
//   window.addEventListener("resize", () => {
//     if (window.innerWidth >= 1024) {
//       mobileMenu.classList.remove("open");
//       overlay.classList.remove("active");
//     }
//   });
// }

export function burgerMenu() {
  const burgerBtn = document.querySelector(".header__burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-menu__btn-close");
  const overlay = document.querySelector(".overlay");

  if (!burgerBtn || !mobileMenu || !closeBtn || !overlay) return;

  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.add("open");
    overlay.classList.add("active");
  });

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("active");
  };

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });
}

// Імпортуємо і викликаємо в main.js
// import { burgerMenu } from './burger.js';
// burgerMenu();
