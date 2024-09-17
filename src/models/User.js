import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  isAdmin: {
    type: Boolean, 
    default: false 
  }
});

const User = mongoose.model('User', userSchema)

export default User
