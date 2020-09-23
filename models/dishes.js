const moongoose = require('mongoose')
const Schema = moongoose.Schema
require('mongoose-currency').loadType(moongoose);
const currency = moongoose.Types.Currency;


const commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
       default: ''
    },
    price: {
        type: currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Dishes = moongoose.model('Dish', dishSchema)
module.exports = Dishes