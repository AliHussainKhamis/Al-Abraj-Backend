const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  dueDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  payments: [
    {
      ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, default: "pending" },
      paidOn: Date,
      confirmedPaidOn: Date
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model("Payment", paymentSchema)
