const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const routesTest = require('../controller/test.route');
const routesUser = require('../controller/user.route');
const routesPoste = require('../controller/poste.route');
const {sequelize} = require("../datamodel/db")

class WebServer {
    app = undefined;
    port = 3000;
    server = undefined;


    constructor() {
        this.app = express();
        sequelize.sync();
        require('dotenv').config();
        initializeConfigMiddlewares(this.app);
        this._initializeRoutes();
        initializeErrorMiddlwares(this.app);
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }

    stop() {
        this.server.close();
    }

    _initializeRoutes() {
        this.app.use('/test', routesTest.initializeRoutesTest());
        this.app.use('/user', routesUser.initializeRoutesUser());
        this.app.use('/poste', routesPoste.initializeRoutesPoste());

    }
}

module.exports = WebServer;