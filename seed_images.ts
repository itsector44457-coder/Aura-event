import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Define Minimal schemas for update
const heroSchema = new mongoose.Schema({ bgImageUrl: String }, { strict: false });
const Hero = mongoose.models.Hero || mongoose.model('Hero', heroSchema);

const serviceSchema = new mongoose.Schema({ icon: String }, { strict: false });
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

const portfolioSchema = new mongoose.Schema({ imageUrl: String, title: String, category: String }, { strict: false });
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

async function seed() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected.");

    // Update Hero
    const heroImage = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000";
    await Hero.findOneAndUpdate({}, { bgImageUrl: heroImage }, { upsert: true });
    console.log("Hero updated with luxury image.");

    // Update Services (if they have /images/wedding.png etc)
    const services = await Service.find();
    if (services.length > 0) {
        // If there are services, we can update any that look broken or just update the first two if they exist
        const defaultServiceImages = [
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", // luxury event
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800", // corporate
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1533174000276-26e7a2b9dcf2?auto=format&fit=crop&q=80&w=800"
        ];
        
        for (let i = 0; i < services.length; i++) {
            if (services[i].icon.includes('.png') || services[i].icon.includes('.jpg')) {
                await Service.findByIdAndUpdate(services[i]._id, { icon: defaultServiceImages[i % defaultServiceImages.length] });
            }
        }
        console.log("Services updated with luxury images.");
    }

    // Update or Insert Portfolio Items
    await Portfolio.deleteMany({});
    await Portfolio.create([
        { title: "Royal Palace Wedding", category: "Weddings", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" },
        { title: "Tech Summit 2023", category: "Corporate", imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
        { title: "Vogue Fashion Gala", category: "Galas", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" },
        { title: "Monaco Grand Prix Party", category: "Private", imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800" },
        { title: "Global CEO Retreat", category: "Corporate", imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800" },
        { title: "Venetian Masquerade", category: "Galas", imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=800" }
    ]);
    console.log("Portfolio seeded with luxury images.");

    mongoose.disconnect();
    console.log("Done.");
}

seed().catch(console.error);
