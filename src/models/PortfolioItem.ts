import mongoose from 'mongoose';
const PortfolioItemSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    size: { type: String, default: 'small', enum: ['small', 'large', 'tall', 'wide'] }
}, { timestamps: true });
export default mongoose.models.PortfolioItem || mongoose.model('PortfolioItem', PortfolioItemSchema);
