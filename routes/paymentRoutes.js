const router = require("express").Router()
const medicineController = require("../controllers/payment")

router.get("/", indexPayment)
router.get("/:paymentId", showPayment)
router.post("/", createPayment)
router.put("/:paymentId", updatePayment)
router.delete("/:paymentId", deletePayment)

router.put("/:paymentId/owner-mark", ownerMarkPayment)
router.put("/:paymentId/admin-confirm", adminConfirmPayment)
router.put("/:paymentId/admin-reject", adminRejectPayment)

module.exports = router