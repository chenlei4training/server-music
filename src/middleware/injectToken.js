const exjwt = require('express-jwt')
const secretKey = require('../secretKey/key')
const injectMiddleware = exjwt({secret:secretKey})

module.exports = injectMiddleware
