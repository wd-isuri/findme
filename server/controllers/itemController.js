
import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  try {
    const itemData = {...req.body};
      if (req.file) {
            itemData.imageUrl = `/uploads/${req.file.filename}`;
          }

    const newItem = await Item.create(itemData);
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
export const getItems = async (req, res) => {
  try{
    const {category,type,search} = req.query;
    let query ={};
    if(category){
      query.category = category;
    }
    if (type) {
      query.type = type.toUpperCase();
    }
    if (search){
      query.$or = [
        {title:{$regex:search,$options: 'i'}},
        {description:{$regex:search,$options: 'i'}},
      ]
    }

    const items = (await Item.find(query).sort({ createdAt: -1 }));
    res.status(200).json({
      success:true,
      count:items.length,
      data:items,
    });
  }catch (error){
    res.status(500).json({
      success:false,
      message: 'Server error while fetching items',
    });
  }
  };

  // Get a single item by its ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid item ID',
    });
  }
};

