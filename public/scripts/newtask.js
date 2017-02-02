function newTask () {
  console.log("newTask.js");
  $.ajax({
    url: "/api/tasks",
    data: $task,
    method: "POST",
    success: () => {
      $("textarea").val("");
      loadTasks(renderTasks);
    }
  })
}
