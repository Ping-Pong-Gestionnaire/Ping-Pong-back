const express = require('express');
const router = express.Router();
const posteRepository = require('../model/poste-repository');
const { body, validationResult } = require('express-validator');
const realisationRepository = require("../model/realisation-repository");

router.post("/crea", body('tempsRea'),body('date'), body('id_machine'),
            body('id_poste'),body('id_user'), body('id_operation') , async(req,res) => {

    const createRealisation =  await realisationRepository.createRealisation(req.body.tempsRea, req.body.date, req.body.id_machine,
                                                                    req.body.id_poste, req.body.id_user, req.body.id_operation);
    if(createRealisation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createRealisation);
    }
});
router.get("/getAll",async(req,res) => {

    let getAll =  await realisationRepository.getAll();
    res.status(200).json(getAll);

});

exports.initializeRoutesRealisation = () => router;