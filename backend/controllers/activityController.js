const asyncHandler = require('express-async-handler')

const Activity = require('../models/activityModel')
const User = require('../models/userModel')

//@desc     Get activities
//@route    GET /api/activity
//@access   Private
const getActivities = asyncHandler(async (req, res) => {
    const activities = await Activity.find({ user: req.user.id })
//    console.log('activityController - ' + activities.data)
    res.status(200).json(activities)
})

//@desc     Set activity
//@route    POST /api/activity
//@access   Private
const setActivity = asyncHandler(async (req, res) => {
//    console.log(req.body)
    if(
        !req.body.activityType ||
        !req.body.years ||
        !req.body.details ||
        !req.body.location
    ) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const activity = await Activity.create({
            activityType: req.body.activityType,
            details: req.body.details,
            location: req.body.location,
            years: req.body.years,
            user: req.user.id
        })
        res.status(200).json(activity)
    }
})

//@desc     Update activity
//@route    PUT /api/activity/:id
//@access   Private
const updateActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)

    if(!activity) {
        res.status(400)
        throw new Error('activity not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the activity user
    if(activity.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedActivity)
})

//@desc     delete activity
//@route    DELETE /api/activity/:id
//@access   Private
const deleteActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)

    if(!activity) {
        res.status(400)
        throw new Error('activity not found')
    } else {
//        console.log('id: ' + req.params.id)

        await Activity.deleteOne(activity)

        res.status(200).json(activity)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the activity user
    if(activity.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getActivities,
    setActivity,
    updateActivity,
    deleteActivity,
}