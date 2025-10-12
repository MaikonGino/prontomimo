import mongoose from 'mongoose';

// --- Sub-schema para as Variações ---
const VariationSchema = new mongoose.Schema({
    name: {type: String, required: true}, // Ex: "Rouge", "Nude"
    colorCode: {type: String}, // Ex: "#FF0000" (para mostrar a bolinha de cor)
    image: {type: String, required: true}, // URL da imagem para esta variação específica
});

// --- Schema Principal do Produto ---
const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true, default: 0},

    // NOVO: Campo para a imagem principal do produto
    mainImage: {type: String, required: true},

    category: {type: String},

    // NOVO: Array para armazenar as variações do produto
    variations: [VariationSchema],

    isAvailableForGift: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);