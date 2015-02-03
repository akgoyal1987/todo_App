var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

router.use(function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.send(403);
  }
});

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return res.json({success : false});
    res.json({success : true, todos : todos});
  });
});

router.post('/', function(req, res, next) {
  req.body.due_date = new Date(req.body.due_date);
  Todo.create(req.body, function (err, todo) {    
    if (err) return res.json({success : false});
    res.json({success : true, todo : todo});
  });
});

router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return res.json({success : false});
    res.json({success : true, todo : todo});
  });
});

router.put('/:id', function(req, res, next) {
  req.body.due_date = new Date(req.body.due_date);
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
    if (err) return res.json({success : false});
    res.json({success : true, todo : todo});
  });
});

router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, todo) {
    if (err) return res.json({success : false});
    res.json({success : true});
  });
});


module.exports = router;