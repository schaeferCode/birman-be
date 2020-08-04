const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const AD_SERVICES_LIST = ['google', 'facebook'];

const adServicesSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: AD_SERVICES_LIST
  },
  serviceClientId: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
})

const activatedAdServices = new Schema({
  name: {
    type: String,
    required: true,
    enum: AD_SERVICES_LIST
  },
  serviceUserId: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
})

const userSchema = new Schema({
  givenName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'root']
  },
  dateCreated: {
    type: Date, 
    default: Date.now
  },
  linkedAdServices: {
    type: [activatedAdServices]
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
})
  
const tenantSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  adServices: {
    type: [adServicesSchema]
  },
  users: {
    type: [userSchema]
  }
})

userSchema.pre('save', async function(next) {
  try {
    // Generate a password hash
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
    next();
  } catch (error) {
    next(error);
  }
})

userSchema.methods.isValidPassword = async function(submittedPassword) {
  try {
    return await bcrypt.compare(submittedPassword, this.passwordHash);
  } catch (error) {
    throw new Error(error);
  }
}

// Create a model
const Tenant = mongoose.model('tenant', tenantSchema);

module.exports = Tenant;