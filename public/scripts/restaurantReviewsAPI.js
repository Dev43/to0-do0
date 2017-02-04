// assuming you are in montreal

// navigator.geolocation.getCurrentPosition(function(position) {
//   console.log(position.coords.latitude, position.coords.longitude);
// });

//AUTHENTICATION // will need to hide all of these!
var settings = {
  "async": true,
  "crossDomain": true,
  "url": 'https://cors-anywhere.herokuapp.com/' + "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972",
  "method": "GET",
  "headers": {
    "authorization": "Bearer o9NWDKOyt5OThXDjNeFb_1HNfrhxHycMgYuePjJUe66Bk05Zfy2m5A4_d9raPBh-Wzc-cyy60fe-80Gjk1hxl1dHp3wo8IuKtt9XNW8CyG9wQDDuN-PcbjaHdA2WWHYx",
    "cache-control": "no-cache",
  },

}

$.ajax(settings).done(function (response) {
  console.log(response);
});
// let url = "https://api.yelp.com/v3/businesses/search";
// // let query = "read the sun also rises"
// let query = "try l'gros luxe"

// function getRestaurantName(string){
//   string =  string.split(" ");
//   string.shift();
//  return string.join(" ");
// }

// function makeQuery(query){
//   return url + "q=" + encodeURI(query);
// }




// function createSettings(query, id){
//   console.log(makeQuery(query))
//   return {
//     "async": true,
//     "crossDomain": true,
//     "url":   makeQuery(query),
//     "method": "GET",
//     "data": "{}",
//     "dataType":'jsonp'
//   }
// }




// $.ajax(createSettings(query)).done(function (restaurants) {

//     console.log(restaurants)

//     // let bookInfo = {
//     //   title: books.items[0].volumeInfo.title,
//     //   authorsArray: books.items[0].volumeInfo.authors,
//     //   publisher: books.items[0].volumeInfo.publisher,
//     //   description: books.items[0].volumeInfo.description,
//     //   categoriesArray: books.items[0].volumeInfo.categories,
//     //   rating: books.items[0].volumeInfo.averageRating,
//     //   previewLink: books.items[0].volumeInfo.previewLink,
//     //   rating: books.items[0].volumeInfo.averageRating,
//     //   smallImage: books.items[0].volumeInfo.imageLinks.smallThumbnail
//     // }

//     // console.log(bookInfo)

//   })
