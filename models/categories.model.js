const mongoose = require('../database/mongodb');

const CategorySchema = new mongoose.Schema({
    name:String
});

module.exports = mongoose.model("categories", CategorySchema);