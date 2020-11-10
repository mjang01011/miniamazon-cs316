import express from 'express';
import Item from "../models/itemModel";
import SoldBy from "../models/soldByModel";
import { isAuth, isSeller, isAdmin} from '../util';
import sanitize from "mongo-sanitize";

const router = express.Router();

//TODO: add back auths
//Sorting functions
const alphabeticalAsc = (a,b) => a.itemName.localeCompare(b.itemName);
const alphabeticalDesc = (a,b) => b.itemName.localeCompare(a.itemName);
const categoryAsc = (a,b) => a.category.localeCompare(b.category);
const ratingAsc = (a,b) => b.avgRating - a.avgRating;

//Getting items (accessible to all users)
router.get("/", async(req, res) => {
    const searchKeyword = req.query.searchKeyword
        ? {
            itemName: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            },
        }
        : {};

    let sortOrder = req.query.sortOrder
    switch(sortOrder) {
        case "zToA":
            sortOrder = alphabeticalDesc;
            break;
        case "rating":
            sortOrder = ratingAsc;
            break;
        case "category":
            sortOrder = categoryAsc;
            break;
        default:
            sortOrder = alphabeticalAsc;
    }
    const items = await Item.find({...searchKeyword }).populate('reviews.authorId');
    items.sort(sortOrder);
    res.send(items);
})

router.get("/:id", async(req, res) => {
    const items = await Item.findById(sanitize(req.params.id)).populate('reviews.authorId');
    res.send(items);
})

//Posting, updating, deleting items (only accessible to sellers)

//for new items
router.post("/", isAuth, isSeller, async(req, res) => {
    const item = new Item({
        itemName: req.body.itemName,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
    });
    const newItem = await item.save();
    if (newItem) {
        const soldBy = new SoldBy({
            item: newItem._id,
            seller: req.user.uid,
            quantity: req.body.quantity,
            price: req.body.price,
        })
        const newSoldBy = await soldBy.save();
        if (newSoldBy) {
            return res.status(201).send({message: 'New item successfully added', data: newItem});
        } else {
            return res.status(500).send({message: 'Error in adding new item'});
        }
    }
    return res.status(500).send({message: 'Error in adding new item'});
})

//for existing items
router.post("/:id", isAuth, async(req, res) => {
    const itemId = sanitize(req.params.id);
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
        else res.status(201).send({message: 'Item successfully added', data: newItem});
    } else res.status(500).send({message: 'Item already exists', data: existingItem});
})

//Posting reviews (accessible to all users)
router.post('/review/:id', isAuth, async (req, res) => {
    const item = await Item.findById(sanitize(req.params.id));
    if (item) {
        const review = {
            authorId: req.user.uid,
            rating: Number(req.body.rating),
            comment: req.body.comment,
            title: req.body.title,
        };
        item.reviews.push(review);
        item.avgRating =
            Number(item.reviews.reduce((sumRating, currReview) => sumRating + currReview.rating, 0) / item.reviews.length).toFixed(2);
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

router.put("/:id", isAuth, isSeller, isAdmin, async(req, res) => {
    const itemId = sanitize(req.params.id);
    const item = await Item.findById(itemId);//this needs to be here??
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
    const item = await Item.findById(sanitize(req.params.id));
    if (item) {
        await item.remove();
        return res.send({message: 'Item successfully deleted'});
    }
    return res.send({message: 'Error in deleting item'});
})

export default router;