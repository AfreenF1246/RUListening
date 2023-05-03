const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const MySQLStore = require('express-mysql-session')(session);
const fs = require('fs');

const app = express();

// Create connection to MySQL database
const db = mysql.createConnection({
    host: "localhost",
      user: "root",
      password: "OpLo3647",
      database: 'RUListening'
  });
  
  // Create session store
  const sessionStore = new MySQLStore({
    expiration: 86400000,
    createDatabaseTable: true,
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  }, db);
  
  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MySQL Database');
  });
  
  // Set view engine
  app.set('view engine', 'ejs');
  
  // Set up session middleware


  app.get('/', (req, res) => {
    let userId;
    try {
    userId = fs.readFileSync('userID.txt', 'utf8');
    // process data here
    } catch (error) {
    // handle the error
    //console.error(error); // log the error to the console
    console.log("Please, login before accessing account"); // show a user-friendly message
    res.redirect('http://localhost:3000/'); // redirect the user to a different page using Express.js
    }
    // Get catalog data from database and render page
    const query = `SELECT YourBooks FROM accounts WHERE id = ${1}`;
    db.query(query, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
    // Get the value of the YourBooks column from the first row of the results
    const yourBooks = results[0].YourBooks;
    // Split the book IDs using the comma as a delimiter and create an array of IDs
    const bookIDs = yourBooks.split(',').map(bookID => bookID.trim());

    console.log(bookIDs);
    // Render the yourbooks.html file with the bookIDs variable
    res.render('yourbooks', { bookIDs });
    });
  });



const port = 3010; // choose a port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


