import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Define schema for soldBy
const soldBySchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

//Create soldBy model
const SoldBy = mongoose.model('SoldBy', soldBySchema);

export default SoldBy;