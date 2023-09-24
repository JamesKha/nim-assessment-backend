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

const deleteMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    //Find the items by ID 
    const menuItem = await MenuItems.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).send("Menu item not found");
    }
    //Removing the item from the menu 
    await menuItem.remove();
    res.send({ id: menuItemId });
    return null;
  } catch (error) {
    //Sending the status 500 if the statements within try fail 
    res.status(500).send(error);
    return null;
  }
};

module.exports = { getAll, getOne, create, deleteMenuItem };
