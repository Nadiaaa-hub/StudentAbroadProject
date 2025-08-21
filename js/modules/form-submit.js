<<<<<<< HEAD
=======
// export function initFormSubmit() {
//   const form = document.querySelector("form");
//   if (!form) return;

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);

//     try {
//       const response = await fetch("/submit-form", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         window.location.href = "confirmation.html";
//       } else {
//         alert("Error sending form.");
//       }
//     } catch (error) {
//       alert("Network or server error.");
//       console.error(error);
//     }
//   });
// }
>>>>>>> 5609c3a52f5688c2d10159f1e19eaa9d04398a21
export function initFormSubmit() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setTimeout(() => {
      window.location.href = "confirmation.html";
    }, 1000);
  });
}
