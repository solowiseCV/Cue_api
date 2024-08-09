
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    flight_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
    booking_date: { type: Date, default: Date.now },
    check_in_date: { type: Date },
    check_out_date: { type: Date },
    total_amount: { type: Number, required: true },
    status: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', BookingSchema);
