const mongoose= require ("../database/mongodb")
const bcrypt = require("bcrypt");

const UserSchema= mongoose.Schema({
    username: String,
    email: String,
    password: String
});

UserSchema.pre("save", function(next){
    this.password= bcrypt.hashSync(this.password, 10);
    next();
});
//se crea el modelo del usuario
const UserModel= mongoose.model('user',UserSchema);

module.exports= UserModel;