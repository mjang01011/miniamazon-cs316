import express from 'express';
import Item from "../models/itemModel";
import { getToken } from "../util";

const router = express.Router();

router.get("/", async(req, res) => {
    const items = await Item.find({});
    res.send(items);
})

router.post("/", async(req, res) => {
    const item = new Item({
        itemId: req.body.itemId,
        itemName: req.body.itemName,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
    });
    const newItem = await item.save();
    if (newItem) {
        return res.status(201).send({message: 'New item successfully added', data: newItem});
    }
    return res.status(500).send({message: 'Error in adding new item'});
})

router.put("/:id", async(req, res) => {
    const itemId = req.params.id;
    const item = await Item.findOne({_id: itemId});
    if (item) {
        item.itemName = req.body.itemName;
        item.category = req.body.category;
        item.image = req.body.image;
        item.description =  req.body.description;
    }
    const updatedItem = await item.save();
    if (updatedItem) {
        return res.status(200).send({message: 'Item successfully updated', data: updatedItem});
    }
    return res.status(500).send({message: 'Error in updating item'});
})

router.delete("/:id", async(req, res) => {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (item) {
        await item.remove();
        return res.send({message: 'Item successfully deleted'});
    }
    return res.send({message: 'Error in deleting item'});
})


export default router;