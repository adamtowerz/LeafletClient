var User = require('../server/models/user')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const GOOGLE_CLIENT_ID = '820499902692-ulb668a9g0evddeog5c4hnpi5tte4cku.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = 'rCOjfe5j08hIT27jA1b3Benl'

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user)
      })
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}
