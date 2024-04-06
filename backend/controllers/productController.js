const Product =require("../models/productModel")
const mongoose=require("mongoose")

//ret all products
const getProducts = async (req,res) => {
    const products = await Product.find({}).sort({ceatedAt: -1})

    res.status(200).json(products)
}

//get signle product
const getProduct = async (req,res) => {
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such product"})
    }
    const product = await Product.findById(id)

    if(!product){
        return res.status(404).json({error:"no such product"})
    }
    res.status(200).json(product)
}

//create new product
const CreateProduct =async (req,res)=>{
    const { title,description,price }=req.body
    //add doc to db
    try{
        const product= await Product.create({title,description,price})
        res.status(200).json(product)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a products

const deleteProducts= async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such product"})
    }
    const product= await Product.findOneAndDelete({_id:id})

    if(!product){
        return res.status(404).json({error:"no such product"})
    }
    res.status(200).json(product)
}

//update products

const updateProduct = async (req,res) => {
    const { id } =req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such product"})
    }
    const product= await Product.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!product){
        return res.status(404).json({error:"no such product"})
    }
    res.status(200).json(product)
}


module.exports = {
    getProducts,
    CreateProduct,
    getProduct,
    updateProduct,
    deleteProducts
}