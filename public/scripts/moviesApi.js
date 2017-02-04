
// make ajax call to server to get category
// depending on category, call a sepecific API

// Food --> YELP
// MOvies --> rotten tomatoes
// Books --> AMAZON
// Buy --> AMAZON

// ASSUMING IM GETTING CATEGORY ID FROM THE TASK THAT WAS SELECTED,


// 1 | Movies
// 2 | Books
// 3 | Food
// 4 | Products

// For TMDB
// api key : 70c09d70d8283747ace652dfc047b3cf
// https://api.themoviedb.org/3/movie/550**API-KEY**



let apiKey =  "**API-KEY**";
let url = "https://api.themoviedb.org/3/";
let search = 'search/multi';
let movie = 'movie/';
let language = '&language=en-US';


let toDo = "watch The Sound of Music"
let theQuery = getMovieName(toDo)



function getMovieName(string){
  string =  string.split(" ");
  string.shift();
 return string.join(" ");
}

console.log(encodeURI(getMovieName(toDo)));



function makeQuery(method, query, id){
  return url + method + id + apiKey + "&query=" + encodeURI(query);
}

console.log(makeQuery(search, getMovieName(toDo)))




function createSettings(method, query, id){
  return {
    "async": true,
    "crossDomain": true,
    "url": makeQuery(method, query, id),
    "method": "GET",
    "headers": {},

  }
}

$.ajax(createSettings(search, theQuery, "")).done(function (moviesOrTvShows) {
    let movieId = moviesOrTvShows.results[0].id;
    // movies.media to know if tv show or movie -- implement later
    console.log(movieId)
    console.log(makeQuery(movie, "", movieId));
    $.ajax(createSettings(movie, "",  movieId)).done(function(movie){
      console.log(movie);




      let movieInfo = {
       genreObj: movie.genres,
       title: movie.original_title,
       rating: movie.vote_average,
       overview: movie.overview,
       tagline: movie.tagline
      }

      console.log(movieInfo);
      // MIOGHT NEED MORE INFO
      // WILL PLAY WITH THIS API LATER



    })

});

