const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
  mqttTopic: { type: String, required: true }, 
  description: String,
  name: { type: String, required: true },
  room: { type: String, required: true },
})

module.exports = mongoose.model('Device', deviceSchema);
