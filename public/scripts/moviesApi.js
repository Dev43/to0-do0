
// For TMDB
// api key : 70c09d70d8283747ace652dfc047b3cf
// https://api.themoviedb.org/3/movie/550?api_key=70c09d70d8283747ace652dfc047b3cf

function getMovie(query){

let apiKey =  "?api_key=70c09d70d8283747ace652dfc047b3cf";
let url = "https://api.themoviedb.org/3/";
let search = 'search/multi';
let movie = 'movie/';
let language = '&language=en-US';
let theQuery = getMovieName(query)

function getMovieName(string){
  string =  string.split(" ");
  string.shift();
 return string.join(" ");
}

function makeQuery(method, query, id){
  return url + method + id + apiKey + "&query=" + encodeURI(query);
}

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
    $.ajax(createSettings(movie, "",  movieId)).done(function(movie){
      let movieInfo = {
       genreObj: movie.genres,
       title: movie.original_title,
       rating: movie.vote_average,
       overview: movie.overview,
       tagline: movie.tagline
      }

       $('.two').append(`<code>${JSON.stringify(movieInfo)}</code>`)
      return movieInfo;
    })

  });
}


getMovie("watch The Sound of Music");
