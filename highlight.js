// highlight.js

// Функція для видалення попереднього підсвічування
function removeHighlights() {
  const highlightedElements = document.querySelectorAll(".highlight");
  highlightedElements.forEach((span) => {
    const parent = span.parentNode;
    if (parent) {
      if (span.nextSibling && span.nextSibling.nodeType === Node.TEXT_NODE) {
        parent.replaceChild(
          document.createTextNode(
            span.textContent + span.nextSibling.nodeValue
          ),
          span
        );
        parent.removeChild(span.nextSibling);
      } else {
        parent.replaceChild(document.createTextNode(span.textContent), span);
      }
      parent.normalize();
    }
  });
}

// Функція для підсвічування тексту
function highlightText(element, searchTerm, firstMatchFoundCallback) {
  if (!searchTerm) return;

  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        if (
          node.parentNode.classList &&
          node.parentNode.classList.contains("highlight")
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        if (
          node.parentNode.nodeName === "SCRIPT" ||
          node.parentNode.nodeName === "STYLE"
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
    false
  );

  let node;
  const nodesToProcess = [];

  while ((node = walker.nextNode())) {
    nodesToProcess.push(node);
  }

  nodesToProcess.forEach((textNode) => {
    const text = textNode.nodeValue;
    const lowerText = text.toLowerCase();
    let lastIndex = 0;
    const fragment = document.createDocumentFragment();

    while (lastIndex < text.length) {
      const matchIndex = lowerText.indexOf(searchTerm, lastIndex);

      if (matchIndex === -1) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex))
        );
        break;
      }

      fragment.appendChild(
        document.createTextNode(text.substring(lastIndex, matchIndex))
      );

      const highlightSpan = document.createElement("span");
      highlightSpan.className = "highlight";
      highlightSpan.textContent = text.substring(
        matchIndex,
        matchIndex + searchTerm.length
      );
      fragment.appendChild(highlightSpan);

      // Якщо це перший знайдений збіг, викликаємо callback
      if (
        firstMatchFoundCallback &&
        typeof firstMatchFoundCallback === "function"
      ) {
        firstMatchFoundCallback(highlightSpan);
        firstMatchFoundCallback = null; // Забезпечуємо виклик лише для першого збігу
      }

      lastIndex = matchIndex + searchTerm.length;
    }
    textNode.parentNode.replaceChild(fragment, textNode);
  });
}

// Основна функція для ініціалізації логіки підсвічування
function initHighlighting(searchInput, searchableSections) {
  let firstHighlightedElement = null;

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    // 1. Спочатку видаляємо всі попередні підсвічування
    removeHighlights();
    firstHighlightedElement = null; // Скидаємо перший знайдений елемент

    // Callback для пошуку першого виділеного елемента
    const handleFirstMatch = (highlightSpan) => {
      if (!firstHighlightedElement) {
        firstHighlightedElement = highlightSpan;
      }
    };

    // 2. Якщо пошуковий запит не порожній, підсвічуємо
    if (searchTerm) {
      searchableSections.forEach((section) => {
        highlightText(section, searchTerm, handleFirstMatch);
      });

      // Скролимо до першого знайденого елемента
      if (firstHighlightedElement) {
        firstHighlightedElement.scrollIntoView({
          behavior: "smooth",
          block: "center", // Скролити так, щоб елемент був по центру
        });
      }
    }
  });
}
