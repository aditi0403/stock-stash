const express= require('express');
const router = express.Router();
const Item = require('../models/Item'); 
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: get all the items using: GET '/api/items/fetchallitems'. login required
router.get('/fetchallitems', fetchuser, async (req,res) => {
    try {
        const item = await Item.find({user: req.user.id})
    res.json(item) 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    
})
// ROUTE 2: Add a new item using: POSt '/api/items/additem'. login required
router.post('/additem', fetchuser, [
    body('pantryitem', 'Provide a name for your item').isLength({min:3}),
    body('category', 'category must be 6 characters long').isLength({min: 6})
], async (req,res) => {
    try {
        const {pantryitem, category, tag} = req.body;
    // if there are errors then return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json ({errors: errors.array()})
    };

    const item = new Item({
        pantryitem, category, tag, user: req.user.id
    })
    const savedItem = await item.save()

    res.json(savedItem)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE 3: update an existing item using: PUT '/api/items/updateitem'. login required
router.put('/updateitem/:id', fetchuser, async (req,res) => {
    const {pantryitem, category, tag}= req.body;
    try {
        // create a new item object
        const newItem = {};
        if(pantryitem) {newItem.pantryitem= pantryitem};
        if(category) {newItem.category= category};
        if(tag) {newItem.tag = tag};

        //find the ote to be updated and upodte it
        let item = await Item.findById(req.params.id);
        if(!item) {return res.status(404).send("Not Found")}
        if(item.user.toString() !== req.user.id) {return res.status(401).send("Not Allowed")};

        item = await Item.findByIdAndUpdate(req.params.id, {$set: newItem}, {new: true})
        res.json({item});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    
 })

// ROUTE 4: delete an existing item using: DELETE '/api/items/deleteitem'. login required
router.delete('/deleteitem/:id', fetchuser, async (req,res) => {
    const {pantryitem, category, tag}= req.body;

    try {
       //find the ote to be deleted and delete it
        let item = await Item.findById(req.params.id);
        if(!item) {return res.status(404).send("Not Found")}

        //allow deletion only if user owns this item
        if(item.user.toString() !== req.user.id) {return res.status(401).send("Not Allowed")};

        item = await Item.findByIdAndDelete(req.params.id)
        res.json({"success": "item has been deleted", item: item}); 
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
    }
    
 })


module.exports = router

