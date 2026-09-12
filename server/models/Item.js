import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema(
    {
      title: {
      type: String,
      required: [true, 'Please add an item title'],
      trim: true,   
    },
        description:{
            type:String,
            required:[true, 'Please add an item description'],
    },
        category:{
            type:String,
            required:[true, 'Please select a category'],
            enum:['Electronics', 'Clothing', 'Books & Stationery', 'Bags & Wallets', 'ID/Credit cards & Keys','Other'],
        
        },
        type:{
            type:String,
            required:[true, 'please specify if the item is lost or found'],
            enum:['LOST','FOUND'],
            uppercase: true, 
        },
        location:{
            type:String,
            required:[true,'Please enter the location where the item was lost or found'],
        },
        imageUrl: {
            type: String,
            default: '',
        },
        secretDetail: {
            type: String,
            default: '',
            select: false, 
        },
        status: {
            type: String,
            enum: ['OPEN', 'PENDING_CLAIM', 'RECOVERED'],
            default: 'OPEN',
        },
    },
        {
        timestamps: true,
}
);
const Item = mongoose.model('Item', itemSchema);
export default Item;
