const Horse = require("../models/Horse")

// Index
async function getHorse(req, res) {
  try {
    const gethorses = await Horse.find().populate("ownerId")
    if (gethorses.length > 0) {
      res.status(200).json(gethorses)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error in getting Horses:", error)
    res.status(500).json({ error: error.message })
  }
}

// Details
async function showHorse(req, res) {
  try {
    const horse = await Horse.findById(req.params.horseId).populate("ownerId")
    if (horse) {
      res.status(200).json(horse)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error in finding Horse:", error)
    res.status(500).json({ error: error.message })
  }
}

// Create
async function newHorse(req, res) {
  try {
    const data = req.body
    if (!data.image) {
      return res.status(400).json({ error: "Image is required" })
    }
    const horse = await Horse.create(data)
    res.status(201).json(horse)
  } catch (error) {
    console.log("Error creating horse:", error)
    res.status(500).json({ error: error.message })
  }
}


// Update 
async function updateHorse(req, res) {
  try {
    const horse = await Horse.findByIdAndUpdate(
      req.params.horseId,
      req.body,
      { new: true }
    ).populate("ownerId")

    if (!horse) return res.sendStatus(404)
    res.status(200).json(horse)
  } catch (error) {
    console.log("Error updating horse:", error)
    res.status(500).json({ error: error.message })
  }
}


// Delete
async function deleteHorse(req, res) {
  try {
    const horse = await Horse.findByIdAndDelete(req.params.horseId)
    if (horse) {
      res.status(200).json(horse)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log("Error in deleting the Horse:", error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getHorse,
  showHorse,
  newHorse,
  updateHorse,
  deleteHorse,
}
