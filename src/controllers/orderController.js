import Order from "../models/orderModel.js";

// Obtener una orden por ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error al obtener orden:", error);
    res.status(500).json({ message: "Error al obtener orden" });
  }
};

// Obtener todas las órdenes de un cliente
export const getOrdersByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const orders = await Order.findAll({ where: { clientId } });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al listar órdenes del cliente:", error);
    res.status(500).json({ message: "Error al listar órdenes del cliente" });
  }
};

// Crear una nueva orden
export const createOrder = async (req, res) => {
  const { clientId, products, total } = req.body;

  if (!clientId || !products || !total) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const newOrder = await Order.create({
      clientId,
      products,
      total,
      status: "pendiente",
      creationDate: new Date(),
    });

    return res.status(201).json({ message: "Orden creada correctamente", data: newOrder });
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({ message: "Error al crear orden" });
  }
};

// Actualizar estado de la orden
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    await order.update({ status });

    return res.status(200).json({ message: "Estado de la orden actualizado", data: order });

  } catch (error) {
    console.error("Error al actualizar estado de orden:", error);
    res.status(500).json({ message: "Error al actualizar estado de orden" });
  }
};
