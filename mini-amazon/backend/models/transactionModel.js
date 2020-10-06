import mongoose from 'mongoose';

//define order schema. An order is for a specific purchase of an item by a buyer from a seller.
const orderSchema = new mongoose.Schema(
    {
        itemId: { type: String, required: true },
        sellerId: { type: String, required: true },
        orderQty: { type: Number, required: true },
        orderPrice: { type: Number, required: true },
    },
);

//define transaction schema. A transaction is a list of orders made by a buyer at one datetime.
const transactionSchema = new mongoose.Schema(
    {
        transactionId: { type: String, required: true, unique: true },
        buyerId: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        orders: [orderSchema],
    },
    {
        timestamps: true,
    }
);

//Create model
const transactionModel = mongoose.model('Transaction', transactionSchema);

export default transactionModel;
