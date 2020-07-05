var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfólio' });
});

router.get('/project/:id', function (req, res, next) {
  res.render('project', { title: 'Projeto X' });
});

module.exports = router;
