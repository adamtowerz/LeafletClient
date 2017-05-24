process.env.NODE_ENV = 'production'
import express from 'express'

// server side rendering
import React from 'react'
import { createStore } from '../src/store/createStore'
import { renderToString } from 'react-dom/server'
import AppContainer from '../src/containers/AppContainer'

// general
import debug from 'debug'
debug('app:server')
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'
import webpackStats from '../dist/webpack-stats.json'
import project from '../config/project.config'
import compress from 'compression'
import passport from 'passport'
import passportConfig from '../config/passport.config'
passportConfig(passport)

// database
import mongoose from 'mongoose'
import configDB from '../config/database.config'
mongoose.connect(configDB.usersURL) // connect to our database
mongoose.Promise = require('bluebird')
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback () {
  debug('db connection established')
})

// sessions
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
const MongoStore = connectMongo(session)

const app = express()

/*  middleware */
app.use(cookieParser('secrettexthere')) // read cookies (needed for auth)
app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true,
  // using store session on MongoDB using express-session + connect
  store: new MongoStore({
    url: configDB.usersURL,
    collection: 'sessions'
  })
}))
app.use(passport.initialize())   // passport initialize middleware
app.use(passport.session())      // passport session middleware
app.use(compress()) // Apply gzip compression

/* routes */
// GET /api/user_data
app.get('/api/user_data', isLoggedIn, function (req, res) {
  if (req.user === undefined) {
    // The user is not logged in
    res.json({})
  } else {
    res.json(req.user)
  }
})

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/Leaflet')
  })

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google', function (req, res, next) {
  if (!req.user) return next()
  return res.redirect('/Leaflet')
}, passport.authenticate('google', { scope: ['profile', 'email'] }))

// route for logging out
app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

// Apply Webpack HMR Middleware
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))
  // Serve Public if Dev
  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  app.get('/', function (req, res, next) {
    res.send(handleRender(req, res))
    res.end()
  })

  // This ensures all non / routes are authenticated
  app.get('*', isLoggedIn, function (req, res, next) {
    res.send(handleRender(req, res))
    res.end()
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next()
  // if they aren't redirect them to the home page
  res.redirect('/')
}
function handleRender (req, res) {
    // Create a new Redux store instance
  const routes = require('../src/routes/index').default(store)
  console.log('handle render')
  const store = createStore({
    profile: req.user
  })
  console.log(store)

  // Render the component to a string
  const html = renderToString(
    <AppContainer store={store} routes={routes} />
  )
  console.log(store)

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}
function renderFullPage (html, preloadedState) {
  let chunkPublic = webpackStats.chunks.app[0].publicPath
  return `
    <!doctype html>
    <html>
      <head>
        <title>Leaflet</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500" rel="stylesheet">
      </head>
      <body>
        <div id="root" style="height: 100%">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="${chunkPublic}"></script>
      </body>
    </html>
  `
}

app.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)
