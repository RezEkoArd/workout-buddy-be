const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all Workout
const getWorkouts = async (req, res) => {
    const Workouts = await Workout.find({}).sort({createdAt: -1})
    
    res.status(200).json(Workouts)
}

// get a single Workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error: "No Such Workout"})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: "No Such Workout"})
    }

    res.status(200).json(workout)
}

// create new Workout
const createWorkout = async (req, res) => {
    const {title,load,reps} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    

    // add doc to db
    try {
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// detelet a Workout

const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error: "No Such Workout"})
    }

    const workout = await Workout.findByIdAndDelete({_id: id})

    if(!workout) {
        return res.status(404).json({error: "No Such Workout"})
    }

    res.status(200).json(workout)

}

// update a Workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Workout"})
     }

    const workout = await Workout.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error: "No Such Workout"})
    }

    res.status(200).json(workout)
}




module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}