const modal = document.querySelector(".backdrop");
const modalBtnOpen = document.querySelector(".modal-btn-open");
const modalBtnClose = document.querySelector(".js-modal-btn-close");

const toggleModal = () => modal.classList.toggle("is-hidden");

modalBtnOpen.addEventListener("click", () => {
  modal.classList.toggle("is-hidden");
});
modalBtnClose.addEventListener("click", () => {
  modal.classList.toggle("is-hidden");
});
