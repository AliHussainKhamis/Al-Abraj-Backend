const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
  amount: Number,
  dueDate: Date,
  paidOn: Date,
  status: { type: String, default: "pending" },
  notes: String,
})

module.exports = mongoose.model("Payment", paymentSchema)
