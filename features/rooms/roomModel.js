import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    hotel_id:
     { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Hotel',
        required: true 
        },

    room_number: 
    {
          type: String,
          required: true 
        },

    room_type:
     { 
        type: String, required: true 
    },  

    price: 
    {
         type: Number, required: true
         },
    amenities:
     {
         type: [String] 
        }, 
    created_at: 
      {
         type: Date, default: Date.now 
        },
    updated_at: { 
        type: Date, default: Date.now
     }
});
const Room =  mongoose.model('Room', roomSchema);
export default Room;