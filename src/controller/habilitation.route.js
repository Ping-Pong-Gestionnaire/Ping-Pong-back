const express = require('express');
const router = express.Router();
const machineRepository = require('../model/machine-repository');
const { body, validationResult } = require('express-validator');
const habilitationRepository = require("../model/habilitation-repository");

router.post("/crea", body('id_user'), body('id_poste'),async(req,res) => {

    const createHabilitation =  await habilitationRepository.createHabilitation(req.body.id_user, req.body.id_poste);
    if(createHabilitation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createHabilitation);
    }
});

router.post("/supp",body('id_user'), body('id_poste'), async(req,res) => {

    const suppHabilitation =  await habilitationRepository.suppHabilitation(req.body.id_user, req.body.id_poste);
    if(suppHabilitation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppHabilitation);
    }
});

router.get("/getByUser/:id_user",async(req,res) => {

    let all=  await habilitationRepository.getByUser(req.params.id_user);
    res.status(200).json(all);

});

exports.initializeRoutesHabilitation = () => router;