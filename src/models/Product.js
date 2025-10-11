import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true, default: 0},
    images: [{type: String}],
    category: {type: String},
    variations: [{
        name: String,
        options: [String]
    }],
    isAvailableForGift: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);