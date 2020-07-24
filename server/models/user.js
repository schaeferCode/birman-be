const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      lowercase: true,
      type: String,
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    }
    // email: {
    //   type: String,
    //   lowercase: true
    // }
  }
});

userSchema.pre('save', async function(next) {
  try {
    if (this.method !== 'local') {
      next();
    }
    // Generate a password hash
    this.local.password = await bcrypt.hash(this.local.password, 10)
    next();
  } catch (error) {
    next(error);
  }
})

userSchema.methods.isValidPassword = async function(submittedPassword) {
  try {
    return await bcrypt.compare(submittedPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}

// Create a model
const User = mongoose.model('user', userSchema);

// Export the modal
module.exports = User;
