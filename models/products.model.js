const mongoose= require ("../database/mongodb")

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "campo obligatorio"],
    },
    price:{
        type: Number,
        min:[0, "Introducir un valor  válido"],
    },
    code: String,
    description: String,
    category: {
        type:mongoose.Schema.ObjectId,
        ref: "categories"
    },
});

ProductSchema.virtual("price_currency").get(function(){
    return `$ ${this.price}`;
});

ProductSchema.set("toJSON", {getters: true, setters: true, virtuals:true});
//se crea el modelo del producto
const ProductModel = mongoose.model('products', ProductSchema)

module.exports=ProductModel

