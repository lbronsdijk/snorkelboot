// Define Node dependecies
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var async        = require('async');
var request      = require('request');
var xml2js       = require('xml2js');
var randomstring = require('randomstring');
var _            = require('lodash');

// Define db schema for game
var playerSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    phone: String,
    time: Number
});

// Define modals
var Players = mongoose.model('Players', playerSchema);

// Connect mongodb db and set tables
mongoose.connect('localhost');

// Set application bootstrap
var app = express();

// Set application port
app.set('port', process.env.PORT || 3000);
// Set logger (debug)
app.use(logger('dev'));
// Set parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Set static app directory
app.use(express.static(path.join(__dirname, 'public')));

// Get list of players
app.get('/api/players', function(req, res, next) {
    var query = Players.find().sort({'time': 'asc'});

    query.exec(function(err, players) {
        if (err) return next(err);
        res.send(players);
    });
});

// Post shows from TVDB
app.post('/api/players', function(req, res, next) {
    console.log(req);
    var user = new Players({
        _id: randomstring.generate({charset: 'numeric'}),
        name: req.body.name,
        phone: req.body.phone,
        time: req.body.time
    });
    user.save(function(err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(200);
    });
});

// Fix hashtag routes for HTML5 pushState 
app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});

// Global error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, { message: err.message });
});

// Start engines! Go go go!
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
