//stackoverflow.com/questions/50910305/how-run-in-same-port-angular-and-node-js-express
//Install express server
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const expressSanitizer = require('express-sanitizer');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

/*----------NODEMAILER--------*/
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bouncemna@gmail.com',
        pass: 'tryl1234'
    }
});


app.use(cors(/*{
    origin: [
        "http://localhost:4200"
    ], credentials: true
}*/));
var flash = require('connect-flash');
var session = require('express-session');
const port = 8080;
var sess;

//register
var db_name = 'heroku_d8b3eb522e9de9a' //Previous name was bouncemna
var db_config = {
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b6319c551c1252',
    password: 'f2c8a865',
    database: 'heroku_d8b3eb522e9de9a',
    dateStrings: 'date',
    multipleStatements: true, //!!!!! REQUIRED
    connectionLimit: 5,
    queueLimit: 30,
    acquireTimeout: 1000000
};
//var db_name = 'bouncemna'
/*
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tryl',
    password: 'tryl',
    database: 'bouncemna',
    dateStrings: 'date',
    multipleStatements: true //!!!!! REQUIRED
});*/

let connection_pool = mysql.createPool(
    db_config
);


/*
connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!:)');
    }
});*/


// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>' -------------- src is the app name
app.use(express.static(__dirname + '/wwwroot'));


app.get('*', function (req, res) {
    // Replace the '/dist/<to_your_project_name>/index.html'
    res.sendFile(path.join(__dirname + '/wwwroot/index.html'));
});


//Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

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
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false,
    }
}))


app.post('/contact', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //next();

    console.dir("calling contact");
    if (req.cookies['loggedIn']) {
        connection_pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM ' + db_name + '.contact WHERE userid = ?', [req.cookies['userid']], function (error, results, fields) {
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
            console.dir("contact release con");
            connection.release();
        });
    } 
})


/ app.post('/diagnosis', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //next();

    console.dir("calling diagnosis");
    if (req.session.loggedIn) {
        connection_pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM ' + db_name + '.alert WHERE userID = ?', [req.session.userid], function (error, results, fields) {
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
            connection.release();
        });
    } 
})

app.post('/diagnosishistory', function (req, res) { //validate then sanitize

    if (req.session.loggedIn) {
        var alertId = req.body.alertid;
        connection_pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    req.flash('error', err)
                    console.dir(err);
                    connection.rollback(function () {
                        throw err;
                    });
                }

                connection.query('SELECT * FROM ' + db_name + '.alert WHERE userID = ?', [req.session.userid], function (err, result) {
                    if (err) {
                        connection.rollback(function () {
                            throw err;
                        });
                    } else {
                        //Query must be in else, because begin transaction is not thread-safe (meaning queries can unintentionally run in any order)

                        //alertid = result.insertId; //needed for all queries in this transaction                    
                        connection.query(
                            'DELETE FROM ' + db_name + '.alert WHERE alertID = ?', [alertId], function (err, result) {
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

            });
            connection.release();
        });
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


app.post('/encountercontacts', function (req, res, next) { //for alertpartner
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //var attributes = 'contact.firstName, contact.lastName, contact.phone, contact.email, encounterpartners.contactID, encounterpartners.encounterID,  dateEncounter';//, row_number() over(partition by contactID order by dateEncounter desc) as rn';
   // var from = db_name + '.encounterpartners, ' + db_name +'.encounter, ' + db_name +'.contact';
    //var where = 'encounter.encounterID = encounterpartners.encounterID AND encounter.userID = ? AND encounterpartners.contactID = contact.contactID';
    //var query = 'select * from (select ' + attributes + ' from ' + from + ' where ' + where + ') t'; //where t.rn = 1';
    //var query = 'select * from (select ' + attributes + ' from ' + from + ' GROUP BY contactID ORDER BY dateEncounter DESC) data ORDER BY dateEncounter ASC' ;
    var attributes = "encounterpartners.contactID, contact.firstName, contact.lastName, max(dateEncounter) md, encounter.encounterID, contact.email ";
    var from = db_name + ".encounter, " + db_name + ".encounterpartners, " + db_name + ".contact ";
    var where = "encounter.encounterID = encounterpartners.encounterID AND contact.contactID = encounterpartners.contactID ";
    var query = "SELECT " + attributes + "FROM " + from + "WHERE " + where + "GROUP BY contactID ORDER BY md DESC";
    //console.dir(query);

    if (req.session.loggedIn) {
        connection_pool.getConnection(function (err, connection) {
            connection.query(query, [req.session.userid], function (error, results, fields) {
                if (error) {
                    console.dir("query error /encountercontacts");
                    console.dir(error);
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
                            dateEncounter: results[i].md,
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
                        res.send();
                    }
                }
            });
            console.dir("encountercontact release con");
            connection.release();
        });
    }

})






//To get diseases info
    / app.post('/diseases', function (req, res) {
    if (req.session.loggedIn) {
        connection_pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM ' + db_name + '.sti', function (error, results, fields) {
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
            connection.release();
        });
    }
})

//note to self, request is to receive data, response is for pushing data to browser
app.post('/alertpartners', function (req, res) { //validate then sanitize

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    if (req.session.loggedIn) {
        console.dir(req.body.message);
        var alert = {
            diagnosis: req.sanitize(req.body.diagnosis),
            sendMessage: req.sanitize(req.body.message),
            anonymity: req.sanitize(req.body.anonymity),
            dateDiagnosed: req.sanitize(req.body.date),
            dateSent: req.sanitize(today),
            userID: req.session.userid
        }


        console.dir("alert contacts: " + req.body.contacts);
        contacts = req.body.contacts;
        console.dir("alert:");
        //console.dir(alert);
        connection_pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    req.flash('error', err)
                    console.dir(err);
                    connection.rollback(function () {
                        throw err;
                    });
                }

                connection.query('INSERT INTO ' + db_name + '.alert SET ?', alert, function (err, result) {
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
                                'INSERT INTO ' + db_name + '.alertedpartners SET ?', alertedPartners, function (err, result) {
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
                                text = text + '<br>  \n Sent by ' + req.session.userid;
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
            connection.release();
            console.dir("alert release con");
        })
    }
})


app.post('/register', function (req, res) { //validate then sanitize
    //if (user) return res.status(400).send("User already registered.");
    //let hash = bcrypt.hashSync(req.sanitize(req.body.password), 10);

    var registration = {
        userID: req.sanitize(req.body.username),
        firstname: req.sanitize(req.body.firstname),
        lastname: req.sanitize(req.body.lastname),
        gender: req.sanitize(req.body.gender),
        email: req.sanitize(req.body.email),
        phone: req.sanitize(req.body.phone),
        hash: req.sanitize(req.body.password)
    }

    console.dir("rego:");
    console.dir(registration);
    connection_pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO ' + db_name + '.account SET ?', registration, function (err, result) {
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
        });
        connection.release();
    });
})

// Add Contact Form
app.post('/contactform', function (req, res) { //validate then sanitize

    if (req.session.loggedIn) {
        var contact = {
            firstName: req.sanitize(req.body.firstname),
            lastName: req.sanitize(req.body.lastname),
            gender: req.sanitize(req.body.gender),
            phone: req.sanitize(req.body.phone),
            email: req.sanitize(req.body.email),
            notes: req.sanitize(req.body.comment),
            rating: req.sanitize(req.body.rating),
            userid: req.session.userid
        }
        connection_pool.getConnection(function (err, connection) {
            connection.query('INSERT INTO ' + db_name + '.contact SET ?', contact, function (err, result) {
                if (err) {
                    req.flash('error', err)
                    console.log(err);

                } else {
                    console.log("db post register success");
                    res.status(200).send({ "message": "data received" });
                }
            });
            connection.release();
        });
    }
})
// Delete Contact Form
app.post('/deletecontact', function (req, res) { // havent done commit-rollback

    if (req.session.loggedIn) {
        var delete_contacts = req.body;
        console.dir(req.body);
        connection_pool.getConnection(function (err, connection) {
            for (var i = 0; i < delete_contacts.length; i++) {
                console.dir("delete contact:");
                console.dir(delete_contacts[i]);

                connection.query('DELETE FROM ' + db_name + '.contact WHERE contactID = ?', delete_contacts[i].contactID, function (err, result) {
                    if (err) {
                        req.flash('error', err)
                        console.log(err);
                        connection.release();
                    }
                });
            }
            console.log("db post delete success");
            res.status(200).send({ "message": "contact deleted" });
            connection.release();
        });
    }
})

// Add Activity Form
app.post('/addactivity', function (req, res) { //validate then sanitize
    console.dir("contacts: " + req.body.contactid);
    var encounter = {
        userID: req.session.userid,
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
    connection_pool.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                req.flash('error', err)
                console.dir(err);
                connection.rollback(function () {
                    throw err;
                });
            }

            connection.query('INSERT INTO ' + db_name + '.encounter SET ?', encounter, function (err, result) {
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
                            'INSERT INTO ' + db_name + '.encounterpartners SET ?', encounterpartners, function (err, result) {
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
                            'INSERT INTO ' + db_name + '.encounterprotection SET ?', encounterprotection, function (err, result) {
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
                            'INSERT INTO ' + db_name + '.encounteracts SET ?', encounteract, function (err, result) {
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
        connection.release();
    })
})

module.exports = app;
/*end of connection stuff*/

app.post('/login', function (req, res) { //validate then sanitize

    var userid = req.sanitize(req.body.name);
    var password = req.sanitize(req.body.password);
    //console.dir("userid: " + userid + "password: " + password);
    connection_pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM ' + db_name + '.account WHERE userid = ?', [userid], function (error, results, fields) { //userid from input, not session
            if (error) {
                res.json({
                    status: false,
                    message: 'there are some error with query'
                })
            }

            else {

                if (results.length > 0) {

                    if (password == results[0].hash) {
                        //sess = req.session;
                        //sess.loggedin = true;
                        //sess.userid = userid; 
                        req.session.userid = userid;
                        req.session.loggedIn = true;
                        res.cookie('userid', userid); //working
                        res.cookie('loggedIn', true);
                        req.cookies['userid'];
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
        connection.release();
    });
})
app.post('/addpartner', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //next();

    console.dir("calling contact");
    if (req.session.loggedIn) {
        connection_pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM ' + db_name + '.contact WHERE userid = ?', [req.session.userid], function (error, results, fields) {
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
            connection.release();
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
    if (req.session.loggedIn) {
        connection_pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM ' + db_name + '.account WHERE userid = ?', [req.session.userid], function (error, results, fields) {
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
                            userid: results[0].userID,
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
            connection.release();
        });
    } else {
        res.json({
            status: true,
            message: 'not logged in'
        })
    }
})

app.post('/editprofile', function (req, res) {
    if (req.session.loggedIn) {

        var editProfile = {
            bio: req.sanitize(req.body.bio),
            firstname: req.sanitize(req.body.firstname),
            lastname: req.sanitize(req.body.lastname),
            gender: req.sanitize(req.body.gender),
            email: req.sanitize(req.body.email),
            phone: req.sanitize(req.body.phone),
        }

        var sql = "UPDATE " + db_name + ".account SET ? WHERE userID = '" + req.session.userid + "'";
        connection_pool.getConnection(function (err, connection) {
            connection.query(sql, editProfile, function (err, result) {
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
            connection.release();
        });
    }
})


// Sexual Hisory Page
/*
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

})*/


app.post('/sexualhistory', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //copy paste PLS CHANGE ACCORDINGLY
    if (req.session.loggedIn) {

        //var userid = sess.userid;

        //find all encounters by user
        //for each encounter retrieved, query act -> sexact, partners, protection

        var order_by_date = " ORDER BY dateEncounter DESC"; //only for 1st query

        //Query for encounterID related to user (didnt incl comments)
        var query_e = "SELECT encounterID, dateEncounter, notes FROM " + db_name + ".encounter WHERE encounter.userID = ? " + order_by_date; //GET encounterID

        //Query encounter acts
        var select_ea = "SELECT e.encounterID, sa.actName ";
        var from_ea = "FROM " + db_name + ".encounter e LEFT JOIN " + db_name + ".encounteracts ea ON e.encounterID = ea.encounterID LEFT JOIN " + db_name + ".sexualacts sa ON ea.actID = sa.actID ";
        var where_ea = "WHERE e.encounterID = ?;" // + encounterID
        var query_ea = select_ea + from_ea + where_ea;

        //Query encounter partners
        var select_ep = "SELECT e.encounterID, c.firstName, c.lastName ";
        var from_ep = "FROM " + db_name + ".encounterpartners ep, " + db_name + ".encounter e, " + db_name + ".contact c ";
        var where_ep = "WHERE e.encounterID = ep.encounterID AND c.contactID = ep.contactID AND e.encounterID = ?;";
        var query_ep = select_ep + from_ep + where_ep;
        // + encounterID
        

        //Query encounter protection
        var select_epr = "SELECT e.encounterID, p.protectionName ";
        var from_epr = "FROM " + db_name + ".encounter e, " + db_name + ".encounterprotection epr, " + db_name + ".protection p ";
        var where_epr = "WHERE e.encounterID = epr.encounterID AND epr.protectionID = p.protectionID AND e.encounterID = ?";
        var query_epr = select_epr + from_epr + where_epr;
        // + encounterID

        var query_master = query_ea + query_ep + query_epr;
        var result_master = [];

        //Function is called at the end of the multiple queries
        function finish(query_result) {
            try {
                res.send(JSON.stringify(result_master));
            } catch {
                res.json({
                    status: false,
                    message: "query failed",
                });
            }
        }
        //encounterID,actName,firstName,lastName,protectionName

        /*
        Promise.map(connection.query(query_e, [userid], function (error, item) {
            return Promise.all([
                connection.query(query_master, [item.encounterID, item.encounterID, item.encounterID]).then(function (local) {
                    //rowpacketdata -> local has 3 arrays
                    console.dir( local[0][0]); //item.local is a new property
                    console.dir( local[0][1]);
                    console.dir( local[0][2]);
                }),
            ])
        }).then(function (results) {
            // array of results here
            console.log(results);
        }).catch(function (err) {
            // error here
            console.log(err);
        }));*/
 
        var async = require("async");
        connection_pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    req.flash('error', err)
                    console.dir(err);
                    connection.rollback(function () {
                        throw err;
                    });
                }
                connection.query(query_e, [req.session.userid], function (err, result_e) { //connection.query(query_master, [userid,userid,userid], function (err, results) {
                    var counter = 0;
                    if (err) {
                        connection.rollback(function () {
                            throw err;
                        });
                    } else {

                        //Query must be in else, because begin transaction is not thread-safe (meaning queries can unintentionally run in any order)                  
                        async.eachSeries(result_e, function (data, callback) { // It will be executed one by one
                            //Here it will be wait query execute. It will work like synchronous
                            connection.query(query_master, [data.encounterID, data.encounterID, data.encounterID], function (error, results) {
                                if (error) throw err;
                                var single_encounter_result = []
                                var single_encounter_names;
                                var single_encounter_acts;
                                var single_encounter_protection;
                                //result_master.push(results); //All 3 queries per encounter
                                var internal_counter = 0;
                                //console.dir(results[0][0].encounterID); //rowpacketdata, query 1 result array, query 2 result array, query 3 result array.

                                for (var i = 0; i < results[0].length; i++) { //query 1 (encounteract)
                                    //console.dir(results[0][i].actName);
                                    if (i == 0) {
                                        single_encounter_acts = results[0][i].actName;
                                    } else {
                                        single_encounter_acts += "," + results[0][i].actName;
                                    }
                                    internal_counter += 1;
                                }

                                for (var i = 0; i < results[1].length; i++) { //query 1 (encounterpartner)
                                    //console.dir(results[1][i].firstName);
                                    //console.dir(results[1][i].lastName);
                                    if (i == 0) {
                                        single_encounter_names = results[1][i].firstName + " " + results[1][i].lastName;
                                    } else {
                                        single_encounter_names += "," + results[1][i].firstName + " " + results[1][i].lastName;
                                    }
                                    internal_counter += 1;
                                }
                                for (var i = 0; i < results[2].length; i++) { //query 1 (encounterprotection)
                                    //console.dir(results[2][i].protectionName);
                                    if (i == 0) {
                                        single_encounter_protection = results[2][i].protectionName;
                                    } else {
                                        single_encounter_protection += "," + results[2][i].protectionName;
                                    }
                                    internal_counter += 1;
                                }

                                //Push single encounter
                                if (internal_counter == results[0].length + results[1].length + results[2].length) {
                                    single_encounter_result.push({
                                        encounterID: data.encounterID,
                                        dateEncounter: data.dateEncounter,
                                        actName: single_encounter_acts,
                                        name: single_encounter_names,
                                        protection: single_encounter_protection,
                                        notes: data.notes
                                    });
                                    //console.dir(single_encounter_result);
                                    result_master.push(single_encounter_result);
                                    counter += 1;
                                }

                                //End of query (async)
                                if (counter == result_e.length) {
                                    finish(result_master);
                                }
                                callback(); //Ensures the async function is called (in parallel?) till it's done
                            });

                        });

                        //--------------------------------------------------------
                        /*
                        for (var i = 0; i < result_e_json.length; i++) {
    
                            console.dir(result_e_json[i].dateEncounter); //CAN READ
                            
                            connection.query(query_master, [result_e_json[i].encounterID, result_e_json[i].encounterID, result_e_json[i].encounterID], function (err, results) {
                                if (err) {
                                    connection.rollback(function () {
                                        throw err;
                                    });
                                } else {
                                    //console.dir(result_e_json[i].dateEncounter); //NEED TO JSON.stringify(objs)
                                    //I DONT NEED result_e_json
                                    console.dir("inside query")
                                    console.dir(results[0].actName);
                                    result_master.push({
                                        actName: results[0].actName
                                    })
                                    //console.dir(results);
                                }
                            });
                        }*/ //----------------------------------------------------
                        //console.dir(results); 
                    }
                });
            })
            connection.release();
        }) //-----------------------END OF TRANSACTION-----------------
        /*
                //One array
                if (results.length > 0) {
                    console.dir("obj");
                    console.dir(objs);
                    res.send(JSON.stringify(objs));
                } else {
                    res.end();
                }
            }
        });*/
    }

})
/*
app.get('/logout', function (req, res) {
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', { expires: new Date(0) });
    }
    res.redirect('/login');
});*/