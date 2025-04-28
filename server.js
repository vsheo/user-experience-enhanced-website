import express from 'express'
import { Liquid } from 'liquidjs';

const loggedInUserID = 2 // viresh in dit geval

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')


// MARK: Maak een GET route voor de index
app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  const giftResponse = await fetch('https://fdnd-agency.directus.app/items/milledoni_products/?fields=id,slug,name,image,tags,img.id,img.height,img.width,img.type&sort=id')
  const giftResponseJSON = await giftResponse.json()

  // alle bookmarked items
  const bookmarked = await fetch('https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products/?filter={"milledoni_users_id":"2"}')
  const bookmarkedJSON = await bookmarked.json()

  let bookmarks = bookmarkedJSON.data.map(function(bookmark) {
    return bookmark.milledoni_products_id
  })

  response.render('index.liquid', {giftData: giftResponseJSON.data, bookmarks: bookmarks})
})


// Maak een POST route voor de index; hiermee kun je een item toevoegen of uit de bookmarklijst halen
app.post('/:id', async function (request, response) {
 
  // Haal de data het cadeau id op die in de bookmark list moet komen
  const getId = request.params.id;

  // url waar het cadeau opgeslagen moet worden
  const postURL = 'https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products/'

  // filter om te zoeken naar het cadeau,
  const GiftFilter = `?filter={"milledoni_users_id":"${loggedInUserID}","milledoni_products_id":"${getId}"}`;
  const checkGift = await fetch(postURL + GiftFilter)
  const checkGiftResponseJSON = await checkGift.json()

  // if statement om te kijken als het cadeau al in de lijst staat
  if (checkGiftResponseJSON.data.length > 0) {
    // als dat het geval is dan hebben we de id nodig om het met delete uit de lijst te haalen
    let delResponse = await fetch(postURL + checkGiftResponseJSON.data[0].id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // console.log('Product verwijderd')
    // console.log(delResponse.status);
  }
  // Voeg de nieuwe waarde toe aan de bookmark list in directus
  else {
    await fetch(postURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        milledoni_users_id: loggedInUserID,
        milledoni_products_id: getId
      }),
    })
    // console.log('Product opgeslagen')
  }

  // Redirect terug naar de index pagina
  response.redirect('/')
})



// MARK: details pagina
app.get('/details/:slug', async function (request, response) {
  // haal de slug op uit de url
  const slug = request.params.slug;
  // voeg de slug toe als filter
  const giftURL = `https://fdnd-agency.directus.app/items/milledoni_products/?fields=id,slug,name,image,description,url&filter={"slug":"${slug}"}`
  
  // fetch de nieuwe filter
  const clickedgiftResponse = await fetch(giftURL)
  const clickedgiftResponseJSON = await clickedgiftResponse.json()

  const allGifts = await fetch("https://fdnd-agency.directus.app/items/milledoni_products/?fields=id,slug,name,image,description,url")
  const allGiftsResponseJSON = await allGifts.json()
  
  // alle bookmarked items
  const bookmarked = await fetch('https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products/?filter={"milledoni_users_id":"2"}')
  const bookmarkedJSON = await bookmarked.json()
  let bookmarks = bookmarkedJSON.data.map(function(bookmark) {
    return bookmark.milledoni_products_id
  })

  response.render('details.liquid', {clickedGiftData: clickedgiftResponseJSON.data[0], allGifts: allGiftsResponseJSON.data, bookmarks: bookmarks})
})


// Maak een POST route voor de details; hiermee kun je een item toevoegen of uit de bookmarklijst halen
app.post('/details/:slug/:id', async function (request, response) {
 
  // Haal de data het cadeau id op die in de bookmark list moet komen
  const getId = request.params.id;

  // haal de slug op, om later te redirecten naar dezelfde details pagina
  const getSlug = request.params.slug;

  // url waar het cadeau opgeslagen moet worden
  const postURL = 'https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products/'

  // filter om te zoeken naar het cadeau,
  const GiftFilter = `?filter={"milledoni_users_id":"${loggedInUserID}","milledoni_products_id":"${getId}"}`;
  const checkGift = await fetch(postURL + GiftFilter)
  const checkGiftResponseJSON = await checkGift.json()

  // if statement om te kijken als het cadeau al in de lijst staat
  if (checkGiftResponseJSON.data.length > 0) {
    // als dat het geval is dan hebben we de id nodig om het met delete uit de lijst te haalen
    let delResponse = await fetch(postURL + checkGiftResponseJSON.data[0].id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // console.log('Product verwijderd')
    // console.log(delResponse.status);
  }
  // Voeg de nieuwe waarde toe aan de bookmark list in directus
  else {
    await fetch(postURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        milledoni_users_id: loggedInUserID,
        milledoni_products_id: getId
      }),
    })
    // console.log('Product opgeslagen')
  }

  // Redirect terug naar dezelfde details pagina
  response.redirect(`/details/${getSlug}`)
})


// MARK: bookmark overzicht pagina
app.get('/bookmark-overzicht', async function (request, response) {
  // alle bookmark lijsten
  // https://fdnd-agency.directus.app/items/milledoni_users?fields=*.*

  const listsURLResponse = await fetch('https://fdnd-agency.directus.app/items/milledoni_users/')
  const listsURLResponseJSON = await listsURLResponse.json()


  response.render('bk-overzicht.liquid', {bookmarkLists: listsURLResponseJSON.data})
})


// MARK: bookedmarked lijst pagina
app.get('/bookmark-list/:name', async function (request, response) {
  const getName = request.params.name;

  // haal alle items uit jou lijst op
  const yourList = `https://fdnd-agency.directus.app/items/milledoni_users/?fields=name,saved_products.milledoni_products_id&filter={"name":{"_icontains":"${getName}"}}`
  const yourListResponse = await fetch(yourList)
  const yourListResponseJSON = await yourListResponse.json()

  const productIdArray = []

  // sla elke product id op in een array
  yourListResponseJSON.data.forEach(list => {
    list.saved_products.forEach(product => {
      productIdArray.push(product.milledoni_products_id)
    })
  })

  // gebruik de array om een URL te maken die de data ophaalt
  // filter={"id": {"_in": [1269, 895, 789]}}
  const bookmarkedGFift = `https://fdnd-agency.directus.app/items/milledoni_products/?fields=image,id,name,slug&filter={"id":{"_in":"${productIdArray}"}}`
  // console.log(productIdArray)

  const myListResponse = await fetch(bookmarkedGFift)
  const myListResponseJSON = await myListResponse.json()

  response.render('bk-lijst.liquid', {myList: myListResponseJSON.data, bookmarks: productIdArray})
})

// als de link niet betstaat dan wordt de gebruiker naar een 404 error pagina gebracht
app.use(function (request, response) {
  response.status(404).render('404.liquid')
})



// process.env.PORT wordt later door render gebruikt om de website live te zetten
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), '0.0.0.0', function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
