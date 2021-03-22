const usersController = require('../Controllers/usersController')
const express = require('express');
const router = express.Router();

//my middleware
function consoleLogHello (req, res, next)
{
    console.log("User routes!");
    next();
}
router.use(consoleLogHello);
//get
router.get('/', usersController.index);
//gets all users
router.get('/getAll', usersController.sendMainPage);
//post
router.post('/user', usersController.postUser);
//set

//delete

module.exports = router;