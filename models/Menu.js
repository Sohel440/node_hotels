const mongoose = require('mongoose');

const menuItem = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },price:{
        type:Number,
        required: true,
    },taste:{
        type: String,
        enum: ['sweet','spicy', 'sour']
    },is_drink:{
        type: Boolean,
        default:false
    },ingredients:{
        type:[String],
        default:[]
    },num_sale:{
        type:Number,
        default:0
    }
});

const Menu = mongoose.model('Menu' , menuItem);
module.exports = Menu;
