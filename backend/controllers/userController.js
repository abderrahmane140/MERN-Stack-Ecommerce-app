const User= require('../models/userModel')
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET,{ expiresIn:'3d' })
}


const loginUser = async (req,res) => {
    const { email,password } =req.body

    try{
        const user = await User.login(email,password)
        const username = user.username
        const avtare=user.avtare
        //create a takon 
        const token =createToken(user._id)
        
        res.status(200).json({email, username, token, avtare})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req,res) => {
    const { email,password,username } =req.body

    try{
        const user = await User.signup(email,password,username)
        const avtare=user.avtare
        //create a takon 
        const token =createToken(user._id)
        res.status(200).json({email, username, token,avtare})

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const google = async (req,res) => {
    try{
        const user = await User.findOne({email : req.body.email})
        if (user) {
            const username = user.username
            const avtare=user.avtare
            //create a takon 
            const token =createToken(user._id)
            
            res.status(200).json({email,username, token,avtare})
        }else{

        const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
        username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        });
        await newUser.save();
        
        const avtare=newUser.avtare
        //create a takon 
        const token =createToken(newUser._id)
        res.status(200).json({email, username, token,avtare}) 
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
module.exports ={ loginUser, signupUser,google}