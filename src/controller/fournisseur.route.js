const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const gammeRepository = require("../model/gamme-repository");
const fournRepository = require("../model/fournisseur-repository");

router.post("/crea", body('nom'),body('tel'),body('email'),async(req,res) => {

    const createFourn =  await fournRepository.createFourn(req.body.nom, req.body.tel, req.body.email);
    if(createFourn === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createFourn);
    }
});
router.post("/modif", body('id'),body('nom'),body('tel'),body('email'),async(req,res) => {

    const modifFourn =  await fournRepository.modifFourn(req.body.id, req.body.nom, req.body.tel, req.body.email);
    if(modifFourn === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifFourn);
    }
});
router.post("/supp",body('id'),async(req,res) => {

    const suppFourn =  await fournRepository.suppFourn(req.body.id);
    if(suppFourn === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppFourn);
    }
});
router.get("/getAll",async(req,res) => {

    let getAll =  await fournRepository.getAll();
    res.status(200).json(getAll);

});
router.get("/getOne/:id",async(req,res) => {

    let getOne=  await fournRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});
router.get("/getByName/:name",async(req,res) => {

    let getALL=  await fournRepository.getByName(req.params.name);
    res.status(200).json(getALL);

});
router.get("/getGamme/:id",async(req,res) => {

    let getALL=  await fournRepository.getGamme(req.params.id);
    res.status(200).json(getALL);

});


exports.initializeRoutesFourn = () => router;