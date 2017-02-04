// // assuming you are in montreal
// // probably need to allow for location in the app already

// // navigator.geolocation.getCurrentPosition(function(position) {
// //   console.log(position.coords.latitude, position.coords.longitude);
// // });

// //AUTHENTICATION // will need to hide all of these!
let query = "try bouillon bilk";
let searchUrl = "https://api.yelp.com/v3/businesses/search?";
let businessUrl = "https://api.yelp.com/v3/businesses/"
let search = "term=";

var settings = {
  "async": true,
  "crossDomain": true,
  "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(query),
  "method": "GET",
  "headers": {
    "authorization": "Bearer o9NWDKOyt5OThXDjNeFb_1HNfrhxHycMgYuePjJUe66Bk05Zfy2m5A4_d9raPBh-Wzc-cyy60fe-80Gjk1hxl1dHp3wo8IuKtt9XNW8CyG9wQDDuN-PcbjaHdA2WWHYx",
    "cache-control": "no-cache",
  },

}


function createSettings(url, query, method){
  return {
    "async": true,
    "crossDomain": true,
    "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(url, query, method),
    "method": "GET",
    "headers": {
    "authorization": "Bearer o9NWDKOyt5OThXDjNeFb_1HNfrhxHycMgYuePjJUe66Bk05Zfy2m5A4_d9raPBh-Wzc-cyy60fe-80Gjk1hxl1dHp3wo8IuKtt9XNW8CyG9wQDDuN-PcbjaHdA2WWHYx",
    "cache-control": "no-cache",
    }
  }
}

// let query = "read the sun also rises"


function getRestaurantName(string){
  string =  string.split(" ");
  string.shift();
 return string.join(" ");
}

function makeQuery(url, query, method){
  if(!method){
    return url + query;
  } else {
  return url + method + encodeURI(query) + "&location=montreal";
  }
}


$.ajax(createSettings(searchUrl, getRestaurantName(query), search )).done(function (restaurants) {

  let relevantRestaurantId = restaurants.businesses[0].id;
  console.log(relevantRestaurantId)

  $.ajax(createSettings(businessUrl, relevantRestaurantId, "")).done(function (resto) {
    console.log(resto);

  });



});





// // $.ajax(createSettings(query)).done(function (restaurants) {

// //     console.log(restaurants)

// //     // let bookInfo = {
// //     //   title: books.items[0].volumeInfo.title,
// //     //   authorsArray: books.items[0].volumeInfo.authors,
// //     //   publisher: books.items[0].volumeInfo.publisher,
// //     //   description: books.items[0].volumeInfo.description,
// //     //   categoriesArray: books.items[0].volumeInfo.categories,
// //     //   rating: books.items[0].volumeInfo.averageRating,
// //     //   previewLink: books.items[0].volumeInfo.previewLink,
// //     //   rating: books.items[0].volumeInfo.averageRating,
// //     //   smallImage: books.items[0].volumeInfo.imageLinks.smallThumbnail
// //     // }

// //     // console.log(bookInfo)

// //   })
