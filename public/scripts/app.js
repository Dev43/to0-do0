$(() => {
  // Helper functions for getting and posting data to DB
  function upDbItems(route, data, cb) {
    $.ajax({
      url: route,
      data: data,
      method: 'POST',
      success: cb
    });
  }
  function loadDbItems(route, cb) {
    $.ajax({
      url: route,
      method: 'GET',
      success: cb
    });
  }

  // Empty arrays and objects for logged out usage of app
  $arr = [];
  $user = {};

  // Show and hide page items according to if user is logged in or not
  function isLogged(usr){
    $user = usr;
    $('.main').hide();
    // debugger;
    if($user.loggedin){
      console.log('loggedin');
      loadDbItems('/categories', renderCategories);
      loadDbItems('/tasks/active', renderTasks);
      $('#newTask').show();
      $("#taskInput").focus();
      $('.tasks').show();
      $('.logout-btn').show();
      $('.register-btn').hide();
      $('.login-btn').hide();
    }else{
      console.log('loggedout');
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
    console.log($user);
    $('body').show(1000);
    isLogged($user);
  });

  $('#login-submit').on('click', (e) => {
    e.preventDefault();
    data = $('#login-form').serialize();
    console.log(data);
    upDbItems('/users/login',data,(response)=>{
      // $user = JSON.parse(response);
      isLogged(JSON.parse(response));
    });
  })
  $('#register-submit').on('click', (e) => {
    e.preventDefault();
    data = $('#register-form').serialize();
    upDbItems('/users/register',data ,(response)=>{
      console.log(response);
      // $.when(response).done( () => {
      //   $user = response;
      //   console.log($user);
      //   $('.main').hide();
      isLogged(JSON.parse(response));
      // })
      $('#bs-example-navbar-collapse-1').collapse('toggle');
    });
  })
  $('.logout-btn').on('click', ()=>{
    upDbItems('/users/logout', "logmeoutplz", () => {
      $('.main').hide();
      $('.login').show();
      isLogged(false);
    })
  })
  $('.logout-btn').on('click', ()=>{
    upDbItems('/users/logout', "logmeoutplz", () => {
      $('.main').hide();
      $('.login').show();
      isLogged(false);
    })
  })

  // View rendering for tasks
  function createTaskElement(taskObj) {
    var theClass = "";
    switch(taskObj.category_id){
      case 1:
        theClass = "list-group-item-danger";
      break;
      case 2:
        theClass = "list-group-item-info";
      break;
      case 3:
        theClass = "list-group-item-warning"
      break;
      case 4:
        theClass = "list-group-item-success";
        break;
      default:
        theClass = "active";
    }

    $task = $("<li/>", {
      "class" : "list-group-item " + theClass,
    })
    .append($("<div/>", {
      "class" : "checkbox",

    })
      .append($("<label/>", {
        "class" : "task_label"
      })
        .append($("<input/>", {
          "type": "checkbox",
          "id": taskObj.taskid,
          "data-categoryId" : taskObj.category_id,
          "value": ""
          })
        )
        .append(taskObj.task_name)
      )
    );
    $("#tasks").append($task);
    return $task;
  }
  function renderTasks(tasks) {
    // debugger;
    $('#tasks').empty();
    tasks ? (
      tasks.forEach((t) => {
        console.log(t);
        $taskElem = createTaskElement(t);
        $prevTask = $('#tasks li').first();
        $taskElem.insertBefore($prevTask);
      })
    ):(0)
  }

// View rendering for categories
  function createCategorieElement (categorieObj) {
    $categorie = $("<li/>", {
      "role":"present"
    })
      .append($("<a/>", {
        "href" : "#"
      }).append(categorieObj.category_name)
    );
    $(".categories").append($categorie);
    return $categorie;
  }
  function renderCategories(categories) {
    $('.categories').empty();
    categories.forEach(function(c){
      console.log(c);
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
});
