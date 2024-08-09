import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({

    user_id: {
        type: Schema.Types.ObjectId, ref :'User'
     },

  destination_id: {
     type: Schema.Types.ObjectId, ref :'Destination'
  },

  rental_date:{
    type: Date,
    required: true
  },

  return_date: {
    type: Date,
    required : true
  },

  rental_amount: {
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



const Rental = mongoose.model('Rental', rentalSchema);
export default Rental;
