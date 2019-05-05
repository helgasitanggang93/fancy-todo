const jwt = require('jsonwebtoken')

module.exports = {
    sign : function (payload) {
        var token = jwt.sign(payload, process.env.SECRET )
        return token
    },
    verify: function (token) {
        return jwt.verify(token, process.env.SECRET)
        
    }
}