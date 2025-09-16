export function initFormSubmit() {
  const form = document.querySelector(".form-section form");
  if (!form) return; // якщо форми немає на сторінці

  const submitBtn = form.querySelector(".btn");
  if (!submitBtn) return;

  // блокуємо автоматичний сабміт форми
  form.addEventListener("submit", (e) => e.preventDefault());

  submitBtn.addEventListener("click", () => {
    const requiredFields = form.querySelectorAll("[required]");
    let allFilled = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        allFilled = false;
        field.classList.add("input-error"); // додаємо червону рамку
      } else {
        field.classList.remove("input-error"); // прибираємо рамку
      }
    });

    if (!allFilled) {
      return;
    }

    // редірект на confirmation.html
    window.location.href = "confirmation.html";
  });
}
