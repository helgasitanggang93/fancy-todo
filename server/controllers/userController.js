const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
class UserController {

    static gSsign(req, res){
        let tokenGoogle = req.headers.token
        let token
        let payload
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken : tokenGoogle,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(function (ticket) {
             payload = ticket.getPayload()
             token = sign(payload)
             User.findOne({
                 email : payload.email
             })
             .then(function (dataUser) {
                if(dataUser){
                    res.json({token:token})
                }else{
                    res.json({token:token})
                    UserController.gSignUp(payload)
                }
                
            })
           
        
        })
        
        .catch(function () {
            res.status(401).json({
                msg : 'data fail'
            })
            
        })

    }

    static gSignUp(data){
        let name = data.given_name
        let email = data.email
        User.create({
            name: name,
            email: email,
            password: "admin"
        })
        .then(function (data) {
            console.log(data)
            
        })
        .catch(function (err) {
            console.log(err)
            
        })

    }

    static signUp(req, res){
        const {name, email, password} = req.body
        User.create({
            name,
            email,
            password
        })
        .then(function (data) {
            res.status(201).json({
                msg: 'register success'
            })
            
        })
        .catch(function (err) {
            res.status(400).json(err)
            
        })

    }

    static login(req, res){
        let {email, password} = req.body
        User.findOne({
            email
        })
        .then(function (dataUser) {
            if(!dataUser){
                res.status(401).json({
                    msg: 'email/password incorrect'
                })

            }else if(!compare(password, dataUser.password)){
                res.status(401).json({
                    msg : 'Email/Password is incorrect'
                })

            }else {
                
                const {id, email} = dataUser
                const payload = {id, email}
                const token = sign(payload)
                res.status(200).json({
                    msg : 'you have successly logged in',
                    token : token,
                    details: payload
                })
            }
            
        })
        .catch(function (err) {
            res.status(500).json(err)
            
        })
    }
}

module.exports = UserController