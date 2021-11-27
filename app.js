const express = require("express");
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/public", express.static(__dirname + "/public"));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
const configRoutes = require('./routes');
app.use(methodOverride('_method'));
configRoutes(app);

const port = 3001;

app.listen(port, () => {
    console.log("The server is up and running !!!");
    console.log(`The routes are running on http://localhost:${port}`);
});
