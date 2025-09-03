// controllers/medicineController.js
const Medicine = require("../models/Medicine")

// Index
async function indexMedicine(req, res) {
  try {
    const getMedicines = await Medicine.find()
    if (getMedicines.length > 0) {
      res.status(200).json(getMedicines)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error fetching medicines: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Details
async function showMedicine(req, res) {
  try {
    const medicine = await Medicine.findById(req.params.medicineId)
    if (medicine) {
      res.status(200).json(medicine)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error finding medicine: ", error)
    res.status(500).json({ error: error.message })
  }
}

// Create
async function createMedicine(req, res) {
  try {
    const newMedicine = await Medicine.create(req.body)
    if (newMedicine) {
      res.status(200).json(newMedicine)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error in creating Medicine:", error)
    res.status(500).json({ error: error.message })
  }
}

// Update
async function updateMedicine(req, res) {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.medicineId,
      req.body,
      { new: true }
    )
    if (medicine) {
      res.status(200).json(medicine)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error in Updating Medicine:", error)
    res.status(500).json({ error: error.message })
  }
}

// Delete
async function deleteMedicine(req, res) {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.medicineId)
    if (medicine) {
      res.status(200).json(medicine)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error in deleting Medicine: ", error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  indexMedicine,
  showMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine
}
