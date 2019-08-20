//Install express server
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//connection stuff-----------------
/*
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
//end of connection stuff


*/
// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>' -------------- src is the app name
app.use(express.static(__dirname + '/dist/bounce'));


app.get('*', function (req, res) {
    // Replace the '/dist/<to_your_project_name>/index.html'
    res.sendFile(path.join(__dirname + 'dist/bounce/index.html'));
});


//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);