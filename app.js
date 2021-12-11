const session = require('express-session')
const express = require("express");

const methodOverride = require('method-override');

const app = express();
const routes = require("./routes");
const exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({defaultLayout : "main"}));
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

// app.use(express.bodyParser())
// app.use(express.methodOverride())

app.use(methodOverride('_method'));



app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

  app.use(async(req,res,next)=>{
    user_status= "(Non-Authenticated User)"
  
    if(req.session.user){
      user_status="(Authenticated User)"
    }
    
    console.log(`[${new Date().toUTCString()}] : ${req.method} ${req.originalUrl} ${user_status}`);
    next()
  })

  app.get('/users/login', (req, res, next) => {
 
    if (req.session.user) {
      //req.method = 'GET';
      return res.redirect('/users/private');
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
     next()
    }
  });
  app.use('/users/private', (req,res,next)=>{
    if(!req.session.user){
       return res.redirect('/users/login');
    }
    next();
  })
app.use('/private', (req,res,next)=>{
    if(!req.session.username){
       return res.redirect('/');
    }
    else{
        next();
    }
});
app.use('/users/profile', (req,res,next)=>{
  if(!req.session.user){
     return res.redirect('/users/login');
  }
  else{
      next();
  }
});
app.get('/users/signup', (req, res, next) => {
 
  if (req.session.user) {
    //req.method = 'GET';
    return res.redirect('/users/private');
  } else {
    //here I',m just manually setting the req.method to post since it's usually coming from a form
   next()
  }
});

app.get('/users/logout',(req,res,next)=>{
  if(req.session.user){
     req.session.destroy()}
  else{
    return res.redirect('/users/login');
  }
  next()

});
  
app.get('/users/seeprofile', (req, res, next) => {
 
  if (req.session.user) {
    //req.method = 'GET';
    next()
    
  } else {
    //here I',m just manually setting the req.method to post since it's usually coming from a form
    return res.redirect('/users/login'); }});
  app.get('/users/profiledetail', (req, res, next) => {
 
    if (req.session.user) {
      //req.method = 'GET';
      next()
      
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
      return res.redirect('/users/login');
    }});
    app.get('/users/updateprofile', (req, res, next) => {
 
      if (req.session.user) {
        //req.method = 'GET';
        next()
        
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        return res.redirect('/users/login');
      }});

app.use('/edit', (req,res,next)=>{
    if(req.body._method === "PUT"){
        console.log("EDIT");
        req.method = "put";
    }
    next();
    
})


app.use((req,res,next)=>{
    if(req.body._mehtod === "DELETE"){
        req.method = "delete"
    }
    next();
})


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

app.listen(3000, () => {
    console.log("Your server started at http://localhost:3000");
})