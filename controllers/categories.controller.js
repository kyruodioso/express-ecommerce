const productsModel= require('../models/categories.model');

module.exports={
    getAll: async function(req, res, next){
        try {
            const products = await productsModel.find()
            res.json(products)
        } catch (error) {
            next(error)
        }
    },
    create:async function(req,res,next){
        try {
            console.log(req.body)
            console.log(req.body.name)

            const data = new productsModel({
                name:req.body.name
            })
            const response= await data.save()
            res.json(response)
        } catch (error) {
            next(error)
        }
    }
}