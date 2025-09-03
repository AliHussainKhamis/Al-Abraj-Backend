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
