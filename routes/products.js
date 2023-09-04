var express = require('express');
var router = express.Router();
const productsController= require('../controllers/products.controller')

/* GET users listing. */
router.get('/', productsController.getAll);

//retorno un producto dado su id
router.get("/:id", productsController.getById);

  //crear un producto
  router.post("/", 
  (req,res,next)=>req.app.verifyToken(req,res,next),
  productsController.createProduct);

  //Actualizar un producto
  router.put("/:id",
  (req,res,next)=>req.app.verifyToken(req,res,next),
  productsController.updateProduct)

  //elinminar producto
  router.delete("/:id", (req,res,next)=> req.app.verifyToken(req,res,next),
   productsController.deleteProduct)

module.exports = router;