
const mongoose = require("mongoose")

const horseSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
  notes: String,
})

module.exports = mongoose.model("Horse", horseSchema)


