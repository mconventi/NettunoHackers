var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');

mongoose.connect('mongodb://192.168.0.22:27017/nettunoHackersdb');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

var port = 8080;

var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({message: 'Olè'});
})

router.route('/user')
    .post(function(req, res) {
            var user = new User({
                name: req.body.name,
                surname: req.body.surname,
                password: req.body.password,
                image: req.body.image,
                address: req.body.address,
                telephone: req.body.telephone,
                email: req.body.email
            });
    
            user.save(function(err) {
            if (err)
                res.send(err);
        
                res.json({ message: 'User successfully created.'});
            })
});
    
app.use('/api', router);

app.listen(port);
console.log('Server on port: ' + port);