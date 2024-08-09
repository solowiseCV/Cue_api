import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({

  flight_number:{
    type: String,
    required: true,
    unique: true

  },
  departure_city: {
    type: String,
    required: true

  },

  arrival_city: {
    type: String,
    required: true
  },

  airline: {
    type: String,
    required: true
  },

  departure_date: {
    type: Date, default: Date.now,
    required: true

  },

  arrival_date: {
    type: Date, default: Date.now,
    required: true
  },

  price: {
    type: Number, default : 0.0,
    required: true
  },

  created_at: {
    type: Date, default: Date.now,
    required : true
  },

  updated_at: {
    type: Date, default: Date.now,
    required : true
  },

},{timestamps:true});



const Flight = mongoose.model('Flight', flightSchema);
export default Flight;
