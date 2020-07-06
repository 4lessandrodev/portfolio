var express = require('express');
var router = express.Router();
const projectController = require('./../controllers/ProjectController');
const likeController = require('./../controllers/LikeController');
const messageController = require('./../controllers/MessageController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfólio' });
});

router.get('/project/:id', function (req, res, next) {
  res.render('project', { title: 'Projeto X' });
});

router.get('/projects', projectController.index);

router.post('/projects', projectController.store);

router.patch('/projects/:id', projectController.update);

router.patch('/likes/:id', likeController.store);

router.post('/message', messageController.store);

module.exports = router;
