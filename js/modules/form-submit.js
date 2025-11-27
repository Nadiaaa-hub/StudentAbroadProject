export function initFormSubmit() {
  const form = document.querySelector(".form-section form");
  if (!form) return;

  const submitBtn = form.querySelector(".btn");
  if (!submitBtn) return;

  form.addEventListener("submit", (e) => e.preventDefault());

  submitBtn.addEventListener("click", () => {
    const requiredFields = form.querySelectorAll("[required]");
    let allFilled = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        allFilled = false;
        field.classList.add("input-error");
      } else {
        field.classList.remove("input-error");
      }
    });

    if (!allFilled) {
      return;
    }

    window.location.href = "confirmation.html";
  });
}
