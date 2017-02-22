function getRestaurant(query){

let searchUrl = "https://api.yelp.com/v3/businesses/search?";
let businessUrl = "https://api.yelp.com/v3/businesses/"
let search = "term=";
var settings = {
  "async": true,
  "crossDomain": true,
  "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(query),
  "method": "GET",
  "headers": {
    "authorization": "AUTHORIZATION",
    "cache-control": "no-cache",
  }
}

function createSettings(url, query, method){
  return {
    "async": true,
    "crossDomain": true,
    "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(url, query, method),
    "method": "GET",
    "headers": {
    "authorization": "AUTHORIZATION",
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
  $.ajax(createSettings(businessUrl, relevantRestaurantId, "")).done(function (resto) {
     $('.three').append(`<code>${JSON.stringify(resto)}</code>`)
    return resto;
  });
});
}

getRestaurant("try big in japan")
