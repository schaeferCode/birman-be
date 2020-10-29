const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const AD_SERVICES_LIST = ['google', 'facebook']
const ROLES = ['tenant-admin', 'client-admin', 'user', 'root']

const adServicesSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: AD_SERVICES_LIST,
  },
  serviceClientId: { // ID of manager account
    type: String,
  },
  // TODO: Maybe this is needed?
  // active: {
  //   type: Boolean,
  //   default: false,
  // },
  accessToken: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
  },
  expiryDate: {
    type: String,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  }
})

const activatedAdServices = new Schema({
  name: {
    type: String,
    required: true,
    enum: AD_SERVICES_LIST,
  },
  serviceUserId: { // ID of client ad account
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  }
})

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  displayName: {
    type: String,
    required: true
  },
  linkedAdServices: {
    type: [activatedAdServices]
  }
})

const userSchema = new Schema({
  givenName: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    index: true
  },
  organizationName: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ROLES,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
})

const tenantSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  adServices: {
    type: [adServicesSchema],
  },
  users: {
    type: [userSchema],
  },
  clients: {
    type: [clientSchema]
  }
})

// TODO: re-enable after user things are stable...
// userSchema.pre('save', async function (next) {
//   try {
//     // Generate a password hash
//     this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.methods.isValidPassword = async function (submittedPassword) {
  return this.passwordHash === submittedPassword
  // try {
  //   return await bcrypt.compare(submittedPassword, this.passwordHash);
  // } catch (error) {
  //   throw new Error(error);
  // }
}

// Create a model
const Tenant = mongoose.model('tenant', tenantSchema)


// const newTenant = {
//   name: 'John Smith Test Manager Acct',
//   key: 'John Smith Test Manager Acct'.toLowerCase().split(' ').join('-'),
//   users: [{
//     givenName: 'Scott',
//     familyName: 'Schaefer',
//     email: 'scottschaef@gmail.com',
//     passwordHash: 'easyPass',
//     role: 'root'
//   },{
//     givenName: 'Test',
//     familyName: 'Admin',
//     email: 'test@admin.com',
//     passwordHash: 'easyPass',
//     role: 'client-admin'
//   }]
// }
// Tenant.create(newTenant);


module.exports = Tenant
