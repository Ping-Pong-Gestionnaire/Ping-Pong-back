const express = require('express');
const router = express.Router();
const machineRepository = require('../model/machine-repository');
const { body, validationResult } = require('express-validator');
const userRepository = require("../model/user-repository");

router.post("/crea", body('nom'), body('id_poste'),async(req,res) => {

    const createMachine =  await machineRepository.createMachine(req.body.nom, req.body.id_poste);
    if(createMachine === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createMachine);
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
router.post("/suppPoste", body('id'),async(req,res) => {

    const modifMachine =  await machineRepository.suppPosteMachine(req.body.id);
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
router.get("/getByName/:name",async(req,res) => {

    let getOne=  await machineRepository.getByName(req.params.name);
    res.status(200).json(getOne);

});
router.get("/getSansPoste",async(req,res) => {

    let getOne=  await machineRepository.getSansPoste();
    res.status(200).json(getOne);

});
router.get("/getPoste/:id",async(req,res) => {

    let getOne=  await machineRepository.getPostes(req.params.id);
    res.status(200).json(getOne);

});



exports.initializeRoutesMachine = () => router;