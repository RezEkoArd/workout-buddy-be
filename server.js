require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts',workoutRoutes)

// connect db 
mongoose.connect(process.env.MONG_URI,)
.then(()=> {
    app.listen( process.env.PORT,() => {
        console.log('connect db & listening running on port 4000')
    })
})
.catch((err) => {
    console.log(err)
})
