const { google} =require("../controllers/googleController")
const express = require('express')

const router = express.Router()


router.post('/google', google);

module.exports= router