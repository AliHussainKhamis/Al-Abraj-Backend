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
async function showHorse(req,res){
    try{
        const horse = await Horse.findById()
        if(horse){
            res.status(200).json(horse)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(error){
        console.log("Error in finding Horse:",error)
        res.status(500).json({error: error.message})
    }
}

// Create
async function newHorse(req,res){
    try{
        const horse = await Horse.create(req.body)
        if(horse){
            res.status(200).json(horse)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(error){
        console.log("Error in creating a new Horse:",error)
        res.status(500).json({error: error.message})
    }
}

// Update
async function updateHorse(req,res){
    try{
        const horse = await Horse.findByIdAndUpdate(
            req.params.horseId,
            req.body,
            {new : true}
        )
        if(horse){
            res.status(200).json(horse)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(error){
        console.log("Error in updating the Horse:",error)
        res.status(500).json({error: error.message})
    }
}

// Delete
async function deleteHorse(req,res){
    try{
        const horse = await Horse.findByIdAndDelete(req.params.horseId)
        if(horse){
            res.status(200).json(horse)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(error){
        console.log("Error in deleting the Horse:",error)
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getHorse,
    showHorse,
    newHorse,
    updateHorse,
    deleteHorse,
}