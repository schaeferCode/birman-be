const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
var { Strategy: FacebookStrategy } = require('passport-facebook');

const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // if user doesn't exist, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find user given the email
    const user = await User.findOne({ 'local.email': email });
  
    // if not, handle that
    if (!user) return done(null, false);
  
    // check if password is correct
    const isPasswordValid = await user.isValidPassword(password);
  
    // if not, handle that
    if (!isPasswordValid) return done(null, false);
  
    //return user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/users/oauth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find user and return
    const user = await User.findOne({ 'google.id': profile.id });
    if (user) {
      console.log('user already exists')
      return done(null, user);
    }
    
    // if no user then create one and return
    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    })
    await newUser.save(); 
  
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/users/oauth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
  console.log({accessToken})
  try {  
    const user = await User.findOne({ 'facebook.id': profile.id });
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id
      }
    })
    await newUser.save();

    done(null, newUser);    
  } catch (error) {
    done(error, false, error.message);
  }
}))  
