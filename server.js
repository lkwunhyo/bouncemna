//stackoverflow.com/questions/50910305/how-run-in-same-port-angular-and-node-js-express
//Install express server
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const expressSanitizer = require('express-sanitizer');
const app = express();
var flash = require('connect-flash');
var session = require('express-session');
const cors = require('cors');
const port = 8080;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tryl',
    password: 'tryl',
    database: 'Bounce'
});
connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!:)  port: ' + port);
    }
});

/*app.get('/', function (req, res) {
    res.send('hello from server');
})*/

/*app.post('/alertpartners', function (req, res) {
    console.log(req.body);
    res.status(200).send({ "message": "Data received." });
})*/

// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>' -------------- src is the app name
app.use(express.static(__dirname + '/dist/bounce'));


app.get('*', function (req, res) {
    // Replace the '/dist/<to_your_project_name>/index.html'
    res.sendFile(path.join(__dirname + '/dist/bounce/index.html'));
});


//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

//middleware stuff?
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(expressSanitizer());
app.use(flash());
app.use(session({
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))




//app.get('/alertpartners')

//note to self, request is to receive data, response is for pushing data to browser
app.post('/alertpartners', function (req, res){ //validate then sanitize


    var alert = {
        diagnosis: req.sanitize(req.body.diagnosis),
        contact: req.sanitize(req.body.contacts),
        sendmessage: req.sanitize(req.body.message),
        anonymity: req.sanitize(req.body.anonymity),
        date: req.sanitize(req.body.date),
    }
    //console.log("req.body.diagnosis: " + req.body.get());
    console.dir("alert:");
    console.dir(alert);
    //console.log("alertpartners: " +)
    //console.log("req.diagnosis " + req.diagnosis);

    connection.query('INSERT INTO bounce.alertpartner SET ?', alert, function (err, result) {
        if (err) {
            req.flash('error', err)

            // render to views/user/add.ejs
            //res.render('alert-partners', {
              //  title: 'Add New Customer',
                //name: user.name,
                //email: user.email
            //})
        } else {
            console.log("db post success");
            res.status(200).send({ "message": "data received" });
        }
    })
})



/**Api to create article */
/*app.post('alertpartners', (req, res) => {
    articleService.createArticle(req.body, (data) => {
        res.send(data);
    });
});*/

module.exports = app;

/*connection stuff-----------------

const db = mysql.createConnection({
    host: "localhost",
    user: "tryl",
    password: "tryl",
	database: "Bounce"
});
module.exports = db;

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected! Port: " + port);
});

db.end(function(err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
global.db = db;
/end of connection stuff*/