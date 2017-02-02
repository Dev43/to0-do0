$(() => {
  $("#taskInput").focus();

  loadTasks(renderTasks);

  function createTaskElement (taskObj) {
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
    $(".task_label")
    $("#tasks").append($task);
    return $task;
  }

  function renderTasks(task) {
    $('#tasks').empty();
    task.forEach(function(t){
      console.log(t);
      $taskElem = createTaskElement(t);
      $prevTask = $('#tasks li').first();
      $taskElem.insertBefore($prevTask);
    });
  }

  function loadTasks(cb) {
    $.ajax({
      url: '/tasks',
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
          loadTasks(renderTasks);
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
