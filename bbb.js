var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var multer  =   require('multer');  
var bodyParser=require('body-parser');
var mysql = require('mysql');
var app =express();
var nodemailer = require('nodemailer');
var cors= require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
});


 

  
app.get('/', function (req, res) {  
   res.send('Welcome to Apana Bazar'); 
   consloe.log('Welcome to Apana Bazar');   
}) 

// registration releted all api//
/*
app.get('/registration_select', function (req, res) {  
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `SELECT * FROM registration_table`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      res.send(result);  
      });    
   });  
});

app.post('/registration_select_one', function (req, res) {  
     var user=req.body;
     var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `SELECT * FROM registration_table WHERE id=${user.id}`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      res.send(result);  
      });    
   });    
}) 
*/
app.post('/registration_insert', function (req, res) {  
      var dd=req.body;
      console.log(dd);
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `INSERT INTO registration_table (id, name, email, contact, photo, address, banck_acc) 
      VALUES (NULL, '${dd.name}', '${dd.email}', '${dd.contact}','${dd.photo}', '${dd.address}', '${dd.banck_acc}')`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("1 record inserted");  
      });    
   });
});
/*
app.post('/login_check', function (req, res) {  
  var {username,password}=req.body;
   var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
   con.connect(function(err) {  
   if (err) throw err;  
   console.log("Connected!");  
   var sql = `SELECT * FROM registration_table`;  
   con.query(sql, function (err, result) {  
   if (err) throw err;  
   const user = result.find((u) => u.name == username && u.password == password);
        if (user) {
         var obj={id:user.id};
          res.send(obj);
          console.log(obj); 
        } else {
          var userErr={id:false};
          res.send(userErr);
        } 
   }); });   
 });


// add product releted all api// 
app.get('/product_select', function (req, res) {  
    var dd=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `SELECT * FROM add_prod_table`
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      res.send(result); 
      });    
   });      
}) 
app.post('/product_select_one', function (req, res) {  
    var user=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `SELECT * FROM add_prod_table WHERE id=${user.id}`
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      res.send(result); 
      });    
   });    
}) 
app.post('/product_insert', function (req, res) {  
   var dd=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `INSERT INTO add_prod_table (id, prod_name, prod_img, prod_dis, prod_prise, name, email, contact, bank_acc, address) 
      VALUES (NULL, '${dd.prod_name}', '${dd.prod_img}', '${dd.prod_dis}','${dd.prod_prise}', '${dd.name}', '${dd.email}','${dd.contact}', '${dd.bank_acc}', '${dd.address}')`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("1 record inserted");  
      });    
   });  
})
app.post('/product_delete', function (req, res) {  
   var user=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `DELETE FROM add_prod_table WHERE id=${user.id}`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("1 record delete");  
      });    
   });   
})
app.post('/product_update', function (req, res) {  
   var dd=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `UPDATE add_prod_table SET prod_name='${user.prod_name}', prod_img='${user.prod_img}', prod_dis='${user.prod_dis}', prod_prise='${user.prod_prise}', name='${user.name}', email='${user.email}', contact='${user.contact}', bank_acc='${user.bank_acc}', address='${user.address}' WHERE id=='${user.id}'`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("1 record update");  
      });    
   });   
})   



// order product releted all api//
app.get('/order_select', function (req, res) {  
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `SELECT * FROM order_pord`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      res.send(result); 
      });    
   });   
}) 
app.post('/order_select_one', function (req, res) {  
   var user=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `SELECT * FROM order_pord WHERE id=${user.id}`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      res.send(result); 
      });    
   });    
}) 
app.post('/order_insert', function (req, res) {  
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `INSERT INTO order_pord (id, prod_name, prod_img, prod_dis, prod_prise, name, email, contact, bank_acc, address) 
      VALUES (NULL, '${dd.prod_name}', '${dd.prod_img}', '${dd.prod_dis}','${dd.prod_prise}', '${dd.name}', '${dd.email}','${dd.contact}', '${dd.bank_acc}', '${dd.address}')`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("1 record inserted");  
      });    
   });    
})
app.post('/order_delete', function (req, res) {  
   var user=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `DELETE FROM order_pord  WHERE id=${user.id};`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("1 record delete");  
      });    
   });    
})
app.post('/order_update', function (req, res) {  
   var dd=req.body;
      var mysql = require('mysql2');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected!");  
      var sql = `UPDATE order_pord SET prod_name='${user.prod_name}', prod_img='${user.prod_img}', prod_dis='${user.prod_dis}', prod_prise='${user.prod_prise}', name='${user.name}', email='${user.email}', contact='${user.contact}', bank_acc='${user.bank_acc}', address='${user.address}' WHERE id=='${user.id}'`;  
      con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("1 record update");  
      });    
   });   
})  

*/


var server = app.listen(8000, function(req,res){  
var host = server.address().address;  
  var port = server.address().port;  
 console.log("Example app listening at http://%s:%s", host, port);  
}); 