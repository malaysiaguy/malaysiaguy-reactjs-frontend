const asyncHandler = require('express-async-handler')

const Knowledge = require('../models/knowledgeModel')
const User = require('../models/userModel')

//@desc     Get Knowledge
//@route    GET /api/Knowledge
//@access   Private
const getKnowledge = asyncHandler(async (req, res) => {
    const knowledge = await Knowledge.find({ user: req.user.id })

    res.status(200).json(knowledge)
})

//@desc     Set Knowledge
//@route    POST /api/Knowledge
//@access   Private
const setKnowledge = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.knowledge || !req.body.knowledgeType || !req.body.level) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const knowledge = await Knowledge.create({
            knowledge: req.body.knowledge,
            knowledgeType: req.body.knowledgeType,
            level: req.body.level,
            user: req.user.id
        })
        res.status(200).json(knowledge)
    }
})

//@desc     Update Knowledge
//@route    PUT /api/Knowledge/:id
//@access   Private
const updateKnowledge = asyncHandler(async (req, res) => {
    const knowledge = await Knowledge.findById(req.params.id)

    if(!knowledge) {
        res.status(400)
        throw new Error('Knowledge not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the Knowledge user
    if(knowledge.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedKnowledge = await Knowledge.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedKnowledge)
})

//@desc     delete Knowledge
//@route    DELETE /api/Knowledge/:id
//@access   Private
const deleteKnowledge = asyncHandler(async (req, res) => {
    const knowledge = await Knowledge.findById(req.params.id)

    if(!knowledge) {
        res.status(400)
        throw new Error('Knowledge not found')
    } else {
        console.log('id: ' + req.params.id)

        await Knowledge.deleteOne(knowledge)

        res.status(200).json(knowledge)
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the Knowledge user
    if(knowledge.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getKnowledge,
    setKnowledge,
    updateKnowledge,
    deleteKnowledge,
}