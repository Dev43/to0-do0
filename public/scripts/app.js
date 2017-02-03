$(() => {
  loadDbItems('/users',(response)=>{
    response === {} ? isLogged(false) : isLogged(true)
  })
  function isLogged(user){
    user ? (
      $('.register-btn').css("display","none"),
      $('.login-btn').css("display","none")
    ):(
      $('.logout-btn').css("display","none"),
      loadDbItems('/tasks', renderTasks),
      $('.navbar-brand').on('click', () => {
        $('.tasks').toggle();
        if($('.login').is(':visible')){
          $('.login').toggle()
        }
        if($('.register').is(':visible')){
          $('.register').toggle()
        }
      }),
      $('.login-btn').on('click', () => {
        $('.login').toggle();
        if($('.tasks').is(':visible')){
          $('.tasks').toggle()
        }
        if($('.register').is(':visible')){
          $('.register').toggle()
        }
      }),
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

  function loadDbItems(table, cb) {
    $.ajax({
      url: table,
      method: 'GET',
      success: cb
    });
  }

  function login(data, cb) {
    $.ajax({
      url: '/users/login',
      data: {
        username: data.username,
        password: data.password
      },
      method: "POST",
      success: cb
    })
  }
// console.log($('#login-submit'));
  $('#login-form').on('sumbit', '#login-submit', function(e) {
    console.log('click');
    data = {
      username: $('#username').serialize(),
      password: $('#password').serialize(),
    }
    login(data,(response)=>{
      $user = JSON.parse(response);
      console.log($user);
      isLogged($user);
      loadDbItems('/tasks/active', renderTasks);
    });
  })

  $('body').show(1000);
  $("#taskInput").focus();
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
    $('#tasks').empty();
    tasks ?
      (tasks.forEach((t) => {
        console.log(t);
        $taskElem = createTaskElement(t);
        $prevTask = $('#tasks li').first();
        $taskElem.insertBefore($prevTask);
      })
    ):(
      console.log('no tasks')
    )
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

  function upDbItems(table, data, cb) {
    $.ajax({
      url: table,
      data: data,
      method: 'POST',
      success: cb
    });
  }

  // login('/users/login');
  // logout('/users/login')
  // register('/users/login')

  $("#newTask").keydown(function(e) {
    if(e.keyCode === 13){
      e.preventDefault();
      console.log($("#newTask").serialize());
      $task = $("#newTask").serialize();
      $.ajax({
        url: "/tasks/new",
        data: $task,
        method: "POST",
        success: () => {
          $("#newTask input").val("");
          console.log('new task created: '+ $task);
          loadDbItems('/tasks', renderTasks);
        }
      })
    }
  });
});
