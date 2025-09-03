const mongoose = require("mongoose")

const deviceSchema = new mongoose.Schema({
  name: String,
  topic: String,
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Horse', required: true, unique: true },
})

module.exports = mongoose.model("Payment", deviceSchema)