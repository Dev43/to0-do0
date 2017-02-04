// assuming you are in montreal

// navigator.geolocation.getCurrentPosition(function(position) {
//   console.log(position.coords.latitude, position.coords.longitude);
// });

//AUTHENTICATION // will need to hide all of these!
var auth = {
        //
        // Update with your auth tokens.
        //
        consumerKey : "6bYY1U8dhgFt17noBW5NXQ",
        consumerSecret : "LXEV5iVj-Azb12ub7G8kaFWpK5Q",
        accessToken : "tX6UzxaDaewFyriSB902mFFs4EDUF6Lx",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret : "YpjvnyGiU5JRb6RaPrl0LmmVTjg",
        serviceProvider : {
          signatureMethod : "HMAC-SHA1"
        }
      };



            var terms = 'food';
      var near = 'San+Francisco';
      var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
      };
      parameters = [];
      parameters.push(['term', terms]);
      parameters.push(['location', near]);
      parameters.push(['callback', 'cb']);
      parameters.push(['oauth_consumer_key', auth.consumerKey]);
      parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
      parameters.push(['oauth_token', auth.accessToken]);
      parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
      var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
      };
      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, accessor);
      var parameterMap = OAuth.getParameterMap(message.parameters);
      parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
      console.log(parameterMap);
      $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'cache' : true,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
          console.log(data);
        }
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
