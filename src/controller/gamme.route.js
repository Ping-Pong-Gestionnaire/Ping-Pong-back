const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const gammeRepository = require("../model/gamme-repository");

router.post("/crea", body('nom'),body('prix'),body('type'), body('qte'), body('id_user'),async(req,res) => {

    const createGamme =  await gammeRepository.createGamme(req.body.nom, req.body.prix, req.body.type,req.body.qte,  req.body.id_user);
    if(createGamme === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createGamme);
    }
});
router.post("/modif", body('id'),body('nom'),body('prix'),body('type'), body('qte'),  body('id_user'),async(req,res) => {

    const modifGamme =  await gammeRepository.modifGamme(req.body.id, req.body.nom, req.body.prix, req.body.type, req.body.qte,  req.body.id_user);
    if(modifGamme === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifGamme);
    }
});
router.post("/supp",body('id'),async(req,res) => {

    const suppGamme =  await gammeRepository.suppGamme(req.body.id);
    if(suppGamme === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppGamme);
    }
});
router.get("/getAll",async(req,res) => {

    let getAll =  await gammeRepository.getAll();
    res.status(200).json(getAll);

});
router.get("/getOne/:id",async(req,res) => {

    let getOne=  await gammeRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});
router.get("/getByType/:type",async(req,res) => {

    let getALL=  await gammeRepository.getByType(req.params.type);
    res.status(200).json(getALL);

});
router.get("/getByUser/:id_user",async(req,res) => {

    let getALL=  await gammeRepository.getByUser(req.params.id_user);
    res.status(200).json(getALL);

});
router.get("/getByName/:nom",async(req,res) => {

    let getALL=  await gammeRepository.getByName(req.params.nom);
    res.status(200).json(getALL);

});

exports.initializeRoutesGamme = () => router;