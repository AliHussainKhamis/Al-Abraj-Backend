
const mongoose = require("mongoose")

const horseSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  owner: String,  
  notes: String,
})

module.exports = mongoose.model("Horse", horseSchema)


