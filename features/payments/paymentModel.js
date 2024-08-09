import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({

  

  booking_id: {
     type: Schema.Types.ObjectId, ref :'Booking'
  },
    

  amount: {
    type: Number, default : 0.0,
    required: true
  },

  payment_date:{
    type: Date,
    required: true
  },

  payment_method: {
    type: String,
    required : true
  },

  status: {
    type: String,
    required : true
  },

  updated_at: {
    type: Date,
    required : true
  },

  created_at: {
    type: Date,
    required : true
  },



},{timestamps:true});



const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
