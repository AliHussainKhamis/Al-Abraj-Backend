const Horse = require("../models/Horse")

// Index
async function getHorse(req,res){
    try{
        const gethorses = await Horse.find()
        if(gethorses.length > 0){
            res.status(200).json(gethorses)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(error){
        console.log("Error in getting Horses:",error)
        res.status(500).json({error: error.message})
    }
}

// Details

// Create

// Update

// Delete