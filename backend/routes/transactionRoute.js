import express from 'express';
import Transaction from "../models/transactionModel";
import SoldBy from "../models/soldByModel";
import User from "../models/userModel"
import { isAuth } from '../util';
import sanitize from 'mongo-sanitize';

const router = express.Router();

//Get user's list of transactions
router.get("/", isAuth, async(req, res) => {
    const transactions = await Transaction.find({buyerId: sanitize(req.user.uid)}).populate('transactedItems.item transactedItems.seller');
    res.send(transactions);
})

//Create transactions when purchase is made, including checks on availability of balance and stock item
router.post("/", isAuth, async(req, res) => {
    let totalPrice = 0;

    //check every item has sufficient stock
    const transactedItems = [];
    for (const item of req.body.cartItems) {
        const soldItem = await SoldBy.findOne({seller: sanitize(item.seller), item: sanitize(item.product)});
        if (soldItem.quantity < item.qty) return res.status(403).send({message: `${item.name} has insufficient quantity in stock. Please reselect quantity.`});
        transactedItems.push({item: item.product, seller: item.seller, quantity: item.qty, price: item.price});
        totalPrice += item.qty * soldItem.price;
    }

    //check balance is enough
    const thisUser = await User.findById(sanitize(req.user.uid));
    if (totalPrice > thisUser.balance) return res.status(403).send({message: 'Insufficient balance amount! Please top up.'});


    //deduct item stock and award money to every seller
    for (const item of req.body.cartItems) {
        const soldItem = await SoldBy.findOne({seller: sanitize(item.seller), item: sanitize(item.product)});
        soldItem.quantity -= item.qty;
        await soldItem.save();

        const thisSeller = await User.findById(sanitize(item.seller));
        thisSeller.balance += item.qty * soldItem.price;
        await thisSeller.save()
    }

    //deduct total price from user
    thisUser.balance -= totalPrice;
    thisUser.save();

    //create transaction
    const transaction = new Transaction({
        buyerId: req.user.uid,
        totalPrice: totalPrice,
        transactedItems: transactedItems,
    });
    const newTransaction = await transaction.save();
    if (newTransaction) {
        return res.status(201).send({message: 'Transaction made successfully.', data: newTransaction});
    }
    return res.status(500).send({message: 'Error in processing transaction.'});
})

export default router;