import express from 'express';
import {createItem, getItems, getItemById} from '../controllers/itemController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('image'), createItem);
router.get('/',getItems);
router.get('/:id',getItemById);

export default router;
