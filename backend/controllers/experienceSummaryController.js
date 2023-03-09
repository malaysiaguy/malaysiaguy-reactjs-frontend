const asyncHandler = require('express-async-handler')

const ExperienceSummary = require('../models/experienceSummaryModel')
const User = require('../models/userModel')

//@desc     Get experienceSummary
//@route    GET /api/experienceSummary
//@access   Private
const getExperienceSummary = asyncHandler(async (req, res) => {
    const experienceSummary = await ExperienceSummary.find({ user: req.user.id })

    res.status(200).json(experienceSummary)
})

//@desc     Set experienceSummary
//@route    POST /api/experienceSummary
//@access   Private
const setExperienceSummary = asyncHandler(async (req, res) => {
//    console.log(req.body)
    if(!req.body.experience || !req.body.years) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const experienceSummary = await ExperienceSummary.create({
            experience: req.body.experience,
            years: req.body.years,
            user: req.user.id
        })

        res.status(200).json(experienceSummary)
    }
})

//@desc     Update experienceSummary
//@route    PUT /api/experienceSummary/:id
//@access   Private
const updateExperienceSummary = asyncHandler(async (req, res) => {
    const experienceSummary = await ExperienceSummary.findById(req.params.id)

    if(!experienceSummary) {
        res.status(400)
        throw new Error('experienceSummary not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the experienceSummary user
    if(experienceSummary.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedExperienceSummary = await ExperienceSummary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedExperienceSummary)
})

//@desc     delete experienceSummary
//@route    DELETE /api/experienceSummary/:id
//@access   Private
const deleteExperienceSummary = asyncHandler(async (req, res) => {
    const experienceSummary = await ExperienceSummary.findById(req.params.id)

    if(!experienceSummary) {
        res.status(400)
        throw new Error('experienceSummary not found')
    } else {
        console.log('id: ' + req.params.id)
        await ExperienceSummary.deleteOne(experienceSummary)

        res.status(200).json(experienceSummary)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the experienceSummary user
    if(experienceSummary.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

})

module.exports = {
    getExperienceSummary,
    setExperienceSummary,
    updateExperienceSummary,
    deleteExperienceSummary,
}