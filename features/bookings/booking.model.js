import { boolean, required } from 'joi';

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({

  user_id: {
    type: Schema.Types.ObjectId, ref :'User'
  },
  hotel_id: {
    type: Schema.Types.ObjectId, ref :'Hotel'
  },
 
  flight_id: {
    type: Schema.Types.ObjectId, ref :'Flight'
  },
  booking_date:{
    type: Date,
    required: true

  },
  check_in_date: {
    type: Date,
    required: true

  },

  check_out_date: {
    type: Date,
    required: true
  },

  total_amount: {
    type: number,
    required: true

  },

  status: {
    type: Boolean,
    Default: false
  },

  created_at: {
    type: Date,
    required: true
  },

  updated_at: {
    type: Date,
    required : true
  },

},{timestamps:true});



const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
