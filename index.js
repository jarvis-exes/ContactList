const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const Contact =  require('./models/contacts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded()); // middleware for parsing
app.use(express.static("assets")); // for attaching static files like css


app.get('/',function(req,res){
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error is fetching contacts from Database",err);
            return;
        }

        return res.render('home', {
                title : "Contact List",
                contact_list: contacts
        });
    });
});

app.post('/create-contact',function(req,res){

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log(err,'Error !! Creating Contact');
            return;
        }
        console.log('***********',newContact);
        res.redirect('back');
    });

    // Use this when using 7+ ver of Mongoose
    // Contact.create({                         
    //     name: req.body.name,
    //     phone: req.body.phone
    //  })
    //  .then(function(newContact) {
    //      console.log('*******',newContact);
    //      return res.redirect('back');
    //  })
    //  .catch(function(err) {
    //      console.log(err,'error in creating a contact!');
    //      return;
    //  });
});

app.get('/delete-contact',function(req,res){
    // Get the id from query in URL
    let id = req.query.id;  

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log(err,"Error is deleting the contact");
            return;
        }

        return res.redirect('back');
    });


});



app.listen(port, function(err){
    if(err){
        console.log("Server is not running", err);
        return;
    }

    console.log("Express server is running on port",port);
});

