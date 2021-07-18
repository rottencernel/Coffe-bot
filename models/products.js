const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Products = new Schema(
    {
    name: String,
    price: String
    }
)

Products.set("toJSON", {
    virtuals: true
  })
  
  module.exports = mongoose.model("Products", Products)
  

