


const product = require('./products');
const shop = require('./shopkeeper');
const users = require('./users');
const productSearch = require('./productSearch')
const productReview = require('./productReview')

const constructorMethod = (app) => {

  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/users', users);
  app.use('/productSearch', productSearch);
  app.use('/productReview', productReview);
 app.use('/', shop); 
  app.use("*", (req, res) => {
   res.redirect('/');
    
  });
  app.use('*', (req, res) => {
    res.redirect('/');
  });
}
  

=======
const mainRoutes = require('./users');
const routes = require('./shopkeeper');
const constructorMethod = (app) => {
  app.use('/', routes);  
  app.use('/users',mainRoutes)
    /*app.get("/", (req,res) => {
        let title = "People Finder"
        res.render("posts/searching", { title } )

    })*/

  app.use('*', (req, res) => {
    res.status(404).render('pages/error', { "status": 404, "message": "page not found" })
  });
};
    // app.use('*', (req,res)=>{
    //     res.render('');
    //     return;
    // });
    // res.send("Invalid");


module.exports = constructorMethod;