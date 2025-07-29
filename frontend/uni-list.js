document.addEventListener("DOMContentLoaded", function () {
    // Додаємо стилі динамічно
    const style = document.createElement('style');
    style.textContent = `
        /* Uni-list CSS */
        .checkbox-group {
            display: grid;
            font-family: 'Rubik', sans-serif;
            font-weight: 100;
            font-size: 17px;
            grid-template-columns: repeat(4, auto);
            justify-content: center;
            align-items: center;
            gap: 10px;
            column-gap: 15%;
        }

        .university-list {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .university-card {
            font-family: 'Rubik', sans-serif;
            display: flex;
            align-items: center;
            border: 2px solid var(--color-main-blue);
            border-radius: 20px;
            padding: 20px;
            margin: 0px 150px 70px 150px;
            color: var(--color-main-black);
            min-height: 250px;
        }

        .university-img-container {
            width: 300px;
            height: 200px;
            margin: 0 65px;
            border-radius: 10px;
            overflow: hidden;
            flex-shrink: 0;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .university-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }

        .university-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 100%;
        }

        .university-info h2 {
            font-weight: 550;
            color: var(--color-main-black);
            margin-top: 0;
        }

        .university-info p {
            margin: 5px 0;
            color: var(--color-main-black);
        }

        .university-info button {
            align-self: flex-end; /* Вирівнюємо праворуч */
            margin-top: auto; /* Притискаємо до низу */
            background-color: var(--color-main-blue);
            color: var(--color-main-white);
            border: none;
            padding: 10px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 15px;
            margin-right: 15px;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
        }

        /* Анімація підсвітки тексту */
        .university-info button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            transition: all 0.4s ease;
        }

        .university-info button:hover::before {
            left: 100%;
        }

        .university-info button:hover {
            background-color: #0a4a9b; /* Темно-синій при наведенні */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .university-info button:active {
            transform: scale(0.98);
            background-color: #083872; /* Ще темніший при натисканні */
        }

            #header-footer-color {
                background-color: var(--color-blue-dark);
                padding-bottom: 25px;
            }

            label {
                color: var(--color-main-black);
            }

        .text-effect {
            font-family: 'Rubik', sans-serif;
            position: relative;
            display: inline-block;
            padding-top: 100px;
            padding-left: 175px;
            font-size: 40px;
            font-weight: bold;
            color: #0E1B35;
        }

        .text-effect::before {
            content: "COUNTRY";
            position: absolute;
            padding-top: 100px;
            top: 10px;
            left: 185px;
            color: transparent;
            -webkit-text-stroke: 1px #E5E7EB;
            z-index: -1;
        }

        #switch-country-button {
            position: relative;
            display: inline-block;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 25px;
            margin-bottom: 50px;
            color: var(--color-blue-dark);
        }

        /* Custom checkbox box */
        .container-checkbox {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            font-size: 18px;
            user-select: none;
            gap: 10px;
            position: relative;
        }

        .container-checkbox input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }

        .checkmark {
            width: 20px;
            height: 20px;
            border: 1px solid blue;
            border-radius: 4px;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            flex-shrink: 0;
            position: relative;
        }

        .checkmark::after {
            content: "";
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            display: none;
        }

        .container-checkbox input:checked+.checkmark {
            background-color: blue;
            border-color: blue;
        }

        .container-checkbox input:checked+.checkmark::after {
            display: block;
        }

        #icon-img {
            width: 20px;
            vertical-align: middle;
            margin-left: auto;
            display: inline;
        }

        .read-more-right {
            position: relative;
            right: 0;
            top: 0;
        }

        /* Додаткові стилі для функціоналу */
        .loading-spinner {
            display: flex;
            justify-content: center;
            padding: 50px;
        }

        .spinner {
            border: 5px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 5px solid var(--color-main-blue);
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error-message {
            text-align: center;
            padding: 30px;
            color: #d9534f;
            font-size: 18px;
        }

        .error-message button {
            background: var(--color-main-blue);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 15px;
            font-size: 16px;
        }

        .no-results {
            text-align: center;
            padding: 30px;
            color: var(--color-main-black);
            font-size: 18px;
        }
    `;
    document.head.appendChild(style);

    const API_URL = 'http://127.0.0.1:8000/api/universities/';
    const universityContainer = document.getElementById('universityContainer');
    const searchInput = document.getElementById('searchInput');
    const countryCheckboxes = document.querySelectorAll('#countryFilter input[type="checkbox"]');
    const switchButtons = document.querySelectorAll(".js-switch-button");
    const elementsToTranslate = document.querySelectorAll("[data-en][data-ua]");

    const countryNames = {
        'UA': { en: 'Ukraine', ua: 'Україна' },
        'ES': { en: 'Spain', ua: 'Іспанія' },
        'DE': { en: 'Germany', ua: 'Німеччина' },
        'AT': { en: 'Austria', ua: 'Австрія' },
        'BE': { en: 'Belgium', ua: 'Бельгія' },
        'NL': { en: 'Netherlands', ua: 'Нідерланди' },
        'FI': { en: 'Finland', ua: 'Фінляндія' },
        'PL': { en: 'Poland', ua: 'Польща' },
        'SE': { en: 'Sweden', ua: 'Швеція' },
        'CY': { en: 'Cyprus', ua: 'Кіпр' },
        'CZ': { en: 'Czech Republic', ua: 'Чеська Республіка' },
        'HU': { en: 'Hungary', ua: 'Угорщина' }
    };

    let allUniversities = [];
    let currentLang = localStorage.getItem("lang") || "en";

    async function loadUniversities() {
        try {
            showLoading();
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to load universities');
            allUniversities = await response.json();
            filterAndRenderUniversities();
        } catch (error) {
            console.error('Error loading universities:', error);
            showError();
        }
    }

    function filterAndRenderUniversities() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCountries = Array.from(
            document.querySelectorAll('#countryFilter input[type="checkbox"]:checked')
        ).map(checkbox => checkbox.value);

        const filtered = allUniversities.filter(uni => {
            const matchesSearch = searchTerm === '' || 
                uni.name.toLowerCase().includes(searchTerm) ||
                (uni.description && uni.description.toLowerCase().includes(searchTerm));
            
            const matchesCountry = selectedCountries.length === 0 || 
                selectedCountries.includes(uni.country);
            
            return matchesSearch && matchesCountry;
        });

        renderUniversities(filtered);
    }

    function renderUniversities(universities) {
        if (universities.length === 0) {
            universityContainer.innerHTML = `
                <div class="no-results">
                    <p data-en="No universities found" data-ua="Університети не знайдені">
                        No universities found
                    </p>
                </div>
            `;
            switchLanguage(localStorage.getItem("lang") || "en");
            return;
        }

        universityContainer.innerHTML = '';

        universities.forEach(university => {
            const card = document.createElement('div');
            card.className = 'university-card';
            
            const logoPath = university.logo_url ? 
                university.logo_url : 
                '';
            const websiteUrl = university.website_url ? 
                university.website_url.replace(/^https?:\/\//, '').split('/')[0] : '';

            card.innerHTML = `
                <div class="university-img-container">
                    ${logoPath ? `
                        <img src="${logoPath}" alt="${university.name}" 
                             onerror="this.parentElement.style.display='none'">
                    ` : ''}
                </div>
                <div class="university-info">
                    <h2>${university.name}</h2>
                    ${university.contact_email ? `
                        <p>${currentLang === 'ua' ? 'Контакт' : 'Contact'}: ${university.contact_email} <img class="icon-img" src="./img/email-icon.svg" id="icon-img"></p>
                    ` : ''}
                    ${websiteUrl ? `
                        <p>URL: ${websiteUrl} <img class="icon-img" src="./img/icon2.svg" id="icon-img"></p>
                    ` : ''}
                    <button data-en="Read more" data-ua="Читати більше" class="read-more-right" type="button">
                        ${currentLang === 'ua' ? 'Читати більше' : 'Read more'}
                    </button>
                </div>
            `;
            universityContainer.appendChild(card);
        });

        switchLanguage(currentLang);
    }

    function showLoading() {
        universityContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
        `;
    }

    function showError() {
        universityContainer.innerHTML = `
            <div class="error-message">
                <p data-en="Error loading universities" data-ua="Помилка завантаження університетів">
                    Error loading universities
                </p>
                <button onclick="location.reload()" data-en="Try again" data-ua="Спробувати знову">
                    Try again
                </button>
            </div>
        `;
        switchLanguage(localStorage.getItem("lang") || "en");
    }

    function switchLanguage(lang) {
        elementsToTranslate.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                if (el.tagName === 'INPUT') {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        localStorage.setItem("lang", lang);

        switchButtons.forEach(btn => {
            if (btn.getAttribute("data-lang") === lang) {
                btn.classList.add("active");
                btn.innerHTML = btn.getAttribute("data-lang").toUpperCase();
            } else {
                btn.classList.remove("active");
                btn.innerHTML = btn.getAttribute("data-lang").toUpperCase();
            }
        });

        document.querySelectorAll('.university-card button[data-en][data-ua]').forEach(button => {
            button.textContent = lang === 'ua' ? button.getAttribute('data-ua') : button.getAttribute('data-en');
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterAndRenderUniversities);
    countryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterAndRenderUniversities);
    });
    switchButtons.forEach(button => {
        button.addEventListener("click", function() {
            const selectedLang = this.getAttribute("data-lang");
            switchLanguage(selectedLang);
        });
    });

    // Initialize
    const savedLang = localStorage.getItem("lang") || "en";
    switchLanguage(savedLang);
    loadUniversities();
});