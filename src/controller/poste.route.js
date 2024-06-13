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
    if(modifPoste === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifPoste);
    }
});
router.post("/supp",body('id'),async(req,res) => {

    const suppPoste =  await posteRepository.suppPoste(req.body.id);
    console.log(suppPoste);
    if(suppPoste === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppPoste);
    }
});


exports.initializeRoutesPoste = () => router;