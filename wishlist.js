const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: "localhost",
      user: "root",
      password: "OpLo3647",
      database: 'RUListening'
  });
connection.connect();
let wishlist = [];
let wishlistObj = {};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    app.get('/wishlist', function(req, res) {
        const BookID = req.body.BookID;
        const wishSql = "SELECT * FROM Wishlist";
            connection.query(wishSql, (err, result) =>{
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else{
                    result.forEach(function(row) {
                        //console.log(row.BookID);

                        const obj = `SELECT * FROM Catalog WHERE BookID = '${row.BookID}'`;
                        connection.query(obj, (err, objRes) =>{
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            }
                        const book = objRes[0];
                        bookObj = {BookTitle: book.BookTitle, Price: book.Price};
                        //console.log(cartObj);
                        wishlist.push(bookObj);
                        wishlistObj = {wishlist: wishlist};
                        });
                    });
                }
            res.send(wishlistObj);  
            });

    });
app.listen(8083, function() {
    console.log('Server started http://localhost:8083');
  });



