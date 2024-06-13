const express = require('express');
const router = express.Router();
const userRepository = require('../model/user-repository');
const { body, validationResult } = require('express-validator');

const  jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {stringify} = require("nodemon/lib/utils");

router.post("/creationcompte", body('login'), body('mdp'),async(req,res) => {

    const createUser =  await userRepository.createUsers(req.body.login, req.body.mdp);
    console.log(createUser);
    if(createUser === "ok"){
        res.status(204).end();
    }
    else{
        res.status(400).send("Login déjà pris");
    }
});
router.post("/test",async(req,res) => {

    res.status(204).end();
});

exports.initializeRoutesUser = () => router;