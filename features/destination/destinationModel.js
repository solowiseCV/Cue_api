
import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    country: { type: String, required: true },
    region: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    image_url: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Destination', DestinationSchema);
