/*let express = require('express');
router = express.Router();
var connection = require('../db');
//alertService = require("./src/app/alert-partners")
/**Api to create article */
/*
router.post('/alert-partners', (req, res) => {
    //server validation (never trust client input validation) - shouldnt need for capstone
    //maybe for each contact in array, create mysql entry.

    var alert = {
        diagnosis: req.sanitize('diagnosis').escape().trim(),
        contact: req.sanitize('contacts').escape().trim(),
        sendmessage: req.sanitize('message').escape.trim(),
        anonymity: req.sanitize('anonymity').escape.trim(),
        date: req.sanitize('date').escape.trim(),
    }
    connection.query('INSERT INTO bounce.alertpartners SET ?', alert, function (err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)

            // render to views/user/add.ejs
            res.render('alert-partners', {
                /*title: 'Add New Customer',
                name: user.name,
                email: user.email*/
         /*   })
        } else {
            req.flash('success', 'Data added successfully!');
            res.redirect('/home');
        }
    })
});*/