const mongoose = require('mongoose')
const {Schema} = mongoose
const todoSchema = new Schema({
    title: {type: String, 
    required: [true, 'title is required']},
    description : {type :String,
    required : [true, 'description is requires']},
    status : String,
    due_date : {
        type: Date,
        required: [true, 'due date is require']},
    user_Id : {type: Schema.Types.ObjectId, ref: 'User'}
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo