import mongoose, { Schema, Document } from 'mongoose';

export interface IContactLead extends Document {
    fullName: string;
    email: string;
    eventType: string;
    vision: string;
    status: 'New' | 'Contacted' | 'Closed';
    createdAt: Date;
}

const ContactLeadSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    eventType: { type: String, required: true },
    vision: { type: String, required: true },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ContactLead || mongoose.model<IContactLead>('ContactLead', ContactLeadSchema);
