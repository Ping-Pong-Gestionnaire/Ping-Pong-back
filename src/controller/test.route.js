const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get("",async(req,res) => {

    res.status(200).json("Ca marche" );

});


exports.initializeRoutesTest= () => router;