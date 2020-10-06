import mongoose from 'mongoose';

//define item schema
const itemSchema = new mongoose.Schema({
    itemId: { type: String, required: true, unique: true },
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: Blob, required: false },
    description: { type: String, required: true },
    reviews: [reviewSchema],
});

//define review schema
const reviewSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5},
        comment: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

//Create model
const itemModel = mongoose.model('Item', itemSchema);

export default itemModel;
