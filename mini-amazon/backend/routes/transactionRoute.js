import express from 'express';
import Transaction from "../models/transactionModel";
import { isAuth } from '../util';

const router = express.Router();

//Get user's list of transactions
router.get("/", isAuth, async(req, res) => {
    const transactions = await Transaction.find({buyerId: req.user._id}).populate('transactedItems.item transactedItems.seller');
    res.send(transactions);
})

//Create transactions when purchase is made
router.post("/", isAuth, async(req, res) => {
    const transaction = new Transaction({
        buyerId: req.user._id,
        totalPrice: req.body.totalPrice,
        transactedItems: req.body.transactedItems,
    });
    const newTransaction = await transaction.save();
    if (newTransaction) {
        return res.status(201).send({message: 'Transaction made successfully.', data: newTransaction});
    }
    return res.status(500).send({message: 'Error in processing transaction.'});
})

export default router;