const express = require('express');
const router = express.Router();
const posteRepository = require('../model/poste-repository');
const { body, validationResult } = require('express-validator');

router.post("/crea", body('nom'),async(req,res) => {

    const createPoste =  await posteRepository.createPoste(req.body.nom);
    console.log(createPoste);
    if(createPoste === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createPoste);
    }
});

exports.initializeRoutesPoste = () => router;