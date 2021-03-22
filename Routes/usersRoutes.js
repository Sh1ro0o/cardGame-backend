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
//gets a certain user based on a unique username
//post
router.post('/register', usersController.postUser);
router.post('/login', usersController.sendUser);
//set

//delete

module.exports = router;