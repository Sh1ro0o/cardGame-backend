const path = require('path');
const User = require('../Models/userModel');

const users = [
    {
        id: 1,
        name: 'Jhonny'
    },
    {
        id: 2,
        name: 'Nathaniel'
    },
    {
        id: 3,
        name: 'Boxar'
    }
]

module.exports = {
    index : function (req, res) {
        console.log(path.join(__dirname, '..', 'Views', 'index.html'));
        res.sendFile(path.join(__dirname, '..', 'Views', 'index.html'));
    },

    sendUser : function (req, res) {
        let username = req.body.username;
        let password = req.body.password;

        console.log(req.body.username);
        console.log(req.body.password);

        User.findOne({username: username, password: password}, (err, user) => {
            if(err) {
                console.log(err);
                console.log("500");
                return res.status(500).send();
            }
            if(!user) {
                console.log("error 404 user not found!")
                return res.status(404).send();
            }
            console.log(user);
            return res.json(user);
        });
    },
    
    postUser : function (req, res) {
        console.log(req.body);
        console.log(req.body.email);
        console.log(req.body.username);
        console.log(req.body.password);
        if(req.body.username !== undefined && req.body.password !== undefined && req.body.email !== undefined) {
            User.create({"username" : req.body.username, "password" : req.body.password, "email" : req.body.email})
            //.then waits so the ninjas are saved and then sends us the saved object with the parameter (user) in this case
            .then((user) => {
                //it's good practice to send back the data that user has sent to use to notify them,
                //that everything is okay and that the user is saved
                res.send({
                    type: 'POST',
                    user
                });
            });
        }
        else {
            res.send({
                error: "Havent recieved username, password or email"
            });
        }
    }
}
