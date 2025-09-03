const Payment = require("../models/Payment")

// Index
async function indexPayment(req, res) {
  try {
    const payments = await Payment.find().populate("ownerId").populate("horseId")
    if (payments.length > 0) {
      res.status(200).json(payments)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error fetching payments: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Details
async function showPayment(req, res) {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate("ownerId")
      .populate("horseId")
    if (payment) {
      res.status(200).json(payment)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error finding payment: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Create
async function createPayment(req, res) {
  try {
    const newPayment = await Payment.create(req.body)
    if (newPayment) {
      res.status(200).json(newPayment)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error creating payment: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Update
async function updatePayment(req, res) {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      req.body,
      { new: true }
    )
    if (payment) {
      res.status(200).json(payment)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error updating payment: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Delete
async function deletePayment(req, res) {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.paymentId)
    if (payment) {
      res.status(200).json(payment)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error deleting payment: ", error)
    res.status(500).json({ error: error.message })
  }
}

// <<<<<<<<<<  PAYMENT CHECK  >>>>>>>>>>

// Owner marks as paid 
async function ownerMarkPayment(req, res) {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      { ownerMarkedPaidOn: new Date(), status: "waiting-confirmation" },
      { new: true }
    )
    if (payment) {
      res.status(200).json(payment)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error owner-marking payment: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Admin confirms payment
async function adminConfirmPayment(req, res) {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      { confirmedPaidOn: new Date(), confirmedBy: req.body.adminId, status: "paid" },
      { new: true }
    )
    if (payment) {
      res.status(200).json(payment)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error confirming payment: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Admin rejects payment
async function adminRejectPayment(req, res) {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      { status: "rejected" },
      { new: true }
    )
    if (payment) {
      res.status(200).json(payment)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error rejecting payment: ", error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  indexPayment,
  showPayment,
  createPayment,
  updatePayment,
  deletePayment,
  ownerMarkPayment,
  adminConfirmPayment,
  adminRejectPayment
}
