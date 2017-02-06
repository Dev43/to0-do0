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

  function whatCategory(int){
    var catObj = {}
    switch(int){
      case 1:
        catObj.theCategory = "Movies";
        catObj.theClass = "list-group-item-danger";
        $('.modal-content').addClass('panel-danger');
        catObj.cb = getMovie;
      break;
      case 2:
        catObj.theCategory = "Books";
        catObj.theClass = "list-group-item-info";
        $('.modal-content').addClass('panel-info');
        catObj.cb = getBook;
      break;
      case 3:
        catObj.theCategory = "Food";
        catObj.theClass = "list-group-item-warning";
        $('.modal-content').addClass('panel-warning');
        catObj.cb = getRestaurant;
      break;
      case 4:
        catObj.theCategory = "Products";
        catObj.theClass = "list-group-item-success";
        $('.modal-content').addClass('panel-success');
        catObj.cb = getProduct;
        break;
      default:
        catObj.theCategory = "Uncategorized";
        catObj.theClass = "Uncategorized";
        catObj.cb = function(){
          return;
        }
    }
    return catObj;
  }

  // View rendering for tasks with GET to DB
  function createTaskElement(taskObj) {
    $cat = taskObj.category_id;
    var catName = whatCategory($cat).theCategory;

    $task = $("<li/>", {
      "class" : "list-group-item " + whatCategory($cat).theClass
    })
    .append($("<div/>", {
      "class" : "col-md-12 checkbox",

    })
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
        .append($("<div/>", {"text": taskObj.task_name}), $("<button/>", {
       "type" : "button",
       "name" : taskObj.category_id + taskObj.task_name,
       "class" : "btn btn-primary modalToggle col-6 col-md-4",
       "id" : taskObj.taskid,
      //  "data-toggle" : "modal",
      //  "data-target" : "#myModal",
       "text" : "More info"
      }) )
      )
    )

    $("#tasks").append($task);
    return $task;
  }
  function renderTasks(tasks) {
    $('#tasks').empty();
    tasks ? (
      tasks.forEach((t) => {
        t.category_id ? console.log('') : t.category_id = 0
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
    let activeElement = createCategorieElement({category_name: "Active"})
      $('.categories').append(activeElement);
  }

  // View rendering for tasks with GET to DB
  // function renderModal(query) {
  //   $('.modal-title').innerHTML(query.title);
  //   $('.modal-body > h5').innerHTML(query.description);
  //   $('.modal-body > h3').innerHTML(query.rating);
  // }

  $('ul#tasks').delegate('button.modalToggle', 'click', (e) => {
    $cat = Number(e.target.name.slice(0,1));
    $query = e.target.name.slice(1)+"";
    whatCategory($cat).cb($query,(res)=>{
      // $('.modal-content').empty();
      $('.modal-title').text(res.title);
      $('.modal-body > h5').text(res.description);
      $('.modal-body > .rating').text("Rating: "+res.rating);
      $('#myModal').modal({show: true});
      console.log(res);
    });
    // renderModal($theQuery);
    // console.log($cat);
    // console.log($query);
    // console.log($cat);
    // console.log(
    //   "id :",
    //   e.target.id,
    //   " & ",
    //   "data-categoryId :",
    //   e.target.category_id
    // );
  });
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
  $('ul#tasks').delegate('li>div>label>input.task-checkbox', 'click', (e) => {
    // console.log(e.target);
    $task = {
      taskid : e.target.id,
      isComplete : e.target.checked
    };
    upDbItems('/tasks/edit', $task, () => {
      e.target.value
    })
  });
  // $('ul#tasks').delegate('button.modalToggle', 'click', (e) => {
  //   // console.log("id :", e.target.id, " & ", "data-categoryId :", e.target.category_id);
  //   $cat = Number(e.target.name.slice(0,1));
  //   $query = e.target.name.slice(1)+"";
  //   $theQuery = whatCategory($cat).cb($query);
  //   console.log($cat);
  //   console.log($query);
  //   console.log($cat);
  //   $('#myModal').modal({show: true});
  // });
  $(".navbar-brand").on('click', function(e){
    loadDbItems("/tasks/", renderTasks)
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

function getBook(query,cb){
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

      console.log(bookInfo)

      return cb(bookInfo);
  });
}

function getMovie(query,cb){

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
        console.log(movieInfo);
        return cb(movieInfo);
      })
    });
  }


function getRestaurant(query,cb){
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
      console.log(resto)
      return cb(restoInfo);

    });
  });
  }

function getProduct(query,cb){
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
    console.log(resultInfo)
    let theResults = standardInformationBuilder((resultInfo.subtitle || resultInfo.title[0]) , (resultInfo.galleryURL[0] || ""), resultInfo.condition[0].conditionDisplayName[0], resultInfo.title[0])
    return cb(theResults);
  });
}

});
