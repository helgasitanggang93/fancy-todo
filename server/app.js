require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const todosRoutes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGO_DB}-todo`, { useNewUrlParser: true })
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/todos', todosRoutes)
app.listen(port, function(){
    console.log(`listening on port ${port}`);
    
})

