const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  payed: Boolean,
  date: Date,
})

module.exports = mongoose.model("Payment", paymentSchema)