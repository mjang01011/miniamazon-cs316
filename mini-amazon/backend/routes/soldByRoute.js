import express from 'express';
import SoldBy from "../models/soldByModel";
import { isAuth, isSeller } from '../util';

const router = express.Router();

//*** ALL endpoints here require isSeller authentication ***

//Get list of items sold by seller id
router.get("/", isAuth, isSeller, async(req, res) => {
    const sellList = await SoldBy.find({seller: req.user._id}).populate('item');
    res.send(sellList);
})

//Allow seller to amend item stock and price
router.put("/:id", isAuth, isSeller, async(req, res) => {
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

router.delete("/:id", isAuth, isSeller, async(req, res) => {
    const soldItemId = req.params.id;
    const soldItem = await SoldBy.findOne({item: soldItemId, seller: req.user._id});
    if (soldItem) {
        await soldItem.remove();
        return res.send({message: 'Item successfully deleted'});
    }
    return res.send({message: 'Error in deleting item'});
})

export default router;

