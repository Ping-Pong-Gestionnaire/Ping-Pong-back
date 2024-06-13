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
        res.status(200).end();
    }
    else{
        res.status(400).send("Login déjà pris");
    }
});
router.post("/modif", body('id'), body('mdp'),async(req,res) => {

    const modifUser =  await userRepository.modifUsers(req.body.id, req.body.mdp);
    if( modifUser === "ok"){
        res.status(200).end();
    }else{
        res.status(400).send(modifUser);
    }
    
});
router.post("/supp", body('id'),async(req,res) => {

    const suppUser =  await userRepository.suppUser(req.body.id);
    if( suppUser === "ok"){
        res.status(200).end();
    }else{
        res.status(400).send(suppUser);
    }

});

router.get("/getAll",async(req,res) => {

    let getAll =  await userRepository.getAll();
    res.status(200).json(getAll);

});
router.get("/getUser/:id",async(req,res) => {

    let getOne =  await userRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});


exports.initializeRoutesUser = () => router;