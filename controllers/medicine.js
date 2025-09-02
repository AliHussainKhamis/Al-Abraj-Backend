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
const getMedicine = async (req, res) => {
  const med = await Medicine.findById(req.params.id);
  res.json(med)
}