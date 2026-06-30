import mongoose from 'mongoose';
const TestimonialSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    eventType: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, default: 5 }
}, { timestamps: true });
export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
