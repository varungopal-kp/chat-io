var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/users/getAll', userController.getAll);
router.get('/chats/getUserChat/:id', chatController.getUserChat);

module.exports = router;
