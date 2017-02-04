

module.exports = function makeDbHelpers(knex){

  return {

    newDbInput: function(tableName, rowToInsert ){ // made it so it can be a new user OR a new task
      return knex(tableName)
        .insert(rowToInsert)
        .then(() => { console.log('Add Input'); return})

    },

    newUserInput: function(tableName, rowToInsert ){ // made it so it can be a new user OR a new task
      return knex('users')
        .insert(rowToInsert)
        .then(() => { console.log('Add Input'); return})

    },

    editTask: function(taskId, col, val){ // same thing here, we need to craft a good object on the server-side ADD TASK Id
      return
      knex('tasks')
      .where('tasks.taskid', taskId)
      .update(col, val)
      .then( (result) => {
        if(result === 0){
          console.log('Not Found');
          return 0;
        }
        console.log('Updated Task');
        return result;
      });
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
      .then((result) => {//console.log(result);
       return result})
      .catch((err) => {return err});
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
      .then((results) => {
        console.log(results);
        return results;})
    },

    getTaskFromUser : function(taskName, userid, isComplete){
     return knex('tasks')
      .where('task_name', taskName)
      .andWhere('user_id', userid)
      .andWhere('isComplete', true)
      .then((result) => {return result;});
    },

    isUsernameInUsers: function(username){
      return knex('users')
      .where('username', username)
      .then((results) => {
        if(results.length === 0){
          return ""; // then return the empty array
        }
        throw "Error, username already in Database"; // else it is already there, throw an error
      })
      .catch((error) => {console.log(error); return "Error: " + error;})

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
