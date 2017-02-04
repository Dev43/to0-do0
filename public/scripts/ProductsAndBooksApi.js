

// GOODREADS API
// key: MuedSVaIqiN37Elu0LWQOQ
// secret: EgSWTEDpA52laYlPlCMW8hx00t8Vyi8xPGOIbrOQVk

// Changes XML to JSON
function xmlToJson(xml) {

  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
};


var theURLToFOllow = "https://www.goodreads.com/search.xml?key=YOUR_KEY&q=Ender%27s+Game"


let apiKey =  "?key=MuedSVaIqiN37Elu0LWQOQ";
let url = "https://www.goodreads.com/search.xml";

let query = "Ender's Game";



function getBookName(string){
  string =  string.split(" ");
  string.shift();
 return string.join(" ");
}

function makeQuery(query){
  return url + apiKey + "&q=" + encodeURI(query);
}




function createSettings(query, id){
  console.log(makeQuery(query))
  return {
    "async": true,
    "crossDomain": true,
    "url":  'https://cors-anywhere.herokuapp.com/' + makeQuery(query),
    "method": "GET",
    "headers": {},
    "data": "{}",
    // "dataType":'jsonp'
  }
}




$.ajax(createSettings(query)).done(function (books) {

    console.log(books)
   console.log(xmlToJson(books));

  })

