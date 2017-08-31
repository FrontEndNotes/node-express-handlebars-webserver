const express = require('express');
const hbs = require('hbs'); //handlebars
const fs = require('fs');

const PORT = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
// set view engine as handlebars
app.set('view engine', 'hbs');


// next - tells express that middleware function is done
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        console.log('Unable to append to server log');
    });

    next();
});


// next - tells express that middleware function is done
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs') 
// });


// app.use - middleware
// express.static() - serve a folder (absolute path)
// __dirname - path to project's directory
// http://localhost:3000/help.html
app.use(express.static(__dirname + '/public')); 


hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});



app.get('/', (req, res) => {

    //render - render a page based on a template
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
    })   
});


// http://localhost:3000/json
app.get('/json', (req, res) => {
    res.send({
        title: "note title",
        body: "note body"
    });    
});


// http://localhost:3000/about
app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About page'
    })    
});

// http://localhost:3000/contact
app.get('/contact', (req, res) => {

    res.render('contact.hbs', {
        pageTitle: 'Contact page'
    })    
});


app.listen(PORT, ()=>{
    console.log(`Server is up on port ${PORT}`);
});