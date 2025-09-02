const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")

// Route


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Route - app.use


// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("App is listening")
})

// Database
mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', ()=>{
    console.log('Connected to Database')
})