const { Router } = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = Router();


orderRouter.get("/total-sales", orderController.getTotalSales);

orderRouter.get("/", orderController.getAll);
orderRouter.get("/status", orderController.getOrderByStatus);

orderRouter.get("/:id", orderController.getOne);

orderRouter.get("/", orderController.getAll);
orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);

module.exports = orderRouter;
