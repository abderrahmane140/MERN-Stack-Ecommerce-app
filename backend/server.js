require('dotenv').config()
const mongoose=require('mongoose')
const express = require('express')

const ProductsRouter = require('./routes/product')
const userRouter = require('./routes/user')
const googleRouter = require('./routes/google')


//express app
const app =express()

//midllleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})

//routes
app.use('/api/products',ProductsRouter)
app.use('/api/user',userRouter)
app.use('/api/auth',googleRouter)

//connect to db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log('connect to db & listen on the port',process.env.PORT);
    })
}).catch((err)=>{
    console.log(err);
})



