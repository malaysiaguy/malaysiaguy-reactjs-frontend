const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')
const User = require('../models/userModel')
const Work = require('../models/workModel')

//@desc     Get Project
//@route    GET /api/project
//@access   Private
const getProject = asyncHandler(async (req, res) => {
    const project = await Project.find({ user: req.user.id })

    res.status(200).json(project)
})

//@desc     Set Project
//@route    POST /api/project
//@access   Private
const setProject = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(
        !req.body.projectItem ||
        !req.body.projectName ||
        !req.body.projectDuration ||
        !req.body.projectRole ||
        !req.body.projectDetails
    ) {
        res.status(400)
        throw new Error('Please enter all the fields')
    } else {
        const project = await Project.create({
            projectItem: req.body.projectItem,
            projectName: req.body.projectName,
            projectDuration: req.body.projectDuration,
            projectRole: req.body.projectRole,
            projectDetails: req.body.projectDetails,
            company: req.body.companyId,
            user: req.user.id
        })
        res.status(200).json(Project)
    }
})

//@desc     Update Project
//@route    PUT /api/project/:id
//@access   Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project) {
        res.status(400)
        throw new Error('Project not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const company = await Work.findById(req.work.id)

    //Check for company
    if(!company) {
        res.status(401)
        throw new Error('Company not found')
    }

    //Make sure the logged in user matches the Project user
    if(project.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedProject)
})

//@desc     delete Project
//@route    DELETE /api/project/:id
//@access   Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project) {
        res.status(400)
        throw new Error('Project not found')
    } else {
        console.log('id: ' + req.params.id)

        await Project.deleteOne(project)

        res.status(200).json(project)
    }

    const company = await Work.findById(req.work.id)

    //Check for company
    if(!company) {
        res.status(401)
        throw new Error('Company not found')
    }

    //Make sure the company matches the Project company
    if(project.company.toString() !== company.id) {
        res.status(401)
        throw new Error('Company not match')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the Project user
    if(project.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getProject,
    setProject,
    updateProject,
    deleteProject,
}