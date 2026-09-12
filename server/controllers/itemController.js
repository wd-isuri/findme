
import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    // 2. Reply with success and the saved item
    res.status(201).json({
      success: true,
      message: 'Item reported successfully!',
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};