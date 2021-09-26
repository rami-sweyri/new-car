const { Router } = require("express");
const checkPermissions = require("../middleware/checkPermissions");
const isAuthenticated = require("../middleware/isAuthenticated");
const orderController = require("../controllers/order");
const router = Router();

router.post(
  "/",
  isAuthenticated,
  // checkPermissions(['createOrder']),
  orderController.create
);
router.get(
  "/",
  isAuthenticated,
  checkPermissions(["findOrders"]),
  orderController.find
);
router.get(
  "/all",
  isAuthenticated,
  checkPermissions(["findAllOrders"]),
  orderController.findAll
);
router.get(
  "/me",
  isAuthenticated,
  checkPermissions(["findMeOrders"]),
  orderController.findMe
);
router.get(
  "/:id",
  isAuthenticated,
  checkPermissions(["findOneOrder"]),
  orderController.findOne
);
router.patch(
  "/:id",
  isAuthenticated,
  checkPermissions(["updateOrder"]),
  orderController.update
);
router.delete(
  "/:id",
  isAuthenticated,
  checkPermissions(["deleteOrder"]),
  orderController.delete
);

module.exports = router;
