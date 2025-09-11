const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
  mqttTopic: { type: String, required: true },
  name:      { type: String, required: true },
  room:      { type: String, required: true },
  description: String,

  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  horseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Horse' }
}, { timestamps: true })

module.exports = mongoose.model('Device', deviceSchema)
