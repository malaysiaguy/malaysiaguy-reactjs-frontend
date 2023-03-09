const asyncHandler = require('express-async-handler')

const Work = require('../models/workModel')
const User = require('../models/userModel')

//@desc     Get works
//@route    GET /api/work
//@access   Private
const getWorks = asyncHandler(async (req, res) => {
    const works = await Work.find({ user: req.user.id })

    res.status(200).json(works)
})

//@desc     Set work
//@route    POST /api/work
//@access   Private
const setWork = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(
        !req.body.workType ||
        !req.body.company ||
        !req.body.location ||
        !req.body.fromDate ||
        !req.body.toDate ||
        !req.body.position ||
        !req.body.reasonLeaving
    ) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const work = await Work.create({
            industryType: req.body.industryType,
            workType: req.body.workType,
            company: req.body.company,
            location: req.body.location,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate,
            position: req.body.position,
            reasonLeaving: req.body.reasonLeaving,
            user: req.user.id
        })
        res.status(200).json(work)
    }
})

//@desc     Update work
//@route    PUT /api/work/:id
//@access   Private
const updateWork = asyncHandler(async (req, res) => {
    const work = await Work.findById(req.params.id)

    if(!work) {
        res.status(400)
        throw new Error('work not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the work user
    if(work.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedWork = await Work.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedWork)
})

//@desc     delete work
//@route    DELETE /api/work/:id
//@access   Private
const deleteWork = asyncHandler(async (req, res) => {
    const work = await Work.findById(req.params.id)

    if(!work) {
        res.status(400)
        throw new Error('work not found')
    } else {
        console.log('id: ' + req.params.id)

        await Work.deleteOne(work)

        res.status(200).json(work)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the work user
    if(work.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getWorks,
    setWork,
    updateWork,
    deleteWork,
}