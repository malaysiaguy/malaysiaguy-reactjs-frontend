const mongoose = require('mongoose')

const achievementSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        years: {
            type: String,
            required: [true, 'Please enter year']
        },

        name: {
            type: String,
            required: [true, 'Please enter achievement details']
        },

        organization: {
            type: String,
            required: [true, 'Please enter organization name']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('Achievement', achievementSchema)