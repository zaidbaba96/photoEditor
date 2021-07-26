const passport = require('passport')
const passportJwt = require('passport-jwt')
const StrategyJwt = passportJwt.Strategy
const extractJwt = passportJwt.ExtractJwt
const User = require('../model/user.model').User
const options = {}
options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_TOKEN

passport.use(
  new StrategyJwt(options, function (payload, done) {
    User.findOne({ where: { id: payload.id } }).then((user) => {
      return done(null, user)
    }).catch((err) => {
      return done(err)
    })
  })
)
