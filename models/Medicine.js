const mongoose = require("mongoose")

const medicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
})

module.exports = mongoose.model("Medicine", medicineSchema)

