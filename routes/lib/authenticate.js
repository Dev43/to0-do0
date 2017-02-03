
module.exports = function (req, res){
  if(!req.session.user_id){
    return res.end("You are not logged in, please login");
  }
  return req.session.user_id;
}
