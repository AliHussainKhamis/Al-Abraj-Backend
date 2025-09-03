const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  horseId: { type: mongoose.Schema.Types.ObjectId, ref: "Horse" }, 
  amount: Number,
  dueDate: Date,

  // owner 
  ownerMarkedPaidOn: Date,
  ownerNote: String,

  // admin confirmation
  confirmedPaidOn: Date,
  confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  status: { type: String, default: "pending" }, 
}, { timestamps: true })

module.exports = mongoose.model("Payment", paymentSchema)
