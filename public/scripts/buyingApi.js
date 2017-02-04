// they have an html ready to go http://developer.ebay.com/quickstartguide/sample/js/default.aspx?index=0



let url = "https://svcs.ebay.com/services/search/FindingService/v1?**SECURITY-APPNAME**&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD"
let endUrl = "&paginationInput.entriesPerPage=3"

let toDo = "buy iphone"
let theQuery = getProductName(toDo)



function getProductName(string){
  string =  string.split(" ");
  string.shift();
 return "(" + string.join(",") + ")";
}



function makeQuery( query){
  return url + "&keywords=" + encodeURI(query) + endUrl;
}

console.log(makeQuery(getProductName(toDo)))




function createSettings(query){
  return {
    "async": true,
    "crossDomain": true,
    "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(query),
    "method": "GET",
    "headers": {"x-requested-with": "dev/me"},

  }
}



$.ajax(createSettings(getProductName(toDo))).done(function (products) {
  let theProducts = JSON.parse(products);
  console.log(theProducts)
  let resultInfo = theProducts.findItemsByKeywordsResponse[0].searchResult;
  console.log(resultInfo);



})

