import express from 'express';
import SoldBy from "../models/soldByModel";
import { isAuth, isSeller } from '../util';

const router = express.Router();

//*** ALL endpoints here require isSeller authentication ***
//TODO: Add back auths

//Get list of items sold by seller id
router.get("/", async(req, res) => {
    console.log("test first router");
    const sellList = await SoldBy.find({seller: req.user._id}).populate('item');
    res.send(sellList);
})

//Get list of sellers that sell an item by item id
router.get("/:id", async(req, res) => {
    console.log("response coming...");
    const soldItemId = req.params.id;
    console.log(soldItemId);
    //added additional fields to populate
    const sellerList = await SoldBy.find({item: soldItemId}).populate('item', 'seller', 'quantity', 'price');
    res.send(sellerList);
})

//Allow seller to add item to seller list for the first time
router.post("/:id", async(req, res) => {
    const soldItemId = req.params.id;
    const soldBy = new SoldBy({
        item: soldItemId,
        seller: req.user._id,
        quantity: req.body.quantity,
        price: req.body.price,
    })
    const newSoldBy = await soldBy.save();
    if (newSoldBy) {
        return res.status(201).send({message: 'Item added to selling list', data: newSoldBy});
    }
    return res.status(500).send({message: 'Error in adding item'});
})

//Allow seller to amend item stock and price
router.put("/:id", async(req, res) => {
    const soldItemId = req.params.id;
    const soldItem = await SoldBy.findOne({item: soldItemId, seller: req.user._id});
    if (soldItem) {
        soldItem.quantity = req.body.quantity;
        soldItem.price = req.body.price;
    }
    const updatedItem = await soldItem.save();
    if (updatedItem) {
        return res.status(200).send({message: 'Successfully updated', data: updatedItem});
    }
    return res.status(500).send({message: 'Error in updating item'});
})

router.delete("/:id", async(req, res) => {
    const soldItemId = req.params.id;
    const soldItem = await SoldBy.findOne({item: soldItemId, seller: req.user._id});
    if (soldItem) {
        await soldItem.remove();
        return res.send({message: 'Item successfully deleted'});
    }
    return res.send({message: 'Error in deleting item'});
})

export default router;

