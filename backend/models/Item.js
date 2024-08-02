const mongoose = require('mongoose');
const { Schema } =  mongoose;


const ItemsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    pantryitem: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: String,
        default: Date.now
    }
  });

  module.exports = mongoose.model('items', ItemsSchema);