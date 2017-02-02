function loadTasks (cb) {
  console.log('loadTasks.js');
  $.ajax({
    url: '/api/tasks',
    method: 'GET',
    success: cb
  });
}
