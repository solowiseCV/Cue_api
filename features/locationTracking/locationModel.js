import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({

  user_id: {
    type: Schema.Types.ObjectId, ref :'User'
  },
  
  latitude:{
    type: Number, Default: 0.0,
    required: true

  },
  longitude: {
    type: Number, Default: 0.0,
    required: true

  },

  timestamp: {
    type: Date,
    required: true
  },



},{timestamps:true});



const Location = mongoose.model('Location', locationSchema);
export default Location;
