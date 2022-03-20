const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport');
const User = require('../models/User');

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async(accessToken, refreshToken, profile, done) => {
        //create a new user
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }


        //add to database or not
        try {
            let user = await User.findOne({googleId: profile.id});
            if(user){
                //just return the user object
                done(null, user)
            } else {
                //make a new user to database and use it for the user object
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (error) {
            console.log(error);
        }
    }))
   
}



passport.serializeUser((user, done) => {
      done(null, user.id);
});
//returns object user on req.body
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(null, user))
});