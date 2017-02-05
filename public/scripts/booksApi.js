
function getBook(query){

let url = "https://www.googleapis.com/books/v1/volumes?";
// let query = "read the sun also rises"
// let query = "read the lors of the rings"


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
    $('.one').append(`<code>${JSON.stringify(bookInfo)}</code>`)
    return bookInfo;

  })
}

getBook("read fight club")

