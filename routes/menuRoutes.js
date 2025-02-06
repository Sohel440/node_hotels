const express = require('express'); 
const Menu = require('../models/Menu');
const router = express.Router();

router.post('/' , async(req , res)=>{
    try {
      
      const data = req.body;
      const newMenu = new Menu(data);
      const response = await newMenu.save();
      console.log("data saved !");
      res.status(200).json(response);
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error: "Internal error!"});
    }
});

router.get('/', async (req, res) => {
    try {
      const menuItems = await Menu.find();
      console.log("Menu data fetched!");
      res.status(200).json(menuItems);  // Send the fetched menu items
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal error!" });
    }
});


router.get('/:taste', async (req, res) => {
    console.log("Params received:", req.params); // Debugging log
    try {
        const Taste = req.params.taste;
        if (Taste === 'sweet' || Taste === 'spicy' || Taste === 'sour') {
            const data = await Menu.find({ taste: Taste });
            console.log("Data fetched !");
            return res.status(200).json(data);
        } else {
            return res.status(400).json({ error: "Invalid taste parameter" });
        }
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({ error: "Internal error!" });
    }
});


module.exports =router;
