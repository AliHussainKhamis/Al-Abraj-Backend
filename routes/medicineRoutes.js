const router = require("express").Router()
const medicineController = require("../controllers/medicine")


router.post("/", medicineController.createMedicine)
router.get("/", medicineController.indexMedicine)
router.get("/:medicineId", medicineController.showMedicine)
router.put("/:medicineId", medicineController.updateMedicine)
router.delete("/:medicineId", medicineController.deleteMedicine)


module.exports = router