import { DataTypes } from "sequelize";
import sequelize from "../config/bd.js";
import Client from "./clientModel.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: "id",
    }
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: "Lista de productos comprados con id, nombre, cantidad y precio",
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pendiente",
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: "orders",
});

// Relación explícita
Order.belongsTo(Client, { foreignKey: "clientId" });

export default Order;
