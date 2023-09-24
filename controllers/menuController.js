const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const menuItemData = req.body;
    const existingMenuItem = await MenuItems.getOne(menuItemId);

    if (!existingMenuItem) {
      return res.status(404).send("Menu item not found");
    }
    // Code below updates name, price, description
    if (menuItemData.name) {
      existingMenuItem.name = menuItemData.name;
    }
    if (menuItemData.price) {
      existingMenuItem.price = menuItemData.price;
    }
    if (menuItemData.description) {
      existingMenuItem.description = menuItemData.description;
    }

    // Updates the last changed time
    existingMenuItem.updatedAt = new Date();

    // Saves the item after all changes
    const updatedMenuItem = await existingMenuItem.save();

    res.send(updatedMenuItem);
    return null;
  } catch (error) {
    res.status(500).send(error);
  }
  return null;
};

module.exports = { getAll, getOne, create, updateMenuItem };
