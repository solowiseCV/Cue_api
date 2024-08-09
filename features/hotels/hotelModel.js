
import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    rating: {type: Number, min :0, max : 5},
    description: { type: String },
    destination_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: false },
    address: { type: String, required: true },
    rating: { type: Number },
    price_per_night: { type: Number, required: true },
    cheapestPrice: { type: Number, required: true },
    image_url: { type: String },
    rooms: [
        {
          type: { type: String, required: true },
          price: { type: Number, required: true },
        }
      ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},{timeseries:true});

export default mongoose.model('Hotel', HotelSchema);
