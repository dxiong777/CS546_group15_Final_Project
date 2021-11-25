const express = require("express");
const exphbs = require('express-handlebars');
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

configRoutes(app);

const port = 3000;

app.listen(port, () => {
    console.log("The server is up and running !!!");
    console.log(`The routes are running on http://localhost:${port}`);
});

///////////////////////////////////////////////////
// app.get('/', function (request, response) {
//     const datta = {
//         title: "characters Finder"
//     };
//     response.render('home', datta);
// });

// app.post('/search', async function (request, response) {
//     const character = request.body;
//     const characterName = character.characterNameForm;

//     try {
//         if (!character || !characterName || typeof characterName != 'string' || !characterName.replace(/\s/g, "").length) {
//             throw `Please enter right formate charcture to serch`;
//         }
//     } catch (e) {
//         response.status(400)
//         response.render('erroroth', {
//             err: e
//         });
//     }

//     try {
//         const foundChar = await data.getCharByName(characterName);
//         if (foundChar.data.results.length === 0) {
//             throw 'no characters'
//         }

//         if (foundChar.data.results.length > 20) {
//             const temp = [];
//             for (let i = 0; i < 20; i++) {
//                 temp[i] = foundChar.data.results[i]
//             }
//             const data = {
//                 title: "Characters Found",
//                 charName: characterName,
//                 CharFound: temp,
//             };
//             response.render('search', data);
//         } else {
//             const data = {
//                 title: "Characters Found",
//                 charName: characterName,
//                 CharFound: foundChar.data.results,
//             };
//             response.render('search', data);
//         }
//     } catch (e) {
//         const data = {
//             title: "Characture Found : Error",
//             personName: characterName,
//             errors: e,
//         };
//         response.status(400)
//         response.render('error', data);
//     }
// });

// app.get('/characters/:id', async function (request, response) {
//     const id = request.params.id; //home.handlebars ma idd search krvu
   
//     try {
//         const cahrWithId = [await data.getCharById(parseInt(id))];
//         if (!cahrWithId) {
//             throw `Request failed with status code`;
//         }
//     } catch (e) {
//         response.status(404)
//         response.render('erroroth', {
//             err: e
//         });
//     }
//     try {
//         const cahrWithId = await data.getCharById(parseInt(id));
//         var fArray = (cahrWithId.data.results[0])
//         var comicsArr = (fArray.comics.items)
//         const dataa = {
//             fArray: fArray,
//             comicsArr: comicsArr
//         };
//         response.render('searchId', dataa);
//     } catch (e) {
//         const dataa = {
//             title: "character With Id Found : Error",
//             errors: e.message,
//         };
//         response.status(e.http_code);
//         response.render('error', dataa);
//     }
// });

// app.use("*", (request, response) => {
//     response.status(404).json({
//         error: "Route not found"
//     });
// });

// const port = 3000;

// app.listen(port, () => {
//     console.log("The server is up and running !!!");
//     console.log(`The routes are running on http://localhost:${port}`);
// });


// "axios": "^0.24.0",
// "blueimp-md5": "^2.19.0",
// "body-parser": "^1.19.0",
// "error": "^10.4.0",
// "express": "^4.17.1",
// "express-handlebars": "^5.3.4",
// "nodemon": "^2.0.14",
// "path": "^0.12.7"