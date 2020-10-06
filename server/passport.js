const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
// var { Strategy: FacebookStrategy } = require('passport-facebook');

const Tenant = require('./models/tenant')

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { tenant } = req.value.body
      try {
        const entity = await Tenant.findOne({ 'key': tenant, 'users.email': email }).exec()
        const user = entity.users.find((user) => user.email === email)

        // if not, handle that
        if (!user) return done(null, false)

        // check if password is correct
        const isPasswordValid = await user.isValidPassword(password)

        // if not, handle that
        if (!isPasswordValid) return done(null, false)

        //return user
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

// // Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/ad-services/oauth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const googleUserAccount = {
    accessToken,
    refreshToken,
    profile
  }
  done(null, googleUserAccount)

    

  // console.log({user})
  // const customerService = user.getService('CustomerService', 'v201809');
  // console.log({customerService})
  // customerService.getCustomers({}, setManagerAccount);


  // const client = new GoogleAdsApi({
  //   client_id: '563656359501-d558fdn4p8la4gkt0poliip8c0bjjm1d.apps.googleusercontent.com',
  //   client_secret: 'kNBjrQsDgVjMOA7pnTfjtWsp',
  //   developer_token: '4G0ikfrjyiB8gn3Fp-s6tw',
  // })

  // const customer = client.Customer({
  //   customer_account_id: '604-413-0368',
  //   login_customer_id: '604-413-0368', // Optionally provide a login-customer-id
  //   refresh_token: refreshToken,
  // })

  // let response = await customer.get('3731137021')
    
  // const response = await customer.report({
  //   entity: 'ad_group',
  //   attributes: ['ad_group.id', 'ad_group.name', 'ad_group.status'],
  //   metrics: ['metrics.clicks'],
  //   constraints: { 'ad_group.status': enums.AdGroupStatus.ENABLED },
  //   from_date: '2019-01-01',
  //   order_by: 'metrics.clicks',
  //   sort_order: 'desc',
  //   limit: 5,
  // })  

  // console.log('respon', JSON.stringify(response))
  
  // res.end(JSON.stringify(response))

  // AS A TRIAL
  // get entity
  // try {
  //   const entity = await Tenant.findOne({ 'users.email': profile.emails[0].value}) // TODO: after verify tokens, grab entity with tenant
  // } catch (error) {
      
  // }
  // const entity = 
  // Store tokens
}))



// try {
//   // Find user and return
//   const user = await User.findOne({ 'google.id': profile.id });
//   if (user) {
//     console.log('user already exists')
//     return done(null, user);
//   }

//   // if no user then create one and return
//   const newUser = new User({
//     method: 'google',
//     google: {
//       id: profile.id,
//       email: profile.emails[0].value
//     }
//   })
//   await newUser.save();

//   done(null, newUser);
// } catch (error) {
//   done(error, false, error.message);
// }
// }));

// // Facebook OAuth Strategy
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: '/users/oauth/facebook/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   console.log({accessToken})
//   try {
//     const user = await User.findOne({ 'facebook.id': profile.id });
//     if (user) {
//       return done(null, user);
//     }

//     const newUser = new User({
//       method: 'facebook',
//       facebook: {
//         id: profile.id
//       }
//     })
//     await newUser.save();

//     done(null, newUser);
//   } catch (error) {
//     done(error, false, error.message);
//   }
// }))
