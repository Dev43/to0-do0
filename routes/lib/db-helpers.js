

module.exports = function makeDbHelpers(knex){

  return {

    newDbInput: function(tableName, rowToInsert ){ // made it so it can be a new user OR a new task
      return knex(tableName)
        .insert(rowToInsert)
        .then(() => console.log('Add Input'))

    },

    editTask: function(userid, taskId, updateObject){ // same thing here, we need to craft a good object on the server-side ADD TASK Id

      knex('tasks')
      .where('user_id', userid)
      .andWhere('tasks.taskid', taskId)
      .update(updateObject)
      .then( (result) => {
        if(result === 0){
          return console.log('Not Found')
        }
        console.log('Updated Task')})
    },

     editUser: function(userid, updateObject){ // same thing here, we need to craft a good object on the server-side ADD TASK Id
      knex('users')
      .where('userid', userid)
      .update(updateObject)
      .then(() => console.log('Updated User'));
    },


    // delete input (like user) might have to be done with a cascade. Also, why would we want them to be able to delete?
    // update will be able to modify what is needed
    // delet
    showAllTasksFromUser: function(userid){ // show all tasks from beginning
      return  knex('tasks')
      .where(`user_id`, userid)
      .then((results) => {
        console.log(results);
        return results;})
    },

    showAllActiveTasksFromUser: function(userid){
      return knex('tasks')
      .where(`user_id`, userid)
      .andWhere('isComplete', true)
      .then((results) => {
        console.log(results);
        return results;})
    },

    isUsernameInUsers: function(username){
      return knex('users')
      .where('username', username)
      .then((results) => {
        if(results.length === 0){
          return results;
        }
        throw "error";
      })
      .catch((error) => {throw error})

    },

    showAllFromCategory: function(userid, category){
      return knex
      .select('tasks.task_name')
      .from('tasks')
      .innerJoin('users', 'users.userid', 'tasks.user_id')
      .innerJoin('categories', 'categories.categoryid', 'tasks.category_id')
      .where('category_name', category)
      .andWhere('userid', userid)
      .then((results) => {
        console.log(results);
        return results;})
    }
  }
}
