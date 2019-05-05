var jwt = require('jsonwebtoken');
function isLogin(req, res, next) {
   if(req.headers.hasOwnProperty('token')){
      try {
        const payload = jwt.verify(req.headers.token, process.env.SECRET)
          req.payload = payload
          next()

      }catch(err){
          res.json({
              msg : 'not authenticate'
          })
      }

    }else{
        res.json({
            msg: 'you dont have any token'

        })
    }
    
}

module.exports = isLogin