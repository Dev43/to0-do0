
// using GOOGLE BOOKS API instead


let url = "https://www.googleapis.com/books/v1/volumes?";
// let query = "read the sun also rises"
let query = "read the lors of the rings"

function getBookName(string){
  string =  string.split(" ");
  string.shift();
 return string.join(" ");
}

function makeQuery(query){
  return url + "q=" + encodeURI(query);
}




function createSettings(query, id){
  console.log(makeQuery(query))
  return {
    "async": true,
    "crossDomain": true,
    "url":   makeQuery(query),
    "method": "GET",
    "data": "{}",
    "dataType":'jsonp'
  }
}




$.ajax(createSettings(query)).done(function (books) {

    console.log(books)

    let bookInfo = {
      title: books.items[0].volumeInfo.title,
      authorsArray: books.items[0].volumeInfo.authors,
      publisher: books.items[0].volumeInfo.publisher,
      description: books.items[0].volumeInfo.description,
      categoriesArray: books.items[0].volumeInfo.categories,
      rating: books.items[0].volumeInfo.averageRating,
      previewLink: books.items[0].volumeInfo.previewLink,
      rating: books.items[0].volumeInfo.averageRating,
      smallImage: books.items[0].volumeInfo.imageLinks.smallThumbnail
    }

    console.log(bookInfo)

  })




// // GOODREADS API
// // key: MuedSVaIqiN37Elu0LWQOQ
// // secret: EgSWTEDpA52laYlPlCMW8hx00t8Vyi8xPGOIbrOQVk

// // Changes XML to JSON
// function xmlToJson(xml) {

//   // Create the return object
//   var obj = {};

//   if (xml.nodeType == 1) { // element
//     // do attributes
//     if (xml.attributes.length > 0) {
//     obj["@attributes"] = {};
//       for (var j = 0; j < xml.attributes.length; j++) {
//         var attribute = xml.attributes.item(j);
//         obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//       }
//     }
//   } else if (xml.nodeType == 3) { // text
//     obj = xml.nodeValue;
//   }

//   // do children
//   if (xml.hasChildNodes()) {
//     for(var i = 0; i < xml.childNodes.length; i++) {
//       var item = xml.childNodes.item(i);
//       var nodeName = item.nodeName;
//       if (typeof(obj[nodeName]) == "undefined") {
//         obj[nodeName] = xmlToJson(item);
//       } else {
//         if (typeof(obj[nodeName].push) == "undefined") {
//           var old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//         obj[nodeName].push(xmlToJson(item));
//       }
//     }
//   }
//   return obj;
// };


// var theURLToFOllow = "https://www.goodreads.com/search.xml?key=YOUR_KEY&q=Ender%27s+Game"

// 'https://cors-anywhere.herokuapp.com/' +
// let apiKey =  "?key=MuedSVaIqiN37Elu0LWQOQ";
// let url = "https://www.goodreads.com/search.xml";

// let query = "Ender's Game";


