const express=require('express');
const app=express();
const port=8000;
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error on port:${port}`);
        return;
    }
    else{
        console.log(`Server running on port:${port}`);
    }
});