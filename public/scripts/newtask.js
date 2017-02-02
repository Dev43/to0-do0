function newTask () {
  console.log("newTask.js");
  $task = $("#newTask").serialize();
  $.ajax({
    url: "/api/tasks",
    data: $task,
    method: "POST",
    success: () => {
      $("input").val("");
      loadTasks(renderTasks);
    }
  })
}
