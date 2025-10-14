import mongoose from 'mongoose';

const HeroSlideSchema = new mongoose.Schema({
    imageUrl: { type: String, required: [true, 'A URL da imagem é obrigatória.'] },
    linkUrl: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.HeroSlide || mongoose.model('HeroSlide', HeroSlideSchema);