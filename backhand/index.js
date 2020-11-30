var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const passportJWT = require('passport-jwt');
var CryptoJS = require("crypto-js");
var PassKey = "my-secret-key@123-velava@123-djcorp@@123";

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const gm = require('gm').subClass({
  imageMagick: true
});


let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'Velava';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({
    id: jwt_payload.id,
    userType: jwt_payload.userType
  });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

var app = express();



app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type,X-Requested-With, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


/// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json({
  limit: '5mb'
}));
app.use(express.urlencoded({
  limit: '5mb',
  extended: true,
  parameterLimit: 50000000
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3001

app.listen(PORT, function () {
  console.log('listening on * ' + PORT);
});



const Project_api = require('./lab/project');



app.post('/api/ProjectAdd', function (req, res) {
  var bytes = CryptoJS.AES.decrypt(req.body.data, PassKey);
  if (bytes.toString(CryptoJS.enc.Utf8)) {
    var requestData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    console.log("flase")
  }
  Project_api.add(requestData).then(function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  }, function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  })
});

app.post('/api/ProjectGet', function (req, res) {
  var bytes = CryptoJS.AES.decrypt(req.body.data, PassKey);
  if (bytes.toString(CryptoJS.enc.Utf8)) {
    var requestData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    console.log("flase")
  }
  Project_api.get(requestData).then(function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  }, function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  })
});

app.post('/api/getfilter', function (req, res) {
  var bytes = CryptoJS.AES.decrypt(req.body.data, PassKey);
  if (bytes.toString(CryptoJS.enc.Utf8)) {
    var requestData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    console.log("flase")
  }
  Project_api.getfilter(requestData).then(function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  }, function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  })
});

app.post('/api/ProjectSite', function (req, res) {
  var bytes = CryptoJS.AES.decrypt(req.body.data, PassKey);
  if (bytes.toString(CryptoJS.enc.Utf8)) {
    var requestData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    console.log("flase")
  }
  Project_api.ProjectSite(requestData).then(function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  }, function (result) {
    res.send(CryptoJS.AES.encrypt(JSON.stringify(result), PassKey).toString());
  })
});



module.exports = app;