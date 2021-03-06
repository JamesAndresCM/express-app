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
      default: 'USER',
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

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}
module.exports = model('User', UserSchema);
