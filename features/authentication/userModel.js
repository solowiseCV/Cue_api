import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"User name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true,"User email is required"],
    unique: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true,"User Password is required"],
  },
  phone: {
    type: String,
    required: [true,"User phone number is required"],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User', userSchema);
 export default User;
