var express= require("express");
var router= express.Router();
const categoriesController = require("../controllers/categories.controller");

//leer todas las categorias
router.get("/", categoriesController.getAll);
//crear categorias
router.post("/", categoriesController.create);

module.exports= router;