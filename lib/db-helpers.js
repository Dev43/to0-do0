

module.exports = function makeDbHelpers(knex){

  return {

  newDbInput: function(tableName, rowToInsert ){ // made it so it can be a new user OR a new task
    knex(tableName)
    .insert(rowToInsert)
    .then(() => console.log('i did it!'));
  },

  editDbInput: function(userid, tableName, updateObject){ // same thing here, we need to craft a good object on the server-side
    let userKey = 'user_id';
    if(tableName === 'users'){
      userKey = 'userid';
    }

    knex(tableName)
    .where(`${userKey}`, userid)
    .update(updateObject)
    .then(() => console.log('i did it!'));
  },

  // delete input (like user) might have to be done with a cascade. Also, why would we want them to be able to delete?
  // update will be able to modify what is needed
  // delet
  showAllTasksFromUser:function(userid){ // show all tasks from beginning
    knex('tasks')
    .where(`user_id`, userid)
    .then((results) => {
      console.log(results);
      return results;})
  },

  showAllActiveTasksFromUser: function(userid){
    knex('tasks')
    .where(`user_id`, userid)
    .andWhere('isComplete', true)
    .then((results) => {
      console.log(results);
      return results;})
    }
  }
}

