// loading bar als een link geklikt wordt
const loading = document.querySelector(".loading-overlay");
const anchorTags = document.querySelectorAll("a");


document.addEventListener("DOMContentLoaded", () => {
    if (loading.classList.contains("hidden")) {
        // op elke link is er een event istener
        anchorTags.forEach((link) => {
            // bij een klik komt de loading circle op beeld
            link.addEventListener("click", () => {
                loading.classList.remove("hidden");
            });
        });
    }
    else {
        loading.classList.add("hidden");
    }
});

// De loading circle blijft op scherm beeld als de back button geklikt wordt
// reset wanneer de website ingeladen wordt
// https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event
// https://stackoverflow.com/questions/15640087/javascript-unchecking-all-checkboxes
window.addEventListener("pageshow", () => {
    loading.classList.add("hidden");
});


// back button
// deze button brengt de gebruiker naar de vorige pagina
const backButton = document.querySelector(".button-back");

document.addEventListener("DOMContentLoaded", () => {
    if (backButton) {
        backButton.addEventListener("click", () => {
            // als de button geklikt wordt ga naar de vorige pagina
            window.history.back();
        });
    } else {
        console.error("Back button element not found.");
    }
});


// workshop
// https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/client-side-fetch.md

// We maken hieronder aannames over wat de browser ondersteunt
// Dus laten we deze eerst testen met Feature Detection
// https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection
if ("fetch" in window && "DOMParser" in window) {
    // Als er ergens op de pagina een formulier wordt gesubmit..
    // (We maken hier gebruik van Event Delegation)
    document.addEventListener("submit", async function (event) {
        // Hou in een variabele bij welk formulier dat was
        const form = event.target;
        console.log(form);

        // Als dit formulier geen data-enhanced attribuut heeft, doe dan niks
        // Dit doen we, zodat we sommige formulieren op de pagina kunnen 'enhancen'
        // Data attributen mag je zelf verzinnen; dit is dus niet iets speciaals
        // https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Solve_HTML_problems/Use_data_attributes
        if (!form.hasAttribute("data-enhanced")) {
            return;
        }

        // Voorkom de standaard submit van de browser
        // Let op: hiermee overschrijven we de default Loading state van de browser...
        event.preventDefault();
        // terwijl de default van de browser geblokeert wordt, geven we een loading class aan de bookmark icoon
        form.classList.add('bookmark-loading-state')

        // Doe een fetch naar de server, net als hoe de browser dit normaal zou doen
        // Gebruik daarvoor het action en method attribuut van het originele formulier
        // Inclusief alle formulierelementen
        const response = await fetch(form.action, {
            method: form.method,
            body: new URLSearchParams(new FormData(form)),
        });

        // De server redirect op de normale manier, en geeft HTML terug
        // (De server weet niet eens dat deze fetch via client-side JavaScript gebeurde)
        const responseText = await response.text();

        // Normaal zou de browser die HTML parsen en weergeven, maar daar moeten we nu zelf iets mee
        // Parse de nieuwe HTML en maak hiervan een nieuw Document Object Model in het geheugen
        const parser = new DOMParser();
        const responseDOM = parser.parseFromString(responseText, "text/html");

        // Zoek in die nieuwe DOM onze nieuwe state op, die we via Liquid hebben klaargemaakt
        // We gebruiken hiervoor het data-enhanced attribuut, zodat we weten waar we naar moeten zoeken
        // (Hierdoor kunnen we ook meerdere formulieren op dezelfde pagina gebruiken)
        const newState = responseDOM.querySelector(
            '[data-enhanced="' + form.getAttribute("data-enhanced") + '"]'
        );

        // haal de loading class weg van de bookmark icoon
        form.classList.remove('bookmark-loading-state')

        // Overschrijf ons formulier met de nieuwe HTML
        // Hier wil je waarschijnlijk de Loading state vervangen door een Success state
        form.outerHTML = newState.outerHTML;
    });
}


// scroll up => header weg
// scroll down => header terug
const header = document.querySelector("header");
// const containerGift = document.querySelector(".container-gift");
const headerHeight = document.querySelector("header").offsetHeight;

// main.style.top = headerHeight + "px";
let lastScroll = 0;
window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;
  if (currentScroll - lastScroll > 0) {
    header.classList.add("scroll-down");
    header.classList.remove("scroll-up");
  }
  else
  {
    // scrolled up -- header show
    header.classList.add("scroll-up");
    header.classList.remove("scroll-down");
  }
  lastScroll = currentScroll;
})