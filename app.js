const session = require('express-session')
const express = require("express");
const app = express();
const routes = require("./routes");
const exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({defaultLayout : "main"}));
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));
app.use('/private', (req,res,next)=>{
    if(!req.session.username){
       return res.redirect('/');
    }
    else{
        next();
    }
});
app.use((req,res,next)=>{
    let str = "";
    if(req.session.username)
    str = "User is authenticated";
    else
    str = "User is not authenticated";
    console.log(new Date().toUTCString(), req.method, req.originalUrl, str);
    next();

})
routes(app);
app.listen(3000, () =>{
    console.log("Your server started at http://localhost:3000");
})