export function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq__toggle-question");

  faqQuestions.forEach((question) => {
    const faqContent = question.closest(".faq__content");
    if (!faqContent) return;

    const faqAnswer = faqContent.querySelector(".faq__answer");
    const faqMetaTop = faqContent.querySelector(".faq__meta--top");
    const faqMetaBottom = faqContent.querySelector(".faq__meta--bottom");

    const readMoreButton = faqMetaTop
      ? faqMetaTop.querySelector(".faq_read-more")
      : faqContent.querySelector(".faq_read-more");

    const topMetaParagraphs = faqMetaTop
      ? Array.from(
        faqMetaTop.querySelectorAll(".faq__meta-info > .faq__paragraph")
      )
      : [];
    const topLine = faqContent.querySelector(".faq__line");
    const topDate = faqMetaTop ? faqMetaTop.querySelector(".faq__date") : null;

    // --- Початкові налаштування ---
    if (faqMetaTop) faqMetaTop.classList.add("active");
    if (faqAnswer) faqAnswer.classList.remove("active");
    if (faqMetaBottom) faqMetaBottom.classList.remove("active");
    if (readMoreButton) {
      readMoreButton.textContent = "Read more";
      readMoreButton.style.display = "inline-block";
    }

    topMetaParagraphs.forEach((p) => {
      p.style.display = "";
    });
    if (topLine) topLine.style.display = "";
    if (topDate) topDate.style.display = "";

    // --- Обробник кліку на кнопку ---
    if (readMoreButton) {
      readMoreButton.addEventListener("click", (e) => {
        e.preventDefault();

        const isExpanded = question.getAttribute("aria-expanded") === "true";
        const newExpandedState = !isExpanded;

        question.setAttribute("aria-expanded", String(newExpandedState));

        if (faqAnswer) faqAnswer.classList.toggle("active", newExpandedState);

        if (faqMetaBottom)
          faqMetaBottom.classList.toggle("active", newExpandedState);

        if (newExpandedState) {
          topMetaParagraphs.forEach((p) => (p.style.display = "none"));
          if (topLine) topLine.style.display = "none";
          if (topDate) topDate.style.display = "none";
        } else {
          topMetaParagraphs.forEach((p) => (p.style.display = ""));
          if (topLine) topLine.style.display = "";
          if (topDate) topDate.style.display = "";
        }

        readMoreButton.textContent = newExpandedState
          ? "Read less"
          : "Read more";

        if (newExpandedState) {
          question.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
    question.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && readMoreButton) {
        event.preventDefault();
        readMoreButton.click();
      }
    });
  });
}