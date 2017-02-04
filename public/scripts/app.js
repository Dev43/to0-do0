$(() => {
  $arr = [];
  $user = {};
  loadDbItems('/users/',(response)=>{
    $.when(response).done( () => {
      $user = response;
      console.log($user);
      $('body').show(1000);
      isLogged($user.loggedin);
    })
  });

  function isLogged(user){
    // debugger;
    console.log(user);
    user ? (
      loadDbItems('/tasks/active', renderTasks),
      $('.logout-btn').show(),
      $('.register-btn').hide(),
      $('.login-btn').hide()
    ):(
      $('#newTask').hide(),
      $('.categories').hide(),
      $('.logout-btn').hide(),
      $('.login').show(),
      $('.navbar-brand').on('click', () => {
        $('.tasks').toggle();
        if($('.login').is(':visible')){
          $('.login').toggle()
        }
        if($('.register').is(':visible')){
          $('.register').toggle()
        }
      }),
      $('.login-btn').show(),
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
      }),
      $('.register-btn').show(),
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
    )
  }
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

  $('body').show(1000);
  $("#taskInput").focus();
  $('#login-form').submit( (e) => {
    e.preventDefault();
    $('#bs-example-navbar-collapse-1').collapse('toggle');
    data = {
      username: $('#username').serialize(),
      password: $('#password').serialize(),
    }
    upDbItems('/users/login',data,(response)=>{
      $user = JSON.parse(response);
      $('.tasks').toggle();
      if( $('.login').is(':visible') ){
        $('.login').toggle();
      }
      isLogged($user);
    });
  })
  $('#register-submit').on('click', (e) => {
    e.preventDefault();
    $('#bs-example-navbar-collapse-1').collapse('toggle');
    data = $('#register-form').serialize();
    upDbItems('/users/register',data,(response)=>{
      console.log(response);
      isLogged(response);
      $('.register').toggle();
      $('.tasks').toggle();
    });
  })
  $('.logout-btn').on('click', ()=>{
    upDbItems('/users/logout', "logmeoutplz", () => {
      $('.main').css('display','none');
      $('.login').show();
      isLogged(false);
    })
  })
  $('.login').hide();
  $('.register').hide();
  loadDbItems('/categories', renderCategories);

  // View rendering for tasks
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
          "type": "checkbox",
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
        $taskElem = createTaskElement(t),
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
