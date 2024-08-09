import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

    user_id: {
        type: Schema.Types.ObjectId, ref :'User'
     },

  hotel_id: {
     type: Schema.Types.ObjectId, ref :'Hotel'
  },
    
  rating: {
    type: Number, default : 0.0,
    required: true
  },

  comment: {
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



const Review = mongoose.model('Review', reviewSchema);
export default Review;
