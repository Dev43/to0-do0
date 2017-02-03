$(() => {
  $('body').show(1000);
  $("#taskInput").focus();
  loadDbItems('/categories', renderCategories);
  loadDbItems('/tasks', renderTasks);


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
    ).append($("<button/>", {
      "class":"btn btn-primary",
      "data-toggle": "modal",
      "data-target": "#"+taskObj.taskid+"Modal"
    }));
    $("#tasks").append($task);
    $("#tasks")
    return $task;
  }
  function createTaskModal(taskObj) {
    ('body').append($("<button/>", {
      "class":"btn btn-primary",
      "data-toggle": "modal",
      "data-target": "#"+taskObj.taskid+"Modal"
    }));
    $("#tasks").append($task);
    $("#tasks")
    return $task;
  }
  function renderTasks(tasks) {
    $('#tasks').empty();
    tasks.forEach(function(t){
      console.log(t);
      $taskElem = createTaskElement(t);
      $taskElem = createTaskModal(t);
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
