const Payment = require("../models/Payment")
const User = require("../models/User")

// INDEX — list all payments with owners populated
async function indexPayment(req, res) {
  try {
    const payments = await Payment.find()
      .populate("createdBy","username _id")
      .populate("payments.ownerId","username _id")
    if (payments.length > 0) res.status(200).json(payments)
    else res.sendStatus(204)
  } catch (error) {
    console.log("Error fetching payments: ", error)
    res.status(500).json({ error: error.message })
  }
}

// SHOW — single payment
async function showPayment(req, res) {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate("createdBy", "username _id")
      .populate("payments.ownerId", "username _id") // << added , "username _id"
    if (payment) res.status(200).json(payment)
    else res.sendStatus(204)
  } catch (error) {
    console.log("Error finding payment:", error)
    res.status(500).json({ error: error.message })
  }
}

// CREATE — admin creates payment assigned to all owners
async function createPayment(req, res) {
  try {
    const { description, amount, dueDate, adminId } = req.body

    // find all owners
    const owners = await User.find({ role: "owner" })

    // build payment entries for each owner
    const paymentsArray = owners.map(o => ({
      ownerId: o._id,
      status: "pending"
    }))

    const newPayment = await Payment.create({
      description,
      amount,
      dueDate,
      createdBy: adminId,
      payments: paymentsArray
    })

    const populated = await Payment.findById(newPayment._id)
      .populate("createdBy")
      .populate("payments.ownerId")

    res.status(201).json(populated)
  } catch (error) {
    console.log("Error creating payment:", error)
    res.status(500).json({ error: error.message })
  }
}

// OWNER marks their own sub-payment as paid
async function ownerMarkPayment(req, res) {
  try {
    const { ownerId } = req.body
    const payment = await Payment.findById(req.params.paymentId)
    if (!payment) return res.sendStatus(404)

    const entry = payment.payments.find(p => p.ownerId.toString() === ownerId)
    if (!entry) return res.status(404).json({ error: "Owner not in this payment" })

    entry.status = "waiting-confirmation"
    entry.paidOn = new Date()

    await payment.save()
    const populated = await Payment.findById(payment._id).populate("payments.ownerId")
    res.status(200).json(populated)
  } catch (error) {
    console.log("Error owner-marking payment:", error)
    res.status(500).json({ error: error.message })
  }
}

// ADMIN confirms an owner’s sub-payment
async function adminConfirmPayment(req, res) {
  try {
    const { ownerId } = req.params
    const payment = await Payment.findById(req.params.paymentId)
    if (!payment) return res.sendStatus(404)

    const entry = payment.payments.find(p => p.ownerId.toString() === ownerId)
    if (!entry) return res.status(404).json({ error: "Owner not in this payment" })

    entry.status = "paid"
    entry.confirmedPaidOn = new Date()

    await payment.save()
    const populated = await Payment.findById(payment._id).populate("payments.ownerId")
    res.status(200).json(populated)
  } catch (error) {
    console.log("Error confirming payment:", error)
    res.status(500).json({ error: error.message })
  }
}

// ADMIN rejects an owner’s sub-payment
async function adminRejectPayment(req, res) {
  try {
    const { ownerId } = req.params
    const payment = await Payment.findById(req.params.paymentId)
    if (!payment) return res.sendStatus(404)

    const entry = payment.payments.find(p => p.ownerId.toString() === ownerId)
    if (!entry) return res.status(404).json({ error: "Owner not in this payment" })

    entry.status = "rejected"

    await payment.save()
    const populated = await Payment.findById(payment._id).populate("payments.ownerId")
    res.status(200).json(populated)
  } catch (error) {
    console.log("Error rejecting payment:", error)
    res.status(500).json({ error: error.message })
  }
}

// DELETE — remove whole payment (admin only)
async function deletePayment(req, res) {
  try {
    await Payment.findByIdAndDelete(req.params.paymentId)
    res.status(200).json({ message: "Payment deleted" })
  } catch (error) {
    console.log("Error deleting payment:", error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  indexPayment,
  showPayment,
  createPayment,
  ownerMarkPayment,
  adminConfirmPayment,
  adminRejectPayment,
  deletePayment
}
