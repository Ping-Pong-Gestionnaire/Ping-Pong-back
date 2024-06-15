const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const routesTest = require('../controller/test.route');
const routesUser = require('../controller/user.route');
const routesPoste = require('../controller/poste.route');
const routesMachine = require('../controller/machine.route');
const routesHabilitation = require('../controller/habilitation.route');
const routesGamme = require('../controller/gamme.route');
const routesOperation = require('../controller/operation.route');
const {sequelize} = require("../datamodel/db")
const Machine = require('../datamodel/machine.model');
const Poste = require('../datamodel/poste.model');
const User = require('../datamodel/user.model');
const Habilitation = require('../datamodel/habilitation.model');
const Gamme = require('../datamodel/gamme.model');
const Operation = require('../datamodel/operation.model');


class WebServer {
    app = undefined;
    port = 3000;
    server = undefined;


    constructor() {
        this.app = express();
        sequelize.sync();

       // Poste.hasMany(Machine, {foreignKey: "id_poste"})
        Machine.belongsTo(Poste, {foreignKey: "id_poste"});
        Gamme.belongsTo(User, {foreignKey: "id_user"});
        Operation.belongsTo(Machine, {foreignKey: "id_machine"});
        Operation.belongsTo(Poste, {foreignKey: "id_poste"});
        User.belongsToMany(Poste, { through: Habilitation });

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
        this.app.use('/machine', routesMachine.initializeRoutesMachine());
        this.app.use('/habilitation', routesHabilitation.initializeRoutesHabilitation());
        this.app.use('/gamme', routesGamme.initializeRoutesGamme());
        this.app.use('/operation', routesOperation.initializeRoutesOperation());

    }
}

module.exports = WebServer;