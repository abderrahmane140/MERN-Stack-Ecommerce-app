const mongoose=require('mongoose')
const Schema =mongoose.Schema
const bcrypt = require('bcrypt')
const validator= require('validator')
const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avtare:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
})
//static signup method

userSchema.statics.signup = async function(email,password,username) {
    //validation
    if(!email || !password || !username ){
        throw Error('all the field must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('the email not valide')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error("Email is already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user= await this.create({email, password:hash,username})

    return user
}

//static login method
userSchema.statics.login = async function (email ,password){
    if(!email || !password){
        throw Error('all the field must be filled')
    }

    const user= await this.findOne({ email })

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('incorrect password')
    }
    return user
}

//update user
module.exports =mongoose.model('User',userSchema)