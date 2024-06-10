var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/paketweb', function (req, res, next) {
  res.render("paketweb/index", { title: "Express" });
});


module.exports = router;
