import express from 'express';
import Item from "../models/itemModel";
import SoldBy from "../models/soldByModel";
import { isAuth, isSeller, isAdmin} from '../util';

const router = express.Router();

//Getting items (accessible to all users)
router.get("/", async(req, res) => {
    const items = await Item.find({});
    res.send(items);
})

router.get("/:id", async(req, res) => {
    const items = await Item.findById(req.params.id);
    res.send(items);
})

//Posting, updating, deleting items (only accessible to sellers)
router.post("/:id", isAuth, isSeller, async(req, res) => {
    const itemId = req.params.id;
    const existingItem = await Item.findOne({_id: itemId});
    //If item does not exist, create one
    if (!existingItem) {
        const item = new Item({
            itemName: req.body.itemName,
            category: req.body.category,
            image: req.body.image,
            description: req.body.description,
        });
        const newItem = await item.save();
        if (!newItem) return res.status(500).send({message: 'Error in adding new item'});
    }
    //Add to the SoldBy schema
    const soldBy = new SoldBy({
        item: itemId,
        seller: req.user._id,
        quantity: req.body.quantity,
        price: req.body.price,
    })
    const newSoldBy = await soldBy.save();
    if (newSoldBy) {
        return res.status(201).send({message: 'Item successfully added', data: newItem});
    }
    return res.status(500).send({message: 'Error in adding item'});
})

//Posting reviews (accessible to all users)
router.post('/:id/reviews', isAuth, async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        const review = {
            rating: Number(req.body.rating),
            comment: req.body.comment,
            title: req.body.title,
        };
        item.reviews.push(review);
        item.avgRating =
            item.reviews.reduce((sumRating, currReview) => {return sumRating + currReview.rating}, 0) / item.reviews.length;
        await item.save();
        res.status(201).send({
            data: review,
            message: 'Review successfully posted.',
        });
    } else {
        res.status(404).send({ message: 'Item could not be found.' });
    }
});

//*** Admin endpoints below. SHOULD NOT BE TOUCHED BY USERS. To change item stock/quantity by seller, use soldByRoute endpoints ****
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

router.put("/:id", isAuth, isSeller, isAdmin, async(req, res) => {
    const item = await Item.findById(req.params.id);
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

router.delete("/:id", isAuth, isSeller, isAdmin, async(req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        await item.remove();
        return res.send({message: 'Item successfully deleted'});
    }
    return res.send({message: 'Error in deleting item'});
})

export default router;