import express from "express";
import {
  getOrderById,
  getOrdersByClient,
  createOrder,
  updateOrderStatus,
  cancelOrder
} from "../controllers/orderController.js";

const router = express.Router(); // Router para órdenes

// Obtener una orden por ID
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
 *       '200':
 *         description: A successful response
 */

// Obtener todas las órdenes de un cliente
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
 *       '200':
 *         description: A successful response
 */

// Crear una nueva orden
router.post("/create", createOrder);
/**
 * @swagger
 * /app/orders/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - products
 *               - total
 *             properties:
 *               clientId:
 *                 type: integer
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *               total:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Order created successfully
 */

// Actualizar estado de la orden
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pendiente, enviado, entregado, cancelado]
 *     responses:
 *       '200':
 *         description: Order status updated
 */

// Cancelar (eliminar lógicamente) una orden
router.delete("/:id", cancelOrder);
/**
 * @swagger
 * /app/orders/{id}:
 *   delete:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       '200':
 *         description: Order cancelled successfully
 */

export default router;
