const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', () => {
  console.log("Connected to HiveMQ MQTT Broker")
})

client.on('error', (error) => {
  console.error("MQTT Connection Error:", error.message)
})

module.exports = client
