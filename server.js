const express = require('express');
const path = require('path'); //to get path module
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');

const router = require('./router');
const app = express();
const nocache = require('nocache');
const port = 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//Initialize view engine
app.set('view engine','ejs');

//Load static assets
app.use('/static',express.static(path.join(__dirname, 'public')))
app.use('/assets',express.static(path.join(__dirname, 'public/assets')))
app.use(nocache())

app.use(session({
    secret: uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route', router); //middle ware

//Creating routes
//Home route
app.get('/', (req,res)=>{

    if(req.session.user)
    {
        res.redirect('/route/Homepage')
    }
    else{
        //const message = "IncorrectPassword";
        const msg = req.query.message
        res.render('base', {title: "Login System"})
    }
 //to render a simple html page


})

//To start the server
app.listen(port, ()=>{
    console.log(`Listening to the server on http://localhost:${3000}`)
});
