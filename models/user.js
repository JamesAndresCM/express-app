const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
      type: String,
      required: [true, 'Name must be present!']
    },

    email: {
      type: String,
      required: [true, 'Email must be present!'],
      unique: true
    },

    password: {
      type: String,
      required: [true, 'Password must be present!']
    },

    img: {
      type: String
    },

    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'USER']
    },

    status: {
      type: Boolean,
      default: true
    },

    google: {
      type: Boolean,
      default: false
    }
});

module.exports = model('User', UserSchema);
