require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const todosRoutes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fancy-todo', { useNewUrlParser: true })
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/todos', todosRoutes)
app.listen(port, function(){
    console.log(`listening on port ${port}`);
    
})

