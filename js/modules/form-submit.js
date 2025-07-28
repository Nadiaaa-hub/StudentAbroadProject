export function initFormSubmit() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setTimeout(() => {
      window.location.href = "confirmation.html";
    }, 1000);
  });
}
