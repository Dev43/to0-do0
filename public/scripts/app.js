$(() => {
  $arr = [];
  $user = {};
  loadDbItems('/users/',(response)=>{
    $.when(response).done( () => {
      $user = JSON.parse(response);
      console.log($user);
      $('body').show(1000);
      isLogged($user.loggedin);
      }
    )
  });

  function isLogged(user){
    // debugger;
    console.log(user);
    user ? (
      loadDbItems('/tasks/active', renderTasks),
      $('.logout-btn').show(),
      $('.register-btn').css("display","none"),
      $('.login-btn').css("display","none")
    ):(
      $('.logout-btn').css("display","none"),
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
        $('.login').toggle();
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
  $('#login-form').submit( function(e) {
    e.preventDefault();
    $('#bs-example-navbar-collapse-1').collapse('toggle');
    data = {
      username: $('#username').serialize(),
      password: $('#password').serialize(),
    }
    upDbItems('/users/login',data,(response)=>{
      $user = JSON.parse(response);
      $('.tasks').toggle();
      $('.login').toggle();
      isLogged($user);
    });
  })
  $('.logout-btn').on('click', ()=>{
    upDbItems('/users/logout', "logmeoutplz", () => {
      $('.main').css('display','none');
      $('.login').show();
      isLogged(false);
    })
  })
  $('.login').css("display","none");
  $('.register').css("display","none");
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
    debugger;
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
