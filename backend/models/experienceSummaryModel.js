const mongoose = require('mongoose')

const experienceSummarySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        experience: {
            type: String,
            required: [true, 'Please enter experience description']
        },

        years: {
            type: String,
            required: [true, 'Please enter years of experience']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('ExperienceSummary', experienceSummarySchema)