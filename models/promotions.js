const moongoose = require('mongoose')
const Schema = moongoose.Schema
require('mongoose-currency').loadType(moongoose);
const currency = moongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
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
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Promotion = moongoose.model('promotion', promotionSchema)
module.exports = Promotion