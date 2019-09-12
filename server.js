//stackoverflow.com/questions/50910305/how-run-in-same-port-angular-and-node-js-express
//Install express server
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const expressSanitizer = require('express-sanitizer');
const app = express();
var loggedIn = false;

function logIn() {
    loggedIn = true;
}

function logOut() {
    loggedIn = false;
}

function isLoggedIn() {
    return loggedIn;
}

app.use(cors(/*{
    origin: [
        "http://localhost:4200"
    ], credentials: true
}*/));
var flash = require('connect-flash');
var session = require('express-session');
const port = 8080;
var sess;

//---auth
//const expressJwt = require('express-jwt');
//const config = { secret: 'bouncemna' }

//user service
/*
const jwt = require('jsonwebtoken');

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate'
        ]
    });
}
*/

//------------------security----------------------------
const bcrypt = require('bcrypt');

/* prolly not needed
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
*/

/* prolly not needed
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}*/





//------------------- end of security -------------------------


//register
var cryptr = require('cryptr');
/*
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tryl',
    password: 'tryl',
    database: 'Bounce'
});
*/

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
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
app.use(expressSanitizer());
app.use(flash());
app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        secure: false,
    }
}))


app.post('/contact', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //next();

    console.dir("calling contact");
    if (isLoggedIn()) {
        var userid = sess.userid;
        connection.query('SELECT * FROM bounce.contacts WHERE userid = ?', [userid], function (error, results, fields) {
            if (error) {
                console.dir("query error");
                res.json({
                    status: false,
                    message: 'there are some error with query'
                })
            }

            else {
                var objs = [];
                for (var i = 0; i < results.length; i++) {
                    objs.push({
                        firstname: results[i].firstname,
                        lastname: results[i].lastname
                    });
                }
                if (results.length > 0) {
                    res.send(JSON.stringify(objs));
                } else {
                    res.end();
                }
            }
        });
    } else {
        res.redirect('/login')
    }

})

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
            console.log("db post alertpartner success");
            res.status(200).send({ "message": "data received" });
        }
    })
})

app.get('/alertpartners', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

    /*
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }*/
})

app.post('/register', function (req, res) { //validate then sanitize
    //if (user) return res.status(400).send("User already registered.");
    let hash = bcrypt.hashSync(req.sanitize(req.body.password), 10);

    var registration = {
        userid: req.sanitize(req.body.username),
        firstname: req.sanitize(req.body.firstname),
        lastname: req.sanitize(req.body.lastname),
        gender: req.sanitize(req.body.gender),
        email: req.sanitize(req.body.email),
        phone: req.sanitize(req.body.phone),
        hash: hash
    }

    console.dir("rego:");
    console.dir(registration);

    connection.query('INSERT INTO bounce.account SET ?', registration, function (err, result) {
        if (err) {
            req.flash('error', err)
            console.log(err);
            // render to views/user/add.ejs
            //res.render('alert-partners', {
            //  title: 'Add New Customer',
            //name: user.name,
            //email: user.email
            //})
        } else {
            console.log("db post register success");
            res.status(200).send({ "message": "data received" });
        }
    })
})

// Add Contact Form
app.post('/contactform', function (req, res) { //validate then sanitize
    var contact = {
        firstName: req.sanitize(req.body.firstname),
        lastName: req.sanitize(req.body.lastname),
        gender: req.sanitize(req.body.gender),
        phoneNumber: req.sanitize(req.body.phone),
        emailAddress: req.sanitize(req.body.email),
        notes: req.sanitize(req.body.comment),
        rating: req.sanitize(req.body.rating),
        userid: sess.userid
    }

    console.dir("session userid:");
    console.dir(sess.userid);

    connection.query('INSERT INTO bounce.contacts SET ?', contact, function (err, result) {
        if (err) {
            req.flash('error', err)
            console.log(err);

        } else {
            console.log("db post register success");
            res.status(200).send({ "message": "data received" });
        }
    })
})
// Delete Contact Form
app.post('/deletecontact', function (req, res) { //validate then sanitize
    var deleteID_list = req.body;
    console.dir("delete contact:");
    console.dir(deleteID_list);

    connection.query('DELETE FROM bounce.contacts WHERE (contactID) IN (?)', [deleteID_list], function (err, result) {
        if (err) {
            req.flash('error', err)
            console.log(err);

        } else {
            console.log("db post register success");
            res.status(200).send({ "message": "data received" });
        }
    })
})

// Add Activity Form
app.post('/addactivity', function (req, res) { //validate then sanitize
    var activity = {
        userID: req.sanitize(req.body.userid),
        actID: req.sanitize(req.body.actid),
        protectionID: req.sanitize(req.body.protid),
        datePerformed: req.sanitize(req.body.date),
        notes: req.sanitize(req.body.comment),
    }

    console.dir("activity:");
    console.dir(activity);

    connection.query('INSERT INTO bounce.activity SET ?', activity, function (err, result) {
        if (err) {
            req.flash('error', err)
            console.log(err);

        } else {
            console.log("db post register success");
            res.status(200).send({ "message": "data received" });
        }
    })
})

module.exports = app;
/*end of connection stuff*/

app.post('/login', function (req, res) { //validate then sanitize

    var userid = req.sanitize(req.body.name);
    var password = req.sanitize(req.body.password);
    console.dir("userid: " + userid + "password: " + password);

    connection.query('SELECT * FROM bounce.account WHERE userid = ?', [userid], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        }

        else {
            
            if (results.length > 0) {

                if (bcrypt.compareSync(password, results[0].hash)) {
                    sess = req.session;
                    sess.loggedin = true;
                    sess.userid = userid; 
                    req.session.save();
                    logIn();
                    console.dir("session.save userid:" + req.session.userid);
                    res.send();
                    /*
                    res.json({
                        status: true,
                        message: 'successfully authenticated'
                    })*/
                } else {
                    res.json({
                        status: false,
                        message: "userid and password does not match"
                    });
                }

            }
            else {
                res.json({
                    status: "loggedout",
                    message: "userid does not exist",
                    redirect: '/login'
                });
            }
        }
    });
})