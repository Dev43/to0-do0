

module.exports = function makeDbHelpers(knex){

  return {

    newDbInput: function(tableName, rowToInsert ){ // made it so it can be a new user OR a new task
      return knex(tableName)
        .insert(rowToInsert)
        .then(() => {  return console.log('Add Input');})

    },

    newUserInput: function(tableName, rowToInsert ){ // made it so it can be a new user OR a new task
      return knex('users')
        .insert(rowToInsert)
        .then(() => { return console.log('Add Input'); })

    },

    editTask: function(userid, taskId, updateObject){ // same thing here, we need to craft a good object on the server-side ADD TASK Id
      return knex('tasks')
      .where('user_id', userid)
      .andWhere('taskid', taskId)
      .update(updateObject)
      .catch((err) => {return "Error while editing: " + err})
      .then( (result) => {
        if(result === 0){
          return 'Not Found';
        }
        return console.log('Updated Task')});
    },

    editUser: function(userid, updateObject){ // same thing here, we need to craft a good object on the server-side ADD TASK Id
      return knex('users')
      .where('userid', userid)
      .update(updateObject)
      .then(() => { console.log('Updated User'); return});
    },


    getUser: function(column, value){
      return knex('users')
      .where(column, value)
      .then((result) => {
       return result;
      })
      .catch((err) => {return err});
    },

    getUserId: function(username){
      return knex
      .select('userid')
      .from('users')
      .where('username', username)
      .then((result) => {return result})
      .catch((err) => {return err});
    },


    // delete input (like user) might have to be done with a cascade. Also, why would we want them to be able to delete?
    // update will be able to modify what is needed
    // delet
    showAllTasksFromUser: function(userid){ // show all tasks from beginning
      return  knex('tasks')
      .where(`user_id`, userid)
      .then((results) => {
        return results;})
    },

    showAllActiveTasksFromUser: function(userid){
      return knex('tasks')
      .where(`user_id`, userid)
      .andWhere('isComplete', true)
      .then((results) => {return results;})
    },

    getTaskFromUser : function(taskName, userid, isComplete){
     return knex('tasks')
      .where('task_name', taskName)
      .andWhere('user_id', userid)
      .andWhere('isComplete', true)
      .then((result) => {return result;});
    },

    isUsernameInUsers: function(username){
      // maybe also check with the email
      return knex('users')
      .where('username', username)
      .then((results) => {
        if(results.length === 0){
          return ""; // then return the empty array
        }
        throw "Error, username already in Database"; // else it is already there, throw an error
      })
      .catch((error) => { return "Error: " + error;})

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
        return results;})
    }
  }
}
