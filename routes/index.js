const mainRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/users',mainRoutes)
    /*app.get("/", (req,res) => {
        let title = "People Finder"
        res.render("posts/searching", { title } )

    })*/

  app.use('*', (req, res) => {
    res.status(404).render('pages/error', { "status": 404, "message": "pageeee not found" })
  });
};

module.exports = constructorMethod;