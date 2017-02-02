$(() => {
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
