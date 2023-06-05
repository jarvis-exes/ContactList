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


var contactList = [
    {
        name:"Naruto",
        phone:"8696771000"
    },
    {
        name:"Sasuke",
        phone:"8696771001"
    },
    {
        name:"Sakura",
        phone:"8696771002"
    }
]

app.get('/',function(req,res){
    return res.render('home', {
        title : "Contact List",
        contact_list: contactList
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }, function(err, newContact){
    //     if(err){
    //         console.log(err,'Error !! Creating Contact');
    //         return;
    //     }
    //     console.log('***********',newContact);
    //     res.redirect('back');
    //     // res.redirect('/');
    // });

    Contact.create({                         
        name: req.body.name,
        phone: req.body.phone
     })
     .then(function(newContact) {
         console.log('*******',newContact);
         return res.redirect('back');
     })
     .catch(function(err) {
         console.log(err,'error in creating a contact!');
         return;
     });
});

app.get('/delete-contact',function(req,res){
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
});



app.listen(port, function(err){
    if(err){
        console.log("Server is not running", err);
        return;
    }

    console.log("Express server is running on port",port);
});

