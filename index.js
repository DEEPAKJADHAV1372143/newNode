var express = require('express');  
var app = express();  
var cors = require('cors'); 
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express(); 

 var mysql = require('mysql');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });   

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static('public'));
  
app.post('/registration_insert', function (req, res) {  
      var dd=req.body;
      console.log(dd);
      con.connect(function(err) {  
      con.query(`INSERT INTO registration_table (id, name, email, contact, photo, address, banck_acc,password) 
      VALUES (NULL, '${dd.name}', '${dd.email}', '${dd.contact}','${dd.photo}', '${dd.address}', '${dd.banck_acc}', '${dd.password}')`, function (err, result) {    
      });    
   });
/*
      let my_email='bangarmegha88@gmail.com';
  let my_password='ArjunDeep';
  let my_smpt='smtp.gmail.com';

  let mailTransporter = nodemailer.createTransport({ 
     host: my_smpt,
    port: 587,
    service:'Gmail',
    secure: false,
    auth: {
      user: my_email,
      pass: my_password

      }
  }); 
    
  let mailDetails = { 
    from: 'bangarmegha88@gmail.com',
    to:dd.email,
    subject:  `Apana_Bazar Registarion.`,
    html:`<h1> Welcome Sir , '${dd.name}'</h1> <p>Your Username : '${dd.email}' and Your Password : '${dd.password}'</p><p>Your Request for registration is  successfully submited .</p> <h4>Thanks and Regard : Deepak Jadhav</h4> <b>'</b>`
  }; 
    console.log('Error Occurs');
  mailTransporter.sendMail(mailDetails, function(err, data) { 
      if(err) { 
          console.log('Error Occurs'+ err); 
      } else { 
          console.log('Email sent successfully'); 
      } 
  }); */
});

  
  app.post('/call_one_owner', function (req, res) {  
    var user=req.body; 
      con.connect(function(err) {    
      console.log("Connected!");  
      con.query(`SELECT * FROM registration_table WHERE id=${user.id}`, function (err, result) {  
      res.send(result); 
      });    
   });    
}) 

 app.post('/login_check', function (req, res) {  
  var dd=req.body;
  console.log(req.body)  
   con.connect(function(err) {  
    
   console.log(" login_check Connected!");   
   con.query(`SELECT * FROM registration_table`, function (err, result) { 
    const user = result.find((u) => u.email == dd.email && u.password == dd.password);
        if (user) {
         var obj={id:user.id};
          res.send(obj);
          console.log(obj); 
        } else {
          var obj=null;
          console.log(obj);
          res.send(obj);
        }   
   
   }); });   
 });
 

 app.post('/registration_select_one', function (req, res) {  
     var user=req.body; 
     var mysql = require('mysql');  
      var con = mysql.createConnection({  
      host: "localhost",  
      user: "root",  
      password: "",  
      database: "apana_bazar"  
      });  
      con.connect(function(err) {  
         
      console.log("registration_insert Connected!");  
      var sql = `SELECT * FROM registration_table WHERE id=${user.id}`;  
      con.query(sql, function (err, result) {  
      res.send(result);  
      });    
   });    
});


app.post('/productInsert', function (req, res) {  
   var dd=req.body;
   console.log(dd); 
      con.connect(function(err) {  
      console.log("Product Connected!");   
      con.query(`INSERT INTO add_prod_table (id, prod_name, prod_img, prod_dis, prod_quantity, prod_prise, userId,prodType) VALUES
       (NULL, '${dd.prod_name}', '${dd.prod_img}', '${dd.prod_dis}','${dd.prod_quantity}','${dd.prod_prise}', '${dd.userId}','${dd.prodType}')`, function (err, result) {    
      console.log("1 record inserted");  
      });    
   });  
});


app.post('/product_select_by_owner', function (req, res) {  
    var user=req.body; 
      con.connect(function(err) {    
      console.log("Connected!");  
      con.query(`SELECT * FROM add_prod_table WHERE userId=${user.id}`, function (err, result) {   
      res.send(result); 
      });    
   });    
}) 


app.post('/product_edit', function (req, res) {  
    var user=req.body; 
    console.log("dfsdfsdf");
    console.log( user);
    
      con.connect(function(err) {    
      console.log("Connected!");  
      con.query(`SELECT * FROM add_prod_table WHERE id=${user.id}`, function (err, result) {  
      res.send(result); 
      });    
   });    
}) 

app.get('/product_select', function (req, res) {  
      con.connect(function(err) {  
      console.log("Connected!");  
      con.query(`SELECT * FROM add_prod_table`, function (err, result) {  
      if (err) throw err;  
      res.send(result); 
      });    
   });    
}) 

app.post('/product_delete', function (req, res) {  
      var user=req.body; 
      con.connect(function(err) { 
      console.log("Connected!");  
      con.query(`DELETE FROM add_prod_table WHERE id=${user.id}`, function (err, result) {  
      if (err) throw err;  
      res.send(result); 
      });    
   });    
}) 

app.post('/contactInsert', function (req, res) {  
   var dd=req.body;
   console.log(dd); 
      con.connect(function(err) {  
      console.log("Contact Connected!");   
      con.query(`INSERT INTO contact_us_table (id, name, email, subject,massage, date) VALUES
       (NULL, '${dd.name}', '${dd.email}', '${dd.subject}', '${dd.massage}','${dd.date}')`, function (err, result) {    
      console.log("1 record inserted");  
      });    
   });  
});

app.post('/orderInsert', function (req, res) {  
   var dd=req.body;
   var date=new Date();
   var order_status='In Progress';
   console.log(dd); 
      con.connect(function(err) {  
      console.log("order Connected!");   
      con.query(`INSERT INTO order_pord ( id,  prod_id, farmer_id, order_name,  order_email, order_contact, order_address, order_status,  date)
       VALUES (NULL, '${dd.prod_id}', '${dd.farmer_id}',  '${dd.order_name}','${dd.order_email}','${dd.order_contact}','${dd.order_address}','${order_status}','${date}')`, function (err, result) {    
      //if (err) throw err; 

      con.query(`UPDATE add_prod_table SET prod_quantity=prod_quantity-1 WHERE id=${dd.prod_id}`);
      console.log("1 record inserted");  
      });    
   });  
});



app.post('/UpdateProd', function (req, res) {  
   var dd=req.body;
   console.log(dd); 
      con.connect(function(err) {  
      console.log("order Connected!");  
      var sql=`UPDATE add_prod_table SET prod_name='${dd.prod_name}',prod_quantity='${dd.prod_quantity}',userId='${dd.userId}',prod_img='${dd.prod_img}',prod_dis='${dd.prod_dis}',prod_prise='${dd.prod_prise}',prodType='${dd.prodType}' WHERE id=${dd.id}`; 
     con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log(result);  
      });  
   });  
});

app.post('/order_list', function (req, res) {  
    var user=req.body; 
      con.connect(function(err) {    
      console.log("Connected!");  
      con.query(`SELECT * FROM order_pord WHERE farmer_id=${user.id}`, function (err, result) {  
      res.send(result); 
      });    
   });    
}) 


var server = app.listen(8000, function () {  
  var host = server.address().address;   
  var port = server.address().port;  
  console.log('Example app listening at http://%s:%s', host, port);  
});  




















  