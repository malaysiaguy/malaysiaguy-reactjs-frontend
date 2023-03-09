const asyncHandler = require('express-async-handler')

const Academic = require('../models/academicModel')
const User = require('../models/userModel')

//@desc     Get academic
//@route    GET /api/academic
//@access   Private
const getAcademic = asyncHandler(async (req, res) => {
    const academic = await Academic.find({ user: req.user.id })

    res.status(200).json(academic)
})

//@desc     Set academic
//@route    POST /api/academic
//@access   Private
const setAcademic = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.name || !req.body.years || !req.body.qualification) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const academic = await Academic.create({
            name: req.body.name,
            years: req.body.years,
            qualification: req.body.qualification,
            user: req.user.id
        })
        res.status(200).json(academic)
    }
})

//@desc     Update academic
//@route    PUT /api/academic/:id
//@access   Private
const updateAcademic = asyncHandler(async (req, res) => {
    const academic = await Academic.findById(req.params.id)

    if(!academic) {
        res.status(400)
        throw new Error('academic not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the academic user
    if(academic.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedAcademic = await Academic.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedAcademic)
})

//@desc     delete academic
//@route    DELETE /api/academic/:id
//@access   Private
const deleteAcademic = asyncHandler(async (req, res) => {
    const academic = await Academic.findById(req.params.id)

    if(!academic) {
        res.status(400)
        throw new Error('academic not found')
    } else {
        console.log('id: ' + req.params.id)

        await Academic.deleteOne(academic)

        res.status(200).json(academic)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the academic user
    if(academic.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getAcademic,
    setAcademic,
    updateAcademic,
    deleteAcademic,
}