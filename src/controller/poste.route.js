const express = require('express');
const router = express.Router();
const posteRepository = require('../model/poste-repository');
const { body, validationResult } = require('express-validator');

router.post("/crea", body('nom'),async(req,res) => {

    const createPoste =  await posteRepository.createPoste(req.body.nom);
    if(createPoste === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createPoste);
    }
});
router.post("/modif", body('nom'), body('id'),async(req,res) => {

    const modifPoste =  await posteRepository.modifPoste(req.body.id, req.body.nom);
    console.log(modifPoste);
    if(modifPoste === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifPoste);
    }
});

exports.initializeRoutesPoste = () => router;