const Todo = require('../models/todo')

class TodoController {
    static create(req, res){
        const {title,description,due_date} = req.body
        Todo.create({
            title,
            description,
            status : 'pending',
            due_date,
            user_Id : req.payload.id
    
        })
        .then(function (data) {
            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static read(req,res){
        Todo.find({
            user_Id: req.payload.id

        }, null, {sort: {_id:-1}})
        .populate('userId')
        .then(function (data) {
            if(data.length === 0){
                res.status(404).json({
                    msg: 'data not found'
                })
            }else {
                res.status(200).json(data)
            }
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })
    }

    static readOne(req, res){
        let dataId = req.params.id
        Todo.findOne({
            _id: dataId
        })
        .then(function (data) {
            if(!data){
                res.status(401).json({
                    msg: 'data not found'
                })
            }else {
                res.status(200).json(data)
            }
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })
    }

    static update(req, res){
        let todoId = req.params.id
        Todo.findOneAndUpdate({_id: todoId},{
            status : "complete"
        })
        .then(function (data) {
            res.status(201).json(data)
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static delete(req, res){
        let userId = req.params.id
        Todo.deleteOne({
            _id: userId
        })
        .then(function (data) {

            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
        })

    }
}

module.exports = TodoController