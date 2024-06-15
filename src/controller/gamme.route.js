const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const gammeRepository = require("../model/gamme-repository");

router.post("/crea", body('nom'),body('prix'),body('type'), body('id_user'),async(req,res) => {

    const createGamme =  await gammeRepository.createGamme(req.body.nom, req.body.prix, req.body.type, req.body.id_user);
    if(createGamme === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createGamme);
    }
});
router.post("/modif", body('id'), body('nom'), body('id_poste'),async(req,res) => {

    const modifMachine =  await machineRepository.modifMachine(req.body.id, req.body.nom, req.body.id_poste);
    if(modifMachine === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifMachine);
    }
});
router.post("/supp",body('id'),async(req,res) => {

    const suppMachine =  await machineRepository.suppMachine(req.body.id);
    if(suppMachine === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppMachine);
    }
});
router.get("/getAll",async(req,res) => {

    let getAll =  await machineRepository.getAll();
    res.status(200).json(getAll);

});
router.get("/getOne/:id",async(req,res) => {

    let getOne=  await machineRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});

exports.initializeRoutesGamme = () => router;