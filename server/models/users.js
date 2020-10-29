const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const ROLES = ['tenant-admin', 'client-admin', 'user', 'root']

const userSchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  clientKey: { // if role is 'user' or 'client-admin', this is the company they work for, e.g. 'ez-dental'
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  givenName: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ROLES,
    required: true,
  },
  tenantKey: { // the client of this app, e.g. 'eden-ads', 'online-marketing-wizards'
    type: String,
    lowercase: true,
    required: true
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
const User = mongoose.model('user', userSchema)

// const rootUser = {
//   email: 'scottschaef@gmail.com',
//   familyName: 'Schaefer',
//   givenName: 'Scott',
//   passwordHash: 'easyPass',
//   role: 'root',
// }

// const tenantAdminUser = {
//   email: 'test@admin.com',
//   familyName: 'Admin',
//   givenName: 'Test',
//   passwordHash: 'easyPass',
//   role: 'tenant-admin',
//   tenantKey: 'john-smith-test-manager-acct',
// }

// const newUserCollection = [rootUser, clientAdminUser]
// User.create(newUserCollection)

module.exports = User
