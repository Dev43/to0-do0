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
      loadDbItems('/tasks', renderTasks);
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

  // View rendering for tasks with GET to DB
  function createTaskElement(taskObj) {
    $task = $("<li/>", {
      "class" : "list-group-item"
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
          })
        )
        .append(taskObj.task_name)
      )
    )
    .append($("<button/>", {
       "type" : "button",
       "name" : "modalToggle",
       "class" : "btn btn-primary modalToggle",
       "data-toggle" : "modal",
       "data-target" : "#myModal",
       "text" : "More info"
    }))
    $("#tasks").append($task);
    return $task;
  }
  function renderTasks(tasks) {
    // debugger;
    $('#tasks').empty();
    tasks ? (
      tasks.forEach((t) => {
        // console.log(t);
        $taskElem = createTaskElement(t);
        $prevTask = $('#tasks li').first();
        $taskElem.insertBefore($prevTask);
      })
    ):(0)
  }

  // View rendering for categories with GET to DB
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
      // console.log(c);
      $catElem = createCategorieElement(c)
      $('.categories').append($catElem);
    });
  }

  $("#newTask").keydown(function(e) {
    if(e.keyCode === 13){
      e.preventDefault();
      $task = $("#newTask").serialize();
      console.log($task);
      upDbItems('/tasks/new', $task, () => {
        $("#newTask input").val("");
        loadDbItems('/tasks', renderTasks);
      });
    }
  });
  $('#login-submit').on('click', (e) => {
    e.preventDefault();
    data = $('#login-form').serialize();
    console.log(data);
    upDbItems('/users/login',data,(response)=>{
      console.log(response);
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
  $('#logout-nav-btn').on('click', ()=>{
    upDbItems('/users/logout', "logmeoutplz", () => {
      $('.main').hide();
      $('.login').show();
      isLogged(false);
    })
  })
  $('ul#tasks').delegate('li>div', 'click', (e) => {
    console.log(e.target);
    $task = {
      taskid : e.target.id,
      isComplete : e.target.checked
    };
    console.log($task);
    upDbItems('/tasks/edit', $task, () => {
      e.target.value
    })
  })
});
