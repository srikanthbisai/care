import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
   
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  username:{
   type: String,
   required: true,
  },
  email: {
    type: String,
  },
  password:{
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  },
  medicalConditions: [String],
  medications: [String],
  emergencyContact: {
    name: String,
    phoneNumber: String,
  },
  preferences: {
    type: Map,
    of: String,
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

const User = mongoose.model('Client', UserSchema);

export default User;
