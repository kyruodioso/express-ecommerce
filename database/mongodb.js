const { default: mongoose } = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/ecommerce`,
{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{console.log("connect database!")})
.catch((error=>console.log(error)))

module.exports = mongoose