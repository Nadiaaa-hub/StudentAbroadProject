
export function initHighlight() {
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

      if (
        firstMatchFoundCallback &&
        typeof firstMatchFoundCallback === "function"
      ) {
        firstMatchFoundCallback(highlightSpan);
        firstMatchFoundCallback = null;
      }

      lastIndex = matchIndex + searchTerm.length;
    }
    textNode.parentNode.replaceChild(fragment, textNode);
  });
}

export function initHighlighting(searchInput, searchableSections) {
  let firstHighlightedElement = null;

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    initHighlight(); 
    firstHighlightedElement = null;

    const handleFirstMatch = (highlightSpan) => {
      if (!firstHighlightedElement) {
        firstHighlightedElement = highlightSpan;
      }
    };

    if (searchTerm) {
      searchableSections.forEach((section) => {
        highlightText(section, searchTerm, handleFirstMatch);
      });

      if (firstHighlightedElement) {
        firstHighlightedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });
}


export function setupSearchAndHighlight() {
  const searchInput = document.querySelector(".search-box__input");
  const searchableSections = document.querySelectorAll("main, footer, header"); 
  if (searchInput && searchableSections.length > 0) {
    initHighlighting(searchInput, searchableSections);
  }
}
