$(() => {
  $user = loadDbItems('/users',
    (user)=>{
      return JSON.parse(user);
    });

  $('body').show(1000);
  $("#taskInput").focus();
  $('.login').css("display","none");
  $('.register').css("display","none");

  $user ?
  (
    $('.register-btn').css("display","none"),
    $('.login-btn').css("display","none")
  ):
  (
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
    tasks.forEach(function(t){
      console.log(t);
      $taskElem = createTaskElement(t);
      $prevTask = $('#tasks li').first();
      $taskElem.insertBefore($prevTask);
    });
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

  function loadDbItems(table, cb) {
    $.ajax({
      url: table,
      method: 'GET',
      success: cb
    });
  }

  function login(table, cb) {
    $.ajax({
      url: table,
      data: {
        username: "adobe",
        password: "banansaa"
      },
      method: "POST",
      success: () => {
        console.log('credentials validated');
      }
    })
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
        url: "/tasks",
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

  $.ajax({
    method: "GET",
    url: "/tasks"
  }).done((tasks) => {
    for(task of tasks) {
    }
  });
});
