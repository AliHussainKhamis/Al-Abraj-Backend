const Device = require('../models/Device')
const mqttClient = require('../mqttClient')

// INDEX
async function indexDevice(req, res) {
  try {
    const filter = {}
    if (req.query.creatorId) filter.creator = req.query.creatorId
    if (req.query.horseId)   filter.horseId = req.query.horseId

    const devices = await Device.find(filter).populate('creator').populate('horseId')
    if (devices.length > 0) res.status(200).json(devices)
    else res.sendStatus(204)
  } catch (error) {
    console.log('Error fetching devices:', error)
    res.status(500).json({ error: error.message })
  }
}

// SHOW
async function showDevice(req, res) {
  try {
    const device = await Device.findById(req.params.deviceId).populate('creator').populate('horseId')
    if (device) res.status(200).json(device)
    else res.sendStatus(204)
  } catch (error) {
    console.log('Error finding device:', error)
    res.status(500).json({ error: error.message })
  }
}

// CREATE
async function createDevice(req, res) {
  try {
    const newDevice = await Device.create(req.body)
    if (newDevice) {
      const populated = await Device.findById(newDevice._id).populate('creator').populate('horseId')
      res.status(200).json(populated)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    console.log('Error creating device:', error)
    res.status(500).json({ error: error.message })
  }
}

// UPDATE
async function updateDevice(req, res) {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.deviceId,
      req.body,
      { new: true }
    ).populate('creator').populate('horseId')
    if (device) res.status(200).json(device)
    else res.sendStatus(204)
  } catch (error) {
    console.log('Error updating device:', error)
    res.status(500).json({ error: error.message })
  }
}

// DELETE
async function deleteDevice(req, res) {
  try {
    const device = await Device.findByIdAndDelete(req.params.deviceId)
    if (device) res.status(200).json(device)
    else res.sendStatus(204)
  } catch (error) {
    console.log('Error deleting device:', error)
    res.status(500).json({ error: error.message })
  }
}

// CONTROL — publish an MQTT command

async function controlDevice(req, res) {
  try {
    const device = await Device.findById(req.params.deviceId)
    if (!device) return res.sendStatus(204)

    const { command } = req.body
    if (!command) return res.status(400).json({ error: 'Missing command' })

    mqttClient.publish(device.mqttTopic, command)

    res.status(200).json({
      ok: true,
      deviceId: device._id,
      topic: device.mqttTopic,
      command
    })
  } catch (error) {
    console.log('Error controlling device:', error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  indexDevice,
  showDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  controlDevice
}
