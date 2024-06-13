const express = require('express');
const router = express.Router();
const userRepository = require('../model/user-repository');
const { body, validationResult } = require('express-validator');

const  jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {stringify} = require("nodemon/lib/utils");

router.post("/crea", body('login'), body('mdp'),async(req,res) => {

    const createUser =  await userRepository.createUsers(req.body.login, req.body.mdp);
    console.log(createUser);
    if(createUser === "ok"){
        res.status(204).end();
    }
    else{
        res.status(400).send("Login déjà pris");
    }
});
router.post("/modif", body('id'), body('mdp'),async(req,res) => {

    const modifUser =  await userRepository.modifUsers(req.body.id, req.body.mdp);
    if( modifUser === "ok"){
        res.status(204).end();
    }else{
        res.status(400).send("Il y a eu une erreur lors de la modification.");
    }
    
});

exports.initializeRoutesUser = () => router;