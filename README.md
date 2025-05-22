# Interactive Functionality

Ontwerp en maak voor een opdrachtgever een interactieve toepassing die voor iedereen toegankelijk is

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/INSTRUCTIONS.md)


## Inhoudsopgave

  * [Beschrijving](#beschrijving)

  * [Gebruik](#gebruik)

  * [Kenmerken](#kenmerken)
      * [Responsive](#Responsive)<br/>
          * [index pagina](#index-pagina)<br/>
          * [details pagina](#details-pagina)<br/>
          * [bookmarks overzicht pagina](#bookmarks-overzicht-pagina)<br/>
          * [bookmarkslijst pagina](#bookmarkslijst-pagina)<br/>
      * [CSS](#CSS)<br/>
          * [Styleguide](#Styleguide)<br/>
          * [Styles](#Styles)<br/>
          * [cadeau titel - 3 puntjes](#cadeau-titel---3-puntjes)<br/>
      * [HTML](#HTML)<br/>
          * [Liquid partials](#Liquid-partials)<br/>
              * [Cadeau](#Cadeau)<br/>
              * [Cadeau container](#Cadeau-container)<br/>
              * [Data van server.js naar partials](#Data-van-serverJS-naar-partials)<br/>
              * [detail pagina - You may also like](#detail-pagina---you-may-also-like)<br/>
          * [Images]<br/>
              * [layout shift](#layout-shift)<br/>
              * [Grey background](#grey-background)<br/>
              * [responsive img](#responsive-img)<br/>
              * [picture element](#picture-element)<br/>
      * [JavaScript](#JavaScript)<br/>
          * [back button](#back-button)<br/>
          * [client side fetch](#client-side-fetch)<br/>
          * [sticky header](#sticky-header)<br/>
      * [Routes](#Routes)<br/>
          * [cadeau opslaan in bookmarks list](#cadeau-opslaan-in-bookmarks-list)<br/>
          * [link naar de details pagina](#link-naar-de-details-pagina)<br/>
          * [bookmark list pagina](#bookmark-list-pagina)<br/>
          * [error 404](#error-404)<br/>
          * [mobile testing](#mobile-testing)<br/>
      * [UI states](#UI-states)<br/>
          * [success state](#success-state)<br/>
          * [empty state](#empty-state)<br/>
          * [loading state](#loading-state)<br/>
      * [perceived performance](#perceived-performance)<br/>
          * [visual time response](#visual-time-response)<br/>
          * [lazy loading](#lazy-loading)<br/>

  * [Installatie](#installatie)

  * [Bronnen](#bronnen)

  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual of video toe 📸 -->
<!-- Voeg een link toe naar GitHub Pages 🌐-->
Wanneer je op de pagina komt, zie je aan de linkerkant een search bar met tekst die de gebruiker uitnodigd om cadeautjes te zoeken.
Aan de rechterkant bevindt zich een scrollbare container, de rest van de pagina beweegt niet mee.
Wanneer je op een cadeau klikt, word je doorgestuurd naar de detailpagina.
Elk cadeau heeft een bookmark icoon. Als je hierop klikt, wordt het toegevoegd aan jouw lijst.

Op elke pagina bevindt zich in de header een button om naar jouw bookmarklijst te gaan.
Wanneer je hierop klikt, kom je eerst op een overzichtspagina waar je al jouw lijsten kunt bekijken.
Als je op een van de lijsten klikt, zie je alle opgeslagen cadeautjes in die lijst.
Klik je opnieuw op het bookmark icoon, dan wordt het cadeau uit je lijst verwijderd.
Wanneer je op de titel klikt, word je naar de detailpagina geleid.

Op de detailpagina staat een beschrijving van het cadeau, samen met winkels waar het cadeau gekocht kan worden.
Daaronder vind je meer cadeau recommendaties.

De live site staat op Render. Het kan even duren voordat de website is geladen.
[Milledoni.nl](https://user-experience-enhanced-website-0mef.onrender.com)

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
De website is bedoeld voor iemand die een cadeau zoekt maar niet weet wat hij moet geven.
Op de Milledoni website kan hij door cadeautjes scrollen, beschrijvingen lezen en, als hij iets wil opslaan voor later, het in zijn bookmarklijst kan plaatsen.

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->
### Responsive
#### index pagina
Voor het grootste deel van de responsiveheid op de index pagina heb ik een grid gebruikt om automatisch een nieuwe kolom te maken zodra er voldoende ruimte is. Hiervoor heb ik in mijn grid-template-columns de functie repeat met auto-fit gebruikt om de kolommen te herhalen. Daarbij heb ik ook minmax toegepast om de minimale breedte te bepalen voordat er een nieuwe kolom wordt toegevoegd.
Dit heb ik gedaan om minder met mediaqueries te werken en om te veel witruimte op grote schermen te voorkomen, doordat er automatisch een nieuwe kolom wordt toegevoegd.

De index pagina is responsive vanaf 320 pixels. Deze video laat zien hoe de layout veranderd op verschillende schermen:<br/>

https://github.com/user-attachments/assets/729a5d01-614b-4013-9408-56b88e387e9e


#### details pagina
De details pagina is responsive vanaf 320 pixels. Deze video laat zien hoe de layout veranderd op verschillende schermen:<br/>

https://github.com/user-attachments/assets/69b57763-baee-454d-9d84-af3fd271fd01

#### bookmarks overzicht pagina
Deze pagina is nog niet responsive, dit is de one column versie.<br/>
<img src="/bewijslast-sprint-10/resp-bk-overzicht.png" alt="resp-bk-overzicht" style="width: 50%;">


#### bookmarkslijst pagina
De bookmarkslijst pagina is ook responsive vanaf 320 pixels. Deze video laat zien hoe de layout veranderd op verschillende schermen:<br/>

https://github.com/user-attachments/assets/7bc22186-fdb5-4781-baea-31507d01cd20

### CSS
### Styleguide
De huisstijl is gebaseerd op dit [figma design](https://www.figma.com/design/4NBbUuyXIrZ7VFHaDAHJLs/milledoni-design?node-id=6-23251&t=GgUuJZRB3GWeNTFB-1)

De font sizes voor de titels zijn responsive gemaakt met clamp(), zodat ze op kleine schermen niet te groot lijken.
Tijdens de sprint review van sprint 9 gaf de opdrachtgever aan dat de font sizes niet overeenkwamen met het design. Dit kwam doordat ik gebruikmaakte van responsive font sizes.

Om dit op te lossen heb ik media queries gebruikt:
– Op de desktop versie gebruik ik vaste font sizes, zodat deze overeenkomen met het design.
– Op mobiele apparaten blijven de responsive font sizes actief, zodat de tekst goed schaalt en niet te groot wordt weergegeven.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/milledoni.css#L33-L40

Naamgeving van custom properties: Het eerste woord (en soms ook het tweede) geeft aan waarvoor de custom property bedoeld is, en het laatste woord geeft aan wat er wordt veranderd.

Bijvoorbeeld, 'background-primary': het eerste woord geeft aan dat het voor de achtergrond bedoeld is, en het tweede woord geeft aan dat het de primaire kleur is.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/milledoni.css#L13

In dit voorbeeld gebruik ik twee woorden om aan te geven voor welk element de custom property bedoeld is, en daarna wat het veranderd.
voorbeeld
--font-weight-regular
font-weight geeft aan dat het met de fonts te maken heeft, en regular geeft aan dat het de standaard font weight is.
voor de font weight benaming heb ik aangehouden hoe het in de font .ttf file heeft
hier zijn de font-weight cuistom properties in css stylesheet
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/milledoni.css#L42-L47

### Styles
In de Liquid-bestanden hebben de partials en elke pagina hun eigen CSS, die genest is. De main van de pagina's wordt genoemd naar de pagina naam, gevolgd door -main. Voor de partials gebruiken ze de class van de container.<br/>
<img src="/bewijslast-sprint-10/css-main-nest.png" alt="css-main-nest" style="width: 50%;"><br/>
<img src="/bewijslast-sprint-10/css-partials-nest.png" alt="css-partials-nest" style="width: 50%;">

Verder zijn alle HTML blokken in CSS ook genest. Bijvoorbeeld een article met meerdere elementen daarin.
In HTML geef ik het een class, en in CSS worden alle elementen binnen die class op dezelfde volgorde genest.
Voorbeeld van een article:
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/details.liquid#L46-L53
Bijbehorende CSS:
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/style.css#L529-L613


### cadeau titel - 3 puntjes
Sommige cadeautjes hebben lange titels, waardoor sommige cadeautjes hoger werden dan andere.
Dit kwam doordat de titels soms meerdere regels in beslag namen.
Ik heb dit opgelost door de titels te verkorten met drie puntjes als ze te lang zijn:
– Op mobiel worden titels beperkt tot maximaal 1 regel.
– Op desktop versie tot maximaal 2 regels.

Hierdoor blijven alle cadeaukaartjes even hoog en behouden ze een consistente layout.
Verkorte titel op mobiel:<br/>
<img src="/bewijslast-sprint-10/gift-title-1.png" alt="gift-title-1" style="width: 30%;"><br/>
verkorte titel op desktop:<br/>
<img src="/bewijslast-sprint-10/gift-title-2.png" alt="gift-title-2" style="width: 30%;">


### HTML
In HTML hebben blok elementen, zoals article, een lege regel erboven en eronder.
Inline elementen, zoals svg en anchor tag, staan op één regel.

Er zijn soms uitzonderingen, zoals een anchor tag met een svg en tekst erin. In dat geval krijgen zowel de svg als de tekst hun eigen regel, zodat alle elementen binnen de anchor tag zichtbaar blijven.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/bk-overzicht.liquid#L25-L28


### Liquid partials
De herhalende stukken HTML-code op de website zijn in een aparte Liquid-bestand geplaatst. Hierdoor kunnen ze met Liquid op de juiste plek worden ingeladen. Ik heb dit gedaan zodat ik dezelfde code op meerdere plekken kan gebruiken, wat mijn code DRY (Don't Repeat Yourself) maakt. Als er een aanpassing in de HTML nodig is, hoeft dit maar op plek te gebeuren.


#### Cadeau
Dit article voor de cadeautjes wordt gebruikt op de index pagina, de detail pagina en de bookmarklijst pagina.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/partials/article-gift.liquid#L1-L39
Cadeau index pagina:<br/>
<img src="/bewijslast-sprint-10/dry-article-1.png" alt="dry-article-1" style="width: 50%;"><br/>
Cadeau details pagina:<br/>
<img src="/bewijslast-sprint-10/dry-article-2.png" alt="dry-article-2" style="width: 50%;"><br/>
Cadeau bookmarks pagina:<br/>
<img src="/bewijslast-sprint-10/dry-article-3.png" alt="dry-article-3" style="width: 50%;">

#### Cadeau container
De container onderaan de details pagina is hetzelfde als op de index pagina, met een paar kleine verschillen.
De code voor de container is in CSS op een centrale plek geplaatst, zodat deze op beide pagina's werkt. Voor kleine aanpassingen per pagina, zoals margins, zijn deze genest, zodat ze elkaar niet beïnvloeden.
Dit is de CSS voor de container:
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/style.css#L820-L845
Hier worden media queeries gemaakt die alleen op de index pagina gebruikt worden voor deze container:
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/style.css#L359-L373
En hier wordt op de details pagina de container veranderd naar een horizontrale scroll container:
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/style.css#L701-L719
container index pagina:<br/>
<img src="/bewijslast-sprint-10/dry-container-1.png" alt="dry-container-1" style="width: 80%;"><br/>
container details pagina:<br/>
<img src="/bewijslast-sprint-10/dry-container-2.png" alt="dry-container-2" style="width: 80%;">

#### Data van serverJS naar partials
In de index route geef ik de gegevens van alle cadeaus en de gegevens van alle bookmarks mee.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L31
Op de index pagina en op de details pagina render ik de container voor alle cadeaus, waarbij ik zowel de gegevens van alle cadeaus als de bookmarks meegeef, omdat ik deze nodig heb om de cadeau kaartjes te genereren.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/index.liquid#L25
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/details.liquid#L74
In de container gebruik ik eerst een if statement om te controleren of clickedGift.id aanwezig is.
Als dit het geval is, wordt de versie voor de detail pagina weergegeven.
Als clickedGift.id niet aanwezig is, wordt de code onder de else statement uitgevoerd, dit is de versie voor de indexpagina.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/partials/container-gift.liquid#L2-L20
De data om de cadeau kaartjes te maken wordt met een for loop één voor één gegenereerd.
Het cadeau dat op dat moment geopend is op de detail pagina hoeft niet opnieuw in deze container te worden weergegeven.
Daarom filter ik dit specifieke cadeau eruit met een unless statement: als de gift.id gelijk is aan clickedGift.id, wordt het overgeslagen.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/partials/container-gift.liquid#L7
In de partial van het cadeau gebruik ik de data voor de afbeelding, de naam van het cadeau, de slug voor de link naar de details pagina en de bookmarkgegevens om te bepalen of het cadeau een leeg of gekleurd bookmark icoon nodig heeft.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/partials/article-gift.liquid#L5-L37


#### detail pagina - You may also like
in het design was er bij het "you may also like" een grote verticale scroll container.<br/>
<img src="/bewijslast-sprint-10/gift-container-details-figma.png" alt="gift-container-details-figma" style="width: 50%;"><br/>

Ik heb ervoor gekozen om de verticale scrollcontainer om te zetten naar een horizontale.
Mijn gedachte achter deze wijziging is dat de detail pagina gericht is op het cadeau waar de gebruiker op dat moment naar kijkt.
Daarom wilde ik de focus bij dit cadeau houden, in plaats van de gebruiker af te leiden met andere cadeaus.
Op dit moment toon ik 6 cadeaus, en als de gebruiker meer resultaten wil zien, is er een knop die de gebruiker terug naar de hoofdpagina brengt om verder te zoeken.

Ik heb deze wijziging voorgesteld aan de opdrachtgever tijdens de sprint review, en de opdrachtgever vond dit een goed idee.<br/>
De nieuwe container:<br/>
<img src="/bewijslast-sprint-10/gift-container-details-new.png" alt="gift-container-details-new" style="width: 80%;">


### Images
#### layout shift
Afbeeldingen hebben in de HTML een vaste hoogte en breedte. Hierdoor ontstaat er geen layout shift wanneer de HTML eerst wordt geladen en de afbeeldingen later ingeladen worden.

voorbeeld op een img element
https://github.com/vsheo/user-experience-enhanced-website/blob/8a1189782cb37f1a33e628c4817e583318b5c61f/views/index.liquid#L16

Voor afbeeldingen uit Directus gebruik ik ?format=avif&width=343&height=295 om het formaat, de width en height op te geven.
https://github.com/vsheo/user-experience-enhanced-website/blob/8a1189782cb37f1a33e628c4817e583318b5c61f/views/partials/article-gift.liquid#L10-L14


#### responsive img
In Directus hebben sommige cadeaus een img tag. Met de code die in deze tag staat, kun je de afbeelding ophalen via de URL:
https://fdnd-agency.directus.app/assets/ + img tag
Directus ondersteunt ook het opvragen van afbeeldingen in specifieke formaten, zoals avif of webp. Dit doe je door filters toe te voegen, bijvoorbeeld:
?format=avif
Daarnaast kun je ook een specifieke hoogte en breedte meegeven om layout shifts te voorkomen. bijvoorbeeld:
?format=avif&width=343&height=295
Door deze filters te gebruiken, kun je next gen image formats gebruiken en layout shifts op je website voorkomen.

https://github.com/vsheo/user-experience-enhanced-website/blob/8a1189782cb37f1a33e628c4817e583318b5c61f/views/partials/article-gift.liquid#L10-L14


#### picture element
In de HTML heb ik het picture element gebruikt.
Dit element maakt het mogelijk om meerdere image formats aan te bieden. De browser kiest automatisch het eerste source element waarvan het formaat ondersteund wordt.
Als geen van de source formaten wordt ondersteund, valt de browser automatisch terug op de img tag binnen het picture element.

https://github.com/vsheo/user-experience-enhanced-website/blob/8a1189782cb37f1a33e628c4817e583318b5c61f/views/partials/article-gift.liquid#L10-L14


#### Grey background
Om aan de gebruiker te laten zien dat er nog iets ingeladen moet worden, heb ik een grijze achtergrond toegevoegd.
Dit heb ik gedaan door een div met een grijze achtergrond voor de picture tag te plaatsen die uiteindelijk de afbeelding toont.
Binnen de grid bevinden beide elementen zich op exact dezelfde grid area, waardoor de afbeelding over de grijze achtergrond heen komt te staan.

<img src="/bewijslast-sprint-10/skeleton-state-2.png" alt="skeleton-state-2" style="width: 50%;">

### JavaScript
#### back button
Op de detailpagina is er een terugknop.
Omdat je zowel via de index pagina als via de bookmarklijst pagina naar de detail pagina kunt gaan, kon ik geen "href" gebruiken om naar de vorige pagina terug te gaan.
Daarom heb ik met JavaScript de functie window.history.back(); gebruikt, zodat je naar de vorige pagina wordt geleid wanneer er op de knop wordt geklikt.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/scripts/main.js#L30-L43


#### client side fetch
Als er een fetch op de pagina plaatsvindt, dan gaat JavaScript luisteren naar een submit event. Het element waarop de submit plaatsvindt, slaan we op als een variabele.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/scripts/main.js#L52-L57

De browser wil op dat moment de pagina automatisch refreshen, maar wij voorkomen dit met preventDefault(). In plaats van een pagina refresh voegen we een class toe aan het element waarop het event plaatsvond.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/scripts/main.js#L70-L72

Deze class start een css animatie van een loader die ronddraaid. Dit blijft zo totdat het cadeau in de bookmarkslijst staat.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/styles/style.css#L897-L943

Daarna doen we een fetch naar de server, die HTML teruggeeft.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/scripts/main.js#L77-L84

De browser zou normaal de HTML parsen naar de DOM, maar omdat we preventDefault() hebben gebruikt, moeten we dit nu zelf doen.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/scripts/main.js#L88-L89

Nadat we de HTML hebben ontvangen, kunnen we met het data-enhanced attribuut zoeken waar de nieuwe HTML geplaatst moet worden.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/scripts/main.js#L94-L96

Vervolgens kunnen we de loading class verwijderen en de nieuwe HTML in de DOM plaatsen.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/public/scripts/main.js#L99-L103


#### sticky header
De header verdwijnt bij scrollen naar beneden en verschijnt weer bij scrollen naar boven.
Ik heb dit gedaan zodat de cadeau container op de index pagina de volledige hoogte van het scherm kan gebruiken voor de cadeau's.
Voor mobiele apparaten is dit heel handig, omdat het scherm kleiner is. Als de gebruiker ver naar beneden is gescrold, hoeft die niet helemaal terug naar boven om de header weer te zien.

https://github.com/user-attachments/assets/300abf83-ee1a-4d57-92d9-64afa959ff87

Dit heb ik gedaan door de header position: sticky te geven. Hierdoor blijft de header altijd zichtbaar in beeld, ook wanneer JavaScript niet werkt.
https://github.com/vsheo/user-experience-enhanced-website/blob/55af559757acb2ac51d30a2360a3b7f7f1f6e4d9/public/styles/style.css#L1-L9

Met JavaScript selecteer ik de header en plaats ik een eventlistener op alle scrollbewegingen.
https://github.com/vsheo/user-experience-enhanced-website/blob/7ada5647d3ecac5219d761afdd0935a50dad4d56/public/scripts/main.js#L110-L113

Met pageYOffset krijg ik hoeveel pixels de pagina verticaal is verschoven
https://github.com/vsheo/user-experience-enhanced-website/blob/7ada5647d3ecac5219d761afdd0935a50dad4d56/public/scripts/main.js#L114

Als het verschil tussen de huidige en vorige pageYOffset positief is (dus bij scrollen naar beneden), voegen we de class "scroll-down" toe om de header buiten beeld te zetten
https://github.com/vsheo/user-experience-enhanced-website/blob/7ada5647d3ecac5219d761afdd0935a50dad4d56/public/scripts/main.js#L116-L119

De class "scroll-down" zorgt ervoor dat de header met een transition uit beeld verdwijnt
https://github.com/vsheo/user-experience-enhanced-website/blob/7ada5647d3ecac5219d761afdd0935a50dad4d56/public/styles/style.css#L11-L19

Als het verschil tussen de huidige en vorige pageYOffset negatief is (dus bij scrollen omhoog), wordt de header weer zichtbaar gemaakt door de class "scroll-up" toe te voegen
https://github.com/vsheo/user-experience-enhanced-website/blob/7ada5647d3ecac5219d761afdd0935a50dad4d56/public/scripts/main.js#L121-L125

Als laatste zetten we lastScroll gelijk aan currentScroll. Dit doen we zodat bij de volgende scroll de if statement uitgaat van de huidige scrollpositie, in plaats van altijd vanaf het begin van de pagina (bovenaan) te rekenen
https://github.com/vsheo/user-experience-enhanced-website/blob/7ada5647d3ecac5219d761afdd0935a50dad4d56/public/scripts/main.js#L126

### Routes
#### cadeau opslaan in bookmarks list
Op de index pagina heeft elk cadeau een POST methode gekoppeld aan het bookmark icoon.
Wanneer dit icoon wordt geklikt, wordt het cadeau toegevoegd aan de bookmarklijst in de database.
Dit gebeurt door de ID van het cadeau mee te geven.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/partials/article-gift.liquid#L19
In server.js wordt de id opgehaald met request.params.id. Deze id gebruik ik vervolgens in een fetch URL.
De URL filtert specifiek naar dit cadeau in de bookmarklijst.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L39-L47
Met een if statement wordt gecontroleerd of er iets staat in de JSON die door de URL wordt opgehaald.
Als data.length van de gefetchte JSON groter is dan 0, betekent dit dat het cadeau al in de bookmarklijst staat.
Het cadeau wordt dan met de DELETE methode uit de database verwijderd.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L50-L57
Als de respons leeg is, betekent dit dat het cadeau nog niet in de bookmarklijst staat.
Nu kunnen we het toevoegen aan de bookmarklijst met een POST methode.
Dit doen we door de id van het cadeau op te slaan als milledoni_products_id en ook een user-id mee te geven, zodat het cadeau in de persoonlijke lijst van de gebruiker kan worden opgeslagen.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L61-L72
Nadat dit is gedaan, wordt de gebruiker weer teruggebracht naar de indexpagina.


#### link naar de details pagina
Wanneer er op de titel van het cadeau wordt geklikt, kom je op de detailpagina van dat cadeau terecht.
Dit wordt gedaan door de slug mee te geven in de link.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/partials/article-gift.liquid#L17
In server.js wordt de slug opgehaald met request.params. Hiermee wordt een fetch URL gemaakt die filtert op het cadeau met deze slug.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L85-L94
De data van het cadeau wordt daarna meegegeven naar de detail pagina.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L103
In de URL staat de slug van het cadeau, waardoor de gebruiker ook kan zien op welke pagina hij zich bevindt.


#### bookmark list pagina
Op de bookmarks overzichtpagina kun je een lijst openen. Dit wordt gedaan door de name van de lijst mee te geven.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/views/bk-overzicht.liquid#L10-L12
In server.js wordt de naam gebruikt om een fetch URL te maken die alle opgeslagen cadeautjes van die lijst ophaalt.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L173-L176
Deze URL haalt alleen de id van het cadeau op, maar niet de rest van de data.
Omdat milledoni_products_id uit de vorige URL overeenkomt met de id in de JSON met alle cadeaugegevens, kunnen we een array maken met alle milledoni_products_id's
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L178-L185
Nu kunnen we met deze id's een nieuwe fetch URL maken die de rest van de data ophaalt.
Directus heeft al een methode om een array mee te geven in een URL.
Dus hoeven wij alleen nog de filter te schrijven en de array op de juiste plek in de URL te plaatsen.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L189
Deze data wordt meegegeven aan de bookmarklijst pagina om de cadeau artikelen in te laden.


#### error 404
Als er een URL is die niet bestaat, komt de gebruiker op een error 404 pagina terecht.
Als de response van de URL een 404 statuscode teruggeeft, betekent dit dat de pagina niet gevonden is.
In dat geval gebruiken we render('404.liquid') om de error pagina in te laden.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L198-L201
Op deze pagina is er een link terug naar de hoofdpagina.<br/>
<img src="/bewijslast-sprint-10/error-404-pagina.png" alt="error-404-pagina" style="width: 50%;">


#### mobile testing
In de app.listen heb ik '0.0.0.0' toegevoegd. Dit zorgt ervoor dat de server luistert naar alle HTTP verzoeken op het netwerk.
https://github.com/vsheo/user-experience-enhanced-website/blob/584e67f860e7df4a24380b985f87eff62b19aff7/server.js#L208
Je kunt deze localhost website op je telefoon testen met het volgende:<br/>
"het IP-adres van de computer" + :8000<br/>
8000 is het poortnummer dat je zelf meegeeft voor de localhost


### UI states
#### success state
Wanneer er op het bookmark icoon wordt geklikt, wordt het cadeau toegevoegd aan de bookmarklijst. Als feedforward gebruik ik een bookmark icoon met een plus erin. Wanneer hierop wordt geklikt, wordt het cadeau toegevoegd aan de bookmarklijst. Nadat het cadeau in de bookmarklijst staat, verandert het bookmark icoon naar een zwarte versie, dit is feedback aan de gebruiker. Dit heb ik gedaan zodat de gebruiker op de index en details pagina kan zien welke cadeaus al in zijn bookmarklijst staan.<br/>

index pagina

https://github.com/user-attachments/assets/35d983ac-8957-4e97-b50a-7b58490ff6f1

details pagina

https://github.com/user-attachments/assets/6fe291c6-4f57-4af0-8183-18b4b1bfc824


#### empty state
Als er geen cadeaus zijn opgeslagen in de bookmarklijst, is er op de bookmarklijst pagina een video voorbeeld van hoe de gebruiker cadeaus kan opslaan.<br/>
Deze pagina/state heb ik gemaakt zodat gebruikers weten dat hun lijst leeg is, en in geval ze niet weten hoe ze cadeaus kunnen toevoegen, heb ik een voorbeeld video gemaakt.<br/>
<img src="/bewijslast-sprint-10/empty-bookmark-list.png" alt="empty-bookmark-list" style="width: 50%;">


### perceived performance
#### visual time response
Ik heb een loading animatie toegevoegd aan de bookmarks.
Als het iets langer duurt om een item toe te voegen aan de bookmarklijst, ziet de gebruiker deze animatie.
Zo krijgt de gebruiker feedback dat er iets aan het gebeuren is.

https://github.com/user-attachments/assets/d3952f22-a3c3-494d-9005-30b1c92c7407


#### lazy loading
Op de afbeeldingen heb ik in de HTML de tag loading="lazy" toegevoegd.
Dit betekent dat afbeeldingen pas worden ingeladen wanneer ze in beeld komen.
Afbeeldingen die verder onderaan de pagina staan, worden daardoor pas later geladen.
Dit zorgt ervoor dat de website sneller zichtbaar is voor de gebruiker.

https://github.com/vsheo/user-experience-enhanced-website/blob/8a1189782cb37f1a33e628c4817e583318b5c61f/views/partials/article-gift.liquid#L13


## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->
- Download de nieuwste versie van Node.js (https://nodejs.org/en) op je laptop of computer.
- Fork deze repository en clone deze naar je laptop.
- Open de repository in GitHub.
- Open de terminal in VS Code en voer het volgende command uit:
    - 'npm install'
- Zodra de installatie klaar is, voer je het volgende commando uit om de website op localhost te starten:
    - 'npm start'
- Als alles goed is gegaan, krijg je in de terminal een link naar de juiste localhost. Klik hierop om de website in de browser te openen.
- Om de website te stoppen, voer je in de VS Code terminal het volgende command uit:
    - 'Ctrl + C'

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
