const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const LigneCRepository = require("../model/ligneCommandeAchat-repository");
const CommandeRepository = require("../model/commandeAchat-repository");

router.post("/crea", body('statut'),body('dateLivPrev'),body('dateLivReel'),body('id_fourn'), async(req,res) => {

    const createCommande =  await CommandeRepository.createCommande(req.body.statut, req.body.dateLivPrev, req.body.dateLivReel, req.body.id_fourn);
    if(createCommande === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(createCommande);
    }
});
router.post("/modif",body('id'),body('statut'),body('dateLivPrev'),body('dateLivReel'),body('id_fourn'),async(req,res) => {

    const modifCommande =  await CommandeRepository.modifCommande(req.body.id,req.body.statut, req.body.dateLivPrev, req.body.dateLivReel, req.body.id_fourn);
    if(modifCommande === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(modifCommande);
    }
});
router.post("/supp",body('id'),async(req,res) => {

    const suppCommande =  await CommandeRepository.suppCommande(req.body.id);
    if(suppCommande === "ok"){
        res.status(200).end();
    }
    else{
        res.status(400).send(suppCommande);
    }
});
router.get("/getAll",async(req,res) => {

    let getAll =  await CommandeRepository.getAll();
    res.status(200).json(getAll);

});
router.get("/getOne/:id",async(req,res) => {

    let getOne=  await CommandeRepository.getOne(req.params.id);
    res.status(200).json(getOne);

});
router.get("/getByStatut/:statut",async(req,res) => {

    let getALL=  await CommandeRepository.getByStatut(req.params.statut);
    res.status(200).json(getALL);

});
router.get("/getById/:id",async(req,res) => {

    let getALL=  await CommandeRepository.getById(req.params.id);
    res.status(200).json(getALL);

});



exports.initializeRoutesCommandeAChat = () => router;