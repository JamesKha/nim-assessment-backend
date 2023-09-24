const Order = require("../db/models/orders.js");

const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await Order.getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const order = await Order.remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByCustomer = async (req, res) => {
  try {
    const orders = await Order.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};


const getTotalSales = async (req, res) => {
  try {
    const orders = await Order.getAll();
    // Getting the entire order total
    const totalSales = orders.reduce((total, order) => {
      // Getting each total from each order
      const eachOrderTotal = order.items.reduce((orderTotal, item) => {
        // Getting each total from each item
        const itemTotal = item.quantity * item.item.price;
        return orderTotal + itemTotal;
      }, 0);
      return total + eachOrderTotal;
    }, 0);

    res.send({ totalSales });

const getOrderByStatus = async (req, res) => {
  try {
    const status = req.query.s;
    // Get all orders by status
    const orders = await Order.getByStatus(status);
    res.json(orders);

  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByCustomer,

  getTotalSales

  getOrderByStatus

};
