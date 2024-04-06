const { loginUser, signupUser} =require("../controllers/userController")
const express = require('express')

const router = express.Router()


//login routre

router.post('/login',loginUser)

//signup routre

router.post("/signup" ,signupUser)

module.exports= router