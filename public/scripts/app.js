$(() => {
  function createTaskElement (taskObj) {
    $task = $("<p>", {"class": "task", "text": taskObj.task_name});
    console.log('createTaskElement');
    return $task;
  }
  function renderTasks (task) {
    $("#tasks").empty();
    console.log('renderTasks');
    task.forEach(function(t){
      console.log(t);
      $taskElem = createTaskElement(t);
      $("body").append($taskElem);
    });
  }
  function loadTasks (cb) {
    console.log('loadTasks');
    $.ajax({
      url: '/api/tasks',
      method: 'GET',
      success: cb
    });
  }
  function newTask () {
    console.log("newTask");
    $task = $("#newTask").serialize();
    $.ajax({
      url: "/api/tasks",
      data: $task,
      method: "POST",
      success: () => {
        $("input").val("");
        console.log('new task created');
        loadTasks(renderTasks);
      }
    })
  }
  $("#newTask").keydown(function(e) {
    if(e.keyCode === 13){
      e.preventDefault();
      newTask();
    }
  });
  loadTasks(renderTasks);
  console.log('app.js');
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  $.ajax({
    method: "GET",
    url: "/api/tasks"
  }).done((tasks) => {
    for(task of tasks) {
      $("<div>").text(tasks.task_name).appendTo($("body"));
    }
  });
});
