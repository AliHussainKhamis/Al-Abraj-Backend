const router = require("express").Router()
const deviceController = require("../controllers/device")


router.get('/', deviceController.indexDevice)                  
router.get('/:deviceId', deviceController.showDevice)          
router.post('/', deviceController.createDevice)                
router.put('/:deviceId', deviceController.updateDevice)        
router.delete('/:deviceId', deviceController.deleteDevice)     

// MQTT
router.post('/:deviceId/control', deviceController.controlDevice) 

module.exports = router
