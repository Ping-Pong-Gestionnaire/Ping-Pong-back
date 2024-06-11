/*console.log('Hello there');
require ("./model/db");
const user = require("./model/user-repository");


//user.createUsers('test2', '2345', 12.6)

user.getUsers();*/
const WebServer = require('./core/web-server');

const webServer = new WebServer();
webServer.start();

// pour lancer mon serv :
//      - aller dans package.json et ajouter :
//             "start": "node src/index.js",
//             "start:dev": "nodemon src/index.js"
// il faut ensuite lancer la commande npm run start