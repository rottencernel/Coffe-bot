const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Order = new Schema(
    {
      id: Number,
      name: String,
      products: String,
      _status: String 
    },

    {
      timestamps: true
    }
)

Order.set("toJSON", {
    virtuals: true
  });


  
module.exports =mongoose.model("Order", Order)
