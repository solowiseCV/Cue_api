import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true,
    unique: true

  },
  description: {
    type: String,
    required: true

  },

  destination_id: {
     type: Schema.Types.ObjectId, ref :'Destination'
  },
    
    
  address: {
    type: String,
    required: true

  },

  rating: {
    type: Number, default : 0.0,
    required: true
  },

  price_per_night: {
    type: Number, default : 0.0,
    required: true
  },

  image_url: {
    type: String,
    required : true
  },

  updated_at: {
    type: Date, default: Date.now,
    required : true
  },

  created_at: {
    type: Date, default: Date.now,
    required : true
  },



},{timestamps:true});



const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
