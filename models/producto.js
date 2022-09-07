const { mongoose } = require("mongoose");

const productosCollection = "productos"

const ProductoSchema = new mongoose.Schema({
    title: {type: String, require: true, max:100},
    price: {type: Number, require: true, max:1000},
    thumbnail: {type: String, require: true, max:1000}
    
})

module.exports = mongoose.model(productosCollection, ProductoSchema);


