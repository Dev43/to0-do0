$(function() {
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
      $('.navbar-brand').on('click', function()  {
        $('.tasks').toggle();
        if($('.login').is(':visible')){
          $('.login').toggle()
        }
        if($('.register').is(':visible')){
          $('.register').toggle()
        }
      });
      $('.login-btn').show();
      $('.login-btn').on('click', function() {
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
      $('.register-btn').on('click', function() {
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
  loadDbItems('/users/', function(response){
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
        catObj.cb = getMovie;
      break;
      case 2:
        catObj.theCategory = "Books";
        catObj.theClass = "list-group-item-info";
        catObj.cb = getBook;
      break;
      case 3:
        catObj.theCategory = "Food";
        catObj.theClass = "list-group-item-warning";
        catObj.cb = getRestaurant;
      break;
      case 4:
        catObj.theCategory = "Products";
        catObj.theClass = "list-group-item-success";
        catObj.cb = getProduct;
        break;
      default:
        catObj.theCategory = "Uncategorized";
        catObj.theClass = "Uncategorized";
        catObj.cb = function(query, cb){
          return cb("Uncategorized");
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
      "class" : "checkbox"
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
        }))
        .append($("<div/>", {
          "text": taskObj.task_name
        }),
        $("<button/>", {
       "type" : "button",
       "name" : taskObj.category_id + taskObj.task_name,
       "class" : "btn btn-primary modalToggle",
       "id" : taskObj.taskid,
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
      tasks.forEach(function(t) {
        t.category_id ? console.log('') : t.category_id = 0
        $taskElem = createTaskElement(t);
        $prevTask = $('#tasks li').first();
        $taskElem.insertBefore($prevTask);
      })
    ):(0)
  }

  // View rendering for categories with GET to DB
  function createCategorieElement (categoryObj) {
    $category = ($("<div/>", {
      "class":"btn-group",
      "role":"group"
    }).append($("<button/>", {
        "href" : "#",
        "type" : "button",
        "class" : "btn btn-default"
      }).append(categoryObj.category_name)
    ));
    return $category;
  }
  function renderCategories(categories) {
    $('.categories').empty();
    categories.forEach(function(c){
      $catElem = createCategorieElement(c)
      $('.categories').append($catElem);
    });
    var activeElement = createCategorieElement({category_name: "Active"})
      $('.categories').append(activeElement);
  }


  $('ul#tasks').delegate('button.modalToggle', 'click',function (e){
    var theCallingElement = $(this).closest("li");
    $cat = Number(e.target.name.slice(0,1));
    var taskId = e.target.id;
    $query = e.target.name.slice(1) + "";
    var theCategory = whatCategory($cat);
    theCategory.cb($query, function (res){
      $('.modal-title').text(res.title);
      $('.modal-category').text(theCategory.theCategory);
      $('.modal-body > h5').text(res.description);
      $('.modal-body > .rating').text("Rating: "+res.rating);

      if(res.realLink){
        $('.modal-body > .theLink').html("<a href = " + res.realLink + " > Click me to find out more! </a>");
      } else {
        $('.modal-body > .theLink').empty();
      }
      if(res.imgLink){
        $('.modal-body > .image').html("<img src= " + res.imgLink + " style='width: 80px; height: 80px'>");
      } else {
         $('.modal-body > .image').empty();
      }
      $('.modal-footer > .edit').on('click', function(e){
        $('.modal-category').html('<input id="categoryInput" name="category" type="text"  class="form-control" placeholder="' + whatCategory($cat).theCategory + '" autofocus>');
        $('#categoryInput').on('keydown', function(e){
          if(e.keyCode === 13){
            var categoryid;
             switch(e.target.value){
              case "Movies":
              categoryid = 1;
              break;
              case "Books":
              categoryid = 2;
              break;
              case "Food":
              categoryid = 3;
              break;
              case "Products":
              categoryid = 4;
              break;
             }
          var data = "taskid=" + taskId + "&category_id=" + categoryid;
          var theOldClass = theCategory.theClass
          var theNewClass = whatCategory(categoryid).theClass;
          upDbItems('tasks/edit/category', data, function(){return;} )
          $('#myModal').modal('hide');
          theCallingElement.addClass(theNewClass).removeClass(theOldClass)
        }
      })
    });

      $('#myModal').modal({show: true});
    });
  });

  $("#newTask").keydown(function(e) {
    if(e.keyCode === 13){
      e.preventDefault();
      $task = $("#newTask").serialize();
      upDbItems('/tasks/new', $task, function()  {
        $("#newTask input").val("");
        loadDbItems('/tasks', renderTasks);
      });
    }
  });
  $(".categories").on('click', function(e) {
    var category = e.target.innerHTML;
    loadDbItems("/tasks/" + category, renderTasks)
  });
  $('#login-submit').on('click', function(e)  {
    e.preventDefault();
    data = $('#login-form').serialize();
    upDbItems('/users/login',data, function (response) {
      isLogged(JSON.parse(response));
    });
  })
  $('#register-submit').on('click', function(e) {
    e.preventDefault();
    data = $('#register-form').serialize();
    upDbItems('/users/register',data ,function(response){
      isLogged(JSON.parse(response));
      $('#bs-example-navbar-collapse-1').collapse('toggle');
    });
  })
  $('#logout-nav-btn').on('click', function(){
    upDbItems('/users/logout', "logmeoutplz", function(){
      $('.main').hide();
      $('.login').show();
      isLogged(false);
    })
  })
  $('ul#tasks').delegate('li>div>label>input.task-checkbox', 'click', function(e)  {
    $task = {
      taskid : e.target.id,
      isComplete : e.target.checked
    };
    upDbItems('/tasks/edit', $task, function() {
      e.target.value
    })
  });
  $('ul#tasks').delegate('button.modalToggle', 'click', function(e) {
    $cat = Number(e.target.name.slice(0,1));
    $query = e.target.name.slice(1)+"";
    whatCategory($cat).cb($query,function(res) {
      $('.modal-title').text(res.title);
      $('.modal-category').text(whatCategory($cat).theCategory);
      $('.modal-body > h5').text(res.description);
      $('.modal-body > .rating').text("Rating: "+res.rating);

      if(res.realLink){
        $('.modal-body > .theLink').html("<a href = " + res.realLink + " > Click me to find out more! </a>");
      } else {
        $('.modal-body > .theLink').empty();
      }
      if(res.imgLink){
        $('.modal-body > .image').html("<img src= " + res.imgLink + " style='width: 80px; height: 80px'>");
      } else {
         $('.modal-body > .image').empty();
      }

      $('#myModal').modal({show: true});
    });
  });
  $(".navbar-brand").on('click', function(e){
    loadDbItems("/tasks/", renderTasks)
  })



function standardInformationBuilder(description, imgLink, rating, title, realLink){
  var info = {
    title: title,
    rating: rating,
    description: description,
    imgLink: imgLink,
    realLink: realLink
  }
  return info;
}

function getBook(query,cb){
  var bookInfo = "";
  var url = "https://www.googleapis.com/books/v1/volumes?";


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
      var theBook = books.items[0].volumeInfo;
      $('.modal-content').addClass('panel-info');
      bookInfo =  standardInformationBuilder(theBook.description,(theBook.imageLinks && ""), theBook.averageRating, theBook.title, theBook.previewLink )
      return cb(bookInfo);
  });
}

function getMovie(query,cb){

  var apiKey =  "?api_key=70c09d70d8283747ace652dfc047b3cf";
  var url = "https://api.themoviedb.org/3/";
  var search = 'search/multi';
  var movie = 'movie/';
  var language = '&language=en-US';
  var theQuery = getMovieName(query)

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
      var movieId = moviesOrTvShows.results[0].id;
      // movies.media to know if tv show or movie -- implement later
      $.ajax(createSettings(movie, "",  movieId))
      .done(function(movie){
        var movieInfo = standardInformationBuilder(movie.overview, "", movie.vote_average, movie.title, movie.homepage );
        $('.modal-content').addClass('panel-danger');
        return cb(movieInfo);
      })
    });
  }

function getRestaurant(query,cb){
  var searchUrl = "https://api.yelp.com/v3/businesses/search?";
  var businessUrl = "https://api.yelp.com/v3/businesses/"
  var search = "term=";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://cors-anywhere.herokuapp.com/' + makeQuery(query),
    "method": "GET",
    "headers": {
      "authorization": "Bearer o9NWDKOyt5OThXDjNeFb_1HNfrhxHycMgYuePjJUe66Bk05Zfy2m5A4_d9raPBh-Wzc-cyy60fe-80Gjk1hxl1dHp3wo8IuKtt9XNW8CyG9wQDDuN-PcbjaHdA2WWHYx",
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
      "authorization": "Bearer o9NWDKOyt5OThXDjNeFb_1HNfrhxHycMgYuePjJUe66Bk05Zfy2m5A4_d9raPBh-Wzc-cyy60fe-80Gjk1hxl1dHp3wo8IuKtt9XNW8CyG9wQDDuN-PcbjaHdA2WWHYx",
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

    var relevantRestaurantId = restaurants.businesses[0].id;
    $.ajax(createSettings(businessUrl, relevantRestaurantId, "")).done(function (resto) {
      var restoInfo = standardInformationBuilder(resto.phone, resto.image_url, resto.rating, resto.name, resto.url)
      $('.modal-content').addClass('panel-warning');
      return cb(restoInfo);
    });
  });
  }

  function getProduct(query,cb){
    var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=PatrickG-LHLtodo-PRD-4cd409a3e-159a43e4&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD"
    var endUrl = "&paginationInput.entriesPerPage=1"

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

    $('.modal-content').addClass('panel-success');
    $.ajax(createSettings(getProductName(query))).done(function (products) {
      var theProducts = JSON.parse(products);
      var resultInfo = theProducts.findItemsByKeywordsResponse[0].searchResult[0].item[0];
      var theResults = standardInformationBuilder((resultInfo.subtitle || resultInfo.title[0]) , (resultInfo.galleryURL[0] || ""), resultInfo.condition[0].conditionDisplayName[0], resultInfo.title[0], resultInfo.viewItemURL[0])
      return cb(theResults);
    });
  }

});
