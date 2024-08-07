const express = require('express');
const router = express.Router();
const userRepository = require('../model/user-repository');
const { body, validationResult } = require('express-validator');

const {generateAuthToken} = require('../security/auth')
const bcrypt = require("bcryptjs");
const {stringify} = require("nodemon/lib/utils");
const gammeRepository = require("../model/gamme-repository");

router.post("/crea", body('login'), body('mdp'),body('droit'), async(req,res) => {

    const createUser =  await userRepository.createUsers(req.body.login, req.body.mdp, req.body.droit);
    console.log(createUser);
    if(createUser === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send("login déjà pris.");
    }
});

router.post("/modif", body('id'),body('login'), body('nom'), body('prenom'), body('email'), body('droit'), body('mdp'),async(req,res) => {

    const modifUser =  await userRepository.modifUsers(req.body.id,req.body.login, req.body.nom, req.body.prenom, req.body.email, req.body.droit,  req.body.mdp);
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
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(getAll);

});
router.get("/getUser/:id",async(req,res) => {

    let getOne =  await userRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});

router.post("/auth", body('login'), body('mdp'), async(req,res) =>{

    const is_user =  await userRepository.isUser(req.body.login) ;
    console.log("mon user : ", is_user);

    if(is_user != undefined){

        if (bcrypt.compareSync(req.body.mdp, is_user.mdp)) {

            const token = generateAuthToken(is_user);
            res.status(200).json({ token });

        } else {
            res.status(400).send("Login ou mot de passe incorrect")
        }
    }
    else{
        res.status(400).send("Login ou mot de passe incorrect")
        return false;
    }

});
router.get("/getByName/:login",async(req,res) => {

    let getALL=  await userRepository.getByName(req.params.login);
    res.status(200).json(getALL);

});


exports.initializeRoutesUser = () => router;