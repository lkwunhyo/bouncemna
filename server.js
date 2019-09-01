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

//------------------security----------------------------
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

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
}
//------------------- end of security -------------------------


//register
var cryptr = require('cryptr');


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
            console.log("db post alertpartner success");
            res.status(200).send({ "message": "data received" });
        }
    })
})

app.post('/register', function (req, res) { //validate then sanitize

    //console.log(req.body.password)
    var encryptedString = encrypt(req.sanitize(req.body.password));
    var encryptedData = encryptedString.encryptedData.toString();
    //console.log(decrypt(encryptedString));

    var registration = {
        userid: req.sanitize(req.body.username),
        firstname: req.sanitize(req.body.firstname),
        lastname: req.sanitize(req.body.lastname),
        gender: req.sanitize(req.body.gender),
        email: req.sanitize(req.body.email),
        password: encryptedData,
        phone: req.sanitize(req.body.phone)
    }

    console.dir("rego:");
    console.dir(registration);
    //console.log("alertpartners: " +)
    //console.log("req.diagnosis " + req.diagnosis);

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



/**Api to create article */
/*app.post('alertpartners', (req, res) => {
    articleService.createArticle(req.body, (data) => {
        res.send(data);
    });
});*/

module.exports = app;
/end of connection stuff*/

app.post('/login', function (req, res) { //validate then sanitize

    //console.log(req.body.password)
    //var decryptedString = decrypt(req.sanitize(req.body.password)).toString();
    //console.log(decrypt(encryptedString));

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
        console.dir("result[0] = " + results[0].password);
        console.dir("decrypt = " + decrypt(results[0].password)); // NEED THE IV
        /* else {
            
            if (results.length > 0) {
                decryptedString = decrypt(results[0].password).toString();
                if (password == decryptedString) {
                    res.json({
                        status: true,
                        message: 'successfully authenticated'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "userid and password does not match"
                    });
                }

            }
            else {
                res.json({
                    status: false,
                    message: "userid does not exist"
                });
            }
        } */
    });
})