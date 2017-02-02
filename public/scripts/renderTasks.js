function renderTasks (task) {
  $("#tasks").empty();
  console.log('renderTasks.js');
  task.forEach(function(t){
    console.log(t);
    $taskElem = createTaskElement(t);
    $("body").append($taskElem);
  });
}
