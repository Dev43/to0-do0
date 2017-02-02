function createTaskElement (taskObj) {
  $task = $("<p>", {"class": "task", "text": taskObj.task_name});
  console.log('createTaskElement');
  return $task;
}
