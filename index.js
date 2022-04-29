const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const expressEjsLayouts=require('express-ejs-layouts');
const cookie_parser= require('cookie-parser');


app.use(express.urlencoded()); // Used to handle post requests, it puts form data in req.body
app.use(cookie_parser());
app.use(express.static('./assets'));

//layout.ejs file will be accessed here.
app.use(expressEjsLayouts);


/*In layout.ejs we can move <link rel="stylesheet" href=""> and <script src=""></script> from the body section 
to any position as specified*/
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error on port:${port}`);
        return;
    }
    else{
        console.log(`Server running on port:${port}`);
    }
});