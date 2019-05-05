const mongoose = require('mongoose')
const {hash} = require('../helpers/bcrypt')
const userSchema = new mongoose.Schema({
    name : String,
    email: {
        type : String,
        required: [true, 'Email is required'],
        validate : [{
            validator : function(value){
                let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                return regex.test(value)

            },
            message : 'Invalid format email'
        },
    {
        validator : function (value) {
            return User.model('User', userSchema)
            .findOne({
                email : value
            })
            .then(function (data) {
                if(data){
                    return false
                }
                
            })
            
        },
        message : 'email already register'
    }]
    },
    password: String
})

userSchema.post('validate', function (data, next) {
    data.password = hash(data.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User