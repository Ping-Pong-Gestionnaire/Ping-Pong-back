const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const operationRepository = require("../model/operation-repository");

router.post("/crea", body('nom'),body('tempsRea'), body('description'), body('id_machine'), body('id_poste'),async(req,res) => {

    const createOperation =  await operationRepository.createOperation(req.body.nom, req.body.tempsRea, req.body.description,req.body.id_machine,  req.body.id_poste);
    if(createOperation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createOperation);
    }
});
router.post("/modif", body('id'),body('nom'),body('tempsRea'), body('description'), body('id_machine'), body('id_poste'),async(req,res) => {

    const modifOperation =  await operationRepository.modifOperation(req.body.id,req.body.nom, req.body.tempsRea, req.body.description,req.body.id_machine,  req.body.id_poste);
    if(modifOperation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifOperation);
    }
});
router.post("/supp",body('id'),async(req,res) => {

    const suppOperation =  await operationRepository.suppOperation(req.body.id);
    if(suppOperation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppOperation);
    }
});
router.get("/getAll",async(req,res) => {

    let getAll =  await operationRepository.getAll();
    res.status(200).json(getAll);

});
router.get("/getOne/:id",async(req,res) => {

    let getOne=  await operationRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});
router.get("/getByName/:nom",async(req,res) => {

    let getALL=  await operationRepository.getByName(req.params.nom);
    res.status(200).json(getALL);

});
router.get("/getByListeOp/:id",async(req,res) => {

    let getALL=  await operationRepository.getByListeOp(req.params.id);
    res.status(200).json(getALL);

});
router.post("/suppListeOp",body('id_operation'), body('id_gamme'), async(req,res) => {

    const suppOperation =  await operationRepository.suppListeOperation(req.body.id_operation, req.body.id_gamme);
    if(suppOperation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppOperation);
    }
});

router.post("/creaListeOp",body('id_operation'), body('id_gamme'), async(req,res) => {

    const creaOperation =  await operationRepository.createListeOp(req.body.id_operation, req.body.id_gamme);
    if(creaOperation === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(creaOperation);
    }
});

router.get("/getOpNotInListeOp/:id",async(req,res) => {

    let getALL=  await operationRepository.getOpNotInListeOp(req.params.id);
    res.status(200).json(getALL);

});

exports.initializeRoutesOperation = () => router;