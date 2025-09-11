const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")

// Route
const authRoutes = require("./routes/authRoutes")
const medicineRoutes = require("./routes/medicineRoutes")
const horseRoutes = require("./routes/horseRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const deviceRoutes = require("./routes/deviceRoutes")

const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Route - app.use
app.use("/auth", authRoutes)
// app.use("/users", userRoutes)
app.use("/medicines", medicineRoutes)
app.use("/horses", horseRoutes)
app.use("/payments", paymentRoutes)
app.use("/devices", deviceRoutes)


// Multer
app.use("/uploads", express.static("uploads"))

// destination
const upload = multer({dest: "uploads/"})

// upload route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded"})
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  res.json({ url })
})


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