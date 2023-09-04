const ProductModel = require("../models/products.model");


const getAll = async function (req, res, next) {
    try {
        console.log(req.query)
        //lectura de la base de datos
       const data = await ProductModel.find().populate({path:"category", select:"name"});
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }

};

const getById = async function (req, res, next) {
    try {
        console.log(req.params.id)
        //lectura de la base de datos
       const data = await ProductModel.findById(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async function (req, res, next) {
    try {
        const product = new ProductModel({
            title: req.body.title,
            price: req.body.price,
            code: req.body.code,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
        })
        const data = await product.save()
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
}

const updateProduct = async function(req, res, next) {
    console.log(req.params.id);
    console.log(req.body);
    res.json(req.body);
    try {
        console.log(req.query);
        await ProductModel.updateProduct({_id:req.params.id}, req-body);
        res.status(204).json();
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async(req, res, next) => {
    console.log(req.params.id);
   try {
    console.log(req.query)
    //se lee la base de datos
    await ProductModel.deleteProduct({_id:req.params.id});
    res.status(204).json();
   } catch (error) {
    console.log(error)
   }
};

module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}