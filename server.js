//Install express server
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
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


//app.get('/alertpartners')

//note to self, request is to receive data, response is for pushing data to browser
app.post('/alertpartners', function (req, res){


    /*var alert = {
        diagnosis: req.sanitize('diagnosis').escape().trim(),
        contact: req.sanitize('contacts').escape().trim(),
        sendmessage: req.sanitize('message').escape.trim(),
        anonymity: req.sanitize('anonymity').escape.trim(),
        date: req.sanitize('date').escape.trim(),
    }*/
    //console.log("req.body.diagnosis: " + req.body.get());
    console.dir(req);
    //console.log("alertpartners: " +)
    //console.log("req.diagnosis " + req.diagnosis);
    /*connection.query('INSERT INTO alertpartners SET ?', alert, function (err, result) {

        //if(err) throw err
        if (err) {
            req.flash('error', err)

            // render to views/user/add.ejs
            //res.render('alert-partners', {
              //  title: 'Add New Customer',
                //name: user.name,
                //email: user.email
            //})
        } else {
            console.log(req.body);
            res.status(200).send({ "message": "data received" });
        }
    })*/
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