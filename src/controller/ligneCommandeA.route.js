const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fournRepository = require("../model/fournisseur-repository");
const LigneCRepository = require("../model/ligneCommandeAchat-repository");

router.post("/crea", body('libelle'),body('qte'),body('prix'),body('id_gamme'), body('id_commande'),async(req,res) => {

    const createLigne =  await LigneCRepository.createLigne(req.body.libelle, req.body.qte, req.body.prix, req.body.id_gamme, req.body.id_commande);
    if(createLigne === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createLigne);
    }
});
router.post("/modif",body('id'), body('libelle'),body('qte'),body('prix'),body('id_gamme'), body('id_commande'),async(req,res) => {

    const modifLigne =  await LigneCRepository.modifLigne(req.body.id,req.body.libelle, req.body.qte, req.body.prix, req.body.id_gamme, req.body.id_commande);
    if(modifLigne === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifLigne);
    }
});
router.post("/supp",body('id'),async(req,res) => {

    const suppLigne =  await LigneCRepository.suppLigne(req.body.id);
    if(suppLigne === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppLigne);
    }
});
router.get("/getAll",async(req,res) => {

    let getAll =  await LigneCRepository.getAll();
    res.status(200).json(getAll);

});
router.get("/getOne/:id",async(req,res) => {

    let getOne=  await LigneCRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});
router.get("/getByCommande/:id",async(req,res) => {

    let getALL=  await LigneCRepository.getByCommande(req.params.id);
    res.status(200).json(getALL);

});


exports.initializeRoutesLigneAchat = () => router;