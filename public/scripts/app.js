$(() => {
  // Helper functions for getting and posting data to DB
  function upDbItems(route, data, cb) {
    $.ajax({
      url: route,
      data: data,
      method: 'POST',
      success: cb,
      error: errorCb
    });
  }
  function loadDbItems(route, cb) {
    $.ajax({
      url: route,
      method: 'GET',
      success: cb,
      error: errorCb
    });
  }

  function errorCb(errResponse, type){
   // alert(type + ": " + errResponse.responseText)
    return $(".errorMsg").html(type + ": " + errResponse.responseText)
  }

  // Empty arrays and objects for logged out usage of app
  $arr = [];
  $user = {};

  // Show and hide page items according to if user is logged in or not
  function isLogged(usr){
    $user = usr;
    $('.main').hide();

    if($user.loggedin){
      loadDbItems('/categories', renderCategories);
      loadDbItems('/tasks', renderTasks);
      $('#newTask').show();
      $("#taskInput").focus();
      $('.tasks').show();
      $('.logout-btn').show();
      $('.register-btn').hide();
      $('.login-btn').hide();
    }else{
      $('#newTask').hide();
      $('.categories').hide();
      $('.logout-btn').hide();
      $('.login').show();
      $('.navbar-brand').on('click', () => {
        $('.tasks').toggle();
        if($('.login').is(':visible')){
          $('.login').toggle()
        }
        if($('.register').is(':visible')){
          $('.register').toggle()
        }
      });
      $('.login-btn').show();
      $('.login-btn').on('click', () => {
        if( $('.login').is(':hidden') ){
          $('.login').toggle();
        }
        if($('.tasks').is(':visible')){
          $('.tasks').toggle()
        }
        if($('.register').is(':visible')){
          $('.register').toggle()
        }
      });
      $('.register-btn').show();
      $('.register-btn').on('click', () => {
        $('.register').toggle()
        if($('.tasks').is(':visible')){
          $('.tasks').toggle()
        }
        if($('.login').is(':visible')){
          $('.login').toggle()
        }
        if($('.register').is(':hidden')){
          $('.register').toggle()
        }
      })
    }
  }

  // First get request to server
  loadDbItems('/users/',(response)=>{
    $user = response;
    $('body').show(1000);
    isLogged($user);
  });

  // View rendering for tasks with GET to DB
  function createTaskElement(taskObj) {
    var theClass = "";
    var theCategory = ""
    switch(taskObj.category_id){
      case 1:
        theCategory = "Movies"
        theClass = "list-group-item-danger";
      break;
      case 2:
        theCategory = "Books";
        theClass = "list-group-item-info";
      break;
      case 3:
        theCategory = "Food";
        theClass = "list-group-item-warning"
      break;
      case 4:
        theCategory = "Products"
        theClass = "list-group-item-success";
        break;
      default:
      theCategory = "Uncategorized"
        theClass = "uncategorized";
    }

    $task = $("<li/>", {
      "class" : "list-group-item " + theClass,
    })
    .append($("<div/>", {
      "class" : "checkbox",

    })
    // .append($("<div class= 'theCategory'>" + theCategory + "</div>"))
      .append($("<label/>", {
        "class" : "task_label"
      })
        .append($("<input/>", {
          "name": taskObj.task_name,
          "class": 'task-checkbox',
          "type": "checkbox",
          "checked": taskObj.isComplete,
          "id": taskObj.taskid,
          "data-categoryId" : taskObj.category_id,
          "value": ""
          })

        )
        .append(taskObj.task_name)
      )
    )
    $("#tasks").append($task);
    return $task;
  }
  function renderTasks(tasks) {
    $('#tasks').empty();
    tasks ? (
      tasks.forEach((t) => {
        $taskElem = createTaskElement(t);
        $prevTask = $('#tasks li').first();
        $taskElem.insertBefore($prevTask);
      })
    ):(0)
  }


// View rendering for categories with GET to DB
  function createCategorieElement (categoryObj) {
    $category = $("<li/>", {
      "role":"present"
    })
      .append($("<a/>", {
        "href" : "#"
      }).append(categoryObj.category_name)
    );
    $(".categories").append($category);
    return $category;
  }
  function renderCategories(categories) {
    $('.categories').empty();
    categories.forEach(function(c){
      $catElem = createCategorieElement(c)
      $('.categories').append($catElem);
    });
  }

  $("#newTask").keydown(function(e) {
    if(e.keyCode === 13){
      e.preventDefault();
      $task = $("#newTask").serialize();
      upDbItems('/tasks/new', $task, () => {
        $("#newTask input").val("");
        loadDbItems('/tasks', renderTasks);
      });
    }
  });

  $(".categories").on('click', function(e) {
    let category = e.target.innerHTML;
    loadDbItems("/tasks/" + category, renderTasks)
  })

  $('#login-submit').on('click', (e) => {
    e.preventDefault();
    data = $('#login-form').serialize();
    upDbItems('/users/login',data,(response)=>{
      // $user = JSON.parse(response);
      isLogged(JSON.parse(response));
    });
  })
  $('#register-submit').on('click', (e) => {
    e.preventDefault();
    data = $('#register-form').serialize();
    upDbItems('/users/register',data ,(response)=>{
      isLogged(JSON.parse(response));
      $('#bs-example-navbar-collapse-1').collapse('toggle');
    });
  })
  $('#logout-nav-btn').on('click', ()=>{
    upDbItems('/users/logout', "logmeoutplz", () => {
      $('.main').hide();
      $('.login').show();
      isLogged(false);
    })
  })
  $('ul#tasks').on('click', 'li>div>label>input.task-checkbox', (e) => {
    $task = {
      taskid : e.target.id,
      isComplete : e.target.checked
    };
    upDbItems('/tasks/edit', $task, () => {
      e.target.value
    })
  })


function standardInformationBuilder(description, imgLink, rating, title){
  let info = {
    title: title,
    rating: rating,
    description: description,
    imgLink: imgLink
  }
  return info;
}

function getBook(query){
  let bookInfo = "";
  let url = "https://www.googleapis.com/books/v1/volumes?";


  function getBookName(string){
    string =  string.split(" ");
    string.shift();
   return string.join(" ");
  }

  function makeQuery(query){
    return url + "q=" + encodeURI(query);
  }

  function createSettings(query, id){
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
      let theBook = books.items[0].volumeInfo;
      bookInfo =  standardInformationBuilder(theBook.description,theBook.imageLinks.smallThumbnail, theBook.averageRating, theBook.title )
      return bookInfo;
  });
}

function getMovie(query){

  let apiKey =  "**API-KEY**";
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
      "method": "GET"
    }
  }

    $.ajax(createSettings(search, theQuery, "")).done(function (moviesOrTvShows) {
      let movieId = moviesOrTvShows.results[0].id;
      // movies.media to know if tv show or movie -- implement later
      $.ajax(createSettings(movie, "",  movieId)).done(function(movie){
        let movieInfo = standardInformationBuilder(movie.overview, "", movie.vote_average, movie.title );
        return movieInfo;
      })
    });
  }

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
      "authorization": "**AUTHORIZATION**",
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
      "authorization": "**AUTHORIZATION**",
      "cache-control": "no-cache",
      }
    }
  }

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
      let restoInfo = standardInformationBuilder(resto.phone, resto.image_url, resto.rating, resto.name)
      return resto;
    });
  });
  }

function getProduct(query){
  let url = "https://svcs.ebay.com/services/search/FindingService/v1?**SECURITY-APPNAME**&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD"
  let endUrl = "&paginationInput.entriesPerPage=1"

  function getProductName(string){
    string =  string.split(" ");
    string.shift();
   return "(" + string.join(",") + ")";
  }

  function makeQuery( query){
    return url + "&keywords=" + encodeURI(query) + endUrl;
  }

  function createSettings(query){
    return {
      "async": true,
      "crossDomain": true,
      "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(query),
      "method": "GET",
      "headers": {"x-requested-with": "dev/me"}
    }
  }

  $.ajax(createSettings(getProductName(query))).done(function (products) {
    let theProducts = JSON.parse(products);
    let resultInfo = theProducts.findItemsByKeywordsResponse[0].searchResult[0].item[0];
    let theResults = standardInformationBuilder(resultInfo.subtitle[0], resultInfo.galleryURL[0], resultInfo.condition[0].conditionDisplayName[0], resultInfo.title[0])
    return theResults;
  });
}

});




