// backend/static/js/modules/form-submit-v2.js

export function initFormSubmit() {
  const form = document.getElementById("share-program-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  // --- ЛОГІКА ДЛЯ CUSTOM SELECT (заповнення ID) ---
  document.querySelectorAll('.custom-select-dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.custom-select-option');
      if (option) {
        const wrapper = dropdown.closest('.custom-select-wrapper');
        const hiddenInput = wrapper.querySelector('.selected-id-input');
        const textInput = wrapper.querySelector('.custom-select-input');
        
        if (hiddenInput && option.dataset.id) {
          hiddenInput.value = option.dataset.id;
        } else if (hiddenInput) {
             hiddenInput.value = ""; 
        }
        
        // Якщо користувач редагує текст -> скидаємо ID (це новий універ)
        if(textInput) {
            const resetId = () => {
                if(hiddenInput) hiddenInput.value = "";
                textInput.removeEventListener('input', resetId);
            };
            textInput.addEventListener('input', resetId);
        }
      }
    });
  });

  // --- ОБРОБКА ВІДПРАВКИ ---
  submitBtn.addEventListener("click", async (e) => {
    // 1. HTML5 Validation (показує стандартні підказки браузера)
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    e.preventDefault();

    const formData = new FormData(form);
    const csrfToken = formData.get('csrfmiddlewaretoken');

    // Отримання значень
    const invitingId = formData.get('inviting_uni_id');
    const invitingName = formData.get('inviting_uni_input');
    const homeId = formData.get('home_uni_id');
    const homeName = formData.get('home_uni_input');

    // Перетворюємо ID в числа або null
    const finalInvitingId = invitingId ? parseInt(invitingId) : null;
    const finalHomeId = homeId ? parseInt(homeId) : null;

    // --- ВИПРАВЛЕННЯ ПОМИЛКИ 400 ---
    // Serializer (CharField) не приймає null, тому відправляємо "" (порожній рядок)
    const payload = {
        name_uk: formData.get('program_name'),
        
        university_id: finalInvitingId,
        // Якщо є ID, назва не потрібна -> "" (А НЕ null!)
        university_name: !finalInvitingId ? invitingName : "", 
        university_details: form.querySelector('#new-inviting-uni-form textarea')?.value || '',

        home_university_id: finalHomeId,
        // Якщо є ID, назва не потрібна -> "" (А НЕ null!)
        home_university_name: !finalHomeId ? homeName : "", 
        home_university_details: form.querySelector('#new-home-uni-form textarea')?.value || '',

        faculty_uk: formData.get('faculty'),
        study_level: mapStudyLevel(formData.get('study_level')),
        
        testimonial_uk: formData.get('testimonial'),
        submitted_by_name: formData.get('submitted_by_name'),
        submitted_by_email: formData.get('submitted_by_email'),
        
        program_type: 'exchange'
    };

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const response = await fetch('/api/programs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            window.location.href = "/confirmation.html"; 
        } else {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            // Показуємо детальну помилку для діагностики
            alert('Помилка сервера: ' + JSON.stringify(errorData));
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Сталася помилка мережі. Спробуйте пізніше.');
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
    }
  });
}

function mapStudyLevel(text) {
    if (!text) return 'bachelor';
    const lower = text.toLowerCase();
    if (lower.includes('master')) return 'master';
    if (lower.includes('phd')) return 'phd';
    return 'bachelor'; // default
}