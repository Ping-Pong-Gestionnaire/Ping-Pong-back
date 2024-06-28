const express = require('express');
const router = express.Router();
const ListeMachinePoste = require('../model/listeMachinePoste-repository');
const { body, validationResult } = require('express-validator');


router.post("/crea", body('id_machine'), body('id_poste'),async(req,res) => {

    const createListe =  await ListeMachinePoste.createListeMP(req.body.id_machine, req.body.id_poste);
    if(createListe === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createListe);
    }
});

router.post("/supp",body('id_machine'), body('id_poste'), async(req,res) => {

    const suppListe =  await ListeMachinePoste.suppListeMP(req.body.id_machine, req.body.id_poste);
    if(suppListe === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppListe);
    }
});


exports.initializeRoutesListeMP = () => router;