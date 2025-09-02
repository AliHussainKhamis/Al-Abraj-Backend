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
async function showMedicine(req,res){
    try{
        const medicine = await Medicine.findById()
        if (medicine){
            res.status(200).json(medicine)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(error){
        console.log("Error finding medicine: ", error)
        res.status(500).json({error: error.message})
    }
}