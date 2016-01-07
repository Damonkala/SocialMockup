'use strict'

var express = require('express')
var router = express.Router();

var User = require('../models/User');

router.get('/list', function(req, res){
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users)
  })
})
router.get('/page/:username', function(req, res){
  User.findOne({'username' : req.params.username}, function(err, user) {
    res.status(err ? 400 : 200).send(err || user)
  })
})


module.exports = router;