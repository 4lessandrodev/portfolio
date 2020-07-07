var express = require('express');
var router = express.Router();
const projectController = require('./../controllers/ProjectController');
const likeController = require('./../controllers/LikeController');
const messageController = require('./../controllers/MessageController');
const { check, body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', projectController.index);

router.get('/index', projectController.index);

router.get('/projects/:_id', projectController.show);

router.get('/api/projects/:_id', projectController.view);

router.get('/api/projects', projectController.list);

router.post('/api/projects', [
  check('title', 'Título do projeto').isLength({min:3}),
  check('description', 'Informe um breve resumo do projeto').isLength({min:50}),
  check('urlVideo', 'Informe um url do vídeo de apresentação do projeto').isLength({min:10}),
  check('images', 'Informe o link das imagens do projeto').isLength({min:10}),
], projectController.store);

router.put('/api/projects/:_id', [
  check('title', 'Título do projeto').isLength({ min: 3 }),
  check('description', 'Informe um breve resumo do projeto').isLength({ min: 50 }),
  check('urlVideo', 'Informe um url do vídeo de apresentação do projeto').isLength({ min: 10 }),
  check('images', 'Informe o link das imagens do projeto').isLength({ min: 10 }),
], projectController.update);

router.patch('/api/likes/:_id', likeController.store);

router.post('/api/messages', [
  check('email','Informe um email válido').isEmail(),
  check('name', 'Informe o seu nome').isLength({ min: 3 }),
  check('message', 'Mensagem deve ter no mínomo 10 caracteres').isLength({ min: 10 }),
  check('subject', 'Assunto deve ter no mínimo 3 caracteres').isLength({min:3})
], messageController.store);


module.exports = router;
