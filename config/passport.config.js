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
    function (token, refreshToken, profile, done) {
      User.findOne({ 'google.id' : profile.id }, function (err, user) {
        if (err) return done(err)

        if (user) {
          console.log('found user: ' + profile.displayName)
          // if a user is found, log them in
          return done(null, user)
        } else {
          console.log('making user: ' + profile.displayName)
          // if the user isnt in our database, create a new user
          console.log(profile)
          var newUser = new User()

          // set all of the relevant information
          newUser.google.id = profile.id
          newUser.google.token = token
          newUser.google.name = profile.displayName
          newUser.google.email = profile.emails[0].value // pull the first email
          newUser.google.img = profile.photos[0].value // pull the first email

          // save the user
          newUser.save().then(function (err) {
            if (err) throw err
            return done(null, newUser)
          })
        }
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
