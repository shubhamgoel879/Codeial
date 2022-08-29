const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const expressEjsLayouts=require('express-ejs-layouts');
const cookie_parser= require('cookie-parser');

//used for session cookie
const session=require('express-session');
const passport = require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
/*On restarting our server, previous session cookies will get removed, so all our users will get 
signed out automatically, so we need to store our session cookies in database that's why we use connect-mongo
which is storing session so session as argument.*/
const MongoStore=require('connect-mongo');


const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle:'extended',
    prefix:'/css'
}));



app.use(express.urlencoded()); // Used to handle post requests, it puts form data in req.body
app.use(cookie_parser());
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));

//layout.ejs file will be accessed here.
app.use(expressEjsLayouts);


/*In layout.ejs we can move <link rel="stylesheet" href=""> and <script src=""></script> from the body section 
to any position as specified*/
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    // Todo change the secret before deployment in production mode.
    secret:'Shubham Goel',    // the cookie will be encrypted using this key
    saveUninitialized:false,  // when session is not initialized(i.e. user not logged in), since we don't want any data to be sent in cookie so we keep it as false.
    resave:false, // when session is established(i.e. user logged in), if session cookie data is same so i don't want to resave it again so kept false;
    cookie:{
         maxAge:(1000*60*100)     // in milliseconds  i.e. cookie will expire in 100mins
    },
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codeial_developement',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup successful');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error on port:${port}`);
        return;
    }
    else{
        console.log(`http://localhost:${port}/`);
    }
});