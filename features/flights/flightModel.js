
import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
    airline: { type: String, required: true },
    flight_number: { type: String, required: true },
    departure_city: { type: String, required: true },
    arrival_city: { type: String, required: true },
    departure_date: { type: Date, required: true },
    arrival_date: { type: Date, required: true },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Flight', FlightSchema);
