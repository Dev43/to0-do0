// they have an html ready to go http://developer.ebay.com/quickstartguide/sample/js/default.aspx?index=0

function getProduct(query){
let url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=PatrickG-LHLtodo-PRD-4cd409a3e-159a43e4&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD"
let endUrl = "&paginationInput.entriesPerPage=3"

function getProductName(string){
  string =  string.split(" ");
  string.shift();
 return "(" + string.join(",") + ")";
}

function makeQuery( query){
  return url + "&keywords=" + encodeURI(query) + endUrl;
}

console.log(makeQuery(getProductName(query)))

function createSettings(query){
  return {
    "async": true,
    "crossDomain": true,
    "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(query),
    "method": "GET",
    "headers": {"x-requested-with": "dev/me"},

  }
}

$.ajax(createSettings(getProductName(query))).done(function (products) {
  let theProducts = JSON.parse(products);
  let resultInfo = theProducts.findItemsByKeywordsResponse[0].searchResult;
   $('.four').append(`<code>${JSON.stringify(resultInfo)}</code>`)
  return resultInfo;
});
}


getProduct("buy iphone");
