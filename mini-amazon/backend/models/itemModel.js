import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Define review schema
const reviewSchema = new Schema(
    {
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true, min: 1, max: 5},
        title: { type: String, required: false },
        comment: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

//Define item schema
const itemSchema = new Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false }, // link to AWS file
    description: { type: String, required: true },
    reviews: [reviewSchema],
    avgRating: { type: Number, required: false, min: 0, max: 5, default: 0},
    lowestPrice: { type: Number, required: false, default: 0},
});

//Create item model
const Item = mongoose.model('Item', itemSchema);

export default Item;
