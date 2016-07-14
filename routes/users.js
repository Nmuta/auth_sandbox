var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var bcrypt = require('bcrypt')


function Users(){
  return knex('users');
}

router.post('/', function(req, res, next) {
  var cryptic = bcrypt.hashSync(req.body.password, 8);
  Users().insert({email: req.body.email, password: cryptic}).then(function(val){
    res.cookie('user', req.body.email,{signed: true})
    res.redirect("/tickets");
  });
});

router.post('/login', function(req, res, next) {
    Users().where({email: req.body.email, password: req.body.password}).first().then(function(found){
       if (found){
         found_user_password = found.rows[0].password;
         if(bcrypt(compareSync(req.body.password, found_user_password))){
           res.cookie("user", req.body.email, {signed: true})
         } else {
           res.redirect('/no_auth');
         }
         res.redirect("/tickets");
       } else {
         res.redirect("/no_auth");
       }
    })
});

router.get('/', function(req, res, next) {
  Users.select().then(function(users){
    res.render("users/index", {users: users});
  });
});

module.exports = router;
