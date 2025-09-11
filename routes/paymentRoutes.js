const router = require("express").Router()
const paymentController = require("../controllers/payment")

router.get("/", paymentController.indexPayment)
router.get("/:paymentId", paymentController.showPayment)
router.post("/", paymentController.createPayment)
router.delete("/:paymentId", paymentController.deletePayment)

// owner actions
router.put("/:paymentId/owner-mark", paymentController.ownerMarkPayment)
// Admin actions
router.put("/:paymentId/admin-confirm/:ownerId", paymentController.adminConfirmPayment)
router.put("/:paymentId/admin-reject/:ownerId", paymentController.adminRejectPayment)

module.exports = router
