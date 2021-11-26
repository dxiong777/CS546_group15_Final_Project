const routes = require('./shopkeeper');
const constructorMethod = (app) =>{
    app.use('/', routes);
    // app.use('*', (req,res)=>{
    //     res.render('');
    //     return;
    // });
    // res.send("Invalid");
}

module.exports = constructorMethod;