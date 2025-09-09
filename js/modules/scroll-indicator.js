export function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    const scrollToAbout = (e) => {
      e.preventDefault();
      const aboutSection = document.querySelector("#about-us-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollIndicator.addEventListener("click", scrollToAbout);
    scrollIndicator.addEventListener("touchstart", scrollToAbout);
  }

  const currentPage = window.location.pathname.split("/").pop();
  const menuLinks = document.querySelectorAll(
    ".header__menu a, .footer__menu a"
  );

  menuLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const smoothScroll = (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    anchor.addEventListener("click", smoothScroll);
    anchor.addEventListener("touchstart", smoothScroll);
  });

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("touchstart", () => btn.classList.add("hover"));
    btn.addEventListener("touchend", () => btn.classList.remove("hover"));
  });
}
