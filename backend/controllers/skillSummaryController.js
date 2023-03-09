const asyncHandler = require('express-async-handler')

const SkillSummary = require('../models/skillSummaryModel')
const User = require('../models/userModel')

//@desc     Get SkillSummary
//@route    GET /api/skillSummary
//@access   Private
const getSkillSummary = asyncHandler(async (req, res) => {
    const skillSummary = await SkillSummary.find({ user: req.user.id })

    res.status(200).json(skillSummary)
})

//@desc     Set SkillSummary
//@route    POST /api/skillSummary
//@access   Private
const setSkillSummary = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.skill || !req.body.years) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const skillSummary = await SkillSummary.create({
            skill: req.body.skill,
            years: req.body.years,
            user: req.user.id
        })
        res.status(200).json(skillSummary)
    }
})

//@desc     Update SkillSummary
//@route    PUT /api/skillSummary/:id
//@access   Private
const updateSkillSummary = asyncHandler(async (req, res) => {
    const skillSummary = await SkillSummary.findById(req.params.id)

    if(!skillSummary) {
        res.status(400)
        throw new Error('skillSummary not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the SkillSummary user
    if(skillSummary.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedSkillSummary = await SkillSummary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedSkillSummary)
})

//@desc     delete SkillSummary
//@route    DELETE /api/skillSummary/:id
//@access   Private
const deleteSkillSummary = asyncHandler(async (req, res) => {
    const skillSummary = await SkillSummary.findById(req.params.id)

    if(!skillSummary) {
        res.status(400)
        throw new Error('skillSummary not found')
    } else {
        console.log('id: ' + req.params.id)

        await SkillSummary.deleteOne(skillSummary)

        res.status(200).json(skillSummary)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the SkillSummary user
    if(skillSummary.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getSkillSummary,
    setSkillSummary,
    updateSkillSummary,
    deleteSkillSummary,
}