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


const searchMenuItems = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i");
    const allMenuItems = await MenuItems.getAll();
    const menuItems = allMenuItems.filter(
      (menuItem) =>
        regex.test(menuItem.name) || regex.test(menuItem.description)
    );

    res.send(menuItems);
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

module.exports = { getAll, getOne, create, updateMenuItem, deleteMenuItem, searchMenuItems};

