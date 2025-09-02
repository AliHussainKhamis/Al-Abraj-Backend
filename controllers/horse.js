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
        const horse = await Horse.create()
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

