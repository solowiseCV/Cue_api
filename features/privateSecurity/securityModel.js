import mongoose from 'mongoose';

const securitySchema = new mongoose.Schema({

    user_id: {
        type: Schema.Types.ObjectId, ref :'User'
     },

  booking_id: {
     type: Schema.Types.ObjectId, ref :'Booking'
  },
    

  security_provider: {
    type: String,
    required: true
  },

  start_date:{
    type: Date,
    required: true
  },

  end_date: {
    type: Date,
    required : true
  },

  amount: {
    type: Number, default : 0.0,
    required: true
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



const Security = mongoose.model('Security', securitySchema);
export default Security;
