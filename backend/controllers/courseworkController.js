const asyncHandler = require('express-async-handler')

const Coursework = require('../models/courseworkModel')
const User = require('../models/userModel')

//@desc     Get Coursework
//@route    GET /api/Coursework
//@access   Private
const getCoursework = asyncHandler(async (req, res) => {
    const coursework = await Coursework.find({ user: req.user.id })

    res.status(200).json(coursework)
})

//@desc     Set Coursework
//@route    POST /api/Coursework
//@access   Private
const setCoursework = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.name || !req.body.years || !req.body.details) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const coursework = await Coursework.create({
            name: req.body.name,
            details: req.body.details,
            years: req.body.years,
            user: req.user.id
        })
        res.status(200).json(coursework)
    }
})

//@desc     Update Coursework
//@route    PUT /api/Coursework/:id
//@access   Private
const updateCoursework = asyncHandler(async (req, res) => {
    const coursework = await Coursework.findById(req.params.id)

    if(!coursework) {
        res.status(400)
        throw new Error('Coursework not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the Coursework user
    if(coursework.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedCoursework = await Coursework.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedCoursework)
})

//@desc     delete Coursework
//@route    DELETE /api/Coursework/:id
//@access   Private
const deleteCoursework = asyncHandler(async (req, res) => {
    const coursework = await Coursework.findById(req.params.id)

    if(!coursework) {
        res.status(400)
        throw new Error('Coursework not found')
    } else {
        console.log('id: ' + req.params.id)

        await Coursework.deleteOne(coursework)

        res.status(200).json(coursework)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the Coursework user
    if(coursework.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getCoursework,
    setCoursework,
    updateCoursework,
    deleteCoursework,
}