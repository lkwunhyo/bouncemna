//stackoverflow.com/questions/50910305/how-run-in-same-port-angular-and-node-js-express
//Install express server
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const expressSanitizer = require('express-sanitizer');
const app = express();

/*----------NODEMAILER--------*/
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bouncemna@gmail.com',
        pass: 'tryl1234'
    }
});


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

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tryl',
    password: 'tryl',
    database: 'bouncemna',
    dateStrings: 'date'
});

/*
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'Bounce'
});
*/

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
        connection.query('SELECT * FROM bouncemna.contact WHERE userid = ?', [userid], function (error, results, fields) {
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
                    //console.dir("/contact firstname" + results[i].firstName);
                    objs.push({
                        contactID: results[i].contactID,
                        firstname: results[i].firstName,
                        lastname: results[i].lastName,                        
                        gender: results[i].gender,
                        phone: results[i].phone,
                        email: results[i].email,
                        notes: results[i].notes,
                        rating: results[i].rating
                    });
                }
                if (results.length > 0) {
                    res.send(JSON.stringify(objs));
                } else {
                    res.end();
                }
            }
        });
    } 

})


/ app.post('/diagnosis', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //next();

    console.dir("calling diagnosis");
    if (isLoggedIn()) {
        var userid = sess.userid;
        connection.query('SELECT * FROM bouncemna.alert WHERE userID = ?', [userid], function (error, results, fields) {
            if (error) {
                console.dir("query error");
                res.json({
                    status: false,
                    message: 'there are some error with query'
                })
                next();
            }
            
            else {
                var objs = [];
                for (var i = 0; i < results.length; i++) {
                    objs.push({
                        alertid: results[i].alertID,
                        "Diagnosis": results[i].diagnosis,
                        sendmessage: results[i].sendMessage,                        
                        anonymity: results[i].anonymity,
                        "Diagnosis Date": results[i].dateDiagnosed,
                        "Date Alerted": results[i].dateSent,
                        userid: results[i].userID                   
                    });
                }
                if (results.length > 0) {
                    res.send(JSON.stringify(objs));
                } else {
                    res.end();
                }
                
                
            }
        });
    } 

})

app.post('/diagnosishistory', function (req, res) { //validate then sanitize

    if (isLoggedIn()) {
        var userid = sess.userid;
        var alertId = req.body.alertid;

        connection.beginTransaction(function (err) {
            if (err) {
                req.flash('error', err)
                console.dir(err);
                connection.rollback(function () {
                    throw err;
                });
            }

            connection.query('SELECT * FROM bouncemna.alert WHERE userID = ?', [userid], function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                } else {
                    //Query must be in else, because begin transaction is not thread-safe (meaning queries can unintentionally run in any order)

                    //alertid = result.insertId; //needed for all queries in this transaction                    
                    connection.query(
                        'DELETE FROM bouncemna.alert WHERE alertID = ?', [alertId], function (err, result) {
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                            }
                        }
                    )
                        
                    
                }
            });

            connection.commit(function (err) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }
            })


            console.log("db post register success");
            res.status(200).send({ "message": "data received" });
        })
    }
})

// Delete Diagnosis
/*
app.post('/diagnosishistory', function (req, res) { // havent done commit-rollback
    console.dir("deleting diagnosis");
    var delete_diagnosis = req.body;
    console.dir(req.body);
    for (var i = 0; i < delete_diagnosis.length; i++) {
        console.dir("delete diagnosis:");
        console.dir(delete_diagnosis[i]);
        
        connection.query('DELETE FROM bouncemna.alert WHERE alertID = ?', delete_diagnosis[i].alertid, function (err, result) {
            if (err) {
                req.flash('error', err)
                console.log(err);

            } 
        })
    }
    console.log("db post delete success");
    res.status(200).send({ "message": "alert deleted" });
})*/


app.post('/encountercontacts', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var attributes = "contact.firstName, contact.lastName, contact.phone, contact.email, encounterpartners.contactID, encounterpartners.encounterID,  dateEncounter, row_number() over(partition by contactID order by dateEncounter desc) as rn";
    var from = "bouncemna.encounterpartners, bouncemna.encounter, bouncemna.contact";
    var where = "encounter.encounterID = encounterpartners.encounterID AND encounter.userID = ? AND encounterpartners.contactID = contact.contactID";
    var query = "select * from (select " + attributes + " from " + from + " where " + where + ") t where t.rn = 1";

    //console.dir(query);

    if (isLoggedIn()) {
        var userid = sess.userid;
        connection.query(query, [userid], function (error, results, fields) {
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
                    console.dir("/contact firstname" + results[i].firstName);
                    objs.push({
                        encounterID: results[i].encounterID,
                        dateEncounter: results[i].dateEncounter,
                        contactID: results[i].contactID,
                        firstname: results[i].firstName,
                        lastname: results[i].lastName,
                        email: results[i].email
                    });
                }
                if (results.length > 0) {
                    console.dir("obj");
                    console.dir(objs);
                    res.send(JSON.stringify(objs));
                } else {
                    res.end();
                }
            }
        });
    }

})



//To get diseases info
    / app.post('/diseases', function (req, res) {
    if (isLoggedIn()) {
        connection.query('SELECT * FROM bouncemna.sti', function (error, results, fields) {
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
                    console.dir("/sti " + results[i].stiName);
                    objs.push({
                        stiID: results[i].stiID,
                        stiName: results[i].stiName,
                        tracingPeriod: results[i].tracingPeriod,
                        numberOfMonths: results[i].numberOfMonths,
                    });
                }
                if (results.length > 0) {
                    console.dir("obj");
                    console.dir(objs);
                    res.send(JSON.stringify(objs));
                } else {
                    res.end();

                }

            }
        });


    }
    //Eg to do multiple queries
    /*
    const [article, recommended] = await Promise.all([
        query('SELECT * FROM `pages` where slug=?', [slug]),
        query('SELECT * FROM `pages` ORDER by RAND () LIMIT 2')
    ]);*/
})

//note to self, request is to receive data, response is for pushing data to browser
app.post('/alertpartners', function (req, res) { //validate then sanitize

    if (isLoggedIn()) {
        var alert = {
            diagnosis: req.sanitize(req.body.diagnosis),
            sendMessage: req.sanitize(req.body.message),
            anonymity: req.sanitize(req.body.anonymity),
            dateDiagnosed: req.sanitize(req.body.date),
            userID: sess.userid
        }


        console.dir("alert contacts: " + req.body.contacts);
        contacts = req.body.contacts;
        console.dir("alert:");
        //console.dir(alert);

        connection.beginTransaction(function (err) {
            if (err) {
                req.flash('error', err)
                console.dir(err);
                connection.rollback(function () {
                    throw err;
                });
            }

            connection.query('INSERT INTO bouncemna.alert SET ?', alert, function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                } else {
                    //Query must be in else, because begin transaction is not thread-safe (meaning queries can unintentionally run in any order)

                    alertid = result.insertId; //needed for all queries in this transaction
                    //-------alertedpartners---------------               
                    console.dir("doing alertedpartners");
                    var alertedPartners;
                    for (var i = 0; i < contacts.length; i++) {

                        alertedPartners = {
                            alertID: alertid,
                            contactID: contacts[i].contactID
                        }
                        console.dir("alertedPartners:");
                        //console.dir(alertedPartners);
                        connection.query(
                            'INSERT INTO bouncemna.alertedpartners SET ?', alertedPartners, function (err, result) {
                                if (err) {
                                    connection.rollback(function () {
                                        throw err;
                                    });
                                }
                            }
                        )
                        var sti;
                        if (alert.diagnosis === 'HIV') {
                            sti = 'a sexually transmitted infection'
                        } else {
                            sti = alert.diagnosis;
                        }


                        var text = 'One of your partners may have been exposed to ' + sti + ', please get tested immediately!'

                        if (alert.anonymity == "identified") {
                            text = text + '<br>  \n Sent by ' + sess.userid;
                        }

                        console.dir(text);

                        var mailOptions = {
                            from: 'bouncemna@gmail.com',
                            to: contacts[i].email,
                            subject: 'Bounce Alert',
                            text: text
                        }

                        //Problem: Email from non-error queries may be sent even if a rollback occurs
                        if (contacts[i].email != null) {
                            console.log("email = " + contacts[i].email);
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        } else {
                            console.log('null email');
                        }
                    }
                }
            });




            connection.commit(function (err) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }
            })


            console.log("db post register success");
            res.status(200).send({ "message": "data received" });
        })
    }
})


app.post('/register', function (req, res) { //validate then sanitize
    //if (user) return res.status(400).send("User already registered.");
    let hash = bcrypt.hashSync(req.sanitize(req.body.password), 10);

    var registration = {
        userID: req.sanitize(req.body.username),
        firstname: req.sanitize(req.body.firstname),
        lastname: req.sanitize(req.body.lastname),
        gender: req.sanitize(req.body.gender),
        email: req.sanitize(req.body.email),
        phone: req.sanitize(req.body.phone),
        hash: hash
    }

    console.dir("rego:");
    console.dir(registration);

    connection.query('INSERT INTO bouncemna.account SET ?', registration, function (err, result) {
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
        phone: req.sanitize(req.body.phone),
        email: req.sanitize(req.body.email),
        notes: req.sanitize(req.body.comment),
        rating: req.sanitize(req.body.rating),
        userid: sess.userid
    }

    console.dir("session userid:");
    console.dir(sess.userid);

    connection.query('INSERT INTO bouncemna.contact SET ?', contact, function (err, result) {
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
app.post('/deletecontact', function (req, res) { // havent done commit-rollback
    var delete_contacts = req.body;
    console.dir(req.body);
    for (var i = 0; i < delete_contacts.length; i++) {
        console.dir("delete contact:");
        console.dir(delete_contacts[i]);
        
        connection.query('DELETE FROM bouncemna.contact WHERE contactID = ?', delete_contacts[i].contactID, function (err, result) {
            if (err) {
                req.flash('error', err)
                console.log(err);

            } 
        })
    }
    console.log("db post delete success");
    res.status(200).send({ "message": "contact deleted" });
})

// Add Activity Form
app.post('/addactivity', function (req, res) { //validate then sanitize
    console.dir("contacts: " + req.body.contactid);
    var encounter = {
        userID: sess.userid,
        dateEncounter: req.sanitize(req.body.date),
        notes: req.sanitize(req.body.comment),
        /*
        contactid: req.sanitize(req.body.contactid),      
        actID: req.sanitize(req.body.actid),
        protectionID: req.sanitize(req.body.protid),*/

    }

    //Acquires array values by not sanitizing it
    contactid = req.body.contactid;
    actid = req.body.actid;
    protectionid = req.body.protid;

    console.dir("encounter:");
    console.dir(encounter);
    var encounterid;
    connection.beginTransaction(function (err) {
        if (err) {
            req.flash('error', err)
            console.dir(err);
            connection.rollback(function () {
                throw err;
            });
        }

        connection.query('INSERT INTO bouncemna.encounter SET ?', encounter, function (err, result) {
            if (err) {
                connection.rollback(function () {
                    throw err;
                });
            } else {
                //Query must be in else, because begin transaction is not thread-safe (meaning queries can unintentionally run in any order)

                encounterid = result.insertId; //needed for all queries in this transaction
                //-------encounterpartners---------------               
                console.dir("doing encounterpartners");
                var encounterpartners;
                for (var i = 0; i < contactid.length; i++) {

                    encounterpartners = {
                        encounterID: encounterid,
                        contactID: contactid[i]
                    }
                    console.dir("encounterpartners:");
                    console.dir(encounterpartners);
                    connection.query(
                        'INSERT INTO bouncemna.encounterpartners SET ?', encounterpartners, function (err, result) {
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                            }
                        }
                    )
                }

                //-----encounterProtection-----------
                console.dir("doing encounterprotection");
                var encounterprotection;
                for (var i = 0; i < protectionid.length; i++) {
                    encounterprotection = {
                        encounterID: encounterid,
                        protectionID: protectionid[i][0]
                    }
                    console.dir("encounterprotection:");
                    console.dir(encounterprotection);
                    connection.query(
                        'INSERT INTO bouncemna.encounterprotection SET ?', encounterprotection, function (err, result) {
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                            }
                        }
                    )
                }

                //-----encounterActs----------------
                console.dir("doing encounterprotection");
                var encounteract;
                for (var i = 0; i < actid.length; i++) {
                    encounteract = {
                        encounterID: encounterid,
                        actID: actid[i][0]
                    }
                    console.dir("encounteract:");
                    console.dir(encounteract);
                    connection.query(
                        'INSERT INTO bouncemna.encounteracts SET ?', encounteract, function (err, result) {
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                            }
                        }
                    )
                }

            }
        });


        

        connection.commit(function (err) {
            if (err) {
                connection.rollback(function () {
                    throw err;
                });
            }
        })


        console.log("db post register success");
        res.status(200).send({ "message": "data received" });
    })
})

module.exports = app;
/*end of connection stuff*/

app.post('/login', function (req, res) { //validate then sanitize

    var userid = req.sanitize(req.body.name);
    var password = req.sanitize(req.body.password);
    //console.dir("userid: " + userid + "password: " + password);

    connection.query('SELECT * FROM bouncemna.account WHERE userid = ?', [userid], function (error, results, fields) {
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
                    res.json({
                        status: true,
                        message: 'successfully authenticated'
                    })
                    res.send();
                } else {
                    res.json({
                        status: 401,
                        message: "userid and password does not match"
                    });
                }

            }
            else {
                res.json({
                    status: 401,
                    message: "userid and password does not match",
                    redirect: '/login'
                });
            }
        }
    });
})
app.post('/addpartner', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //next();

    console.dir("calling contact");
    if (isLoggedIn()) {
        var userid = sess.userid;
        connection.query('SELECT * FROM bouncemna.contact WHERE userid = ?', [userid], function (error, results, fields) {
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
                    //console.dir(results[i].firstName);
                    objs.push({
                        firstname: results[i].firstName,
                        lastname: results[i].lastName
                    });
                }
                if (results.length > 0) {
                    res.send(JSON.stringify(objs));
                } else {
                    res.end();
                }
            }
        });
    }
})

app.post('/profile', function (req, res, next) {
    /*
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    */
    //next();
    console.dir("calling profile");
    if (isLoggedIn()) {
        var userid = sess.userid;
        connection.query('SELECT * FROM bouncemna.account WHERE userid = ?', [userid], function (error, results, fields) {
            if (error) {
                console.dir("query error");
                res.json({
                    status: false,
                    message: 'there are some error with query'
                })
            }

            else {
                if (results.length > 0) {
                    var profile = {
                        firstname: results[0].firstName,
                        lastname: results[0].lastName,
                        gender: results[0].gender,
                        phone: results[0].phone,
                        email: results[0].email,
                        bio: results[0].bio,
                        profilePic: results[0].profilePic
                    }

                    console.log("profile:");
                    console.log(profile);


                    res.send(JSON.stringify(profile));
                } else {
                    res.end();
                }
            }
        });
    } else {
        res.json({
            status: true,
            message: 'not logged in'
        })
    }
})

app.post('/editprofile', function (req, res) {
    if (isLoggedIn()) {

        var editProfile = {
            bio: req.sanitize(req.body.bio),
            firstname: req.sanitize(req.body.firstname),
            lastname: req.sanitize(req.body.lastname),
            gender: req.sanitize(req.body.gender),
            email: req.sanitize(req.body.email),
            phone: req.sanitize(req.body.phone),
        }
           // ('INSERT INTO bouncemna.account SET ?', registration, function (err, result)

        var sql = "UPDATE bouncemna.account SET ? WHERE userID = '" + sess.userid + "'";
        connection.query(sql, editProfile , function (err, result) {
            if (err) {
                throw err;
            } else {
                console.log(result.affectedRows + " record(s) updated");
                res.json({
                    status: true,
                    message: 'successfully authenticated'
                })
                res.send();
            }
           
           
        });
    }
})

// Sexual Hisory Page
app.post('/sexualhistory', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    console.dir("calling sexual history");
    if (isLoggedIn()) {
        var userid = sess.userid;
        connection.query('SELECT * FROM bouncemna.encounter WHERE userid = ?', [userid], function (error, results, fields) {
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
                    console.dir("/sexualhistory userid" + results[i].userID);
                    objs.push({
                        encounterID: results[i].encounterID,
                        userID: results[i].userID,
                        dateEncounter: results[i].dateEncounter,
                        notes: results[i].notes
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
