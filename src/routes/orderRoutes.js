import express from "express";
import {
  getOrderById,
  getOrdersByClient,
  createOrder,
  updateOrderStatus,
} from "../controllers/orderController.js"; // Importar controladores de órdenes

const router = express.Router(); // Router para órdenes

router.get("/:id", getOrderById);
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 * /app/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *      '200':
 *        description: A successful response
 */

router.get("/client/:clientId", getOrdersByClient);
/**
 * @swagger
 * /app/orders/client/{clientId}:
 *   get:
 *     summary: Get orders by client ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *      '200':
 *        description: A successful response
 */

router.post("/create", createOrder);
/**
 * @swagger
 * /app/orders/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     responses:
 *      '201':
 *        description: Order created successfully
 */

router.patch("/status/:id", updateOrderStatus);
/**
 * @swagger
 * /app/orders/status/{id}:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *      '200':
 *        description: Order status updated
 */

export default router;
