const asyncHandler = require('express-async-handler')

const Achievement = require('../models/achievementModel')
const User = require('../models/userModel')

//@desc     Get Achievement
//@route    GET /api/achievement
//@access   Private
const getAchievement = asyncHandler(async (req, res) => {
    const achievement = await Achievement.find({ user: req.user.id })

    res.status(200).json(achievement)
})

//@desc     Set Achievement
//@route    POST /api/achievement
//@access   Private
const setAchievement = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.name || !req.body.years || !req.body.organization) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const achievement = await Achievement.create({
            name: req.body.name,
            years: req.body.years,
            organization: req.body.organization,
            user: req.user.id
        })
        res.status(200).json(achievement)
    }
})

//@desc     Update Achievement
//@route    PUT /api/achievement/:id
//@access   Private
const updateAchievement = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id)

    if(!achievement) {
        res.status(400)
        throw new Error('Achievement not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the Achievement user
    if(achievement.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedAchievement)
})

//@desc     delete Achievement
//@route    DELETE /api/achievement/:id
//@access   Private
const deleteAchievement = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id)

    if(!achievement) {
        res.status(400)
        throw new Error('Achievement not found')
    } else {
        console.log('id: ' + req.params.id)

        await Achievement.deleteOne(achievement)

        res.status(200).json(achievement)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the Achievement user
    if(achievement.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getAchievement,
    setAchievement,
    updateAchievement,
    deleteAchievement,
}