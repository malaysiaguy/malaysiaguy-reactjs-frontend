const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Work'
        },

        projectItem: {
            type: Number,
            required: [true, 'Please enter project item']
        },

        projectName: {
            type: String
        },

        projectDuration: {
            type: String,
            required: [true, 'Please enter project duration']
        },

        projectRole: {
            type: String,
            required: [true, 'Please enter project role']
        },

        projectDetails: {
            type: String,
            required: [true, 'Please enter project details']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('Project', projectSchema)