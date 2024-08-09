import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    rental_date: { type: Date, required: true },
    return_date: { type: Date, required: true },
    rental_amount: { type: Number, required: true },
    status: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Rental', RentalSchema);
