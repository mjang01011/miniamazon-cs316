import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Define transaction schema. A transaction is a list of transaction items made by a buyer at one datetime.
const transactionSchema = new Schema(
    {
        buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        totalPrice: { type: Number, required: true },
        transactedItems: [{
            item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
            seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }],
    },
    {
        timestamps: true,
    }
);

//Create transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
