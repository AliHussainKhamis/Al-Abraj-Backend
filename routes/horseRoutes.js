const router = require("express").Router()
const horseController = require("../controllers/horse")

router.post("/",horseController.newHorse)
router.get("/",horseController.getHorse)
router.get("/:horseId",horseController.showHorse)
router.put("/:horseId",horseController.updateHorse)
router.delete("/:horseId",horseController.deleteHorse)

module.exports = router