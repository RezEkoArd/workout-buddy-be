require ('dotenv').config()

const express = require('express')
const route = express.Router()
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')


// Get All Workout 
route.get('/',getWorkouts)

// Get single workout
route.get('/:id', getWorkout)
  
// POST workout
route.post('/', createWorkout)

// Delete Workout
route.delete('/:id',deleteWorkout)

// Update Workout
route.patch('/:id',updateWorkout)


module.exports = route