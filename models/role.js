const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'role must be exists']
  }
});

module.exports = model('Role', RoleSchema);

